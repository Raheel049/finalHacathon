import React, { useState } from "react";
import axios from "axios";
import styles from "./otpReset.module.css"; // Module import
import { useNavigate, Link } from "react-router-dom";

const OtpReset = () => {
  const API = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const sendOtpHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    try {
      const URL = `${API}/api/auth/reset-otp`;
      const res = await axios.post(URL, { email });

      setSuccess(res.data.message || "OTP sent successfully!");

      // User ko wapas OTP page par bhej dena email state ke sath
      setTimeout(() => {
        navigate("/otp", {
          state: { email }
        });
      }, 1500); // 1.5s delay taake user success message dekh sakay

    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["reset-container"]}>
      <div className={styles["reset-box"]}>
        
        {/* Tailwind Heading: Clean Theme Classes */}
        <h2 className="text-2xl font-bold text-uni-green text-center mb-2">
          Resend OTP
        </h2>
        <p className="text-gray-500 text-sm text-center mb-8">
          Enter your registered email to receive a new code
        </p>

        <form onSubmit={sendOtpHandler}>
          <div className={styles["field"]}>
            <input
              type="email"
              required
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              /* Tailwind Input Styling */
              className={`${styles["input-field"]} w-full p-2 border rounded focus:ring-2 focus:ring-uni-green outline-none transition-all`}
            />
            <label className={`${styles["label-text"]} font-medium text-gray-600`}>
              Email Address
            </label>
          </div>

          {/* Feedback Messages */}
          {error && <p className="text-red-500 text-xs mt-2 font-semibold text-center">{error}</p>}
          {success && <p className="text-uni-green text-xs mt-2 font-semibold text-center">{success}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className={`${loading ? 'bg-gray-400' : 'bg-uni-green hover:bg-green-800'} w-full text-white py-3 rounded-lg font-bold mt-6 shadow-md transition-all uppercase tracking-wider`}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-gray-500 hover:text-uni-blue transition-colors">
              Remembered your code? <span className="font-bold underline">Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpReset;