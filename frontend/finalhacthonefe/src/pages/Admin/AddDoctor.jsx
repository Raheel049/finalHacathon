import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import styles from './AddDoctor.module.css';
import toast from 'react-hot-toast';

const AddDoctor = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', specialization: '', gender: 'Male', experience: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/admin/add-doctor', formData);
            toast.success(res.data.message);
            setFormData({
                name: '', email: '', phone: '', specialization: '', gender: 'Male', experience: ''
            });
            // Form clear ya redirect karein
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>Register New Doctor</h2>
            <form onSubmit={handleSubmit} className={styles.gridForm}>
                <div className={styles.inputGroup}>
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} required onChange={handleChange} placeholder="Dr. Ayesha Khan" />
                </div>
                <div className={styles.inputGroup}>
                    <label>Email Address</label>
                    <input type="email" name="email" value={formData.email} required onChange={handleChange} placeholder="ayesha@clinic.com" />
                </div>
                <div className={styles.inputGroup}>
                    <label>Phone Number</label>
                    <input type="text" name="phone" value={formData.phone} required onChange={handleChange} placeholder="+92 3xx xxxxxxx" />
                </div>
                <div className={styles.inputGroup}>
                    <label>Specialization</label>
                    <select name="specialization" value={formData.specialization} onChange={handleChange} required>
                        <option value="">Select Specialty</option>
                        <option value="Cardiologist">Cardiologist</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Pediatrician">Pediatrician</option>
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <label>Experience (Years)</label>
                    <input type="number" name="experience" value={formData.experience} onChange={handleChange} placeholder="5" />
                </div>
                <div className={styles.inputGroup}>
                    <label>Gender</label>
                    <select name="gender" onChange={handleChange} value={formData.gender}>
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