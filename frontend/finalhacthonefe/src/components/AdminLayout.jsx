import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AdminLayout.module.css';
import Sidebar from './AdminSidebar';


const AdminLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.sidebarWrapper}>
        <Sidebar />
      </div>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;