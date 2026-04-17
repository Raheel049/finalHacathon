import React, { useEffect, useState } from "react";
import SuperSidebar from "../../components/SuperAdminSidebar";
import styles from "./SuperAdminDashboard.module.css";
import { FaBuilding } from "react-icons/fa";
import { LuCreditCard, LuHeartPulse, LuDollarSign } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const SuperAdmin = () => {

  const [cardStatus, setCardStatus] = useState([])

  const navigate = useNavigate()

  const navigateTo = () => {
    navigate("/SuperAdmin/RegisterHospitals");
  }

  const dashboardStats = async () => {
    try {
      const res = await axiosInstance.get("/super-admin/owner-stats");
      console.log("res",res.data.data)
      setCardStatus(res.data.data)
    } catch (error) {
      console.log("error",error.message)
    }
  }

  useEffect(() => {
    dashboardStats()
  },[])

  return (
    <div className={styles.dashboardWrapper}>
      <SuperSidebar />
      <div>

        <h1>Dashboard Overview</h1>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <p className={styles.cardTitle}>TOTAL HOSPITAL</p>
            <span>
            <FaBuilding className={styles.sectionOneStatsIcons}/>
            <span className={styles.cardTotal}>{cardStatus.totalOwners}</span>
            </span>
            <p className={styles.cardBottom}>
              <span>+2</span> This month
            </p>
          </div>

          <div className={styles.card}>
            <p className={styles.cardTitle}>ACTIVE SUBSCRIPTIONS</p>
            <span>
            <LuCreditCard className={styles.sectionOneStatsIcons}/>
            <span className={styles.cardTotal}>{cardStatus.active}</span>
            </span>
            <p className={styles.cardBottom}>
              <span>+2</span> High Retantion
            </p>
          </div>

          <div className={styles.card}>
            <p className={styles.cardTitle}>TOTAL PATIENTS</p>
            <span>
            <LuHeartPulse className={styles.sectionOneStatsIcons}/>
            <span className={styles.cardTotal}>25</span>
            </span>
            <p className={styles.cardBottom}>
              <span>+2</span> Data across all managed hospitals
            </p>
          </div>

          <div className={styles.card}>
            <p className={styles.cardTitle}>RECENT PAYMENTS</p>
            <span>
            <LuDollarSign className={styles.sectionOneStatsIcons}/>
            <span className={styles.cardTotal}>25</span>
            </span>
            <p className={styles.cardBottom}>
              <span>+2</span> Showing revenue
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
