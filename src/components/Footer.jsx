import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerColumn}>
          <h3>CivicLens</h3>
          <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
            Empowering communities through collaboration and transparency.
          </p>
          <div className={styles.socialLinks}>
            <a href="http://www.linkedin.com/in/mohneesh-gupta" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="http://www.linkedin.com/in/mohneesh-gupta" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="http://www.linkedin.com/in/mohneesh-gupta" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="http://www.linkedin.com/in/mohneesh-gupta" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        
        <div className={styles.footerColumn}>
          <h3>Quick Links</h3>
          <ul className={styles.footerLinks}>
            <li><a href="/#home">Home</a></li>
            <li><Link to="/report">Report an Issue</Link></li>
            <li><a href="/#map">Community Map</a></li>
            <li><a href="/#issues">Recent Issues</a></li>
            <li><a href="/#testimonials">Testimonials</a></li>
          </ul>
        </div>
        
        <div className={styles.footerColumn}>
          <h3>Resources</h3>
          <ul className={styles.footerLinks}>
            <li><a href="#works">How It Works</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#guidelines">Community Guidelines</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
          </ul>
        </div>
        
        <div className={styles.footerColumn}>
          <h3>Contact Us</h3>
          <div className={styles.footerContact}>
            <i className="fas fa-map-marker-alt"></i>
            <span>bhopal, 462022</span>
          </div>
          <div className={styles.footerContact}>
            <i className="fas fa-phone-alt"></i>
            <span>(XXX) XXX-XXXX</span>
          </div>
          <div className={styles.footerContact}>
            <i className="fas fa-envelope"></i>
            <span>work.mohneesh@gmail.com</span>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} CivicLens. All rights reserved.</p>
        <p>Designed with ❤️ by Team MYTH busters</p>
      </div>
    </footer>
  );
};

export default Footer;
