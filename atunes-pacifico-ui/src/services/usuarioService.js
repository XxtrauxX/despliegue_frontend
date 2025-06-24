// Ubicación: src/services/usuarioService.js
import apiClient from './api';

const getAll = () => {
    return apiClient.get('/usuarios');
};

const registrar = (usuarioData) => {
    return apiClient.post('/usuarios', usuarioData);
};

const cambiarEstado = (id, estado) => {
    // Usamos `params` para enviar el estado como un query parameter
    return apiClient.patch(`/usuarios/${id}/estado`, null, { params: { estado } });
};

const usuarioService = {
    getAll,
    registrar,
    cambiarEstado,
};

export default usuarioService;