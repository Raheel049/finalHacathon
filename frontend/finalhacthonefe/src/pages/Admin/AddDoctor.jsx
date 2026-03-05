import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import styles from './AddDoctor.module.css';

const AddDoctor = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', specialization: '', gender: 'Male', experience: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/admin/add-doctor', formData);
            alert(res.data.message);
            // setFormData({});
            // Form clear ya redirect karein
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>Register New Doctor</h2>
            <form onSubmit={handleSubmit} className={styles.gridForm}>
                <div className={styles.inputGroup}>
                    <label>Full Name</label>
                    <input type="text" name="name" required onChange={handleChange} placeholder="Dr. Ayesha Khan" />
                </div>
                <div className={styles.inputGroup}>
                    <label>Email Address</label>
                    <input type="email" name="email" required onChange={handleChange} placeholder="ayesha@clinic.com" />
                </div>
                <div className={styles.inputGroup}>
                    <label>Phone Number</label>
                    <input type="text" name="phone" required onChange={handleChange} placeholder="+92 3xx xxxxxxx" />
                </div>
                <div className={styles.inputGroup}>
                    <label>Specialization</label>
                    <select name="specialization" onChange={handleChange} required>
                        <option value="">Select Specialty</option>
                        <option value="Cardiologist">Cardiologist</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Pediatrician">Pediatrician</option>
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <label>Experience (Years)</label>
                    <input type="number" name="experience" onChange={handleChange} placeholder="5" />
                </div>
                <div className={styles.inputGroup}>
                    <label>Gender</label>
                    <select name="gender" onChange={handleChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <button type="submit" className={styles.submitBtn}>Add Doctor to System</button>
            </form>
        </div>
    );
};

export default AddDoctor;