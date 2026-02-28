import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './navbar.module.css';


const Navbar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin-dashboard' },
    { name: 'Manage Doctors', path: '/doctors' },
    { name: 'Manage Receptionists', path: '/receptionists' },
    { name: 'Doctors', path: '/doctor' },
    { name: 'Subscription Plans', path: '/admin/subscriptions' },
    { name: 'System Usage', path: '/admin/usage' },
  ];

  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>
        Clinic<span style={{color: 'white'}}>SaaS</span>
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

      <div className={styles.footer}>
        <button className={styles.logoutBtn}>Sign Out</button>
      </div>
    </nav>
  );
};

export default Navbar;