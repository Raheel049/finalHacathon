import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SuperSidebar from "./SuperAdminSidebar";
import styles from "./SuperAdminLayout.module.css";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";

const SuperAdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.layoutWrapper}>
      {/* 1. Mobile Top Navbar (768px se niche dikhega) */}
      <header className={styles.mobileHeader}>
        <div className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>
          <FaBars />
        </div>
        <div className={styles.mobileLogo}>
          HMS <span>CONTROL</span>
        </div>
        <div className={styles.headerIcons}>
          <FaBell />
          <FaUserCircle size={22} />
        </div>
      </header>

      {/* 2. Sidebar Component */}
      <SuperSidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

      {/* 3. Main Content Area */}
      <main className={`${styles.mainContent} ${isSidebarOpen ? styles.contentShift : ""}`}>
        <div className={styles.container}>
          {/* Outlet ka matlab hai ke jo bhi route hoga (Dashboard, Hospitals) wo yahan render hoga */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SuperAdminLayout;                 