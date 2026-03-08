import React from 'react';
import { Outlet } from 'react-router-dom';
import ReceptionSidebar from './ReceptionSidebar';
import styles from "./ReceptionLayout.module.css"

const ReceptionLayout = () => {
    return (
        <div>
            <ReceptionSidebar />

            <main
                className={styles.main}
            >
                <Outlet />
            </main>
        </div>
    );
};

export default ReceptionLayout;