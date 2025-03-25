import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'; 
import { AuthContext } from './AuthContext';

function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
