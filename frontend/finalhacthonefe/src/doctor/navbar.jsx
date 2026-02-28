import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './navbar.module.css';

const DoctorNavbar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Appointments', path: '/doctor/dashboard' },
    { name: 'Patient History', path: '/doctor/patients' },
    { name: 'AI Insights', path: '/doctor/ai-stats' },
    { name: 'My Schedule', path: '/doctor/schedule' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        🩺 Clinic<span>SaaS</span>
      </div>

      <div className={styles.navLinks}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className={styles.rightSection}>
        <div className={styles.doctorProfile}>
          <div className={styles.statusDot}></div>
          <span style={{fontSize: '13px', fontWeight: '600', color: '#1e293b'}}>
            Dr. Sarah Khan
          </span>
        </div>
        <button className={styles.logoutBtn}>Logout</button>
      </div>
    </nav>
  );
};

export default DoctorNavbar;