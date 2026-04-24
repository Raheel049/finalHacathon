import React, { useState } from "react";
import styles from "./WardSidebar.module.css";
import { LucideBellDot, LucidePlusCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard, LuMenu, LuPenLine, LuUserRound, LuBellDot, LuCross, LuUser } from "react-icons/lu";
import { FaTimes } from "react-icons/fa";

const WardSidebar = () => {

    const [isOpen, setIsOpen] = useState(false)

  const navPages = [
    {
      name: "Dashboard",
      path: "/WardReceptionist/WardDashboard",
      icon: <LuLayoutDashboard />,
    },

    {
        name : "Assign Doctor",
        path : "/WardReceptionist/AssignDoctor",
        icon : <LuPenLine />
    },

    {
        name : "Ward Receptionist",
        path : "/WardReceptionist/WardReceptionist",
        icon : <LuUser />
    },
  ];

  return (
    <div>
      <main>
        <section>
            <div className={styles.topBar}>
                <LuMenu className={`${styles.icon} ${styles.menuIcon}`} onClick={() => {setIsOpen(true)}}/>
                <h4>Best Services</h4>
                <div className={styles.sideIcon}>
                    <LuBellDot className={styles.icon}/>
                    <LuUserRound className={styles.icon}/>
                </div>
            </div>
          <div className={`${(isOpen) ? styles.openBar : styles.mainContainer}`}>
            <div className={styles.navLogo}>
              
            <LucidePlusCircle className={styles.icon} />
              <h3>
                 Clinic Saas
              </h3>

              <FaTimes className={styles.closeBar} onClick={() => {setIsOpen(false)}}/>
            </div>
            <div className={styles.navbar}>
              <div className={styles.navItems}>
              {navPages.map((item, index) => (
                <NavLink to={item.path} 
                        key={index}
                        className={({isActive}) => isActive ? styles.linkActive : styles.linkInActive}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WardSidebar;
