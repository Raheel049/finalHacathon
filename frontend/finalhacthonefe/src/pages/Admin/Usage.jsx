// SystemUsage.jsx
import React from 'react';
import { FaMicrochip, FaMemory, FaHdd } from 'react-icons/fa';
import styles from './Usage.module.css';

const SystemUsage = () => {
    const metrics = [
        { name: 'CPU Load', value: 45, icon: <FaMicrochip />, color: '#3b82f6' },
        { name: 'RAM Usage', value: 72, icon: <FaMemory />, color: '#10b981' },
        { name: 'Storage', value: 30, icon: <FaHdd />, color: '#f59e0b' }
    ];

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Server Health</h2>
            <div className={styles.usageGrid}>
                {metrics.map((m, i) => (
                    <div key={i} className={styles.usageCard}>
                        <div className={styles.usageHeader}>
                            {m.icon} <span>{m.name}</span>
                        </div>
                        <div className={styles.progressBase}>
                            <div className={styles.progressBar} style={{ width: `${m.value}%`, background: m.color }}></div>
                        </div>
                        <p>{m.value}% Capacity Used</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SystemUsage