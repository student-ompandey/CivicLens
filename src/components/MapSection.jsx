import React from 'react';
import styles from './MapSection.module.css';

const MapSection = () => {
  return (
    <section id="map" className={styles.mapSection}>
      <div className="section-header">
        <h2>Community Issues Map</h2>
        <p>Explore reported issues in your neighborhood and see what's being addressed.</p>
      </div>
      
      <div className={styles.mapContainer}>
        <iframe 
          title="Community Issues Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209179873!2d-73.98784492453713!3d40.74844097138952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1690834253572!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </section>
  );
};

export default MapSection;
