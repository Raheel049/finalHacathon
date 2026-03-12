import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserRound,
  Users,
  BarChart3,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import styles from "./AdminSidebar.module.css";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaBell,
  FaUserCircle,

} from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/Admin/AdminDashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Manage Doctor",
      path: "/Admin/AddDoctorManager",
      icon: <UserRound size={20} />,
    },
    {
      name: "Add User",
      path: "/Admin/UserManagement",
      icon: <Users size={20} />,
    },
    {
      name: "Analytics",
      path: "/Admin/Analytics",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Subscription",
      path: "/Admin/Subscription",
      icon: <CreditCard size={20} />,
    },
    {
      name: "System Usage",
      path: "/Admin/Usage",
      icon: <Settings size={20} />,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleNav = () => {
    setIsOpen(!isOpen);

   
  };

  return (
    <div>
      <div className={styles.topBar}>
        <div className={styles.topLeft}>
          {/* Menu Icon (Hamburger) */}
          <FaBars className={styles.menuIcon} onClick={() => setIsOpen(true)} />

          {/* Search Bar */}
          <div className={styles.searchBar}>
            <FaSearch className={styles.searchIcon} />
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        <div className={styles.topRight}>
          {/* Notification Icon */}
          <div className={styles.iconBadge}>
            <FaBell className={styles.actionIcon} />
            <span className={styles.dot}></span>
          </div>

          {/* Admin Profile */}
          <div className={styles.adminProfile}>
            <div className={styles.adminText}>
              <span className={styles.adminName}>Raheel Admin</span>
              <small>Super Admin</small>
            </div>
            <div className={styles.avatar}>
              <FaUserCircle size={32} />
            </div>
          </div>
        </div>
      </div>

      {isOpen && <div className={styles.overlay} onClick={handleNav}></div>}
      <aside
        className={`${styles.sidebar}  ${isOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.logo}>
          <div>
            <span className={styles.plus}>+</span> ClinicSaas
          </div>
          <div onClick={handleNav} className={styles.closeIcon}>
            <FaTimes />
          </div>
        </div>
        <nav className={styles.nav}>
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        <div className={styles.footer}>
          <button
            className={styles.logout}
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            <LogOut size={20} /> <span>Logout</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
