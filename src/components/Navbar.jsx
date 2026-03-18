import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo} onClick={handleScrollToTop}>
        <i className={`fas fa-hands-helping ${styles.logoIcon}`}></i>
        <span>CivicLens</span>
      </Link>
      
      <div className={styles.navRight}>
        <ul className={styles.navLinks}>
          <li>
            <span onClick={handleScrollToTop} className={styles.active} style={{ cursor: 'pointer' }}>
              Home
            </span>
          </li>
          <li><a href="/#issues">Issues</a></li>
          <li><a href="/#testimonials">Testimonials</a></li>
          <li><a href="/#map">Map</a></li>
          <li><Link to="/report">Report</Link></li>
        </ul>
        
        {user ? (
          <div className={styles.accountDropdown}>
            <button className={styles.accountBtn} onClick={toggleDropdown}>
              <i className="fas fa-user-circle"></i> {user.name} <i className="fas fa-chevron-down" style={{fontSize: '0.8rem'}}></i>
            </button>
            {isDropdownOpen && ( // Changed dropdownOpen to isDropdownOpen to match component state
              <div className={styles.dropdownContent}>
                <Link to="/profile"><i className="fas fa-id-badge"></i> Your Profile</Link>
                <a href="#settings"><i className="fas fa-cog"></i> Settings</a>
                <a href="#" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</a>
              </div>
            )}
          </div>
        ) : (
          // Original structure for non-logged-in user or if 'user' is null/undefined
          // This part is kept for completeness, assuming the user might want to handle both cases.
          // If the intention was to completely remove the old structure, this block would be removed.
          <div className={styles.accountDropdown} onMouseLeave={() => setIsDropdownOpen(false)}>
            <button className={styles.accountBtn} onClick={toggleDropdown}>
              <i className="fas fa-user-circle"></i>
              <span>Account</span>
              <i className="fas fa-chevron-down"></i>
            </button>
            
            {isDropdownOpen && (
              <div className={styles.dropdownContent}>
                <Link to="/profile">
                  <i className="fas fa-user"></i> Your Profile
                </Link>
                <Link to="/edit-profile">
                  <i className="fas fa-edit"></i> Edit Profile
                </Link>
                <a href="#logout" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
