import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { authService } from '../services/api';
import styles from './Login.module.css';

const Login = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const navigate = useNavigate();

  // Authentication states
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorStatus, setErrorStatus] = useState('');

  const handleRegisterClick = () => {
    setIsSignUpActive(true);
    setErrorStatus('');
  };
  
  const handleLoginClick = () => {
    setIsSignUpActive(false);
    setErrorStatus('');
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register(formData.name, formData.email, formData.password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (error) {
      setErrorStatus(error.response?.data?.error || 'Registration failed');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(formData.email, formData.password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (error) {
      setErrorStatus(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className={styles.loginPage}>
      <Navbar />
      
      <div className={`${styles.container} ${isSignUpActive ? styles.active : ''}`}>
        
        {/* Sign Up Form */}
        <div className={`${styles.formContainer} ${styles.signUp}`}>
          <form onSubmit={handleRegisterSubmit}>
            <h1>Create Account</h1>
            <div className={styles.socialIcons}>
              <a href="#google" className={styles.icon}><i className="fa-brands fa-google"></i></a>
              <a href="#github" className={styles.icon}><i className="fa-brands fa-github"></i></a>
            </div>
            <span>or use your email for registration</span>
            {errorStatus && isSignUpActive && <p style={{color: 'red', margin: '5px 0'}}>{errorStatus}</p>}
            <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleInputChange} />
            <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleInputChange} />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`${styles.formContainer} ${styles.signIn}`}>
          <form onSubmit={handleLoginSubmit}>
            <h1>Sign In</h1>
            <div className={styles.socialIcons}>
              <a href="#google" className={styles.icon}><i className="fa-brands fa-google"></i></a>
              <a href="#github" className={styles.icon}><i className="fa-brands fa-github"></i></a>
            </div>
            <span>or use your email password</span>
            {errorStatus && !isSignUpActive && <p style={{color: 'red', margin: '5px 0'}}>{errorStatus}</p>}
            <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleInputChange} />
            <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleInputChange} />
            <a href="#forgot" className={styles.forgotLink}>Forgot Your Password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        
        {/* Toggle Overlays */}
        <div className={styles.toggleContainer}>
          <div className={styles.toggle}>
            
            <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of the site features</p>
              <button 
                type="button" 
                className={styles.hidden} 
                onClick={handleLoginClick}
              >
                Sign In
              </button>
            </div>
            
            <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
              <h1>Hello Friend!</h1>
              <p>Register with your personal details to use all of the site features</p>
              <button 
                type="button" 
                className={styles.hidden} 
                onClick={handleRegisterClick}
              >
                Sign Up
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
