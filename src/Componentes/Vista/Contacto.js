import React, { useState, useEffect } from 'react';
import '../Estilos/Contacto.css';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

function Contacto() {
  const [contactoData, setContactoData] = useState(null);

  useEffect(() => {
    fetch('https://apismartsweepers.vercel.app/api/contacto')
      .then(response => response.json())
      .then(data => setContactoData(data[0]))
      .catch(error => console.error('Error fetching contacto data:', error));
  }, []);

  return (
    <div className="container">
      <main className="main">
        <div className="info-container">
          <div className="contact-info">
            <h2>Información de Contacto</h2>
            {contactoData && contactoData.direccion && (
              <>
                <p>Dirección: {contactoData.direccion.calle}, {contactoData.direccion.ciudad}, {contactoData.direccion.pais}</p>
                <p>Email: {contactoData.correo}</p>
                <p>Teléfono: {contactoData.telefono}</p>
              </>
            )}
          </div>
          <div className="icons">
            <div className="icon">
              <FaEnvelope />
              {contactoData && <p>{contactoData.correo}</p>}
            </div>
            <div className="icon">
              <FaPhone />
              {contactoData && <p>{contactoData.telefono}</p>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
  
}

export default Contacto;
