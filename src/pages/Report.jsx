import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { complaintService } from '../services/api';
import styles from './Report.module.css';

const Report = () => {
  const navigate = useNavigate();
  const [dragOver, setDragOver] = useState(false);
  const [fileNames, setFileNames] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    location: '',
    details: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  
  const fileInputRef = useRef(null);

  // Authentication check protection
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    updateFileNames(e.dataTransfer.files);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    updateFileNames(e.target.files);
  };

  const updateFileNames = (files) => {
    if (files && files.length > 0) {
      if (files.length > 5) {
        setFormStatus({ type: 'error', message: 'Maximum 5 photos allowed.' });
        return;
      }
      setSelectedFiles(Array.from(files));
      const names = Array.from(files).map(f => f.name).join(', ');
      setFileNames(`Selected: ${names}`);
      setFormStatus({ type: '', message: '' });
    } else {
      setFileNames('');
      setSelectedFiles([]);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id === 'issue-type' ? 'type' : id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: '', message: '' });

    if (!formData.type || !formData.title || !formData.location || !formData.details) {
      setFormStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    if (formData.title.length < 5) {
      setFormStatus({ type: 'error', message: 'Title must be at least 5 characters long.' });
      return;
    }

    try {
      // Assemble Multipart Form Data for File Uploads
      const data = new FormData();
      data.append('type', formData.type);
      data.append('title', formData.title);
      data.append('location', formData.location);
      data.append('details', formData.details);
      
      selectedFiles.forEach(file => {
        data.append('images', file);
      });

      await complaintService.create(data);
      
      setFormStatus({ 
        type: 'success', 
        message: 'Report submitted successfully! Dashboard has been updated.' 
      });
      setFormData({ type: '', title: '', location: '', details: '' });
      setFileNames('');
      setSelectedFiles([]);
    } catch (error) {
      setFormStatus({ 
        type: 'error', 
        message: error.response?.data?.error || 'Failed to submit report. Please try again.' 
      });
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <section id="report" className={styles.reportSection}>
        <div className={styles.reportContainer}>
          <div className={styles.reportHeader}>
            <h2>Report a Community Issue</h2>
            <p>Your report helps us build a better neighborhood.</p>
          </div>

          {formStatus.message && (
            <div className={`${styles.alertBox} ${formStatus.type === 'error' ? styles.alertError : styles.alertSuccess}`}>
              <i className={formStatus.type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle'}></i>
              {formStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.formElement}>
            <div className={styles.formGroup}>
              <label htmlFor="issue-type">Issue Type <span className={styles.required}>*</span></label>
              <select 
                id="issue-type" 
                className={styles.formControl} 
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select issue category</option>
                <option value="road">Road & Sidewalk</option>
                <option value="sanitation">Sanitation & Waste</option>
                <option value="parks">Parks & Recreation</option>
                <option value="safety">Public Safety</option>
                <option value="utilities">Utilities</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="title">Title <span className={styles.required}>*</span></label>
              <input 
                type="text" 
                id="title" 
                className={styles.formControl} 
                placeholder="Brief description of the issue" 
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="location">Location <span className={styles.required}>*</span></label>
              <input 
                type="text" 
                id="location" 
                className={styles.formControl} 
                placeholder="Street address or landmark" 
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Upload Photos (Optional)</label>
              <div 
                className={`${styles.fileUpload} ${dragOver ? styles.dragOver : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleFileClick}
              >
                <i className="fas fa-cloud-upload-alt"></i>
                <p className={styles.uploadMainText}>{fileNames || 'Click to browse or drag and drop files here'}</p>
                <p className={styles.smallText}>Maximum 5 photos (5MB each)</p>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple 
                  accept="image/*" 
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="details">Details <span className={styles.required}>*</span></label>
              <textarea 
                id="details" 
                className={styles.formControl} 
                placeholder="Please describe the issue in detail to help responders..." 
                rows="4"
                value={formData.details}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
              <i className="fas fa-paper-plane"></i> Submit Report
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Report;
