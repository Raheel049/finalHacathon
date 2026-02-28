import React, { useState } from "react";
import styles from "./signUp.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Password Validation Logic
  const handlePasswordChange = (val) => {
    setPassword(val);
    
    // Regex: Min 8 chars, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!val) {
      setPasswordError("");
    } else if (!passwordRegex.test(val)) {
      setPasswordError("Password must have: 8+ chars, Uppercase, Lowercase, Number & Special Character");
    } else {
      setPasswordError("");
    }
  };

  const SignUpHandler = async () => {
    // Agar password error hai to submit na hone den
    if (passwordError || !password) {
      alert("Please enter a valid password first!");
      return;
    }

    const API = import.meta.env.VITE_API_URL;
    setLoading(true);

    const userObj = { name, phoneNumber, email, password };
    const URL = `${API}/api/auth/sign-up`;

    try {
      const res = await axios.post(URL, userObj);
      alert(res.data.message || "SignUp Successful!");
      console.log(res.data.data.status)
      console.log(res.data)
      console.log(res.data.status)

      // OTP page par email le kar jana taake wahan verify ho sakay
      if(res.data.status == true){
      navigate("/otp", { state: { email } });

      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Server error occurred");
      } else {
        alert("Error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["signup-container"]}>
      <div className={styles["signup-box"]}>
        
        {/* Tailwind Heading Fix */}
        <h2 className={`${styles["signup-title"]} text-2xl font-bold text-#2e7d32 text-center mb-6`}>
          Student SignUp
        </h2>

        {/* Full Name */}
        <div className={styles["field"]}>
          <input
            type="text"
            id="name"
            required
            placeholder=" "
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={`${styles["input-field"]} w-full p-2 border rounded focus:ring-2 focus:ring-#2e7d32 outline-none`}
          />
          <label htmlFor="name" className={`${styles["label-text"]} font-medium`}>Full Name</label>
        </div>

        {/* Phone Number */}
        <div className={styles["field"]}>
          <input
            type="text"
            id="phone"
            required
            placeholder=" "
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            className={`${styles["input-field"]} w-full p-2 border rounded focus:ring-2 focus:ring-#2e7d32 outline-none`}
          />
          <label htmlFor="phone" className={`${styles["label-text"]} font-medium`}>Phone Number</label>
        </div>

        {/* Email Address */}
        <div className={styles["field"]}>
          <input
            type="email"
            id="email"
            required
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className={`${styles["input-field"]} w-full p-2 border rounded focus:ring-2 focus:ring-#2e7d32 outline-none`}
          />
          <label htmlFor="email" className={`${styles["label-text"]} font-medium`}>Email Address</label>
        </div>

        {/* Password with Validation Error */}
        <div className={styles["field"]}>
          <input
            type="password"
            id="password"
            required
            placeholder=" "
            onChange={(e) => handlePasswordChange(e.target.value)}
            value={password}
            className={`${styles["input-field"]} w-full p-2 border rounded outline-none focus:ring-2 ${passwordError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-#2e7d32'}`}
          />
          <label htmlFor="password" className={`${styles["label-text"]} font-medium`}>Password</label>
          
          {/* Real-time Error Message */}
          {passwordError && (
            <p className="text-red-500 text-[10px] mt-1 font-semibold leading-tight">
              {passwordError}
            </p>
          )}
        </div>

        <Link to={"/"} className="text-sm text-white hover:underline mb-4 block">
          Have an already Account?
        </Link>

        {/* SignUp Button */}
        <button 
          onClick={SignUpHandler} 
          disabled={loading || passwordError}
          className={`${loading || passwordError ? 'bg-gray-400 cursor-not-allowed' : 'bg-#2e7d32 hover:bg-[#1a5a22]'} w-full text-white py-2 rounded font-bold transition-colors`}
        >
          {loading ? "Signing Up..." : "SignUp"}
        </button>
      </div>
    </div>
  );
};

export default SignUp;