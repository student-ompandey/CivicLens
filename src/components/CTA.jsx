import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CTA.module.css';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2>Ready to Make a Difference?</h2>
        <p>Join thousands of community members who are working together to improve their neighborhoods.</p>
        <button 
          className={`btn ${styles.btnCta}`}
          onClick={() => navigate('/login')}
        >
          <i className="fas fa-user-plus"></i> Join Now
        </button>
      </div>
    </section>
  );
};

export default CTA;
