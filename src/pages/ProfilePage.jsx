import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EditProfileForm from '../components/EditProfileForm';
import { profileService, complaintService } from '../services/api';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const [myIssues, setMyIssues] = useState([]);
  const [issuesLoading, setIssuesLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await profileService.getProfile();
      setProfile(res.data.data);
      setError('');
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to load profile data.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProfile();
    fetchMyIssues();
  }, [navigate]);

  const fetchMyIssues = async () => {
    try {
      const resp = await complaintService.getMy();
      setMyIssues(resp.data.data);
    } catch (err) {
      console.error('Failed to grab issues', err);
    } finally {
      setIssuesLoading(false);
    }
  };

  const handleDeleteIssue = async (id) => {
    if(!window.confirm('Are you sure you want to permanently delete this report?')) return;
    try {
      await complaintService.delete(id);
      setMyIssues(myIssues.filter(issue => issue._id !== id));
    } catch (err) {
      alert('Failed to delete issue. You might not have permission.');
    }
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
    fetchProfile(); // Refresh data naturally
  };

  const getImageUrl = (path) => {
    if (path) return `http://localhost:5000${path}`;
    return 'https://ui-avatars.com/api/?name=' + (profile?.name || 'User') + '&background=6366f1&color=fff';
  };

  if (loading) return <div className={styles.loadingState}>Loading Profile...</div>;

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      
      <main className={styles.profileContainer}>
        {error && <div className={styles.errorBanner}>{error}</div>}

        {!isEditing ? (
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <div 
                className={styles.avatar}
                style={{ backgroundImage: `url('${getImageUrl(profile?.profilePhoto)}')` }}
              ></div>
              <div className={styles.headerInfo}>
                <h2>{profile?.name}</h2>
                <span className={styles.roleBadge}>{profile?.role}</span>
              </div>
              <button className={`btn btn-primary ${styles.editBtn}`} onClick={() => setIsEditing(true)}>
                <i className="fas fa-edit"></i> Edit Profile
              </button>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.label}>Email Address</span>
                <span className={styles.value}>{profile?.email}</span>
                <small className={styles.immutable}>(Cannot be changed)</small>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.label}>Phone Number</span>
                <span className={styles.value}>{profile?.phone || 'Not provided'}</span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.label}>Location / Address</span>
                <span className={styles.value}>{profile?.address || 'Not provided'}</span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.label}>Member Since</span>
                <span className={styles.value}>
                  {new Date(profile?.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </span>
              </div>
            </div>
            
            <div className={styles.myIssuesSection}>
              <h3 className={styles.issuesHeader}>My Reported Issues</h3>
              {issuesLoading ? (
                 <p>Loading your reports...</p>
              ) : myIssues.length === 0 ? (
                 <p className={styles.noIssues}>You haven't reported any issues yet.</p>
              ) : (
                <div className={styles.issueList}>
                  {myIssues.map(issue => (
                    <div key={issue._id} className={styles.miniIssueCard}>
                      <div className={styles.miniIssueInfo}>
                        <h4>{issue.title}</h4>
                        <span className={styles.miniStatus}>{issue.status}</span>
                      </div>
                      <button onClick={() => handleDeleteIssue(issue._id)} className={styles.deleteBtn}>
                        <i className="fas fa-trash-alt"></i> Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        ) : (
          <EditProfileForm 
            profile={profile} 
            onCancel={() => setIsEditing(false)} 
            onSuccess={handleEditSuccess} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
