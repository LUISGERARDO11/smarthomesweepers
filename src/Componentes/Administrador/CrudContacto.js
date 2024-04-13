import React, { useState, useEffect } from 'react';
import '../Estilos/ContactoAdmin.css';

function CrudContacto() {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre_empresa: '',
    pais: '',
    estado: '',
    ciudad: '',
    colonia: '',
    calle: '',
    codigo_postal: '',
    correo: '',
    telefono: ''
  });
  const [editingContacto, setEditingContacto] = useState(null);

  useEffect(() => {
    fetch('https://apismartsweepers.vercel.app/api/contacto')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de contactos');
        }
        return response.json();
      })
      .then(data => {
        setContactos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener contactos:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    const contactoEdit = contactos.find(contacto => contacto._id === id);
    if (contactoEdit) {
      setEditingContacto(contactoEdit);
      setFormData({
        nombre_empresa: contactoEdit.nombre_empresa,
        pais: contactoEdit.direccion ? contactoEdit.direccion.pais : '',
        estado: contactoEdit.direccion ? contactoEdit.direccion.estado : '',
        ciudad: contactoEdit.direccion ? contactoEdit.direccion.ciudad : '',
        colonia: contactoEdit.direccion ? contactoEdit.direccion.colonia : '',
        calle: contactoEdit.direccion ? contactoEdit.direccion.calle : '',
        codigo_postal: contactoEdit.direccion ? contactoEdit.direccion.codigo_postal : '',
        correo: contactoEdit.correo,
        telefono: contactoEdit.telefono
      });
      setShowModal(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let endpoint = 'https://apismartsweepers.vercel.app/api/contacto';
      let method = 'POST';
      if (editingContacto) {
        endpoint += `/${editingContacto._id}`;
        method = 'PUT';
      }

      const direccion = {
        pais: formData.pais,
        estado: formData.estado,
        ciudad: formData.ciudad,
        colonia: formData.colonia,
        calle: formData.calle,
        codigo_postal: formData.codigo_postal
      };

      const bodyData = {
        nombre_empresa: formData.nombre_empresa,
        rfc: 'RFC',
        direccion: direccion,
        telefono: formData.telefono,
        correo: formData.correo,
        horario_atencion: 'Horario de atención',
        redes_sociales: [], 
        ultima_actualizacion: new Date().toISOString() 
      };

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Error al registrar contactos");
      }

      alert(editingContacto ? "Contacto actualizado exitosamente" : "Contacto registrado exitosamente");
      
      if (editingContacto) {
        const updatedContactos = contactos.map(contacto => 
          contacto._id === editingContacto._id ? responseData : contacto
        );
        setContactos(updatedContactos);
        setEditingContacto(null);
      } else {
        setContactos([...contactos, responseData]);
      }

      setFormData({
        nombre_empresa: '',
        pais: '',
        estado: '',
        ciudad: '',
        colonia: '',
        calle: '',
        codigo_postal: '',
        correo: '',
        telefono: ''
      });
      setShowModal(false);
    } catch (error) {
      console.error(editingContacto ? "Error al actualizar el contacto:" : "Error al registrar el contacto:", error);
      alert(error.message || "Error en registro de contacto");
    }
  };

  return (
    <div className="contactos-container">
      <h2 className='pro'>Gestión de Contactos</h2>
      
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => {
              setShowModal(false);
              setEditingContacto(null);
            }}>&times;</span>
            <h2>{editingContacto ? "Editar" : "Registrar"} Contacto</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Nombre de la Empresa:</label>
                <input 
                  type="text"
                  name="nombre_empresa"
                  value={formData.nombre_empresa}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>País:</label>
                <input 
                  type="text"
                  name="pais"
                  value={formData.pais}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Estado:</label>
                <input 
                  type="text"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Ciudad:</label>
                <input 
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Colonia:</label>
                <input 
                  type="text"
                  name="colonia"
                  value={formData.colonia}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Calle:</label>
                <input 
                  type="text"
                  name="calle"
                  value={formData.calle}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Código Postal:</label>
                <input 
                  type="text"
                  name="codigo_postal"
                  value={formData.codigo_postal}
                  onChange={handleChange
                  }
                  required
                />
              </div>
              <div>
                <label>Correo Electrónico:</label>
                <input 
                  type="email"
                  name="correo"
                  value={formData.correo}
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
              <div className="button-container">
                <button type="submit">{editingContacto ? "Actualizar" : "Registrar"} Contacto</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {!editingContacto && (
        <div className="contact-list">
          <h3>Lista de Contactos</h3>
          <ul>
            {loading ? (
              <li>Cargando...</li>
            ) : error ? (
              <li>Error: {error}</li>
            ) : (
              contactos.map(contacto => (
                <li key={contacto._id}>
                  {contacto.nombre_empresa} - {contacto.telefono}
                  <button onClick={() => handleEdit(contacto._id)}>Editar</button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CrudContacto;

