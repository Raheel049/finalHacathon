import React, { useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import PatientSidebar from './PatientSidebar';
import styles from './PatientLayout.module.css';
import { Search, Bell, User, LogOut } from 'lucide-react'; // Icons ke liye

const PatientLayout = () => {
    const navigate = useNavigate();

    // 1. Security Check: Agar token nahi hai toh login par bhejo
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    // 2. Logout Handle Function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        navigate("/login");
    };

    return (
        <div className={styles.layoutWrapper}>
            {/* Left Side: Sidebar Section */}
            <aside className={styles.sidebarSection}>
                <PatientSidebar />
            </aside>

            {/* Right Side: Main Dashboard Content */}
            <main className={styles.mainContent}>
                
                {/* Header Area */}
                <header className={styles.topHeader}>
                    <div className={styles.headerLeft}>
                        <div className={styles.searchBar}>
                            <Search size={18} className={styles.searchIcon} />
                            <input type="text" placeholder="Search reports, doctors, appointments..." />
                        </div>
                    </div>

                    <div className={styles.headerRight}>
                        {/* <button className={styles.iconBtn}>
                            <Bell size={20} />
                            <span className={styles.notificationDot}></span>
                        </button> */}

                        <div className={styles.userProfile}>
                            <div className={styles.userInfo}>
                                <span className={styles.userName}>Raheel</span>
                                <span className={styles.userRole}>Patient Portal</span>
                            </div>
                            {/* <div className={styles.avatar}>RA</div> */}
                            
                            {/* Simple Logout Button in Header */}
                            <button onClick={handleLogout} className={styles.logoutHeaderBtn} title="Logout">
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Dynamic Page Content (Dashboard, Reports, etc.) */}
                <section className={styles.pageContent}>
                    <Outlet /> 
                </section>

            </main>
        </div>
    );
};

export default PatientLayout;