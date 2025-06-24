import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const NavButton = ({ to, children }) => {
    const navigate = useNavigate();
    return (
        <Button color="inherit" onClick={() => navigate(to)}>
            {children}
        </Button>
    );
};

const MainLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Atunes del Pacífico
                    </Typography>

                    {/* Enlaces de navegación */}
                    {user?.rol === 'CLIENTE' && <>
                        <NavButton to="/crear-pedido">Crear Pedido</NavButton>
                        <NavButton to="/historial-compras">Mi Historial</NavButton>
                    </>}
                    {(user?.rol === 'OPERADOR' || user?.rol === 'ADMINISTRADOR') && 
                        <NavButton to="/inventario">Inventario</NavButton>}
                    {user?.rol === 'ADMINISTRADOR' && <>
                        <NavButton to="/admin/usuarios">Usuarios</NavButton>
                        <NavButton to="/reportes">Reportes</NavButton>
                    </>}

                    <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ p: 3 }}>
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;