import React, { useState } from 'react';
import styles from './doctor.module.css';
import DoctorNavbar from './navbar';

const DoctorDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");

  const appointments = [
    { id: 1, name: "Zain Ahmed", age: 24, history: "Asthma since 2021", lastVisit: "2 weeks ago" },
    { id: 2, name: "Sara Khan", age: 30, history: "No major history", lastVisit: "New Patient" },
  ];

  // AI Logic (Simulation for Hackathon)
  const getAiHelp = () => {
    if (!diagnosis) return alert("Pehle symptoms likhen!");
    // Simulation: AI analyze kar raha hai
    setAiSuggestion(`Based on symptoms: Possible High Risk of Viral Infection. Suggested Test: CBC, Chest X-Ray. Tip: Increase hydration.`);
  };

  return (
    <div>
      <div>
        <DoctorNavbar />
      </div>
      <div className={styles.container}>
      {/* 1. Analytics Header */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}><h3>12</h3><p>Appointments Today</p></div>
        <div className={styles.statCard} style={{borderColor: '#10b981'}}><h3>08</h3><p>Completed</p></div>
        <div className={styles.statCard} style={{borderColor: '#f59e0b'}}><h3>04</h3><p>Pending</p></div>
      </div>

      <div className={styles.mainGrid}>
        {/* 2. Appointments List */}
        <div className={styles.listPanel}>
          <h3 className="mb-4 font-bold text-slate-700 text-lg">Today's Appointments</h3>
          {appointments.map(p => (
            <div 
              key={p.id} 
              className={`${styles.patientItem} ${selectedPatient?.id === p.id ? styles.activePatient : ''}`}
              onClick={() => setSelectedPatient(p)}
            >
              <p className="font-bold">{p.name}</p>
              <p className="text-xs text-slate-500">Age: {p.age} | {p.lastVisit}</p>
            </div>
          ))}
        </div>

        {/* 3. Patient Detail & Diagnosis (Middle/Right Section) */}
        {selectedPatient ? (
          <div className={styles.detailPanel}>
            <div className="flex justify-between border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-blue-900">{selectedPatient.name}</h2>
              <span className="text-slate-500 font-medium">History: {selectedPatient.history}</span>
            </div>

            <div className="mb-6">
              <label className="font-bold text-slate-700">Diagnosis & Symptoms</label>
              <textarea 
                className={`${styles.inputField} ${styles.prescriptionArea}`}
                placeholder="Enter patient symptoms and diagnosis here..."
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
              />
            </div>

            {/* AI Assistant Section */}
            <div className={styles.aiBox}>
              <span className={styles.aiTag}>AI MEDICAL ASSISTANT</span>
              {aiSuggestion ? (
                <p className="text-sm text-slate-700 italic">" {aiSuggestion} "</p>
              ) : (
                <p className="text-sm text-slate-500">Click below to get AI-powered diagnosis help.</p>
              )}
              <button onClick={getAiHelp} className="mt-3 text-sm text-blue-600 font-bold hover:underline cursor-pointer">
                + Generate AI Insights
              </button>
            </div>

            <div className="mt-6">
              <label className="font-bold text-slate-700">Prescription (Medicines)</label>
              <textarea 
                className={`${styles.inputField} ${styles.prescriptionArea}`}
                placeholder="1. Panadol 500mg (2 times a day)..."
              />
            </div>

            <button className={styles.btnPrimary}>Save & Print Prescription (PDF)</button>
          </div>
        ) : (
          <div className="flex items-center justify-center bg-white rounded-xl text-slate-400">
            <p>Select a patient to start diagnosis</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default DoctorDashboard;