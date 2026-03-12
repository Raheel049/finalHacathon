import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import styles from './SearchDoctor.module.css'; // CSS module link
import { Search, Loader2, UserPlus } from 'lucide-react'; // Icons ke liye
import toast from 'react-hot-toast';

const SearchDoctor = ({ onFound }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInput = (e) => {
        setEmail(e.target.value);
    };

    const fetchDoctor = async (e) => {
        if (e) e.preventDefault(); // Form submit prevent karein
        
        if (!email) {
            return toast.error("Please enter an email address");
        }

        setLoading(true);
        try {
            const res = await axiosInstance.get(`/admin/search-doctor?email=${email}`);
            
            if (res.data.success && res.data.data) {
                toast.success("Doctor found!");
                onFound(res.data.data);
            } else {
                toast.error("No user found with this email");
                onFound(null);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "User not found in system");
            onFound(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.headerSection}>
                <Search size={24} className={styles.icon} />
                <h2>Search User to Register as Doctor</h2>
            </div>
            
            <p className={styles.description}>
                Enter the registered user's email address to fetch their details before adding them to the medical staff.
            </p>

            <form className={styles.searchBox} onSubmit={fetchDoctor}>
                <input 
                    type="email" 
                    placeholder='example@hospital.com' 
                    onChange={handleInput} 
                    value={email} 
                    className={styles.searchInput}
                    required
                />
                <button 
                    type="submit" 
                    className={styles.searchBtn} 
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 className={styles.spinner} size={20} />
                    ) : (
                        <>
                            <UserPlus size={18} />
                            <span>Search & Proceed</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default SearchDoctor;