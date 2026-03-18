import React, { useState, useEffect } from 'react';
import { complaintService } from '../services/api';
import styles from './Issues.module.css';

const CATEGORIES = [
  { id: 'all', label: 'All Issues', icon: 'fas fa-map' },
  { id: 'road', label: 'Road & Sidewalks', icon: 'fas fa-road' },
  { id: 'sanitation', label: 'Sanitation', icon: 'fas fa-trash-alt' },
  { id: 'safety', label: 'Public Safety', icon: 'fas fa-shield-alt' },
  { id: 'parks', label: 'Parks & Rec', icon: 'fas fa-tree' },
  { id: 'utilities', label: 'Utilities', icon: 'fas fa-bolt' }
];

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await complaintService.getAll();
        const issuesData = response.data.data || response.data || [];
        setIssues(Array.isArray(issuesData) ? issuesData : []);
      } catch (err) {
        setError('Failed to load recent issues.');
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  const handleVote = async (id) => {
    try {
      const resp = await complaintService.upvote(id);
      setIssues(issues.map(issue => 
        issue._id === id ? { ...issue, votes: resp.data.data.votes } : issue
      ));
    } catch (err) {
      if(err.response?.status === 401) {
        alert("Please login to vote!");
      }
    }
  };

  const getStatusClass = (status) => {
    if (status === 'Pending') return styles.statusPending;
    if (status === 'In Progress') return styles.statusInProgress;
    return styles.statusResolved;
  };

  const getImageUrl = (images) => {
    if (images && images.length > 0) {
      if (images[0].startsWith('http')) return images[0];
      return `http://localhost:5000${images[0]}`;
    }
    return 'https://images.unsplash.com/photo-1541818167761-4cce4685160c?auto=format&fit=crop&w=600&q=80';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  // Filter issues based on clicked category
  const filteredIssues = activeFilter === 'all' 
    ? issues 
    : issues.filter(issue => issue.type === activeFilter);

  if (loading) return <div className={styles.loadingWrapper}><div className={styles.spinner}></div> Loading community issues...</div>;

  return (
    <section id="issues" className={styles.issuesSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Community Impact Board</h2>
          <p>Discover locally reported neighborhood issues, vote to increase priority, and track resolution timelines directly with civic responders.</p>
          {error && <div className={styles.errorMessage}>{error}</div>}
        </div>

        {/* Professional Filter Bar */}
        <div className={styles.filterContainer}>
          <div className={styles.filterPills}>
            {CATEGORIES.map(category => (
              <button 
                key={category.id} 
                className={`${styles.filterPill} ${activeFilter === category.id ? styles.active : ''}`}
                onClick={() => setActiveFilter(category.id)}
              >
                <i className={category.icon}></i> {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Issue Grid */}
        <div className={styles.issuesGrid}>
          {filteredIssues.length === 0 ? (
            <div className={styles.emptyState}>
              <i className="fas fa-search"></i>
              <h3>No issues found</h3>
              <p>There are currently no reports in this category. Your neighborhood is looking immaculate!</p>
            </div>
          ) : filteredIssues.map(issue => (
            <div key={issue._id} className={styles.issueCard}>
              <div className={styles.imageWrapper}>
                <div 
                  className={styles.issueImage} 
                  style={{ backgroundImage: `url('${getImageUrl(issue.images)}')` }}
                ></div>
                <div className={styles.imageOverlay}>
                  <span className={`${styles.statusBadgeOverlay} ${getStatusClass(issue.status)}`}>
                    <span className={styles.pulseDot}></span>
                    {issue.status}
                  </span>
                </div>
              </div>

              <div className={styles.issueContent}>
                <div className={styles.issueMeta}>
                  <span className={styles.issueCategory}>
                    <i className={CATEGORIES.find(c => c.id === issue.type)?.icon || 'fas fa-tag'}></i>
                    {issue.type}
                  </span>
                  <span className={styles.issueDate}>{formatDate(issue.createdAt)}</span>
                </div>

                <h3 className={styles.issueTitle}>{issue.title}</h3>
                
                <div className={styles.issueLocation}>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{issue.location}</span>
                </div>

                <p className={styles.issueDescription}>{issue.details.substring(0, 110)}...</p>

                <div className={styles.issueFooter}>
                  <div className={styles.reporterInfo}>
                    <div className={styles.reporterAvatar}>
                      {issue.user?.name ? issue.user.name.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <span className={styles.reporterName}>{issue.user?.name || 'Anonymous'}</span>
                  </div>

                  <div 
                    className={styles.issueVotes} 
                    onClick={() => handleVote(issue._id)}
                    title="Upvote to accelerate resolution"
                  >
                    <i className="fas fa-arrow-up"></i>
                    <span>{issue.votes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Issues;
