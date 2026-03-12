import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import styles from './AdminDashboard.module.css';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDashboardData = async () => {
            try {
                const res = await axiosInstance.get('/admin/stats');
                setStats(res.data.data);
                setLoading(false);
            } catch (err) {
                toast.error("Dashboard API Error:", err);
                setLoading(false);
            }
        };
        getDashboardData();
    }, []);

    if (loading) return <div className={styles.loader}>Loading Dashboard...</div>;

    return (
        <>
        
        <div className={styles.dashboardWrapper}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Good Morning, Admin!</h1>
                    <p>Real-time system performance from your Node.js backend.</p>
                </header>

                <div className={styles.statsGrid}>
                    <div className={styles.card} style={{borderLeft: '5px solid #10b981'}}>
                        <span>Total Patients</span>
                        <h2>{stats?.totalPatients || 0}</h2>
                        <small className={styles.green}>+5% this month</small>
                    </div>
                    <div className={styles.card} style={{borderLeft: '5px solid #3b82f6'}}>
                        <span>Total Doctors</span>
                        <h2>{stats?.totalDoctors || 0}</h2>
                    </div>
                    <div className={styles.card} style={{borderLeft: '5px solid #f59e0b'}}>
                        <span>Monthly Appointments</span>
                        <h2>{stats?.totalAppointments || 0}</h2>
                    </div>
                    <div className={styles.card} style={{borderLeft: '5px solid #6366f1'}}>
                        <span>Revenue (Simulated)</span>
                        <h2 className={styles.blue}>${stats?.revenue || 0}</h2>
                    </div>
                </div>

                <div className={styles.chartSection}>
                    <div className={styles.mainChart}>
                        <h3>Patient Load Forecast (AI)</h3>
                        <div className={styles.placeholder}>Graph will render from Backend Data</div>
                    </div>
                    <div className={styles.sideChart}>
                        <h3>System Usage Monitor</h3>
                        <div className={styles.usageItem}>
                            <p>CPU Load: {stats?.systemInfo?.cpu || 0}%</p>
                            <div className={styles.bar}>
                                <div style={{width: `${stats?.systemInfo?.cpu || 0}%`}}></div>
                            </div>
                        </div>
                        <div className={styles.usageItem}>
                            <p>AI API Call Usage: {stats?.systemInfo?.aiUsage || 0}%</p>
                            <div className={styles.bar}>
                                <div style={{width: `${stats?.systemInfo?.aiUsage || 0}%`}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
        
    );
};

export default AdminDashboard;