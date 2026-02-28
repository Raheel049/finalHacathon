import React, { useState } from 'react';
import styles from './PatientForm.module.css';

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'Male',
    phone: '',
    email: '',
    bloodGroup: 'A+',
    address: '',
    emergencyContact: '',
    medicalHistory: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Patient Data Submitted:", formData);
    alert("Patient Registered Successfully!");
    // Yahan Backend API Call hogi
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>New Patient Registration</h2>
      
      <form className={styles.formGrid} onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className={styles.formGroup}>
          <label>First Name</label>
          <input className={styles.input} type="text" name="firstName" required onChange={handleChange} />
        </div>
        
        <div className={styles.formGroup}>
          <label>Last Name</label>
          <input className={styles.input} type="text" name="lastName" required onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Date of Birth</label>
          <input className={styles.input} type="date" name="dob" required onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Gender</label>
          <select className={styles.select} name="gender" onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Contact Info */}
        <div className={styles.formGroup}>
          <label>Phone Number</label>
          <input className={styles.input} type="tel" name="phone" placeholder="03xx-xxxxxxx" required onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Email Address</label>
          <input className={styles.input} type="email" name="email" placeholder="patient@example.com" onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Blood Group</label>
          <select className={styles.select} name="bloodGroup" onChange={handleChange}>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Emergency Contact</label>
          <input className={styles.input} type="tel" name="emergencyContact" placeholder="Relative's Number" onChange={handleChange} />
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label>Full Address</label>
          <input className={styles.input} type="text" name="address" onChange={handleChange} />
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label>Medical History / Allergies (If any)</label>
          <textarea className={styles.textarea} name="medicalHistory" placeholder="Diabetes, Hypertension, Penicillin Allergy etc." onChange={handleChange}></textarea>
        </div>

        <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`}>
          Register Patient Record
        </button>
      </form>
    </div>
  );
};

export default PatientRegistration;