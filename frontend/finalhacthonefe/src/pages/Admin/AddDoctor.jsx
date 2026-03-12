import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import styles from './AddDoctor.module.css';
import toast from 'react-hot-toast';

const AddDoctor = ({ user, onSuccess, onBack }) => {
    // 1. Initial State ko properly define karein
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        specialization: '',
        gender: 'Male',
        experience: ''
    });

    // 2. Jab 'user' prop change ho, toh formData ko update karein
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '', // user object mein phoneNumber hai toh wahi use karein
                specialization: '',
                gender: 'Male',
                experience: ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Ab formData mein email aur baqi details sahi hongi
            const res = await axiosInstance.post('/admin/add-doctor', formData);
            toast.success(res.data.message);
            
            // Form clear karein
            setFormData({
                name: '', email: '', phoneNumber: '', specialization: '', gender: 'Male', experience: ''
            });
            
            if (onSuccess) onSuccess();
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
                    {/* 3. value hamesha formData se connect rakhein */}
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Email Address</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Phone Number</label>
                    <input 
                        type="text" 
                        name="phoneNumber" 
                        value={formData.phoneNumber} 
                        onChange={handleChange} 
                    />
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
                    <input 
                        type="number" 
                        name="experience" 
                        value={formData.experience} 
                        onChange={handleChange} 
                        placeholder="5" 
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Gender</label>
                    <select name="gender" onChange={handleChange} value={formData.gender}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.submitBtn}>Add Doctor to System</button>
                    <button onClick={onBack} type='button' className={styles.backBtn}>Back</button>
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;