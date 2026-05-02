import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import styles from "./WardDashboard.module.css";
import { Users, Clock, CheckCircle, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/sameComponent/loader";

const WardDashboard = () => {
  const [stats, setStats] = useState({ assigned: 0, waiting: 0 });
  const [waitingPatients, setWaitingPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const updatePatientRecode = location.state?.patient;

  const navigate = useNavigate();

  console.log("Updated patient record", updatePatientRecode);

  const todayPatient = async () => {
    try {
      const response = await axiosInstance.get(
        "/ward-reception/today-patients"
      );

      if (response.data.status === 200 || response.data.status === true) {
        setStats({ assigned: response.data.data });
        toast.success(response.data.message || "Today Patients Are fecthed");
      }
    } catch (error) {
      toast.error(error.message || "Some thing went wrong");
    }
  };

  const fetchWardData = async () => {
    try {
      // Farz karo humne ek 'ward/status' API banayi hai
      const res = await axiosInstance.get("/ward-reception/get-all-patients");
      console.log("res", res);
      setWaitingPatients(res.data.data);
      setDoctors(res.data.doctors);
    } catch (err) {
      toast.error(err.message || "Data not found");
    }
  };

  // API Call to fetch real-time ward data
  useEffect(() => {
    const fetchAllApisData = async () => {
      setLoading(true);

      try {
        await Promise.all([fetchWardData(), todayPatient()]);
      } catch (error) {
        toast.error(error.message || "Some thing went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAllApisData();
  }, []);

  const handleAssignDoc = (patient) => {
    navigate("/WardReceptionist/patientForm", { state: { patient, doctors } });
  };

  return (
    <main className={styles.mainContainer}>
      {/* 1. Top Welcome Section */}

      {loading && <Loader />}
      <div className={styles.welcomeHeader}>
        <h2>Welcome, Ward Receptionist Raheel</h2>
        <p>Cardiac Ward Management Portal</p>
      </div>

      {/* 2. Stats Row */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div
            className={styles.iconCircle}
            style={{ backgroundColor: "#dcfce7" }}
          >
            <Zap color="#10b981" />
          </div>
          <div>
            <h3>{stats.assigned || 0}</h3>
            <p>Assigned Today</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div
            className={styles.iconCircle}
            style={{ backgroundColor: "#dbeafe" }}
          >
            <Clock color="#3b82f6" />
          </div>
          <div>
            <h3>{stats.waiting || 0}</h3>
            <p>Currently Waiting</p>
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard Grid */}
      <div className={styles.dashboardGrid}>
        {/* Left Side: Waiting Queue */}
        <div className={styles.contentBox}>
          <div className={styles.boxHeader}>
            <Users size={20} /> <h3>Waiting Patients (Triage Queue)</h3>
          </div>
          <div className={styles.listContainer}>
            {waitingPatients.map((patient) => (
              <div key={patient._id} className={styles.listItem}>
                <div className={styles.patientAvatar}>
                  <Users size={20} color="#64748b" />
                </div>
                <div className={styles.info}>
                  <h4>{patient.name}</h4>
                  <span>
                    Token: {patient.token} | {patient.age} years
                  </span>
                </div>
                <button
                  className={styles.assignBtn}
                  onClick={() => {
                    handleAssignDoc(patient);
                  }}
                >
                  Assign Doctor
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Doctor Availability */}
        <div className={styles.contentBox}>
          <div className={styles.boxHeader}>
            <CheckCircle size={20} /> <h3>Doctor Availability & Queue</h3>
          </div>
          <div className={styles.listContainer}>
            {doctors.map((doc) => (
              <div key={doc._id} className={styles.docItem}>
                <div className={styles.docMain}>
                  <h4>{doc.name}</h4>
                  <p>{doc.specialization}</p>
                  <span className={styles.queueInfo}>
                    {doc.currentQueue || 0} in line
                  </span>
                </div>
                <span className={`${styles.statusBadge} ${styles[doc.status]}`}>
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default WardDashboard;
