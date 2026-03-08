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
import { Toaster } from "react-hot-toast"

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
        <Route element={<AdminLayout />}>
          {/* Default redirect after login */}

          <Route path="/Admin/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/Doctor/Doctors" element={<Doctors />} />
          <Route path="/Admin/AddDoctor" element={<AddDoctor />} />
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
        </Route>

        <Route element={<PatientLayout />}>
          <Route path="/Patient/Dashboard" element={<PatientDashboard />} />
        </Route>
      </Route>

      {/* 404 Redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </>
  );
};

export default App;
