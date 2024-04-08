import React, { useState } from 'react';
import '../Estilos/FormularioPregunta.css';

const FormularioPregunta = ({ agregarPregunta }) => {
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar los datos del formulario aquí si es necesario
    // Luego, llamar a la función para agregar la pregunta
    agregarPregunta({ pregunta, respuesta });
    // Limpiar los campos del formulario después de agregar la pregunta
    setPregunta('');
    setRespuesta('');
  };

  return (
    <form  className= 'formulario-pregunta'onSubmit={handleSubmit}>
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

      <button type="submit">Agregar Pregunta</button>
    </form>
  );
};

export default FormularioPregunta;
