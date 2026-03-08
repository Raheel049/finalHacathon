import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import DoctorSidebar from './DoctorSidebar';
import styles from './DoctorLayout.module.css';
import { Stethoscope, LogOut, User, Bell } from 'lucide-react';

const DoctorLayout = () => {
    const navigate = useNavigate();

    // Security Check: Token aur Role (Doctor) check karein
    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("userRole");
        
        if (!token || role !== "Doctor") {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        navigate("/login");
    };

    return (
        <div className={styles.layoutContainer}>
            {/* Sidebar Section */}
            <aside className={styles.sidebarWrapper}>
                <DoctorSidebar />
            </aside>

            {/* Main Content Wrapper */}
            <div className={styles.mainWrapper}>
                
                {/* Doctor Specific Header */}
                <header className={styles.doctorHeader}>
                    <div className={styles.headerLeft}>
                        <Stethoscope className={styles.medIcon} size={24} />
                        <div className={styles.headerText}>
                            <h3>Doctor Portal</h3>
                            <p>Good Morning, Dr. Raheel</p>
                        </div>
                    </div>

                    <div className={styles.headerRight}>
                        <button className={styles.notifyBtn}>
                            <Bell size={20} />
                            <span className={styles.badge}>3</span>
                        </button>

                        <div className={styles.profileSection}>
                            <div className={styles.avatar}>DR</div>
                            <button onClick={handleLogout} className={styles.logoutBtn}>
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content Area */}
                <main className={styles.pageBody}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DoctorLayout;