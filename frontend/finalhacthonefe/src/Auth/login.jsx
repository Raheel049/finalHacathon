import React, { useState } from "react";
import axios from "axios";
import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const API = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const URL = `${API}/api/auth/login`;
      const res = await axios.post(URL, { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", res.data.role);

      toast.success(res.data.message || "Welcome back!");

      const role = res.data.role;

      // Role-Based Redirection
      if (role === "Admin") navigate("/Admin/AdminDashboard");
      else if (role === "Doctor") navigate("/Doctor/Doctors");
      else if (role === "Receptionist") navigate("/Receptionist/ReceptionDashboard");
      else if (role === "Patient") navigate("/Patient/Dashboard");
      else navigate("/");
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.glassBox}>
        <h2 className={styles.title}>Hospital Portal</h2>
        <p className={styles.subtitle}>Sign in to access your dashboard</p>

        <form onSubmit={loginHandler} className={styles.form}>
          <div className={styles.field}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email Address"
              className={styles.glassInput}
            />
          </div>

          <div className={styles.field}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className={styles.glassInput}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={styles.submitBtn}
          >
            {loading ? "Verifying..." : "Login"}
          </button>

          <div className={styles.authLinks}>
            <Link to="/signUp" className={styles.link}>
              New here? <span>Create Account</span>
            </Link>
            <Link to="/forgotPassword" className={styles.link}>
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;