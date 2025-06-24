// Ubicación: src/services/pedidoService.js
import apiClient from './api';

const getHistorial = () => {
    // Este endpoint debe devolver los pedidos del cliente autenticado.
    // El backend lo identificará a través del token JWT.
    return apiClient.get('/pedidos/historial'); 
};

const crearPedido = (pedidoData) => {
    return apiClient.post('/pedidos', pedidoData);
};

const pedidoService = {
    getHistorial,
    crearPedido
};

export default pedidoService;