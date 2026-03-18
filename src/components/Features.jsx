import React from 'react';
import styles from './Features.module.css';

const Features = () => {
  return (
    <section className={styles.features}>
      <div className="section-header">
        <h2>How It Works</h2>
        <p>
          Our platform makes it easy to report and track community issues while connecting with local authorities and neighbors.
        </p>
      </div>

      <div className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <i className="fas fa-edit"></i>
          </div>
          <h3>Easy Reporting</h3>
          <p>
            Submit issues in minutes with our simple form. Add photos, location details, and category to help us address it faster.
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <h3>Interactive Map</h3>
          <p>
            See all reported issues in your area on our live map. Filter by category, status, or date to stay informed.
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <i className="fas fa-bell"></i>
          </div>
          <h3>Real-time Updates</h3>
          <p>
            Get notifications when your reported issue changes status or when new comments are added by officials or neighbors.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
