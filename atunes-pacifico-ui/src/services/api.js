import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;


if (!API_URL) {
    throw new Error("La variable de entorno VITE_API_URL no está configurada. Asegúrate de añadirla a tu configuración de Vercel o a tu archivo .env.local para desarrollo.");
}


const apiClient = axios.create({
    baseURL: `${API_URL}/api/v1`,
});


apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Maneja errores en la configuración de la petición.
        return Promise.reject(error);
    }
);

export default apiClient;
