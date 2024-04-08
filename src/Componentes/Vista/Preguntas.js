import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'; // Importa los iconos de flecha

import '../Estilos/Preguntas.css';

function Preguntas() {
  const [preguntas, setPreguntas] = useState([]);
  const [expandedSections, setExpandedSections] = useState([]);

  useEffect(() => {
    fetch('https://apismartsweepers.vercel.app/api/faq')
      .then(response => response.json())
      .then(data => setPreguntas(data))
      .catch(error => console.error('Error fetching preguntas data:', error));
  }, []);

  const toggleSection = (index) => {
    if (expandedSections.includes(index)) {
      setExpandedSections(expandedSections.filter((item) => item !== index));
    } else {
      setExpandedSections([...expandedSections, index]);
    }
  };

  return (
    <div className="container">
      <header className="pri">
        <div className="pricon">
          <h1 className="pre">Preguntas Frecuentes</h1>
        </div>
      </header>
      <main >
        <div className="faq-container">
          {preguntas.map((pregunta, index) => (
            <section className="faq-section" key={index}>
              <div className="faq-question">
                <div className={`toggle-icon ${expandedSections.includes(index) ? 'active' : ''}`} onClick={() => toggleSection(index)}>
                  {expandedSections.includes(index) ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                </div>
                <h2 onClick={() => toggleSection(index)}>{pregunta.pregunta}</h2>
              </div>
              {expandedSections.includes(index) && (
                <p>{pregunta.respuesta}</p>
              )}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Preguntas;
