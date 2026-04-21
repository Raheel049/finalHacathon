import React, { useState } from "react";
import styles from "./DoctorSidebar.module.css";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Microscope,
  ClipboardPen,
  Settings,
  LogOut,
  MenuIcon,
  Bell,
  LucideUserCircle
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { FaHospitalSymbol, FaPlusCircle, FaTimes } from "react-icons/fa";

const DoctorSidebar = () => {

  const [isOpen, setIsOpen] = useState(false);



  const navItem = [
    {
      name: "Dashboard",
      path: "/Doctor/Doctors",
      icon: <LayoutDashboard className={styles.navIcon} />,
    },

    {
      name: "Patients",
      path: "/Doctor/PatientRecord",
      icon: <Users />,
    },

    {
      name: "Appointments",
      path: "/Doctor/Appointment",
      icon: <ClipboardList />,
    },

    {
      name: "E-prescription",
      path: "/Doctor/Prescription",
      icon: <ClipboardPen />,
    },

    {
      name: "Lab-Reports",
      path: "/Doctor/LabReports",
      icon: <Microscope />,
    },

    {
      name: "Settings",
      path: "/Doctor/Settings",
      icon: <Settings />,
    },

    
  ];

  return (
    <div>
      <main>
        <section>
          <div className={styles.smallScreenNav}>
            <MenuIcon className={styles.menuIcon} onClick={() => {setIsOpen(true)}} />
            <h3>Clinic SaaS</h3>
            <div className={styles.topbarIcon}>
              <Bell />
              <LucideUserCircle />
            </div>
          </div>
        </section>
        <section className={styles.navbar}>
          <div className={`${isOpen ? styles.toggleNav : styles.sidebarWrapper}`}>
            <div className={styles.navHead}>
              <FaPlusCircle />
              <h2>Clinic Saas</h2>
              <div className={styles.closeNav}>
                <FaTimes className={styles.closeNavIcon} onClick={() => {setIsOpen(false)}}/>
              </div>
            </div>

            <aside className={styles.sidebar}>
              <nav className={styles.nav}>
                {navItem.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? styles.activeLink : styles.link
                    }
                    onClick={() => {setIsOpen(false)}}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </aside>

            <footer>
              <div className={styles.logOutBtn}>
                 <button><span><LogOut className={styles.navIcon} /></span>Logout</button>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DoctorSidebar;
