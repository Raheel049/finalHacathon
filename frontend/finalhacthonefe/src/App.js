import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar'; 
import AdminDashboard from './pages/AdminDashboard';
// Baaki pages bhi import karlein

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <Sidebar /> 
        <main style={{ flex: 1, marginLeft: '260px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/pages/AdminDashboard" />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* Yahan baaki routes ayenge */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;