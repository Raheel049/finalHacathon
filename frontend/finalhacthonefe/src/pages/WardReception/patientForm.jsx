import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import styles from "./patientForm.module.css";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const UpadatePatientForm = () => {

  const location = useLocation()
  const patientToUpdate = location.state?.patient;
  const allDoctors = location.state?.doctors;

  console.log("All Doctors",allDoctors);

  const navigate = useNavigate()

  console.log("patient",patientToUpdate);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    bloodGroup: "",
    address: "",
    ward: "",
    doctor: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`/ward-reception/assign-doctor/${patientToUpdate._id}`, formData);
      toast.success(res.data.message);
      setFormData({
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        bloodGroup: "",
        address: "",
        ward: "select",
        doctor: "select",
      });
      navigate("/WardReceptionist/WardDashboard")
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>
          <UserPlus size={28} color="#10b981" />
          <h2>Patient Onboarding</h2>
        </div>

        <form onSubmit={handleSubmit} className={styles.patientForm}>
          <div className={styles.row}>
            <div className={styles.inputBox}>
              <label>Patient Full Name *</label>
              <input
                type="text"
                name="name"
                value={patientToUpdate.name}
                onChange={handleChange}
                required
                placeholder="e.g. Ali Khan"
                disabled
              />
            </div>
            <div className={styles.inputBox}>
              <label>Age *</label>
              <input
                type="number"
                name="age"
                value={patientToUpdate.age}
                onChange={handleChange}
                required
                placeholder="25"
                disabled
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputBox}>
              <label>Phone Number *</label>
              <input
                type="text"
                name="phone"
                value={patientToUpdate.phone}
                onChange={handleChange}
                required
                placeholder="+92 3xx xxxxxxx"
                disabled
              />
            </div>
            <div className={styles.inputBox}>
              <label>Gender *</label>
              <select
                name="gender"
                value={patientToUpdate.gender}
                onChange={handleChange}
                disabled
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputBox}>
              <label>Email (Optional)</label>
              <input
                type="email"
                name="email"
                value={patientToUpdate.email}
                onChange={handleChange}
                placeholder="patient@example.com"
                disabled
              />
            </div>
            <div className={styles.inputBox}>
              <label>Blood Group</label>
              <select
                name="bloodGroup"
                value={patientToUpdate.bloodGroup}
                onChange={handleChange}
                disabled
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputBox}>
              <label>Ward</label>
              <select name="ward" value={patientToUpdate.ward} onChange={handleChange} disabled>
                <option value="">Select</option>
                <option value="gernal">Genral</option>
                <option value="pediatric">Pediatric</option>
                <option value="pulmonary">Pulmonary</option>
                <option value="ICU">ICU</option>
                <option value="Emergency">Emergency</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Pediatrician">Pediatrician</option>
              </select>
            </div>

            <div className={styles.inputBox}>
              <label>Doctor</label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
              >
                <option value="">Select</option>
                
                {
                  allDoctors.map((doctor, index) => (
                    <option value={doctor.name} key={index}>{doctor.name}</option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className={styles.inputBox}>
            <label>Home Address</label>
            <textarea
              name="address"
              value={patientToUpdate.address}
              onChange={handleChange}
              rows="3"
              placeholder="Street, City, Country"
              disabled
            ></textarea>
          </div>

          <button type="submit" className={styles.saveBtn}>
            Register Patient Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpadatePatientForm;
