import React from 'react';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: '"I reported a dangerous pothole on my street, and it was fixed within three days! The updates from the city kept me informed throughout the process."',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      name: 'Sarah Johnson',
      role: 'Maplewood Resident'
    },
    {
      id: 2,
      text: '"The community map helped me discover several issues in my area that I wasn\'t aware of. Now our neighborhood association uses this platform to prioritize improvements."',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      name: 'Michael Chen',
      role: 'Neighborhood Association President'
    },
    {
      id: 3,
      text: '"As a city worker, this platform helps us respond to issues more efficiently. The photos and precise locations residents provide save us so much time."',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      name: 'David Rodriguez',
      role: 'Public Works Department'
    }
  ];

  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className="section-header">
        <h2>What Our Community Says</h2>
        <p>Hear from residents who have used our platform to improve their neighborhoods.</p>
      </div>
      
      <div className={styles.testimonialsGrid}>
        {testimonials.map(item => (
          <div key={item.id} className={styles.testimonialCard}>
            <p className={styles.testimonialText}>{item.text}</p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>
                <img 
                  src={item.avatar} 
                  alt={`${item.name} Avatar`} 
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} 
                />
              </div>
              <div className={styles.authorInfo}>
                <h4>{item.name}</h4>
                <p>{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
