import React from 'react'
import DoctorSidebar from './DoctorSidebar'
import { Outlet } from 'react-router-dom'
import styles from "./DoctorLayout.module.css"

const DoctorLayout = () => {
  return (
    <div className={styles.doctorLayoutContainer}>
        <div>
            <DoctorSidebar />
        </div>
        <main>
            <Outlet />
        </main>
    </div>
)
}

export default DoctorLayout