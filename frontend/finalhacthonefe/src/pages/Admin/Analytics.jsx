// Analytics.jsx
import React from 'react';
import { FaChartLine, FaUsers, FaUserMd, FaArrowUp } from 'react-icons/fa';
import styles from './Analytics.module.css';

const Analytics = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>System Analytics</h2>
            
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <FaUsers className={styles.icon} />
                    <div>
                        <p>Total Patients</p>
                        <h3>1,240 <span className={styles.trend}><FaArrowUp /> 12%</span></h3>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <FaUserMd className={styles.icon} />
                    <div>
                        <p>Active Doctors</p>
                        <h3>85 <span className={styles.trend}><FaArrowUp /> 5%</span></h3>
                    </div>
                </div>
            </div>

            <div className={styles.chartPlaceholder}>
                <FaChartLine size={50} />
                <p>Growth Charts will be rendered here using Recharts/Chart.js</p>
            </div>
        </div>
    );
};

export default Analytics