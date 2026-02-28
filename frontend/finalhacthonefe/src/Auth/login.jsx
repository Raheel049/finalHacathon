import React, { useState } from "react";
import axios from "axios";
import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";

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
      const userObj = { email, password };
      const res = await axios.post(URL, userObj);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", res.data.data)
      alert(res.data.message || "Login successful");

        navigate("/dashboard");
      
    } catch (error) {
      alert(error.response?.data?.message || "Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-box"]}>
        {/* Tailwind Heading Fix: text size aur bold reset ho gaya tha */}
        <h2 className={`${styles["login-title"]} text-2xl font-bold text-center text-#2e7d32 mb-6`}>
          Login Page
        </h2>

        <form onSubmit={loginHandler}>
          <div className={styles["field"]}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
              /* Tailwind Input Fix: border aur focus styling reset ho gayi thi */
              className={`${styles["input-field"]} w-full p-2 border rounded focus:ring-2 focus:ring-#2e7d32 outline-none`}
            />
            {/* Tailwind Label Fix: font weight add kiya */}
            <label className={`${styles["label-text"]} font-medium`}>Email Address</label>
          </div>

          <div className={styles["field"]}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
              className={`${styles["input-field"]} w-full p-2 border rounded focus:ring-2 focus:ring-#2e7d32 outline-none`}
            />
            <label className={`${styles["label-text"]} font-medium`}>Password</label>
          </div>

          <Link to={"/signUp"} className={`${styles["link-text"]} text-sm text-white hover:underline mb-4 block`}>
            Create an Account!
          </Link>

          {/* Tailwind Button Fix: background aur hover state */}
          <button 
            type="submit" 
            disabled={loading}
            className={`${loading ? styles["btn-disabled"] : styles["submit-btn"]} w-full bg-#2e7d32 text-white py-2 rounded font-bold hover:bg-[#1a5a22] transition-colors`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <Link to={"/forgotPassword"} className={`${styles["link-text"]} text-sm text-white mt-4 block text-center`}>
            Forgot Password
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;