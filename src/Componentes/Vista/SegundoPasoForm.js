import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SegundoPasoForm = () => {
    const { state } = useLocation();
    const { nombre: initialNombre, correo: initialCorreo, numero: initialNumero, pais: initialPais, estado: initialEstado, ciudad: initialCiudad, colonia: initialColonia, calle: initialCalle, codigoPostal: initialCodigoPostal, referencia: initialReferencia } = state || {};
  
    const [nombre, setNombre] = useState(initialNombre || '');
    const [correo, setCorreo] = useState(initialCorreo || '');
    const [numero, setNumero] = useState(initialNumero || '');
    const [pais, setPais] = useState(initialPais || '');
    const [estado, setEstado] = useState(initialEstado || '');
    const [ciudad, setCiudad] = useState(initialCiudad || '');
    const [colonia, setColonia] = useState(initialColonia || '');
    const [calle, setCalle] = useState(initialCalle || '');
    const [codigoPostal, setCodigoPostal] = useState(initialCodigoPostal || '');
    const [referencia, setReferencia] = useState(initialReferencia || '');

  const navigate = useNavigate();

  const handleBackToFirstStep = () => {
    navigate('/Registro', {
      state: {
        nombre,
        correo,
        numero
      }
    });
  };

  const handleNext = () => {
    if (pais.trim() === '' || estado.trim() === '' || ciudad.trim() === '' || colonia.trim() === '' || calle.trim() === '' || codigoPostal.trim() === '' || referencia.trim() === '') {
      alert('Por favor, complete todos los campos.');
      return;
    }
    navigate('/TercerPasoForm', {
      state: {
        nombre,
        correo,
        numero,
        pais,
        estado,
        ciudad,
        colonia,
        calle,
        codigoPostal,
        referencia
      }
    });
  };

  return (
    <div style={styles.container}>

      <div style={{ backgroundColor: '#ECF0F1', marginTop: 40, padding: '0 20px' }}>
        <h1 style={styles.bigTextTitle}>Registro</h1>
        <p style={{ fontSize: 24, paddingTop: 10, textAlign: 'center', paddingBottom: 15, fontWeight: 'bold' }}>Dirección</p>
        <p style={{ fontSize: 17, textAlign: 'center', paddingBottom: 15, fontWeight: 'bold' }}>2 de 3</p>
      </div>

      <div style={styles.inputPairContainer}>
        <div style={{ ...styles.inputColumn }}>
          <label>
            País:
            <input
              type="text"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              style={styles.input}
            />
          </label>
          <label>
            Ciudad:
            <input
              type="text"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              style={styles.input}
            />
          </label>
          <label>
            Calle:
            <input
              type="text"
              value={calle}
              onChange={(e) => setCalle(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>
        <div style={{ ...styles.inputColumn, marginRight: 16, marginLeft: 20 }}>
          <label>
            Estado:
            <input
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              style={styles.input}
            />
          </label>
          <label>
            Colonia:
            <input
              type="text"
              value={colonia}
              onChange={(e) => setColonia(e.target.value)}
              style={styles.input}
            />
          </label>
          <label>
            Código Postal:
            <input
              type="text"
              value={codigoPostal}
              onChange={(e) => setCodigoPostal(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>
      </div>

      <div style={styles.bottomContainer}>
        <label>
          Referencia (Destino de entrega de productos):
          <textarea
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
            style={styles.textarea}
          />
        </label>
      </div>

      <div style={{ display: 'flex', justifyContent: ' space-evenly', paddingTop: 30 }}>
        <button style={styles.button} onClick={handleBackToFirstStep}>Anterior</button>
        <button style={styles.button} onClick={handleNext}>Siguiente</button>
      </div>

    </div>
  );
};

export default SegundoPasoForm;

const styles = {
  container: {
    backgroundColor: '#ECF0F1',
    marginTop: 40,
    padding: '0 20px',
  },
  bigTextTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 70,
  },
  bigTextSubTitle: {
    fontSize: 24,
    paddingTop: 10,
    textAlign: 'center',
    paddingBottom: 15,
    fontWeight: 'bold',
  },
  inputPairContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  inputColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: '12px 20px',
    marginBottom: 15,
    width: '130%',
    boxSizing: 'border-box',
  },
  bottomContainer: {
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  bigTextSubSubTitle: {
    fontSize: 17,
    textAlign: 'center',
    paddingBottom: 15,
    fontWeight: 'bold',
  },
  textarea: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: '12px 10px',
    marginBottom: 15,
    boxSizing: 'border-box',
    width: '100%',
  },
  button: {
    backgroundColor: '#043464',
    borderRadius: 5,
    padding: '12px 20px',
    borderWidth: 1,
    borderColor: '#ECF0F1',
    color: '#ECF0F1',
    cursor: 'pointer',
  },
};
