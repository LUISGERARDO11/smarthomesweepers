import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Estilos/Registrar.css';

function CrudProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre_producto: '',
    descripcion: '',
    color: '',
    precio_venta: '',
    costo_produccion: '',
    stock_disponible: '',
    imagen: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://apismartsweepers.vercel.app/api/producto/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar el producto");
      }

      alert("Producto eliminado exitosamente");
      setProductos(productos.filter(producto => producto._id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert(error.message || "Error en eliminación de producto");
    }
  };

  const handleEdit = (id) => {
    const productoEdit = productos.find(producto => producto._id === id);
    if (productoEdit) {
      setEditingProduct(productoEdit);
      setFormData({
        nombre_producto: productoEdit.nombre_producto,
        descripcion: productoEdit.descripcion,
        color: productoEdit.color,
        precio_venta: productoEdit.precio_venta,
        costo_produccion: productoEdit.costo_produccion,
        stock_disponible: productoEdit.stock_disponible,
        imagen: productoEdit.imagen,
      });
      setShowModal(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, imagen: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let endpoint = 'https://apismartsweepers.vercel.app/api/producto';
      let method = 'POST';
      if (editingProduct) {
        endpoint += `/${editingProduct._id}`;
        method = 'PUT';
      }

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          precio_venta: parseFloat(formData.precio_venta),
          costo_produccion: parseFloat(formData.costo_produccion),
          stock_disponible: parseInt(formData.stock_disponible, 10),
          margen_ganancia: parseFloat(formData.precio_venta) - parseFloat(formData.costo_produccion),
          precio_promocional: 0
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar productos");
      }

      alert(editingProduct ? "Producto actualizado exitosamente" : "Producto registrado exitosamente");
      if (editingProduct) {
        const updatedProducts = productos.map(producto => 
          producto._id === editingProduct._id ? data : producto
        );
        setProductos(updatedProducts);
        setEditingProduct(null);
      } else {
        setProductos([...productos, data]);
      }

      setFormData({
        nombre_producto: '',
        descripcion: '',
        color: '',
        precio_venta: '',
        costo_produccion: '',
        stock_disponible: '',
        imagen: null,
      });
      setShowModal(false);
    } catch (error) {
      console.error(editingProduct ? "Error al actualizar el producto:" : "Error al registrar el producto:", error);
      alert(error.message || "Error en registro de producto");
    }
  };

return (
  <div className="productos-container">
    <h2 className='pro'>Aspiradoras inteligentes</h2>
    
    {/* Modal de Registro de Producto */}
    {showModal && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => {
            setShowModal(false);
            setEditingProduct(null);
          }}>&times;</span>
          <h2>{editingProduct ? "Editar" : "Registrar"} Producto</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre del producto:</label>
              <input 
                type="text"
                name="nombre_producto"
                value={formData.nombre_producto}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Descripción:</label>
              <textarea 
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div>
              <label>Color:</label>
              <input 
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Precio de venta:</label>
              <input 
                type="number"
                name="precio_venta"
                value={formData.precio_venta}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Costo de producción:</label>
              <input 
                type="number"
                name="costo_produccion"
                value={formData.costo_produccion}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Stock disponible:</label>
              <input 
                type="number"
                name="stock_disponible"
                value={formData.stock_disponible}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Imagen:</label>
              <input 
                type="file"
                name="imagen"
                onChange={handleImageChange}
              />
            </div>
            <div className="button-container">
              <button type="submit">{editingProduct ? "Actualizar" : "Agregar"} producto</button>
            </div>
          </form>
        </div>
      </div>
    )}

    <button className="button-agregar" onClick={() => {
      setEditingProduct(null);
      setShowModal(true);
    }}>Agregar Producto</button>

    {loading ? (
      <div>Cargando productos...</div>
    ) : error ? (
      <div>Error al obtener los productos: {error}</div>
    ) : (
      <div className="tabla-container">
        <table className="tabla-productos">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(producto => (
              <tr key={producto._id}>
                <td>
                  <Link to={`/Detalle/${producto._id}`}>
                    <img src={producto.imagen} alt={producto.nombre_producto} />
                  </Link>
                </td>
                <td>{producto.nombre_producto}</td>
                <td>${producto.precio_venta}</td>
                <td>
                  <button className="button-editar" onClick={() => handleEdit(producto._id)}>Editar</button>
                  <button className="button-eliminar" onClick={() => handleDelete(producto._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

}

export default CrudProductos;