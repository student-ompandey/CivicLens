import React, { useState, useRef } from 'react';
import { profileService } from '../services/api';
import styles from '../pages/ProfilePage.module.css';

const EditProfileForm = ({ profile, onCancel, onSuccess }) => {
  const safeProfile = profile || {};
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: safeProfile.name || '',
    phone: safeProfile.phone || '',
    address: safeProfile.address || ''
  });
  
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file');
        return;
      }
      setSelectedPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('phone', formData.phone);
      submitData.append('address', formData.address);
      if (selectedPhoto) {
        submitData.append('profilePhoto', selectedPhoto);
      }

      await profileService.updateProfile(submitData);
      
      // Update local storage name cache so Navbar updates
      const cache = JSON.parse(localStorage.getItem('user'));
      if(cache) {
        cache.name = formData.name;
        localStorage.setItem('user', JSON.stringify(cache));
      }

      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
      setIsSubmitting(false);
    }
  };

  const currentAvatar = photoPreview || 
    (safeProfile.profilePhoto ? `http://localhost:5000${safeProfile.profilePhoto}` : null) || 
    `https://ui-avatars.com/api/?name=${safeProfile.name || 'User'}&background=6366f1&color=fff`;

  return (
    <div className={styles.editCard}>
      <div className={styles.editHeader}>
        <h2>Edit Profile</h2>
        <button className={styles.closeBtn} onClick={onCancel}><i className="fas fa-times"></i></button>
      </div>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.editForm}>
        
        {/* Photo Upload Area */}
        <div className={styles.photoUploadGroup}>
          <div 
            className={styles.avatarEdit} 
            style={{ backgroundImage: `url('${currentAvatar}')` }}
            onClick={handlePhotoClick}
          >
            <div className={styles.avatarOverlay}>
              <i className="fas fa-camera"></i>
            </div>
          </div>
          <p className={styles.photoHelp}>Click to update photo</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input 
              type="email" 
              value={safeProfile.email || ''} 
              disabled 
              className={styles.disabledInput} 
            />
          </div>

          <div className={styles.formGroup}>
            <label>Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleInputChange} 
              placeholder="e.g. +1 234 567 8900"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Address / City</label>
            <input 
              type="text" 
              name="address" 
              value={formData.address} 
              onChange={handleInputChange} 
              placeholder="e.g. 123 Civic Way, Metropolis"
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="button" className="btn btn-outline" onClick={onCancel} disabled={isSubmitting}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
