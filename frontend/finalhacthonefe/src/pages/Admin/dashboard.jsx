import React from 'react';
import styles from './dashboard.module.css';
import Navbar from './navbar';

const AdminDashboard = () => {
  // Dummy Data as per Hackathon Requirements
  const systemStats = [
    { label: 'Total Doctors', value: '12' },
    { label: 'Total Patients', value: '1,240' },
    { label: 'Active Subscriptions', value: '85' },
    { label: 'Monthly Revenue', value: '$4,200' }
  ];

  const recentUsers = [
    { name: 'Dr. Kashif Ali', role: 'Doctor', status: 'Active' },
    { name: 'Sana Khan', role: 'Receptionist', status: 'Active' },
    { name: 'Dr. Junaid', role: 'Doctor', status: 'On Leave' },
  ];

  return (
    <>
    <div>
    <Navbar />

    </div>
    <div className={styles.container}>
      {/* Sidebar logic yahan aa sakti hai */}
      
      <main className={styles.mainContent}>
        {/* Header with SaaS Info */}
        <header className={styles.header}>
          <div>
            <h1>Admin Control Center</h1>
            <p>Clinic SaaS Management Dashboard</p>
          </div>
          <div className={styles.saasBadge}>PRO PLAN ENABLED</div>
        </header>

        {/* 1. Analytics Cards */}
        <div className={styles.statsGrid}>
          {systemStats.map((stat, i) => (
            <div key={i} className={styles.card}>
              <span className={styles.cardTitle}>{stat.label}</span>
              <span className={styles.cardValue}>{stat.value}</span>
            </div>
          ))}
        </div>

        <div className={styles.gridSection}>
          {/* 2. User/Role Management Section */}
          <div className={styles.panel}>
            <h3>Staff & Doctors Management</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user, i) => (
                  <tr key={i}>
                    <td>{user.name}</td>
                    <td><span className={styles.roleBadge}>{user.role}</span></td>
                    <td style={{color: user.status === 'Active' ? 'green' : 'orange'}}>{user.status}</td>
                    <td><button style={{color: 'blue', cursor: 'pointer'}}>Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 3. AI & System Health (Description Requirement) */}
          <div className={styles.panel}>
            <h3>AI System Status</h3>
            <div style={{marginTop: '15px'}}>
              <div style={{marginBottom: '15px', padding: '10px', background: '#f0fdf4', borderRadius: '8px'}}>
                <p style={{fontSize: '12px', fontWeight: 'bold', color: '#166534'}}>Symptom Checker: ONLINE</p>
                <p style={{fontSize: '11px', color: '#166534'}}>Accuracy Rate: 94%</p>
              </div>
              <div style={{padding: '10px', background: '#fff7ed', borderRadius: '8px'}}>
                <p style={{fontSize: '12px', fontWeight: 'bold', color: '#9a3412'}}>Risk Flagging: ACTIVE</p>
                <p style={{fontSize: '11px', color: '#9a3412'}}>Flagged Cases today: 05</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default AdminDashboard;