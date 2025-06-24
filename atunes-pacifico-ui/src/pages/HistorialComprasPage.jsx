// Ubicación: src/pages/HistorialComprasPage.jsx

import React, { useState, useEffect } from 'react';
import pedidoService from '../services/pedidoService'; // Asegúrate de que este servicio exista

function HistorialComprasPage() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Asumimos que tienes un método en tu servicio para obtener el historial
        pedidoService.getHistorial()
            .then(response => {
                setPedidos(response.data);
            })
            .catch(err => {
                console.error("Error al obtener el historial:", err);
                setError("No se pudo cargar el historial de compras.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

    if (loading) return <p>Cargando historial de compras...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Mi Historial de Compras</h2>
            {pedidos.length === 0 ? (
                <p>No has realizado ningún pedido todavía.</p>
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
                                <td>{pedido.estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default HistorialComprasPage;