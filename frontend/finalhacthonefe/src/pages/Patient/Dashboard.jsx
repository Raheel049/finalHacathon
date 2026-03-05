import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import styles from './Dashboard.module.css';

const PatientDashboard = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const res = await axiosInstance.get('/patient/profile'); // Backend API
        setPatientData(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data", err);
        setLoading(false);
      }
    };
    fetchPatientData();
  }, []);

  if (loading) return <div className={styles.loader}>Shining Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.welcomeText}>Welcome, <span>{patientData?.name}</span></h1>

      <div className={styles.statsGrid}>
        {/* Dynamic Cards */}
        <div className={`${styles.card} ${styles.green}`}>
          <div className={styles.shimmer}></div>
          <h3>{patientData?.medicalHistory?.bloodGroup || 'N/A'}</h3>
          <span>Blood Group</span>
        </div>

        <div className={`${styles.card} ${styles.red}`}>
          <div className={styles.shimmer}></div>
          <h3>Rs. {patientData?.billing?.filter(b => b.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0)}</h3>
          <span>Total Pending Bills</span>
        </div>
      </div>

      <div className={styles.sectionCard}>
        <h3>Your Medical Reports</h3>
        {patientData?.reports?.length > 0 ? (
          patientData.reports.map((report, i) => (
            <div key={i} className={styles.reportItem}>
               <p>{report.reportName}</p>
               <a href={report.fileUrl} target="_blank" className={styles.viewBtn}>Download</a>
            </div>
          ))
        ) : (
          <p>No reports found.</p>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;