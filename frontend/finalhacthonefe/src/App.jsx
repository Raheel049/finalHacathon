import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Auth/login";
import AuthRoute from "./routes/authRoutes";
import PrivateRoute from "./routes/privateRoutes";
import SignUp from "./Auth/signUp";
import ChangePassword from "./Auth/changePassword";
import OtpReset from "./Auth/otpReset";
import ForgotPassword from "./Auth/forgotPassword";
import OtpVerify from "./Auth/otp";
import AdminLayout from "./components/AdminLayout"; // Naya layout import karein
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Doctors from "./pages/Doctor/Doctors";
import AddDoctor from "./pages/Admin/AddDoctor";
import ReceptionLayout from "./components/ReceptionLayout";
import ReceptionDashboard from "./pages/Receptionist/ReceptionDashboard";
import AddPatient from "./pages/Receptionist/AddPatient";
import PatientDashboard from "./pages/Patient/Dashboard";
import PatientLayout from "./components/PatientLayout";
import UserManagement from "./pages/Admin/UserManagement";
import HomePage from "./pages/Home/homePage";
import Analytics from "./pages/Admin/Analytics";
import Subscription from "./pages/Admin/Subscription";
import SystemUsage from "./pages/Admin/Usage";
import { Toaster } from "react-hot-toast";
import PatientAppointmentManager from "./pages/Receptionist/PatientAppointmentManager";
import AddDoctorManager from "./pages/Admin/AddDoctorManager";
import PatientList from "./pages/Receptionist/PatientList";
import SuperAdmin from "./pages/SuperAdmin/SuperAdminDashboard";
import RegisterHospital from "./pages/SuperAdmin/RegisterHospitals";
import SuperAdminLayout from "./components/SuperAdminLayout";
import Owners from "./pages/SuperAdmin/Owners";
import DoctorLayout from "./components/DoctorLayout";

const App = () => {
  return (
    <>
    <Toaster position="top-left" />
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* --- PUBLIC ROUTES --- */}
      <Route element={<AuthRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/otp" element={<OtpVerify />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/otpReset" element={<OtpReset />} />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Route>

      {/* --- PRIVATE ROUTES (With Sidebar Layout) --- */}
      <Route element={<PrivateRoute />}>


        <Route element={<SuperAdminLayout />}>
        <Route path="/SuperAdmin/SuperAdminDashboard" element={<SuperAdmin />} />
        <Route path="/SuperAdmin/RegisterHospitals" element={<RegisterHospital />} />
        <Route path="/SuperAdmin/Owners" element={<Owners />} />
          
        </Route>

        <Route element={<AdminLayout />}>
          {/* Default redirect after login */}

          <Route path="/Admin/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/Admin/AddDoctorManager" element={<AddDoctorManager />} />
          <Route path="/Admin/UserManagement" element={<UserManagement />} />
          <Route path="/Admin/Analytics" element={<Analytics />} />
          <Route path="/Admin/Subscription" element={<Subscription />} />
          <Route path="/Admin/Usage" element={<SystemUsage />} />
          

        </Route>

        <Route element={<ReceptionLayout />}>
          <Route
            path="/Receptionist/ReceptionDashboard"
            element={<ReceptionDashboard />}
          />
          <Route path="/Receptionist/AddPatient" element={<AddPatient />} />
          <Route path="/Receptionist/PatientAppointmentManager" element={<PatientAppointmentManager />} />
          <Route path="/Receptionist/PatientList" element={<PatientList />} />
        </Route>

        <Route element={<PatientLayout />}>
          <Route path="/Patient/Dashboard" element={<PatientDashboard />} />
        </Route>

        <Route>
            <Route path="/Doctor/Doctors" element={<Doctors />} />
        </Route>
      </Route>

      {/* 404 Redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </>
  );
};

export default App;
