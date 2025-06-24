// Ubicación: src/services/loteService.js
import apiClient from './api';

// Obtiene todos los lotes de producción (el inventario completo)
const getInventario = () => {
    return apiClient.get('/lotes');
};

// Marca un lote específico como defectuoso
const marcarComoDefectuoso = (id) => {
    // Usamos PATCH porque es una actualización parcial del estado del lote
    return apiClient.patch(`/lotes/${id}/marcar-defectuoso`);
};

// Registra un nuevo lote de producción
const registrarLote = (loteData) => {
    return apiClient.post('/lotes', loteData);
};


const loteService = {
    getInventario,
    marcarComoDefectuoso,
    registrarLote,
};

export default loteService;