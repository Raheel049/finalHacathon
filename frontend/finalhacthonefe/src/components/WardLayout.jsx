import React from 'react'
import styles from "./WardSidebar.module.css";
import { Outlet } from 'react-router-dom';
import WardSidebar from './WardSidebar';

const WardLayout = () => {
  return (
    <div>
        <main>
            <section>
                <div>
                    <WardSidebar />
                    <main className={styles.main}>
                        <Outlet />
                    </main>
                </div>
            </section>
        </main>
    </div>
  )
}

export default WardLayout