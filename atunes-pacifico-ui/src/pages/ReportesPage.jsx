// Ubicación: src/pages/ReportesPage.jsx
import React, { useState, useEffect } from 'react';
import reporteService from '../services/reporteService';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function ReportesPage() {
    const [ventasProductoData, setVentasProductoData] = useState(null);
    const [ventasClienteData, setVentasClienteData] = useState(null);
    const [inventarioData, setInventarioData] = useState(null);

    useEffect(() => {
        
        reporteService.getVentasPorProducto()
            .then(response => {
                const dataFromApi = response.data;
                const chartData = {
                    labels: dataFromApi.map(d => d.tipoProducto.replace('Atun', 'Atún ')),
                    datasets: [{
                        label: 'Total de Ventas ($)',
                        data: dataFromApi.map(d => d.totalVentas),
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    }]
                };
                setVentasProductoData(chartData);
            })
            .catch(error => console.error("Error al cargar reporte de productos:", error));

        
        reporteService.getVentasPorCliente()
            .then(response => {
                const dataFromApi = response.data;
                const chartData = {
                    labels: dataFromApi.map(d => d.nombreCliente),
                    datasets: [{
                        label: 'Total Comprado ($)',
                        data: dataFromApi.map(d => d.totalComprado),
                        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)'],
                    }]
                };
                setVentasClienteData(chartData);
            })
            .catch(error => console.error("Error al cargar reporte de clientes:", error));
            
        
        reporteService.getReporteInventario()
            .then(response => {
                const dataFromApi = response.data;
                const chartData = {
                    labels: dataFromApi.map(d => d.estado),
                    datasets: [{
                        label: 'Cantidad de Lotes',
                        data: dataFromApi.map(d => d.cantidad),
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(255, 99, 132, 0.6)'
                        ],
                        hoverOffset: 4
                    }]
                };
                setInventarioData(chartData);
            })
            .catch(error => console.error("Error al cargar reporte de inventario:", error));

    }, []);

    return (
        <div>
            <h2>Panel de Reportes de la Empresa</h2>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                {/* Gráfico de Ventas por Producto */}
                <div style={{ flex: '1 1 40%', minWidth: '350px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}>
                    <h3>Ventas Totales por Tipo de Producto</h3>
                    {ventasProductoData ? <Bar data={ventasProductoData} /> : <p>Cargando...</p>}
                </div>

                {/* Gráfico de Ventas por Cliente */}
                <div style={{ flex: '1 1 40%', minWidth: '350px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}>
                    <h3>Contribución de Ventas por Cliente</h3>
                    {ventasClienteData ? <Pie data={ventasClienteData} /> : <p>Cargando...</p>}
                </div>
                
                {/* Gráfico de Estado de Inventario */}
                <div style={{ flex: '1 1 40%', minWidth: '350px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}>
                    <h3>Estado del Inventario (por Lotes)</h3>
                    {inventarioData ? <Doughnut data={inventarioData} /> : <p>Cargando...</p>}
                </div>
            </div>
        </div>
    );
}

export default ReportesPage;