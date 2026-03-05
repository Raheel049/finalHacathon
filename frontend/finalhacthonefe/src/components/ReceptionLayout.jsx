import React from 'react';
import { Outlet } from 'react-router-dom';
import ReceptionSidebar from './ReceptionSidebar';

const ReceptionLayout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '260px' }}>
                <ReceptionSidebar />
            </div>
            <main style={{ flex: 1, backgroundColor: '#f8fafc', minHeight: '100vh', padding: '20px' }}>
                <Outlet /> {/* Yahan Receptionist ke pages load honge */}
            </main>
        </div>
    );
};

export default ReceptionLayout;