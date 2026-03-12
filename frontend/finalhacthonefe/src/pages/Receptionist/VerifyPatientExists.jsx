import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import styles from "./VerifyPatientExists.module.css";

const VerifyPatientExists = ({ onPatientFound }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const findPatient = async () => {
    if (!email) return toast.error("Enter patient email Address");
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/reception/verify-patient?email=${email.trim()}`);
      if (res.data.success) {
        onPatientFound(res.data.data);
        toast.success("Patient found");
      }
    } catch (error) {
      onPatientFound(null); // Manager redirect handle karega
      toast.error("error",error.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.glassCard}>
      <h3 className={styles.title}>Email Verification</h3>
      <div className={styles.inputGroup}>
        <input
          type="email"
          className={styles.glassInput}
          placeholder="Enter patient email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className={styles.glassBtn} onClick={findPatient} disabled={loading}>
          {loading ? "Checking..." : "Verify Patient"}
        </button>
      </div>
    </div>
  );
};

export default VerifyPatientExists;