import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerifyPatientExists from "./VerifyPatientExists";
import PatientAppoinment from "./PatientAppointment";
import styles from "./PatientAppointmentManager.module.css";
import toast from "react-hot-toast";

const PatientAppointmentManager = () => {
  const [step, setStep] = useState(1);
  const [existingPatient, setExistingPatient] = useState(null);
  const navigate = useNavigate();

  const handlePatientFound = (data) => {
    if (data) {
      setExistingPatient(data);
      setStep(2);
    } else {
      toast.error("Patient not found.Register first");
      setTimeout(() => navigate("/Receptionist/AddPatient"), 1500);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Hospital Appointment System</h1>
        <p>Step {step}: {step === 1 ? "Verify" : "Book"}</p>
      </div>
      {step === 1 ? (
        <VerifyPatientExists onPatientFound={handlePatientFound} />
      ) : (
        <PatientAppoinment initialData={existingPatient} resetStep={() => setStep(1)} />
      )}
    </div>
  );
};

export default PatientAppointmentManager;