import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import '../Estilos/Preguntar.css';

function Preguntar() {
  return (
    <div className="container">
      <h1>Preguntas</h1>
      {/* Utiliza el componente Link para redirigir al usuario a otra página */}
      <Link to="/FormularioPregunta" className="agregar-btn">Agregar Pregunta</Link>
      <div className="preguntas-container">
        <div className="pregunta-columna">
          <h2>Pregunta</h2>
          <div className="pregunta-item">
            <p>Pregunta 1</p>
          </div>
          <div className="pregunta-item">
            <p>Pregunta 2</p>
          </div>
          <div className="pregunta-item">
            <p>Pregunta 3</p>
          </div>
        </div>
        <div className="respuesta-columna">
          <h2>Respuesta</h2>
          <div className="respuesta-item">
            <p>Respuesta 1</p>
          </div>
          <div className="respuesta-item">
            <p>Respuesta 2</p>
          </div>
          <div className="respuesta-item">
            <p>Respuesta 3</p>
          </div>
        </div>
        <div className="acciones-columna">
          <h2>Acciones</h2>
          <div className="accion-item">
            <button className="editar-btn">Editar</button>
            <button className="eliminar-btn">Eliminar</button>
          </div>
          <div className="accion-item">
            <button className="editar-btn">Editar</button>
            <button className="eliminar-btn">Eliminar</button>
          </div>
          <div className="accion-item">
            <button className="editar-btn"> <Link to={'/EditarPregunta'}>Editar</Link> {/* Usa "to" en lugar de "href" */}</button>
            <button className="eliminar-btn">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preguntar;
