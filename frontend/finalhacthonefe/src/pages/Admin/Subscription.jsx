// Subscription.jsx
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import styles from './Subscription.module.css';

const Subscription = () => {
    const plans = [
        { name: 'Basic', price: '49', features: ['100 Patients', '5 Doctors', 'Basic Support'] },
        { name: 'Professional', price: '99', features: ['Unlimited Patients', '20 Doctors', 'Priority Support'], active: true },
        { name: 'Enterprise', price: '199', features: ['Custom Features', 'Unlimited Doctors', '24/7 Support'] }
    ];

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Subscription Plans</h2>
            <div className={styles.plansGrid}>
                {plans.map((plan, i) => (
                    <div key={i} className={`${styles.planCard} ${plan.active ? styles.activePlan : ''}`}>
                        {plan.active && <span className={styles.badge}>Current Plan</span>}
                        <h3>{plan.name}</h3>
                        <h2>${plan.price}<span>/month</span></h2>
                        <ul>
                            {plan.features.map((f, index) => (
                                <li key={index}><FaCheckCircle /> {f}</li>
                            ))}
                        </ul>
                        <button className={styles.planBtn}>{plan.active ? 'Manage' : 'Upgrade'}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscription