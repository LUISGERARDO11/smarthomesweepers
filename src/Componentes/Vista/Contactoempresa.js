import React from 'react';
import '../Estilos/Preguntar.css';

function Contactoempresa() {
  return (
    <div className="container">
      <div className="preguntas-container">
        <div className="pregunta-columna">
          <h2>Empresa</h2>
          <div className="pregunta-item">
            <p>SMART HOME</p>
          </div>
        </div>
        <div className="respuesta-columna">
          <h2>Direccion</h2>
          <div className="respuesta-item">
            <p>Calle principal</p>
          </div>
        </div>
        <div className="pregunta-columna">
          <h2>Contacto</h2>
          <div className="pregunta-item">
            <p>1122334455</p>
          </div>
        </div>
        <div className="pregunta-columna">
          <h2>Facebook</h2>
          <div className="pregunta-item">
            <p>http//www.Facebook.com</p>
          </div>
        </div>
        <div className="pregunta-columna">
          <h2>Twitter</h2>
          <div className="pregunta-item">
            <p>http//www.Twitter.com</p>
          </div>
        </div>
        <div className="acciones-columna">
          <h2>Acciones</h2>
          <div className="accion-item">
            <button className="editar-btn">Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactoempresa;