import React, { useState, useEffect } from 'react';
import usuarioService from '../services/usuarioService';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Paper, Typography, Chip 
} from '@mui/material';

function GestionUsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        usuarioService.getAll()
            .then(response => {
                setUsuarios(response.data);
            })
            .catch(error => console.error("Error al obtener usuarios:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Typography>Cargando usuarios...</Typography>;

    return (
        <TableContainer component={Paper}>
            <Typography variant="h4" sx={{ p: 2 }}>Gestión de Usuarios</Typography>
            <Table sx={{ minWidth: 650 }} aria-label="tabla de usuarios">
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre de Usuario</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Rol</TableCell>
                        <TableCell>Estado</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usuarios.map((usuario) => (
                        <TableRow key={usuario.id}>
                            <TableCell>{usuario.id}</TableCell>
                            <TableCell>{usuario.nombreUsuario}</TableCell>
                            <TableCell>{usuario.email}</TableCell>
                            <TableCell>{usuario.nombreRol}</TableCell>
                            <TableCell>
                                <Chip 
                                    label={usuario.estaActivo ? 'Activo' : 'Inactivo'} 
                                    color={usuario.estaActivo ? 'success' : 'error'} 
                                    size="small"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default GestionUsuariosPage;