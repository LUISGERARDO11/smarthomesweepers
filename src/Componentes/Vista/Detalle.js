import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Estilos/Detalle.css';

function Detalle() {
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://apismartsweepers.vercel.app/api/producto/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener el producto');
                }
                return response.json();
            })
            .then(data => {
                setProducto(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener el producto:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="detalle-container">
            <h2>Detalle del Producto</h2>
            {loading ? (
                <div>Cargando producto...</div>
            ) : error ? (
                <div>Error al obtener el producto: {error}</div>
            ) : (
                <div className="detalle-producto">
                    <div className="detalle-info">
                        <h3>{producto.nombre_producto}</h3>
                        <p className="descripcion">{producto.descripcion}</p>
                        <p className="precio">Precio: <span>${producto.precio_venta}</span></p>
                        <p>Costo de Producción: ${producto.costo_produccion}</p>
                        <p>Color: {producto.color}</p>
                        <div className="cantidad-container">
                            <button onClick={() => setCantidad(cantidad - 1)}>-</button>
                            <span>{cantidad}</span>
                            <button onClick={() => setCantidad(cantidad + 1)}>+</button>
                        </div>
                        <button className="comprar">Comprar</button>
                        <button className="comprar" onClick={() => window.location.href = '/Productos'}>Volver a Productos</button>
                    </div>
                    <div className="detalle-img">
                        <img src={producto.imagen} alt={producto.nombre_producto} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Detalle;

