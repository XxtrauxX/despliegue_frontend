// Ubicación: src/pages/MisPedidosPage.jsx
import React, { useState, useEffect } from 'react';
import pedidoService from '../services/pedidoService'; // Asegúrate de que este servicio exista y esté correcto

function MisPedidosPage() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true); // 1. Estado para saber si estamos cargando datos
    const [error, setError] = useState(null);     // 2. Estado para manejar posibles errores

    useEffect(() => {
        // Este efecto se ejecuta cuando el componente se monta por primera vez
        pedidoService.getHistorial()
            .then(response => {
                // Éxito: guardamos los pedidos en el estado
                setPedidos(response.data);
            })
            .catch(err => {
                // Error: guardamos el mensaje de error para mostrarlo al usuario
                console.error("Error al obtener el historial de pedidos:", err);
                setError("No se pudo cargar tu historial. Por favor, intenta de nuevo más tarde.");
            })
            .finally(() => {
                // Haya éxito o error, dejamos de cargar
                setLoading(false);
            });
    }, []); // El array vacío asegura que se ejecute solo una vez.

    // 3. Lógica de renderizado condicional
    if (loading) {
        return <p>Cargando tus pedidos...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    // 4. Renderizado cuando ya tenemos los datos
    return (
        <div>
            <h2>Mis Pedidos</h2>
            {pedidos.length === 0 ? (
                <p>Aún no has realizado ningún pedido.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID Pedido</th>
                            <th>Fecha de Pedido</th>
                            <th>Fecha de Entrega</th>
                            <th>Precio Total</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map(pedido => (
                            <tr key={pedido.id}>
                                <td>#{pedido.id}</td>
                                <td>{new Date(pedido.fechaPedido).toLocaleDateString()}</td>
                                <td>{new Date(pedido.fechaEntrega).toLocaleDateString()}</td>
                                <td>${pedido.precioTotal.toFixed(2)}</td>
                                <td style={{ fontWeight: 'bold' }}>{pedido.estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default MisPedidosPage;