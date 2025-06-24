import apiClient from './api';

/**
 * Obtiene los datos del reporte de ventas agrupadas por tipo de producto.
 * @returns {Promise} Una promesa de Axios con los datos del reporte.
 */
const getVentasPorProducto = () => {
    return apiClient.get('/reportes/ventas-por-producto');
};

/**
 * Obtiene los datos del reporte de ventas agrupadas por cliente.
 * @returns {Promise} Una promesa de Axios con los datos del reporte.
 */
const getVentasPorCliente = () => {
    return apiClient.get('/reportes/ventas-por-cliente');
};

/**
 * Obtiene estadísticas del inventario, contando lotes por estado.
 * @returns {Promise} Una promesa de Axios con los datos del reporte.
 */
const getReporteInventario = () => { // --- MÉTODO NUEVO AÑADIDO ---
    return apiClient.get('/reportes/inventario');
};

const reporteService = {
    getVentasPorProducto,
    getVentasPorCliente,
    getReporteInventario,
};

export default reporteService;