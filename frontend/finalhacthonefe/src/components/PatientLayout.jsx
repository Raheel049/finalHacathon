import React from 'react';
import { Outlet } from 'react-router-dom';
import PatientSidebar from './PatientSidebar';
import styles from './PatientLayout.module.css';

const PatientLayout = () => {
    return (
        <div className={styles.layoutWrapper}>
            {/* Sidebar Fix rahega */}
            <div className={styles.sidebarSection}>
                <PatientSidebar />
            </div>

            {/* Main Content Area */}
            <main className={styles.mainContent}>
                <header className={styles.topHeader}>
                    <div className={styles.searchBar}>
                        <input type="text" placeholder="Search reports, doctors..." />
                    </div>
                    <div className={styles.userProfile}>
                        <span>Patient Portal</span>
                        <div className={styles.miniAvatar}>RA</div>
                    </div>
                </header>

                <div className={styles.pageContent}>
                    <Outlet /> {/* Yahan Dashboard, Reports, Billing load honge */}
                </div>
            </main>
        </div>
    );
};

export default PatientLayout;