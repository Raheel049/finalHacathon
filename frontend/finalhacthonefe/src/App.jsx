import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './Auth/login'
import AuthRoute from './routes/authRoutes'
import PrivateRoute from './routes/privateRoutes'
import SignUp from './Auth/signUp'
import ChangePassword from './Auth/changePassword'
import OtpReset from './Auth/otpReset'
import ForgotPassword from './Auth/forgotPassword'
import OtpVerify from './Auth/otp'
import AdminDashboard from './pages/Admin/dashboard'
import Doctors from './pages/Admin/pages/doctors'
import Receptionists from './pages/Admin/receptionists'
import DoctorDashboard from './doctor/doctor'
import PatientRegistration from './reciption/patientForm'



const App = () => {
  

  return (
   <Routes>

    <Route element={<AuthRoute />}>
    <Route path="/" element={<Login />} />
    <Route path='/changePassword' element={<ChangePassword />} />
    <Route path='/forgotPassword' element={<ForgotPassword />} />
    <Route path='/otp' element={<OtpVerify />} />
    <Route path='/otpReset' element={<OtpReset />} />
    <Route path='/signUp' element={<SignUp />} />

      
    </Route>
    <Route element={<PrivateRoute />}>
      <Route path='/dashboard' element={<AdminDashboard />}/>
      <Route path='/doctors' element={<Doctors />} />
      <Route path='/receptionists' element={<Receptionists />} />
      <Route path='/doctor' element={<DoctorDashboard />} />
      <Route path='/patientsForm' element={<PatientRegistration />} />
    </Route>
   </Routes>
  )
}

export default App
