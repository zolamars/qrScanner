import React from "react";
import { Navigate } from "react-router-dom";
import QRCodeReader from "./qrScanner";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("credentials") !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <QRCodeReader />;
};
export default ProtectedRoute;
