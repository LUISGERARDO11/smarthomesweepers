import React, { useState } from 'react';
import '../Estilos/Registrar.css'; // Asegúrate de importar el CSS necesario

function RegistroContacto() {
  const initialFormData = {
    direccion: {
      pais: '',
      estado: '',
      ciudad: '',
      colonia: '',
      calle: '',
      codigo_postal: ''
    },
    email: '',
    telefono: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    if (e.target.name.includes("direccion.")) {
      const addressKey = e.target.name.split(".")[1];
      setFormData({
        ...formData,
        direccion: {
          ...formData.direccion,
          [addressKey]: e.target.value
        }
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://apismartsweepers.vercel.app/api/contacto',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar el contacto");
      }

      setFormData(initialFormData);

      console.log("Contacto registrado exitosamente");
      alert("Contacto registrado exitosamente");
    } catch (error) {
      console.error("Error al registrar el contacto:", error);
      alert(error.message || "Error en registro de contacto");
    }
  };

  const handleVerContactos = () => {
    window.location.href = "/contactosR"; // Asumiendo que tienes una ruta "/contactosR" para ver los contactos registrados
  };

  return (
    <div className="registrar-contacto">
      <h2>Registrar Nuevo Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>País:</label>
          <input
            type="text"
            name="direccion.pais"
            value={formData.direccion.pais}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Estado:</label>
          <input
            type="text"
            name="direccion.estado"
            value={formData.direccion.estado}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ciudad:</label>
          <input
            type="text"
            name="direccion.ciudad"
            value={formData.direccion.ciudad}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Colonia:</label>
          <input
            type="text"
            name="direccion.colonia"
            value={formData.direccion.colonia}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Calle:</label>
          <input
            type="text"
            name="direccion.calle"
            value={formData.direccion.calle}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Código Postal:</label>
          <input
            type="text"
            name="direccion.codigo_postal"
            value={formData.direccion.codigo_postal}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Agregar contacto</button>
        <button onClick={handleVerContactos}>Ver contactos registrados</button>
      </form>
    </div>
  );
}

export default RegistroContacto;
