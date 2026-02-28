import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const AuthRoute = () => {
    return localStorage.getItem("token") ? <Navigate to="/dashboard" /> :  <Outlet />;
}

export default AuthRoute