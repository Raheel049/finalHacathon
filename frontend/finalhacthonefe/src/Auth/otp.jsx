import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./otp.module.css"; // CSS Module import
import { useNavigate, useLocation, Link } from "react-router-dom";

const OtpVerify = () => {
  const API = import.meta.env.VITE_API_URL;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60); // 60 seconds ka timer

  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if email is missing
  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/");
    }
  }, [location, navigate]);

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.length !== 6) {
      setError("Please enter 6 digit OTP");
      return;
    }

    const URL = `${API}/api/auth/verify`;
    setLoading(true);

    try {
      const body = {
        otp,
        email: location.state.email,
      };

      const res = await axios.post(URL, body);
      alert(res.data.message || "OTP Verified Successfully");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP or Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["otp-container"]}>
      <div className={styles["otp-box"]}>
        
        {/* Tailwind Heading Fix */}
        <h2 className="text-2xl font-bold text-#2e7d32 text-center mb-2">
          OTP Verification
        </h2>
        
        <p className="text-gray-500 text-sm text-center mb-6">
          Enter the 6 digit code sent to: <br />
          <span className="font-semibold text-gray-700">{location?.state?.email}</span>
        </p>

        <form onSubmit={verifyOtpHandler}>
          <div className="flex flex-col items-center">
            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="0 0 0 0 0 0"
              /* Tailwind Input Styling */
              className="w-full text-center tracking-[15px] text-xl font-bold p-3 border-2 rounded-lg focus:border-#2e7d32 focus:ring-2 focus:ring-#2e7d32 outline-none transition-all"
            />

            {error && (
              <p className="text-red-500 text-xs mt-2 font-medium animate-shake">
                {error}
              </p>
            )}

            {/* OTP Timer Display */}
            <div className="mt-4 text-sm text-gray-500">
              {timer > 0 ? (
                <span>Resend code in <b className="text-#2e7d32">{timer}s</b></span>
              ) : (
                <Link to="/otpReset" className="text-blue-600 font-bold hover:underline">
                  Resend OTP
                </Link>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`${loading ? 'bg-gray-400' : 'bg-#2e7d32 hover:bg-[#1a5a22]'} w-full text-white py-3 rounded-lg font-bold mt-6 transition-colors shadow-lg`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-gray-500 hover:text-#2e7d32">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;