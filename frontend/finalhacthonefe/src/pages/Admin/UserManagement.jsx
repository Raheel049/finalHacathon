// UserManagement.jsx
import React, { useState } from 'react';
import SearchUser from './SearchUser';
import RoleUpdate from './RoleUpdate';
import styles from './UserManagement.module.css';


const UserManagement = () => {
    const [userData, setUserData] = useState(null);
    const [step, setStep] = useState(1); // Step 1: Search, Step 2: Update

    const handleUserFound = (data) => {
        setUserData(data);
        setStep(2); // Email mil gayi, ab role update wala page dikhao
    };

    const handleReset = () => {
        setUserData(null);
        setStep(1); // Wapis search par jao
    };

    return (
        <div className={styles.managerContainer}>
            <div className={styles.header}>
                <h2>{step === 1 ? "Verify User Email" : "Update User Permissions"}</h2>
                <div className={styles.stepper}>
                    <span className={step === 1 ? styles.activeStep : ""}>1</span>
                    <div className={styles.line}></div>
                    <span className={step === 2 ? styles.activeStep : ""}>2</span>
                </div>
            </div>

            {step === 1 ? (
                <SearchUser onUserFound={handleUserFound} />
            ) : (
                <RoleUpdate 
                    user={userData} 
                    onBack={handleReset} 
                    onSuccess={handleReset} 
                />
            )}
        </div>
    );
};

export default UserManagement;