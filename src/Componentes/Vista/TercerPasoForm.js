import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

const TercerPasoForm = () => {
  const location = useLocation();
  const { nombre, correo, numero, pais, estado, ciudad, colonia, calle, codigoPostal, referencia } = location.state || {};
  
  const [contra, setContra] = useState('');
  const [res, setRes] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleBackToSecondStep = () => {
    navigate('/SegundoPasoForm', {
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

  const generateRandomToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const tokenLength = 6;
    let token = '';

    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }

    return token;
  };

  const handleNext = async () => {
    if (contra.trim() === '' || res.trim() === '' || !selectedOption) { // Añade la verificación de la opción seleccionada
      alert('Por favor, complete todos los campos y seleccione una opción.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(contra)) {
      alert('La contraseña debe tener al menos una minúscula, una mayúscula, un número, un carácter especial y al menos 8 caracteres.');
      return;
    }

    setLoading(true); // Activar el estado de carga

    try {
      const response = await fetch('https://apismart.onrender.com/api/usuarios2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_completo: nombre,
          correo: correo,
          tipo: 'cliente',
          contrasenia: contra,
          pregunta_secreta: selectedOption,
          respuesta_secreta: res,
          token_acceso: generateRandomToken(),
          fecha_registro: new Date(),
          direccion: {
            pais: pais,
            estado: estado,
            ciudad: ciudad,
            colonia: colonia,
            calle: calle,
            codigo_postal: codigoPostal,
            referencia: referencia
          },
          telefono: numero,
          dispositivos: []
        }),
      });
    
      const data = await response.json();
    
      if (response.ok) {
        // Verifica si data tiene un valor antes de guardarlo
        if (data) {
          alert('Usuario registrado exitosamente');
          navigate('/Login', {
          });
          
        } else {
          alert('Error al registrar el usuario: datos de sesión no encontrados en la respuesta');
          navigate('/Home', {
          });
          
        }
      } else {
        alert('Error al registrar el usuario');
        navigate('/Home', {
          });
        
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.bigTextTitle}>Registro</h1>
      <p style={styles.bigTextSubTitle}>Información de acceso</p>
      <p style={styles.bigTextSubSubTitle}>3 de 3</p>

      <div style={styles.bottomContainer}>
        <label>
          Contraseña:
          <input
            type="password"
            value={contra}
            onChange={(e) => setContra(e.target.value)}
            style={styles.input}
          />
        </label>
        <label>
          Pregunta de recuperación:
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            style={styles.input}
          >
            <option value="">Seleccionar pregunta...</option>
            <option value="¿Cuál es el nombre de tu primera mascota?">¿Cuál es el nombre de tu primera mascota?</option>
            <option value="¿Cuál es tu canción favorita?">¿Cuál es tu canción favorita?</option>
            <option value="¿En qué ciudad nació tu madre?">¿En qué ciudad nació tu madre?</option>
            <option value="¿Cuál es tu comida favorita?">¿Cuál es tu comida favorita?</option>
            <option value="¿Cuál es el nombre de tu mejor amigo de la infancia?">¿Cuál es el nombre de tu mejor amigo de la infancia?</option>
          </select>
        </label>
        <label>
          Respuesta:
          <input
            type="text"
            value={res}
            onChange={(e) => setRes(e.target.value)}
            style={styles.input}
          />
        </label>
      </div>

      <div style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <button style={styles.button} onClick={handleBackToSecondStep}>Anterior</button>
        <div style={{ width: 30 }} />
        <button
          style={{ ...styles.button, backgroundColor: loading ? '#ccc' : '#043464' }}
          onClick={handleNext}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Registrar'}
        </button>
      </div>
    </div>
  );
};

export default TercerPasoForm;

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
  },
  bigTextSubTitle: {
    fontSize: 24,
    paddingTop: 10,
    textAlign: 'center',
    paddingBottom: 15,
    fontWeight: 'bold',
  },
  bigTextSubSubTitle: {
    fontSize: 17,
    textAlign: 'center',
    paddingBottom: 15,
    fontWeight: 'bold',
  },
  bottomContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: '12px 10px',
    marginBottom: 15,
    width: '100%',
    boxSizing: 'border-box',
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
