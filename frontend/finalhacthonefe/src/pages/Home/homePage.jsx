import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import styles from "./homePage.module.css";
import { Activity, ShieldCheck, Users, ArrowRight } from 'lucide-react';

const HomePage = () => {
    const [userRole, setUserRole] = useState("User");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state for smooth transition
    const navigate = useNavigate();

    // Logout Function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        window.location.reload(); // Refresh to reset all states
    };

    useEffect(() => {
        const autoNavigate = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await axiosInstance.get('/auth/me');
                const role = res.data.user.role;
                
                setUserRole(role);
                setIsLoggedIn(true);

                // Role based paths mapping
                const paths = {
                    Admin: "/Admin/AdminDashboard",
                    Doctor: "/Doctor/Doctors",
                    Receptionist: "/Receptionist/ReceptionDashboard",
                    Patient: "/Patient/Dashboard"
                };

                // Agar role valid hai to direct navigate kar jao
                if (paths[role]) {
                    navigate(paths[role]);
                } else {
                    setLoading(false); // Agar sirf 'User' hai to home page dikhao
                }
            } catch (err) {
                console.error("Auth error:", err.message);
                setLoading(false);
            }
        };
        autoNavigate();
    }, [navigate]);

    const staffPortals = {
        Doctor: { label: "Doctor Dashboard", path: "/Doctor/Doctors", icon: "👨‍⚕️" },
        Receptionist: { label: "Reception Dashboard", path: "/Receptionist/ReceptionDashboard", icon: "🏢" },
        Admin: { label: "Admin Panel", path: "/Admin/AdminDashboard", icon: "⚙️" },
        Patient: { label: "Patient Portal", path: "/Patient/Dashboard", icon: "🏥" }
    };

    const currentStaffData = staffPortals[userRole];

    // Jab tak check ho raha hai, ek clean spinner dikhao
    if (loading) {
        return (
            <div className={styles.loaderContainer}>
                <div className={styles.spinner}></div>
                <p>Verifying Access...</p>
            </div>
        );
    }

    return (
        <div className={styles.heroContainer}>
            {/* Navbar */}
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <Activity className={styles.iconBlue} /> <span>ClinicSaas</span>
                </div>
                <div className={styles.navLinks}>
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className={styles.loginBtn}>Login</Link>
                            <Link to="/signup" className={styles.signupBtn}>Join Now</Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
                    )}
                </div>
            </nav>

            {/* Main Hero Section */}
            <div className={styles.mainLayout}>
                {/* Left Side: Content */}
                <div className={styles.contentArea}>
                    <div className={styles.topBadge}>✨ #1 Healthcare Management</div>
                    <h1 className={styles.title}>
                        Modernizing <br />
                        <span>Healthcare Management</span>
                    </h1>
                    <p className={styles.description}>
                        A unified platform for doctors, patients, and administrators. 
                        Streamline your clinic operations with our secure, real-time management system.
                    </p>

                    <div className={styles.actionButtons}>
                        {isLoggedIn && currentStaffData ? (
                            <button onClick={() => navigate(currentStaffData.path)} className={styles.staffSwitchBtn}>
                                <div className={styles.shimmer}></div>
                                Enter {currentStaffData.label} {currentStaffData.icon}
                            </button>
                        ) : (
                            <div className={styles.guestActions}>
                                <button onClick={() => navigate('/signup')} className={styles.mainActionBtn}>
                                    Get Started as a Patient <ArrowRight size={20} />
                                </button>
                                <p className={styles.subText}>Are you a Doctor? Contact Admin for official access.</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.badges}>
                        <div className={styles.badge}><ShieldCheck size={18} className={styles.greenIcon}/> HIPAA Compliant</div>
                        <div className={styles.badge}><Users size={18} className={styles.blueIcon}/> 10k+ Active Users</div>
                    </div>
                </div>

                {/* Right Side: Image/Illustration */}
                <div className={styles.imageArea}>
                    <div className={styles.imageWrapper}>
                        <img 
                            src="https://img.freepik.com/free-vector/hospital-building-concept-illustration_114360-8440.jpg" 
                            alt="Modern Hospital" 
                            className={styles.heroImg}
                        />
                        {/* Floating Card for extra attraction */}
                        <div className={styles.floatingCard}>
                            <div className={styles.cardIcon}>✅</div>
                            <div>
                                <h4>24/7 Support</h4>
                                <p>Doctors are online</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decor Circles */}
            <div className={styles.bgCircle}></div>
            <div className={styles.bgCircle2}></div>
        </div>
    );
};

export default HomePage;