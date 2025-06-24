// Ubicación: src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Añadimos un estado de carga inicial

    useEffect(() => {
        // Al cargar la app, intenta leer el token del localStorage
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedUser = jwtDecode(token);
                // Aquí podrías añadir una validación para ver si el token ha expirado
                setUser(decodedUser);
            }
        } catch (error) {
            console.error("Token inválido en localStorage", error);
            localStorage.removeItem('token');
        }
        setLoading(false); // Terminamos la carga inicial
    }, []);


    const login = async (username, password) => {
        const response = await authService.login(username, password);
        const token = response.data.token;
        localStorage.setItem('token', token);
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        return decodedUser; // Devolvemos el usuario para la redirección
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    // No renderizamos nada hasta que se haya verificado el token del localStorage
    if (loading) {
        return <p>Cargando aplicación...</p>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};