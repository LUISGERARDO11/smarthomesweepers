import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../Estilos/Asignacion.css';
import VerTodosLosDispositivos from './VerTodosLosDispositivos';

function Asignacion() {
  const [query, setQuery] = useState('');
  const [userId, setUserId] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(false);
  const [claveValidado, setClaveValidado] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  const [mostrarDispositivos, setMostrarDispositivos] = useState(false);
  const [dispositivoRegistrado, setDispositivoRegistrado] = useState(false);
  const [dispositivoInfo, setDispositivoInfo] = useState(null);

  const handleChangeClave = (event) => {
    const inputValue = event.target.value;

    // Limitar la longitud del valor de la clave a 6 caracteres
    if (inputValue.length <= 6) {
      setClave(inputValue);
      // Validar la clave con la expresión regular
      setClaveValidado(inputValue.match(/^[a-zA-Z0-9]*$/));
    }
  };

  const buscarUsuario = async () => {
    try {
      const response = await fetch(`https://apismartsweepers.vercel.app/api/usuarios/buscar/${query}`);
      const data = await response.json();
      if (data.exists) {
        setNombreCompleto(data.usuario.nombre_completo);
        setCorreo(data.usuario.correo);
        setUserId(data.usuario._id);
        setUsuarioEncontrado(true);
        setMostrarFormulario(true);
      } else {
        alert('No se encontró ningún usuario con esos datos');
        setNombreCompleto('');
        setCorreo('');
        setUserId('');
        setUsuarioEncontrado(false);
        setMostrarFormulario(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al buscar el usuario');
    }
  };

  const enviarDatos = async () => {
    if (nombreCompleto && correo && clave && claveValidado && userId) {

      try {
        // Verificar si ya existe un dispositivo con la misma clave
        const verificarResponse = await fetch(`https://apismartsweepers.vercel.app/api/dispositivo/clave/${clave}`);
        const verificarData = await verificarResponse.json();
  
        if (!verificarResponse.ok) {
          throw new Error('Error al verificar la clave del dispositivo');
        }
  
       
        // Si ya existe un dispositivo con la misma clave, mostrar alerta
         if (verificarData.exists) {
          alert('La clave ingresada ya está en uso. Por favor, elija una clave diferente.');
          return;
        }

        // Si no existe un dispositivo con la misma clave, proceder con la creación
        const dispositivoData = {
          nombre: "miAspiradora",
          clave: clave,
          estado: 'Inactivo',
          usuario_id: userId
        };
  
        const response = await fetch('https://apismartsweepers.vercel.app/api/dispositivo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dispositivoData)
        });
  
        if (!response.ok) {
          throw new Error('Error al agregar el dispositivo');
        }
        const dispositivoResponse = await response.json();
        const dispositivoId = dispositivoResponse._id;
        
        // Actualizar al usuario con el dispositivo recién agregado
        const actualizarUsuarioData = {
          id: userId,
          dispositivoId: dispositivoId
        };
        
        const actualizarUsuarioResponse = await fetch('https://apismartsweepers.vercel.app/api/usuarios/anadirdispositivos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(actualizarUsuarioData)
        });
        
        if (!actualizarUsuarioResponse.ok) {
          throw new Error('Error al actualizar el usuario con el dispositivo recién agregado');
        }
        
        // Mostrar la información del dispositivo registrado
        setDispositivoRegistrado(true);
        setDispositivoInfo({
          userId: userId,
          nombreCompleto: nombreCompleto,
          correo: correo,
          dispositivoId: dispositivoId,
          clave: clave,
          nombreDispositivo: "miAspiradora" // Puedes ajustar el nombre del dispositivo según sea necesario
        });
  
        alert('El dispositivo se ha registrado correctamente');
        
        // Ocultar el formulario después de enviar los datos correctamente
        setMostrarFormulario(false);
  
      } catch (error) {
        console.error('Error al verificar la clave del dispositivo:', error);
        alert('Ocurrió un error al verificar la clave del dispositivo');
      }
    } else {
      alert('Por favor ingresa todos los datos correctamente');
    }
  };

  const mostrarTodosDispositivos = async () => {
    setMostrarDispositivos(true);
  };
  


  return (
    <div>
      <nav className="navbar" style={{ paddingTop: '120px' }}>
        <div
          className={`navbar-item ${!mostrarDispositivos ? 'selected' : ''}`}
          onClick={() => setMostrarDispositivos(false)}
        >
          Asignar Dispositivo
        </div>
        <div
          className={`navbar-item ${mostrarDispositivos ? 'selected' : ''}`}
          onClick={() => setMostrarDispositivos(true)}
        >
          Mostrar Dispositivos
        </div>
      </nav>
      <div className="container4">
        <header className="pri">
          <div className="pricon">
            <h1 className="preg">Asignar Dispositivos</h1>
          </div>
        </header>
        <main>
          {!mostrarDispositivos && (
            <div className="input-container">
              <label htmlFor="buscarUsuario">Nombre o Correo del Usuario:</label>
              <input
                type="text"
                id="buscarUsuario"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nombre o Correo del Usuario"
              />
              <button onClick={buscarUsuario}><FaSearch /> Buscar Usuario</button>
            </div>
          )}
          {mostrarDispositivos && <VerTodosLosDispositivos />}
          {usuarioEncontrado && mostrarFormulario && !mostrarDispositivos && (
            <div>
              <div className="usuario-encontrado">
                <label htmlFor="nombreUsuario">Nombre del Usuario:</label>
                <input type="text" value={nombreCompleto} readOnly  id="nombreUsuario" />
                <label htmlFor="correoUsuario">Correo del Usuario:</label>
                <input type="text" value={correo} readOnly   id="correoUsuario"/>
              </div>
              <div className="input-container">
                <label htmlFor="claveUsuario">Clave del dispositivo</label>
                <input 
                  type="text"
                  value={clave}
                  onChange={handleChangeClave}
                  placeholder="Clave"
                  id="claveUsuario"
                />
                {!claveValidado && <p className="error-message">La clave solo puede contener letras y números</p>}
              </div>
              <button onClick={enviarDatos}>Asignar dispositivo</button>
              <button onClick={() => setMostrarFormulario(false)}>Cancelar</button>
            </div>
          )}
          {dispositivoRegistrado && (
            <div className="dispositivo-info">
              <h2>Información del ultimo Dispositivo Registrado</h2>
              <p>ID del Usuario: {dispositivoInfo.userId}</p>
              <p>Nombre Completo: {dispositivoInfo.nombreCompleto}</p>
              <p>Correo: {dispositivoInfo.correo}</p>
              <p>ID del Dispositivo: {dispositivoInfo.dispositivoId}</p>
              <p>Clave: {dispositivoInfo.clave}</p>
              <p>Nombre del Dispositivo: {dispositivoInfo.nombreDispositivo}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
  
}

export default Asignacion;
