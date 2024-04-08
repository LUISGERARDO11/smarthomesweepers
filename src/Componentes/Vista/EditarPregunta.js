import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Estilos/EditarPregunta.css';

const EditarPregunta = ({ preguntaExistente, EditarPregunta }) => {
  // Utiliza preguntaExistente para inicializar el estado si se está editando una pregunta existente
  const [pregunta, setPregunta] = useState(preguntaExistente ? preguntaExistente.pregunta : '');
  const [respuesta, setRespuesta] = useState(preguntaExistente ? preguntaExistente.respuesta : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar los datos del formulario aquí si es necesario
    // Luego, llamar a la función para editar la pregunta
    EditarPregunta({ pregunta, respuesta });
  };

  return (
    <form  className = 'formulario-pregunta'onSubmit={handleSubmit}>
      <label htmlFor="pregunta">Pregunta:</label>
      <input
        type="text"
        id="pregunta"
        value={pregunta}
        onChange={(e) => setPregunta(e.target.value)}
        required
      />

      <label htmlFor="respuesta">Respuesta:</label>
      <textarea
        id="respuesta"
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
        required
      ></textarea>

      {/* Cambia el texto del botón a "Editar" */}
      <button type="submit">Editar</button>
    </form>
  );
};

export default EditarPregunta;
