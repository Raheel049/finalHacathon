import React from "react";
import SuperSidebar from "../../components/SuperAdminSidebar";
import styles from "./SuperAdminDashboard.module.css";
import { FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SuperAdmin = () => {

  const navigate = useNavigate()

  const navigateTo = () => {
    navigate("/SuperAdmin/RegisterHospitals");
  }

  return (
    <div className={styles.dashboardWrapper}>
      <SuperSidebar />
      <div>
        <h1>Dashboard Overview</h1>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Total Hospitals</p>
            <span>
            <FaBuilding />
            <span className={styles.cardTotal}>25</span>
            </span>
            <p className={styles.cardbottom}>
              <span>+2</span> This month
            </p>
          </div>

          <div className={styles.card}>
            <p className={styles.cardTitle}>Total Hospitals</p>
            <span>
            <FaBuilding />
            <span className={styles.cardTotal}>25</span>
            </span>
            <p className={styles.cardbottom}>
              <span>+2</span> This month
            </p>
          </div>

          <div className={styles.card}>
            <p className={styles.cardTitle}>Total Hospitals</p>
            <span>
            <FaBuilding />
            <span className={styles.cardTotal}>25</span>
            </span>
            <p className={styles.cardbottom}>
              <span>+2</span> This month
            </p>
          </div>

          <div className={styles.card}>
            <p className={styles.cardTitle}>Total Hospitals</p>
            <span>
            <FaBuilding />
            <span className={styles.cardTotal}>25</span>
            </span>
            <p className={styles.cardbottom}>
              <span>+2</span> This month
            </p>
          </div>
        </div>

        <div className={styles.section2}>
          <div className={styles.graphCard}>
            <p>Saas Revenue Growth</p>
          </div>
          <div className={styles.hosRegisterCard}>
            <p>Quick Actions</p>
            
              <button onClick={navigateTo}>Register New Hospital</button>
              <button>Block Hospital Access</button>
              
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
