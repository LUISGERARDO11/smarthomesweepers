import React, { useState, useEffect } from 'react';
import '../Estilos/QuienesSomos.css';

function QuienesSomos() {
  const [politica, setPolitica] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch('https://apismartsweepers.vercel.app/api/politica')
      .then((res) => res.json())
      .then((data) => {
        setPolitica(data);
        setLoad(true);
      })
      .catch((err) => console.error('Ocurrió un error:', err)); // Manejar el error adecuadamente
  }, []);

  return (
    <div className="container">
      {load ? (
        politica.map((item, index) => (
          <div key={index} className="section">
            <div className="left">
              <img src={item.image} alt={`Imagen ${item.titulo}`} />
            </div>
            <div className="right">
              <h2>{item.titulo}</h2>
              <p>{item.descripcion}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default QuienesSomos;
