import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, CalendarDays, Users, ClipboardList } from 'lucide-react';
import styles from './ReceptionDashboard.module.css';

const ReceptionDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Receptionist Desk</h1>
                <p>Welcome back! Manage patient registrations and schedules here.</p>
            </header>

            {/* QUICK ACTIONS CARDS */}
            <div className={styles.actionsGrid}>
                <div className={styles.actionCard} onClick={() => navigate('/reception/add-patient')}>
                    <UserPlus size={40} color="#10b981" />
                    <h3>Add Patient</h3>
                    <p>Register a new patient into the system</p>
                </div>
                
                <div className={styles.actionCard} onClick={() => navigate('/reception/appointments')}>
                    <CalendarDays size={40} color="#3b82f6" />
                    <h3>Book Appointment</h3>
                    <p>Schedule a doctor's visit for a patient</p>
                </div>

                <div className={styles.actionCard}>
                    <Users size={40} color="#6366f1" />
                    <h3>Patients List</h3>
                    <p>View and manage all registered patients</p>
                </div>

                <div className={styles.actionCard}>
                    <ClipboardList size={40} color="#f59e0b" />
                    <h3>Daily Log</h3>
                    <p>Check all activities for today</p>
                </div>
            </div>

            {/* RECENT ACTIVITY SECTION */}
            <div className={styles.recentSection}>
                <h3>Recently Registered Patients</h3>
                <div className={styles.placeholderTable}>
                    [ Real-time Table with API Data will come here ]
                </div>
            </div>
        </div>
    );
};

export default ReceptionDashboard;