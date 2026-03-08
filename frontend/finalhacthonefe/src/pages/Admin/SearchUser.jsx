import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import styles from './SearchUser.module.css';
import toast from 'react-hot-toast';

const SearchUser = ({ onUserFound }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const verifyEmail = async () => {
        if (!email) return toast.success("Please enter an email");
        setLoading(true);
        try {
            const res = await axiosInstance.get(`/admin/search-user?email=${email}`);
            onUserFound(res.data.user);
        } catch (err) {
            toast.error("User not found! Make sure they have signed up first.",err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.formCard}>
            <label>Enter User's Registered Email</label>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="e.g. doctor_ali@gmail.com"
                className={styles.inputField}
            />
            <button 
                onClick={verifyEmail} 
                className={styles.primaryBtn}
                disabled={loading}
            >
                {loading ? "Verifying..." : "Verify & Proceed"}
            </button>
        </div>
    );
};

export default SearchUser;