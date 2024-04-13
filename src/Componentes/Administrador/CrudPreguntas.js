import React, { useState, useEffect } from 'react';
import '../Estilos/CrudPreguntas.css';

function CrudFAQ() {
  const [faqs, setFAQs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    pregunta: '',
    respuesta: ''
  });
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('https://apismartsweepers.vercel.app/api/faq')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de preguntas frecuentes');
        }
        return response.json();
      })
      .then(data => {
        setFAQs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener preguntas frecuentes:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
        // Mostrar alerta de confirmación antes de eliminar
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta FAQ?");
        if (!confirmDelete) {
            return; // Cancelar la operación si el usuario no confirma la eliminación
        }

        const response = await fetch(
            `https://apismartsweepers.vercel.app/api/faq/${id}`,
            {
                method: "DELETE",
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al eliminar la FAQ");
        }

        alert("FAQ eliminada exitosamente");
        setFAQs(faqs.filter(faq => faq._id !== id));
    } catch (error) {
        console.error("Error al eliminar la FAQ:", error);
        alert(error.message || "Error en eliminación de FAQ");
    }
};


  const handleEdit = (id) => {
    const faqEdit = faqs.find(faq => faq._id === id);
    if (faqEdit) {
      setEditingFAQ(faqEdit);
      setFormData({
        pregunta: faqEdit.pregunta,
        respuesta: faqEdit.respuesta
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
      let endpoint = 'https://apismartsweepers.vercel.app/api/faq/';
      let method = 'POST';
      if (editingFAQ) {
        endpoint += `/${editingFAQ._id}`;
        method = 'PUT';
      }

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pregunta: formData.pregunta,
          respuesta: formData.respuesta
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar preguntas frecuentes");
      }

      alert(editingFAQ ? "FAQ actualizada exitosamente" : "FAQ registrada exitosamente");
      if (editingFAQ) {
        const updatedFAQs = faqs.map(faq => 
          faq._id === editingFAQ._id ? data : faq
        );
        setFAQs(updatedFAQs);
        setEditingFAQ(null);
      } else {
        setFAQs([...faqs, data]);
      }

      setFormData({
        pregunta: '',
        respuesta: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error(editingFAQ ? "Error al actualizar la FAQ:" : "Error al registrar la FAQ:", error);
      alert(error.message || "Error en registro de FAQ");
    }
  };

  const handleAddFAQ = () => {
    setEditingFAQ(null);
    setShowForm(true);
  };

  return (
    <div className="faq-container">
      <h2 className='pro'>Gestión de Preguntas Frecuentes</h2>

      <button onClick={handleAddFAQ}>Agregar Pregunta</button>

      {showForm && (
        <div className="faq-form">
          <h3>{editingFAQ ? 'Editar' : 'Agregar'} Pregunta</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Pregunta:</label>
              <input
                type="text"
                name="pregunta"
                value={formData.pregunta}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Respuesta:</label>
              <textarea
                name="respuesta"
                value={formData.respuesta}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div>
              <button type="submit">{editingFAQ ? 'Actualizar' : 'Agregar'} FAQ</button>
            </div>
          </form>
        </div>
      )}

      <div className="faq-list">
        <h3>Lista de Preguntas Frecuentes</h3>
        <ul>
          {loading ? (
            <li>Cargando...</li>
          ) : error ? (
            <li>Error: {error}</li>
          ) : (
            faqs.map(faq => (
              <li key={faq._id}>
                <strong>{faq.pregunta}</strong>
                <p>{faq.respuesta}</p>
                <button onClick={() => handleEdit(faq._id)}>Editar</button>
                <button onClick={() => handleDelete(faq._id)}>Eliminar</button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default CrudFAQ;
