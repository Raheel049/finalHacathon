import React, { useState } from "react";
import axios from "axios";
import styles from "./changePassword.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const ChangePassword = () => {
  const API = import.meta.env.VITE_API_URL;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("q");

  // Password validation logic: Uppercase, Lowercase, Number, Special Char
  const validatePassword = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  const changeHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must include: Uppercase, Lowercase, Number & Special Char (Min 8)");
      return;
    }

    setLoading(true);
    try {
      const URL = `${API}/api/auth/change-password`;
      const body = { password, token };

      const res = await axios.post(URL, body);
      setSuccess(res.data.message || "Password changed successfully!");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["change-container"]}>
      <div className={styles["change-box"]}>
        {/* Tailwind Heading: Using your defined theme color */}
        <h2 className="text-2xl font-bold text-uni-green text-center mb-2">
          Change Password
        </h2>
        <p className="text-gray-500 text-sm text-center mb-8">
          Enter your new credentials below
        </p>

        <form onSubmit={changeHandler}>
          <div className={styles["field"]}>
            <input
              type="password"
              required
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles["input-field"]} w-full p-2 border rounded focus:ring-2 focus:ring-uni-green outline-none transition-all`}
            />
            <label className={`${styles["label-text"]} font-medium text-gray-600`}>
              New Password
            </label>
          </div>

          <div className={styles["field"]}>
            <input
              type="password"
              required
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${styles["input-field"]} w-full p-2 border rounded focus:ring-2 focus:ring-uni-green outline-none transition-all`}
            />
            <label className={`${styles["label-text"]} font-medium text-gray-600`}>
              Confirm Password
            </label>
          </div>

          {error && <p className="text-red-500 text-xs mt-2 font-semibold text-center">{error}</p>}
          {success && <p className="text-uni-green text-xs mt-2 font-semibold text-center">{success}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className={`${loading ? 'bg-gray-400' : 'bg-uni-green hover:bg-green-800'} w-full text-white py-3 rounded-lg font-bold mt-6 shadow-md transition-all uppercase tracking-wider`}
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;