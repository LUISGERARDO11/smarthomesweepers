import React, { useState, useEffect } from 'react';
import '../Estilos/PoliticasAdmin.css';

function CrudPoliticas() {
  const [politicas, setPoliticas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: ''
  });
  const [editingPolitica, setEditingPolitica] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('https://apismartsweepers.vercel.app/api/politica')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de políticas');
        }
        return response.json();
      })
      .then(data => {
        setPoliticas(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener políticas:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
        // Mostrar alerta de confirmación antes de eliminar
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta política?");
        if (!confirmDelete) {
            return; // Cancelar la operación si el usuario no confirma la eliminación
        }

        const response = await fetch(
            `https://apismartsweepers.vercel.app/api/politica/${id}`,
            {
                method: "DELETE",
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al eliminar la política");
        }

        alert("Política eliminada exitosamente");
        setPoliticas(politicas.filter(politica => politica._id !== id));
    } catch (error) {
        console.error("Error al eliminar la política:", error);
        alert(error.message || "Error en eliminación de política");
    }
};


  const handleEdit = (id) => {
    const politicaEdit = politicas.find(politica => politica._id === id);
    if (politicaEdit) {
      setEditingPolitica(politicaEdit);
      setFormData({
        titulo: politicaEdit.titulo,
        descripcion: politicaEdit.descripcion
      });
      setShowForm(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Datos a enviar:", formData);
      console.log("ID de edición:", editingPolitica?._id);

      let endpoint = 'https://apismartsweepers.vercel.app/api/politica';
      let method = 'POST';
      if (editingPolitica) {
        endpoint += `/${editingPolitica._id}`;
        method = 'PUT';
      }

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: formData.titulo,
          descripcion: formData.descripcion
        }),
      });

      const data = await response.json();

      console.log("Respuesta del servidor:", data);

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar políticas");
      }

      alert(editingPolitica ? "Política actualizada exitosamente" : "Política registrada exitosamente");
      if (editingPolitica) {
        const updatedPoliticas = politicas.map(politica => 
          politica._id === editingPolitica._id ? data : politica
        );
        setPoliticas(updatedPoliticas);
        setEditingPolitica(null);
      } else {
        setPoliticas([...politicas, data]);
      }

      setFormData({
        titulo: '',
        descripcion: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error(editingPolitica ? "Error al actualizar la política:" : "Error al registrar la política:", error);
      alert(error.message || "Error en registro de política");
    }
  };

  const handleAddPolitica = () => {
    setEditingPolitica(null);
    setShowForm(true);
  };

  return (
    <div className="politicas-container">
      <h2 className='pro'>Gestión de Políticas</h2>

      <button onClick={handleAddPolitica}>Agregar Política</button>

      {showForm && (
        <div className="politica-form">
          <h3>{editingPolitica ? 'Editar' : 'Agregar'} Política</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Título:</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
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
                style={{ width: "100%", height:"150px" }}
                required
              ></textarea>
            </div>
            <div>
              <button type="submit">{editingPolitica ? 'Actualizar' : 'Agregar'} Política</button>
            </div>
          </form>
        </div>
      )}

      <div className="politicas-list">
        <h3>Lista de Políticas</h3>
        <ul>
          {loading ? (
            <li>Cargando...</li>
          ) : error ? (
            <li>Error: {error}</li>
          ) : (
            politicas.map(politica => (
              <li key={politica._id}>
                <div className="politica-container2">
                  <strong>{politica.titulo}</strong>
                  <p>{politica.descripcion}</p>
                </div>
                
                  <button onClick={() => handleEdit(politica._id)}>Editar</button>
                  <button onClick={() => handleDelete(politica._id)}>Eliminar</button>
              
              </li>
            ))
            
          )}
        </ul>
      </div>
    </div>
  );
}

export default CrudPoliticas;
