import React, { useState, useEffect } from 'react';
import loteService from '../services/loteService';
import { 
    Paper, Typography, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Button, Grid, TextField, Select, MenuItem, 
    FormControl, InputLabel, Box, Chip 
} from '@mui/material';

function GestionInventarioPage() {
    const [lotes, setLotes] = useState([]);
    const [loading, setLoading] = useState(true);
    
    
    const [codigoLote, setCodigoLote] = useState('');
    const [fechaProduccion, setFechaProduccion] = useState('');
    const [tipoProducto, setTipoProducto] = useState('AtunAceite');
    const [cantidadProducida, setCantidadProducida] = useState('');

    const fetchLotes = () => {
        setLoading(true);
        loteService.getInventario()
            .then(response => setLotes(response.data))
            .catch(error => console.error("Error al obtener inventario:", error))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchLotes();
    }, []);

    const handleMarcarDefectuoso = (id) => {
        if (window.confirm('¿Estás seguro de que quieres marcar este lote como defectuoso?')) {
            loteService.marcarComoDefectuoso(id)
                .then(() => {
                    alert('Lote marcado como defectuoso');
                    fetchLotes();
                })
                .catch(error => alert('Error al marcar el lote: ' + (error.response?.data || error.message)));
        }
    };
    
    const handleRegistrarLote = (e) => {
        e.preventDefault();
        const nuevoLote = { codigoLote, fechaProduccion, tipoProducto, cantidadProducida: parseInt(cantidadProducida, 10) };
        
        loteService.registrarLote(nuevoLote)
            .then(() => {
                alert('Nuevo lote registrado exitosamente.');
                setCodigoLote('');
                setFechaProduccion('');
                setCantidadProducida('');
                fetchLotes();
            })
            .catch(error => alert('Error al registrar el lote: ' + (error.response?.data || error.message)));
    };

    if (loading) return <Typography sx={{ p: 2 }}>Cargando inventario...</Typography>;

    return (
        <Grid container spacing={3}>
            {/* Formulario de Registro */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h5" gutterBottom>Registrar Nuevo Lote</Typography>
                    <Box component="form" onSubmit={handleRegistrarLote} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <TextField label="Código del Lote" value={codigoLote} onChange={e => setCodigoLote(e.target.value)} required />
                        <TextField type="date" value={fechaProduccion} onChange={e => setFechaProduccion(e.target.value)} required InputLabelProps={{ shrink: true }} label="Fecha de Producción" />
                        <FormControl sx={{ minWidth: 150 }}>
                            <InputLabel>Tipo de Producto</InputLabel>
                            <Select value={tipoProducto} label="Tipo de Producto" onChange={e => setTipoProducto(e.target.value)} required>
                                <MenuItem value="AtunAceite">Atún en Aceite</MenuItem>
                                <MenuItem value="AtunAgua">Atún en Agua</MenuItem>
                                <MenuItem value="AtunSalsa">Atún en Salsa</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField label="Cantidad Producida" type="number" value={cantidadProducida} onChange={e => setCantidadProducida(e.target.value)} required />
                        <Button type="submit" variant="contained">Registrar</Button>
                    </Box>
                </Paper>
            </Grid>

            {/* Tabla de Inventario */}
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Typography variant="h5" sx={{ p: 2 }}>Inventario Actual</Typography>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell>Código Lote</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Producido</TableCell>
                                <TableCell>Disponible</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lotes.map(lote => (
                                <TableRow key={lote.id}>
                                    <TableCell>{lote.codigoLote}</TableCell>
                                    <TableCell>{lote.tipoProducto}</TableCell>
                                    <TableCell>{lote.cantidadProducida}</TableCell>
                                    <TableCell>{lote.cantidadDisponible}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={lote.estado}
                                            color={lote.estado === 'Disponible' ? 'success' : lote.estado === 'Vendido' ? 'default' : 'error'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {lote.estado === 'Disponible' && (
                                            <Button variant="outlined" color="error" size="small" onClick={() => handleMarcarDefectuoso(lote.id)}>
                                                Marcar Defectuoso
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default GestionInventarioPage;