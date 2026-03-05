import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, UserRound, Users, BarChart3, CreditCard, Settings, LogOut } from 'lucide-react';
import styles from './AdminSidebar.module.css';

const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', path: '/admin/AdminDashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Manage Doctors', path: '/Doctor/Doctors', icon: <UserRound size={20} /> },
        { name: 'Add User', path: '/Admin/UserManagement', icon: <Users size={20} /> },
        { name: 'Analytics', path: '/admin/analytics', icon: <BarChart3 size={20} /> },
        { name: 'Subscription', path: '/admin/subscription', icon: <CreditCard size={20} /> },
        { name: 'System Usage', path: '/admin/usage', icon: <Settings size={20} /> },
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <span className={styles.plus}>+</span> ClinicSaas
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

export default Sidebar;