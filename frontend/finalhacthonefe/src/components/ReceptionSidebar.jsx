import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserPlus, 
  CalendarClock, 
  Users, 
  FileText, 
  LogOut 
} from 'lucide-react';
import styles from './ReceptionSidebar.module.css'; // Wahi CSS use karein jo Admin ki thi

const ReceptionSidebar = () => {
    const menuItems = [
        { name: 'Desk Overview', path: '/Receptionist/ReceptionDashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Add Patient', path: '/Receptionist/AddPatient', icon: <UserPlus size={20} /> },
        { name: 'Appointments', path: '/Receptionist/appointments', icon: <CalendarClock size={20} /> },
        { name: 'Patient Records', path: '/Receptionist/patients-list', icon: <Users size={20} /> },
        { name: 'Billing/Reports', path: '/Receptionist/reports', icon: <FileText size={20} /> },
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <span className={styles.plus}>+</span> ClinicSaas
                <small style={{display: 'block', fontSize: '10px', color: '#3b82f6'}}>Receptionist Portal</small>
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
                <button 
                    className={styles.logout} 
                    onClick={() => {localStorage.clear(); window.location.href='/'}}
                >
                    <LogOut size={20} /> <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default ReceptionSidebar;