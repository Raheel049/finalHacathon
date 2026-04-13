import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaBell, FaUserCircle } from "react-icons/fa"; 
import { LuLayoutDashboard, LuLogOut, LuHospital, LuUserCheck, LuCreditCard, LuSettings } from "react-icons/lu";
import styles from "./SuperAdminSidebar.module.css";

const SuperSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <>
      {/* --- 1. Top Horizontal Nav (Sirf 768px se niche dikhegi) --- */}
      <div className={styles.topNavbar}>
        <div className={styles.menuIcon} onClick={toggleNav}>
          <FaBars />
        </div>
        <div className={styles.mobileLogo}>
          HMS <span>CONTROL</span>
        </div>
        <div className={styles.mobileIcons}>
          <FaBell className={styles.navIcon} />
          <FaUserCircle className={styles.navIcon} />
        </div>
      </div>

      {/* --- 2. Overlay --- */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.showOverlay : ""}`} 
        onClick={() => setIsOpen(false)}
      ></div>

      {/* --- 3. Sidebar (Main) --- */}
      <div className={`${styles.sidebar} ${isOpen ? styles.activeSidebar : ""}`}>
        <div className={styles.logo}>
          <div className={styles.iconBox}>H</div>
          <div className={styles.logoText}>
            HMS<span>CONTROL</span>
            <small>Super Admin Panel</small>
          </div>
          {/* Mobile Close Icon */}
          <FaTimes className={styles.mobileCloseIcon} onClick={toggleNav} />
        </div>

        <nav className={styles.nav}>
          <NavLink 
            to="/SuperAdmin/SuperAdminDashboard" 
            className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link} 
            onClick={() => setIsOpen(false)}
          >
            <LuLayoutDashboard size={20} /> <span>Dashboard</span>
          </NavLink>

          <NavLink 
            to="/SuperAdmin/RegisterHospitals" 
            className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link} 
            onClick={() => setIsOpen(false)}
          >
            <LuHospital size={20} /> <span>Hospitals</span>
          </NavLink>

          <NavLink 
            to="/SuperAdmin/Owners" 
            className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link} 
            onClick={() => setIsOpen(false)}
          >
            <LuUserCheck size={20} /> <span>Owners</span>
          </NavLink>

          <NavLink 
            to="/super-admin/subscriptions" 
            className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link} 
            onClick={() => setIsOpen(false)}
          >
            <LuCreditCard size={20} /> <span>Subscription</span>
          </NavLink>

          <NavLink 
            to="/super-admin/settings" 
            className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link} 
            onClick={() => setIsOpen(false)}
          >
            <LuSettings size={20} /> <span>Settings</span>
          </NavLink>
        </nav>

        <div className={styles.footer}>
          <button className={styles.logoutBtn}>
            <LuLogOut size={20} /> <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SuperSidebar;