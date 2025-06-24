// Ubicación: src/components/ProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // Si no hay usuario, redirige a la página de login
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;