import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import styles from './Doctors.module.css';
import { Plus, MoreHorizontal, UserCheck, Activity, Users, Clock } from 'lucide-react';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await axiosInstance.get('/admin/doctors');
                setDoctors(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching doctors", err);
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    return (
        <div className={styles.container}>
            {/* Header Section */}
            <div className={styles.header}>
                <h2>Manage Doctors</h2>
                <button className={styles.registerBtn}>
                    <Plus size={18} /> Register New Doctor
                </button>
            </div>

            {/* Top Cards (Stats) */}
            <div className={styles.topCards}>
                <div className={styles.statCard}>
                    <div className={styles.cardInfo}>
                        <span>Doctor Specialty</span>
                        <h3>Breakdown</h3>
                    </div>
                    <div className={styles.chartPlaceholder}>[ Doughnut Chart ]</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.cardInfo}>
                        <span>Monthly Appts</span>
                        <h3>Volume</h3>
                    </div>
                    <div className={styles.chartPlaceholder}>[ Bar Chart ]</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.cardInfo}>
                        <span>Total Registered</span>
                        <h3>15</h3>
                    </div>
                    <Users color="#3b82f6" />
                </div>
                <div className={styles.statCard}>
                    <div className={styles.cardInfo}>
                        <span>Availability</span>
                        <h3>Status</h3>
                    </div>
                    <div className={styles.chartPlaceholder}>[ Pie Chart ]</div>
                </div>
            </div>

            {/* Main Content: Table & Ranking */}
            <div className={styles.mainGrid}>
                <div className={styles.tableSection}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th><input type="checkbox" /></th>
                                <th>Doctor Name</th>
                                <th>Contact Info</th>
                                <th>Phone</th>
                                <th>Patient Load</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doc, index) => (
                                <tr key={doc._id} style={{ animationDelay: `${index * 0.1}s` }}>
                                    <td><input type="checkbox" /></td>
                                    <td className={styles.nameCell}>
                                        <img src={doc.image || 'https://via.placeholder.com/40'} alt="doc" />
                                        <div>
                                            <p>{doc.name}</p>
                                            <span>{doc.specialization}</span>
                                        </div>
                                    </td>
                                    <td>{doc.email}</td>
                                    <td>{doc.phone || '(401) 356-7923'}</td>
                                    <td>
                                        <p>{doc.patientLoad || 450}</p>
                                        <span>Current month</span>
                                    </td>
                                    <td><MoreHorizontal size={20} className={styles.moreIcon} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={styles.rankingCard}>
                    <h3>Doctor Performance Rankings</h3>
                    <p>Leader-board based on reviews</p>
                    <div className={styles.rankList}>
                        {doctors.slice(0, 4).map((doc, i) => (
                            <div key={i} className={styles.rankItem}>
                                <span>{i + 1}</span>
                                <img src={doc.image} alt="rank" />
                                <div>
                                    <p>{doc.name}</p>
                                    <span>{doc.specialization}</span>
                                </div>
                                <strong>{80 - (i * 10)}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Doctors;