import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import styles from './AddReceptionist.module.css';
import toast from 'react-hot-toast';

const AddReceptionist = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', phone: '', shift: 'Morning'
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/admin/add-receptionist', formData);
            toast.success(res.data.message);
            setFormData({ name: '', email: '', password: '', phone: '', shift: 'Morning' });
        } catch (err) {
            toast.error(err.response?.data?.message || "Operation failed");
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Add New Receptionist</h2>
            <form onSubmit={handleSubmit} className={styles.formGrid}>
                <div className={styles.inputGroup}>
                    <label>Full Name</label>
                    <input type="text" name="name" required onChange={handleChange} value={formData.name} placeholder="e.g. Zeeshan" />
                </div>
                <div className={styles.inputGroup}>
                    <label>Email (Login ID)</label>
                    <input type="email" name="email" required onChange={handleChange} value={formData.email} placeholder="reception@clinic.com" />
                </div>
                <div className={styles.inputGroup}>
                    <label>Login Password</label>
                    <input type="password" name="password" required onChange={handleChange} value={formData.password} placeholder="••••••••" />
                </div>
                <div className={styles.inputGroup}>
                    <label>Phone</label>
                    <input type="text" name="phone" required onChange={handleChange} value={formData.phone} placeholder="+92 3xxxxxxxxx" />
                </div>
                <div className={styles.inputGroup}>
                    <label>Working Shift</label>
                    <select name="shift" onChange={handleChange} value={formData.shift}>
                        <option value="Morning">Morning</option>
                        <option value="Evening">Evening</option>
                        <option value="Night">Night</option>
                    </select>
                </div>
                <button type="submit" className={styles.btn}>Register Receptionist</button>
            </form>
        </div>
    );
};

export default AddReceptionist;