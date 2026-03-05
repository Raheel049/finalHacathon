import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, CreditCard, User, LogOut, CalendarCheck } from 'lucide-react';
import styles from './Sidebar.module.css'; // Wahi Admin wala CSS use kar saktay hain

const PatientSidebar = () => {
    const menuItems = [
        { name: 'My Health', path: '/patient/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Medical Reports', path: '/patient/reports', icon: <FileText size={20} /> },
        { name: 'Bills & Payments', path: '/patient/billing', icon: <CreditCard size={20} /> },
        { name: 'Appointments', path: '/patient/appointments', icon: <CalendarCheck size={20} /> },
        { name: 'My Profile', path: '/patient/profile', icon: <User size={20} /> },
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <span className={styles.plus}>+</span> ClinicSaas
                <small style={{fontSize: '10px', color: '#10b981'}}>Patient Care</small>
            </div>
            
            <nav className={styles.nav}>
                {menuItems.map((item, index) => (
                    <NavLink 
                        key={index} 
                        to={item.path} 
                        className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className={styles.footer}>
                <button className={styles.logout} onClick={() => {localStorage.clear(); window.location.href='/'}}>
                    <LogOut size={20} /> <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default PatientSidebar;