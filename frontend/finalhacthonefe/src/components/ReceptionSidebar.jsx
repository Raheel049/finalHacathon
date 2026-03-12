import React, { useState } from 'react';
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
import { FaBars, FaTimes, FaSearch, FaBell, FaUserCircle, } from 'react-icons/fa';

const ReceptionSidebar = () => {
    const menuItems = [
        { name: 'Desk Overview', path: '/Receptionist/ReceptionDashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Add Patient', path: '/Receptionist/AddPatient', icon: <UserPlus size={20} /> },
        { name: 'Appointments', path: '/Receptionist/PatientAppointmentManager', icon: <CalendarClock size={20} /> },
        { name: 'Patient Records', path: '/Receptionist/PatientList', icon: <Users size={20} /> },
        { name: 'Billing/Reports', path: '/Receptionist/reports', icon: <FileText size={20} /> },
    ];

    const [isOpen, setIsOpen] = useState(false)
    
    const handleTopNav = () => {
        setIsOpen(!isOpen)
        console.log(isOpen)
    }
    

    return (
        <div>
            <div className={styles.topBar}>
                <h1 onClick={handleTopNav}><FaBars/></h1>
                <div className={styles.Search}>
                <input type="text" placeholder='searching...' />
                <FaSearch className={styles.searhIcon} />
                </div>
                <FaBell className={styles.searhIcon}/>
                <FaUserCircle className={styles.searhIcon}/>

            </div>

            <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
            <div className={styles.logo}>
                <div className={styles.iconIcon}>
                <span className={styles.plus}>+ClinicSaas</span> 
                    <div style={{marginTop : "10px"}}>
                        <h2>
                <FaTimes onClick={handleTopNav} className={`${isOpen ? styles.sidebarOpen : styles.closeSideBar}`} />

                        </h2>
                    </div>
                </div>
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
        </div>
    );
};

export default ReceptionSidebar;