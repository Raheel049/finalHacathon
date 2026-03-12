import React, { useState } from "react";
import styles from "./AddDoctorManager.module.css";
import SearchDoctor from "./SearchDoctor";
import AddDoctor from "./AddDoctor";
import { UserSearch, UserPlus, ArrowLeft } from "lucide-react";

const AddDoctorManager = () => {
    const [userData, setUserData] = useState(null);
    const [step, setStep] = useState(1);

    const handleUserData = (data) => {
        setUserData(data);
        setStep(2);
    };

    const handleReset = () => {
        setUserData(null);
        setStep(1);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {/* Header Section */}
                <header className={styles.header}>
                    <div className={styles.titleArea}>
                        <h1>Doctor Management</h1>
                        <p>Manage healthcare providers in your system</p>
                    </div>
                </header>

                {/* Stepper UI */}
                <div className={styles.stepper}>
                    <div className={`${styles.step} ${step >= 1 ? styles.active : ""}`}>
                        <div className={styles.circle}><UserSearch size={18} /></div>
                        <span>Find User</span>
                    </div>
                    <div className={styles.line}></div>
                    <div className={`${styles.step} ${step === 2 ? styles.active : ""}`}>
                        <div className={styles.circle}><UserPlus size={18} /></div>
                        <span>Register Doctor</span>
                    </div>
                </div>

                {/* Conditional Rendering with Animation Area */}
                <div className={styles.contentArea}>
                    {step === 1 ? (
                        <SearchDoctor onFound={handleUserData} />
                    ) : (
                        <div className={styles.slideIn}>
                            <AddDoctor 
                                user={userData} 
                                onSuccess={handleReset} 
                                onBack={handleReset} 
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddDoctorManager;