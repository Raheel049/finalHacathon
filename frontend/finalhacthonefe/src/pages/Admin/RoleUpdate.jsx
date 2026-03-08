import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import styles from './UserManagement.module.css';
import toast from 'react-hot-toast';
const RoleUpdate = ({ user, onBack, onSuccess }) => {
    const [selectedRole, setSelectedRole] = useState(user.role);
    const [updating, setUpdating] = useState(false);

    const updateRole = async () => {
        setUpdating(true);
        try {
            await axiosInstance.patch('/admin/update-role', {
                userId: user._id,
                newRole: selectedRole,
            });
            toast.success(`Success! User has been promoted to ${selectedRole}`);
            onSuccess(); // Flow reset karne ke liye
        } catch (err) {
            toast.error("Update failed! Please try again.",err.message);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className={styles.formCard}>
            <div className={styles.userDetails}>
                <p><strong>Full Name:</strong> {user.name}</p>
                <p><strong>Email ID:</strong> {user.email}</p>
                <p><strong>Contact No:</strong> {user.phone || 'Not Provided'}</p>
                <p><strong>Current Access:</strong> <span className={styles.badge}>{user.role}</span></p>
            </div>

            <label>Select New Role to Assign</label>
            <select 
                value={selectedRole} 
                onChange={(e) => setSelectedRole(e.target.value)}
                className={styles.selectField}
            >
                <option value="User">User (Default)</option>
                <option value="Doctor">Doctor</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Patient">Patient</option>
                <option value="Admin">Receptionist</option>

            </select>

            <div className={styles.btnGroup}>
                <button onClick={onBack} className={styles.backBtn}>Back</button>
                <button 
                    onClick={updateRole} 
                    className={styles.updateBtn}
                    disabled={updating}
                >
                    {updating ? "Saving..." : "Confirm & Update"}
                </button>
            </div>
        </div>
    );
};

export default RoleUpdate;