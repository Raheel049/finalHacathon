import React, { useState } from "react";
import styles from "./RegisterHospital.module.css";
import {
  LuHospital,
  LuUser,
  LuMail,
  LuPhone,
  LuMapPin,
  LuLock,
  LuShieldCheck,
  LuCrown,
  LuZap,
} from "react-icons/lu";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const RegisterHospital = () => {
  const [formData, setFormData] = useState({
    hospitalName: "",
    address: "",
    contact: "",
    ownerName: "",
    ownerEmail: "",
    password: "",
    plane: "Basic",
    ownerPhone: "",
    role: "Admin"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/super-admin/register-hospital",
        formData
      );

      // Backend status boolean true bhej raha hai
      if (response.data.status === true || response.status === 201) {
        toast.success(response.data.message || "Hospital Registered Successfully!");

        // State reset (Is se saari fields khali ho jayengi kyunke humne value bind ki hai)
        setFormData({
          hospitalName: "",
          address: "",
          contact: "",
          ownerName: "",
          ownerEmail: "",
          password: "",
          plane: "Basic",
          ownerPhone: "",
        });
      }
    } catch (error) {
      // Professional error handling
      const errorMsg = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMsg);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formHeader}>
        <h2>Register New Hospital</h2>
        <p>Create a new hospital instance and admin account.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.formGrid}>
        {/* Section 1: Hospital Details */}
        <div className={styles.section}>
          <h3><LuHospital /> Hospital Details</h3>
          
          <div className={styles.inputGroup}>
            <label>Hospital Name</label>
            <input
              type="text"
              name="hospitalName"
              value={formData.hospitalName} // Binded
              placeholder="e.g. City Care"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Full Address</label>
            <div className={styles.inputWrapper}>
              <LuMapPin className={styles.icon} />
              <input
                type="text"
                name="address"
                value={formData.address} // Binded
                placeholder="Street, City..."
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Owner Phone</label>
            <div className={styles.inputWrapper}>
              <LuPhone className={styles.icon} />
              <input
                type="text"
                name="ownerPhone"
                value={formData.ownerPhone} // Binded
                placeholder="Owner Mobile"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Official Contact</label>
            <div className={styles.inputWrapper}>
              <LuPhone className={styles.icon} />
              <input
                type="text"
                name="contact"
                value={formData.contact} // Binded
                placeholder="Hospital Phone"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Section 2: Owner Details */}
        <div className={styles.section}>
          <h3><LuUser /> Owner Account</h3>

          <div className={styles.inputGroup}>
            <label>Owner Name</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName} // Binded
              placeholder="Dr. Bilal"
              onChange={handleChange}
              required
            />
          </div>

          

          <div className={styles.inputGroup}>
            <label>Owner Email (Login ID)</label>
            <div className={styles.inputWrapper}>
              <LuMail className={styles.icon} />
              <input
                type="email"
                name="ownerEmail"
                value={formData.ownerEmail} // Binded
                placeholder="owner@email.com"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Set Password</label>
            <div className={styles.inputWrapper}>
              <LuLock className={styles.icon} />
              <input
                type="password"
                name="password"
                value={formData.password} // Binded
                placeholder="******"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Select Plan</label>
            <div className={styles.inputWrapper}>
              {formData.plane === "Basic" && <LuZap className={styles.icon} />}
              {formData.plane === "Standard" && <LuShieldCheck className={styles.icon} />}
              {formData.plane === "Enterprise" && <LuCrown className={styles.icon} />}

              <select
                name="plane"
                value={formData.plane} // Binded
                onChange={handleChange}
                className={styles.selectField}
              >
                <option value="Basic">Basic Plan</option>
                <option value="Standard">Standard Plan</option>
                <option value="Enterprise">Enterprise Plan</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Register & Create Admin
        </button>
      </form>
    </div>
  );
};

export default RegisterHospital;