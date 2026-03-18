import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  const navigate = useNavigate();

  const handleScrollToMap = () => {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      window.scrollTo({ top: mapElement.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className={styles.heroSection}>
      <div className={styles.heroGlassContainer}>
        <div className={styles.badge}>CivicLens Beta Open</div>
        <h1 className={styles.heroTitle}>
          Empowering Communities,<br/>
          <span className={styles.gradientText}>One Report at a Time</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Securely report local issues, track their resolution in real-time, and collaborate seamlessly with local authorities and neighbors to build a better community.
        </p>
        <div className={styles.heroButtons}>
          <button 
            className={`btn btn-primary ${styles.btnPrimaryModern}`} 
            onClick={() => navigate('/report')}
          >
            <i className="fas fa-plus"></i> Submit Report
          </button>
          <button 
            className={`btn btn-outline ${styles.btnOutlineModern}`} 
            onClick={handleScrollToMap}
          >
            <i className="fas fa-map-marked-alt"></i> Explore Map
          </button>
        </div>
        
        <div className={styles.heroStats}>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>24/7</span>
            <span className={styles.statLabel}>Support</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>10k+</span>
            <span className={styles.statLabel}>Active Users</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Verified Fixes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
