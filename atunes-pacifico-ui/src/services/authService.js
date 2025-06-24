// Ubicación: src/services/authService.js
import axios from 'axios';

// La URL base de tu API, que configuraste en application.properties
const API_URL = 'http://localhost:8080/api/v1/auth';


const login = (nombreUsuario, contrasena) => {
    return axios.post(`${API_URL}/login`, {
        nombreUsuario,
        contrasena
    });
};

const authService = {
    login,
};

export default authService;