import React, { useState } from "react";
import axios from "axios";
import styles from "./changePassword.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const API = import.meta.env.VITE_API_URL;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("q");

  const validatePassword = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  const changeHandler = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) return toast.error("All fields are required");
    if (password !== confirmPassword) return toast.error("Passwords do not match");
    if (!validatePassword(password)) {
      return toast.error("Password must include: Uppercase, Lowercase, Number & Special Char (Min 8)");
    }

    setLoading(true);
    try {
      const URL = `${API}/api/auth/change-password`;
      const res = await axios.post(URL, { password, token });
      toast.success(res.data.message || "Password changed successfully!");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.changeContainer}>
      <div className={styles.glassBox}>
        <h2 className={styles.title}>Secure Reset</h2>
        <p className={styles.subtitle}>Enter your new credentials below</p>

        <form onSubmit={changeHandler} className={styles.form}>
          <div className={styles.field}>
            <input
              type="password"
              required
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.glassInput}
            />
          </div>

          <div className={styles.field}>
            <input
              type="password"
              required
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.glassInput}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={styles.submitBtn}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;