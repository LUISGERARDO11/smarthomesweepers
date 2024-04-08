import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Estilos/Productos.css';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://apismartsweepers.vercel.app/api/producto')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener la lista de productos');
                }
                return response.json();
            })
            .then(data => {
                setProductos(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="productos-container">
            <h2 className='pro'>Aspiradoras inteligentes</h2>
            {loading ? (
                <div>Cargando productos...</div>
            ) : error ? (
                <div>Error al obtener los productos: {error}</div>
            ) : (
                <div className="tarjetas-producto">
                    {productos.map(producto => (
                        <div key={producto._id} className="tarjeta">
                            <Link to={`/Detalle/${producto._id}`}>
                                <img src={producto.imagen} alt={producto.nombre_producto} />
                            </Link>
                            <h3>{producto.nombre_producto}</h3>
                            <p>Precio: ${producto.precio_venta}</p>
                            {producto.precio_promocional > 0 && <p>Precio promocional: ${producto.precio_promocional}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Productos;

