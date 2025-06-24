import React, { useState, useEffect } from 'react';
import loteService from '../services/loteService';
import pedidoService from '../services/pedidoService';
import { useNavigate } from 'react-router-dom';
import { 
    Button, Grid, Typography, Paper, List, ListItem, ListItemText, 
    Divider, TextField, Card, CardContent, CardActions, CardMedia, Box, 
    CircularProgress, Alert 
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const imageMap = {
    AtunAceite: '/images/atun_aceite.webp',
    AtunAgua: '/images/atun_agua.webp',
    AtunSalsa: '/images/atun_aceite2.webp'
};

function CrearPedidoPage() {
    const [inventario, setInventario] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loteService.getInventario()
            .then(response => {
                const disponibles = response.data.filter(lote => lote.estado === 'Disponible' && lote.cantidadDisponible > 0);
                setInventario(disponibles);
            })
            .catch(err => {
                console.error("Error al cargar inventario:", err);
                setError("No se pudo cargar el catálogo de productos.");
            })
            .finally(() => setLoading(false));
    }, []);

    const agregarAlCarrito = (lote, cantidadInput) => {
        const cantidad = parseInt(cantidadInput, 10);
        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Por favor, introduce una cantidad válida.");
            return;
        }
        if (cantidad > lote.cantidadDisponible) {
            alert("La cantidad solicitada excede el stock disponible para este lote.");
            return;
        }

        
        
        setCarrito(prev => [...prev, { ...lote, cantidadPedido: cantidad }]);
        alert(`Añadido: ${cantidad} x ${lote.tipoProducto.replace('Atun', 'Atún ')}`);
    };

    const handleCrearPedido = () => {
        if (carrito.length === 0 || !fechaEntrega) {
            alert("Asegúrate de que tu carrito no esté vacío y de haber seleccionado una fecha de entrega.");
            return;
        }

        
        const pedidoData = {
            fechaEntrega: fechaEntrega,
            detalles: carrito.map(item => ({
                loteId: item.id,
                cantidad: item.cantidadPedido
            }))
        };

        
        pedidoService.crearPedido(pedidoData)
            .then(() => {
                alert("¡Pedido creado exitosamente!");
                navigate('/historial-compras'); 
            })
            .catch(err => {
                console.error("Error al crear el pedido:", err);
                const mensajeError = err.response?.data?.message || err.response?.data || err.message;
                alert(`Hubo un error al crear el pedido: ${mensajeError}`);
            });
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Grid container spacing={4}>
            {/* Columna de Productos Disponibles */}
            <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom>
                    Catálogo de Productos
                </Typography>
                <Grid container spacing={3}>
                    {inventario.map(lote => (
                        <Grid item xs={12} sm={6} lg={4} key={lote.id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={imageMap[lote.tipoProducto] || '/images/default.png'}
                                    alt={lote.tipoProducto}
                                    sx={{ objectFit: 'contain', pt: 2 }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {lote.tipoProducto.replace('Atun', 'Atún ')}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lote: {lote.codigoLote}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
                                        Disponibles: {lote.cantidadDisponible}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                                    <TextField 
                                        size="small" 
                                        type="number" 
                                        defaultValue="1" 
                                        id={`cantidad-${lote.id}`} 
                                        sx={{ width: '80px', mr: 1 }}
                                        InputProps={{ inputProps: { min: 1, max: lote.cantidadDisponible } }}
                                    />
                                    <Button 
                                        size="small" 
                                        variant="contained"
                                        startIcon={<AddShoppingCartIcon />}
                                        onClick={() => agregarAlCarrito(lote, document.getElementById(`cantidad-${lote.id}`).value)}
                                    >
                                        Añadir
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            {/* Columna del Carrito de Compras */}
            <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2, position: 'sticky', top: '88px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <ShoppingCartIcon sx={{ mr: 1, color: 'primary.main' }}/>
                        <Typography variant="h5">Mi Pedido</Typography>
                    </Box>
                    <List dense>
                        {carrito.length > 0 ? carrito.map((item, index) => (
                            <ListItem key={`${item.id}-${index}`} divider>
                                <ListItemText 
                                    primary={`${item.cantidadPedido} x ${item.tipoProducto.replace('Atun', 'Atún ')}`}
                                    secondary={`Lote: ${item.codigoLote}`} 
                                />
                            </ListItem>
                        )) : <Typography variant="body2" color="text.secondary">Añade productos al carrito.</Typography>}
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Fecha de Entrega"
                            type="date"
                            value={fechaEntrega}
                            onChange={e => setFechaEntrega(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleCrearPedido}
                            disabled={carrito.length === 0 || !fechaEntrega}
                            fullWidth
                            size="large"
                        >
                            Confirmar Pedido
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default CrearPedidoPage;