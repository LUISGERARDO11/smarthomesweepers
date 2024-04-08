import React, { useState } from 'react';
import '../Estilos/Registrar.css'; // Asegúrate de importar el CSS necesario

function Registrar() {
  const initialFormData = {
    nombre_producto: '',
    descripcion: '',
    color: '',
    precio_venta: '0',
    costo_produccion: '0',
    stock_disponible: '0',
    imagen: null // Usaremos un objeto imagen
  };

  const [formData, setFormData] = useState(initialFormData);

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
      const response = await fetch(
        'https://apismartsweepers.vercel.app/api/producto',
        {
          method: "POST",
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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar productos");
      }

      setFormData(initialFormData);

      console.log("Producto registrado exitosamente");
      alert("Producto registrado exitosamente");
    } catch (error) {
      console.error("Error al registrar el producto:", error);
      alert(error.message || "Error en registro de producto");
    }
  };

  return (
    <div className="registrar-producto">
      <h2>Registrar Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre Producto:</label>
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
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
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
          <label>Precio:</label>
          <input
            type="number"
            name="precio_venta"
            value={formData.precio_venta}
            onChange={handleChange}
            required
          />
          <label>Costo producción</label>
          <input
            type="number"
            name="costo_produccion"
            value={formData.costo_produccion}
            onChange={handleChange}
            required
          />
          <label>Stock</label>
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
          {formData.imagen && (
            <img src={formData.imagen} alt="Producto" />
          )}
          <input
            type="file"
            name="imagen"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit">Agregar producto</button>
        <button onClick={handleVerProductos}>Ver productos registrados</button>
      </form>
    </div>
  );
}

export default Registrar;