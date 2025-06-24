// Ubicación: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Importación de componentes y páginas
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';

// Importación de todas las páginas específicas de cada rol
import MisPedidosPage from './pages/MisPedidosPage';
import CrearPedidoPage from './pages/CrearPedidoPage';
import HistorialComprasPage from './pages/HistorialComprasPage';
import GestionInventarioPage from './pages/GestionInventarioPage';
import GestionUsuariosPage from './pages/GestionUsuariosPage';
import ReportesPage from './pages/ReportesPage';

/**
 * El componente Dashboard actúa como un centro de redirección inicial
 * después del login, enviando a cada usuario a su página principal.
 */
const Dashboard = () => {
    const { user } = useAuth();
    
    if (!user) {
        // Esto no debería ocurrir dentro de una ruta protegida, pero es una salvaguarda.
        return <Navigate to="/login" />;
    }

    // Redirige al usuario a su página de inicio según su rol.
    switch (user.rol) {
        case 'ADMINISTRADOR':
            return <Navigate to="/admin/usuarios" replace />;
        case 'OPERADOR':
            return <Navigate to="/inventario" replace />;
        case 'CLIENTE':
            return <Navigate to="/mis-pedidos" replace />;
        default:
            // Si el rol no es reconocido, lo enviamos al login.
            return <Navigate to="/login" replace />;
    }
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Ruta Pública: Solo se puede acceder si no estás autenticado */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Contenedor de Rutas Protegidas */}
                    <Route 
                        path="/*" // Captura cualquier otra ruta
                        element={
                            <ProtectedRoute>
                                <MainLayout>
                                    <Routes>
                                        {/* Rutas específicas para cada funcionalidad */}
                                        <Route path="dashboard" element={<Dashboard />} />
                                        
                                        {/* Rutas de Cliente */}
                                        <Route path="mis-pedidos" element={<MisPedidosPage />} />
                                        <Route path="crear-pedido" element={<CrearPedidoPage />} />
                                        <Route path="historial-compras" element={<HistorialComprasPage />} />

                                        {/* Ruta de Operador */}
                                        <Route path="inventario" element={<GestionInventarioPage />} />
                                        
                                        {/* Ruta de Administrador */}
                                        <Route path="admin/usuarios" element={<GestionUsuariosPage />} />

                                        <Route path="reportes" element={<ReportesPage />} />

                                        {/* Ruta por defecto si se ingresa una URL inválida estando logueado */}
                                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                                    </Routes>
                                </MainLayout>
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;