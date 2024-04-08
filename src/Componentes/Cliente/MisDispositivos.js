import React, { useState, useEffect } from 'react';
import { FaRobot, FaPowerOff, FaPlus, FaTrash, FaThermometerHalf, FaTint } from 'react-icons/fa';
import AgregarDispositivo from './AgregarDispositivo';

import '../Estilos/MisDispositivos.css';

function MisDispositivos() {
  const [usuario, setUsuario] = useState(null);
  const [dispositivos, setDispositivos] = useState([]);
  const [datosDispositivos, setDatosDispositivos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [temperatura, setTemperatura] = useState(0);
  const [humedad, setHumedad] = useState(0);

  const obtenerUsuario = async () => {
    try {
      const respuesta = await fetch('https://apismart.onrender.com/api/usuarios/65f8f89c9007b457881dfc1b');
      if (!respuesta.ok) {
        throw new Error('Error al obtener datos del usuario');
      }
      const datosUsuario = await respuesta.json();
      setUsuario(datosUsuario);
      setDispositivos(datosUsuario.dispositivos);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    obtenerUsuario();
  }, []);

  useEffect(() => {
    const obtenerDatosDispositivos = async () => {
      try {
        const datos = await Promise.all(dispositivos.map(async dispositivoId => {
          const respuesta = await fetch(`https://apismart.onrender.com/api/dispositivo/${dispositivoId}`);
          if (!respuesta.ok) {
            throw new Error('Error al obtener datos del dispositivo');
          }
          return await respuesta.json();
        }));
        setDatosDispositivos(datos.filter(dispositivo => dispositivo !== null));
        setCargando(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const actualizarDatos = () => {
      obtenerDatosDispositivos();
    };

    obtenerDatosDispositivos();

    // Actualizar datos cada 5 segundos
    const interval = setInterval(actualizarDatos, 5000);

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, [dispositivos]);

  useEffect(() => {
    if (datosDispositivos.length > 0) {
      setDispositivoSeleccionado(datosDispositivos[0]);
      setTemperatura(datosDispositivos[0]?.temperatura || 0);
      setHumedad(datosDispositivos[0]?.humedad || 0);
    }
  }, [datosDispositivos]);

  const handleSelectChange = event => {
    const dispositivoId = event.target.value;
    const dispositivo = datosDispositivos.find(d => d._id === dispositivoId);
    setDispositivoSeleccionado(dispositivo);
    setTemperatura(dispositivo?.temperatura || 0);
    setHumedad(dispositivo?.humedad || 0);
  };

  const cambiarEstadoDispositivo = async () => {
    try {
      if (!dispositivoSeleccionado) {
        console.error('No hay dispositivo seleccionado.');
        return;
      }
  
      // Construir el cuerpo de la solicitud para publicar mensaje
      const bodyPublicarMensaje = {
        topico: 'sweeperClient',
        mensaje: dispositivoSeleccionado.estado === 'Activo' ? 'Inactivo' : 'Activo'
      };
  
      // Realizar la solicitud POST para publicar el mensaje
      const responsePublicarMensaje = await fetch('https://apismart.onrender.com/publicarmensaje', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyPublicarMensaje)
      });
  
      if (!responsePublicarMensaje.ok) {
        throw new Error('Error al publicar el mensaje.');
      }
  
      // Obtener la respuesta del servidor para la publicación del mensaje
      const dataPublicarMensaje = await responsePublicarMensaje.json();
  
      console.log('Mensaje publicado correctamente:', dataPublicarMensaje);
  
      // Construir el cuerpo de la solicitud para actualizar el estado
      const nuevoEstado = dispositivoSeleccionado.estado === 'Activo' ? 'Inactivo' : 'Activo';
      const bodyActualizarEstado = {
        id: dispositivoSeleccionado._id,
        estado: nuevoEstado
      };
  
      // Realizar la solicitud POST al endpoint para actualizar el estado
      const responseActualizarEstado = await fetch('https://apismart.onrender.com/api/control/actualizarestado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyActualizarEstado)
      });
  
      if (!responseActualizarEstado.ok) {
        throw new Error('Error al actualizar el estado del dispositivo.');
      }
  
      // Obtener la respuesta del servidor para la actualización del estado
      const dataActualizarEstado = await responseActualizarEstado.json();
  
      // Actualizar el estado del dispositivo seleccionado
      setDispositivoSeleccionado(dataActualizarEstado);
  
      // Añadir una sesión de limpieza solo si el estado pasó de inactivo a activo
      if (nuevoEstado === 'Activo') {
        const bodySesionLimpieza = {
          clave_dispositivo: dispositivoSeleccionado.clave, // Supongo que la clave del dispositivo es necesaria para la sesión de limpieza
          tipo: 'Limpieza profunda',
          fecha_inicio: new Date().toISOString() // Utiliza la fecha actual
        };
  
        // Realizar la solicitud POST al endpoint para agregar una nueva sesión de limpieza
        const responseSesionLimpieza = await fetch('https://apismart.onrender.com/api/sesiones_limpieza', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodySesionLimpieza)
        });
  
        if (!responseSesionLimpieza.ok) {
          throw new Error('Error al agregar la sesión de limpieza.');
        }
  
        // Obtener la respuesta del servidor para la sesión de limpieza agregada
        const dataSesionLimpieza = await responseSesionLimpieza.json();
  
        console.log('Sesión de limpieza agregada correctamente:', dataSesionLimpieza);
      }
  
    } catch (error) {
      console.error('Error al cambiar el estado del dispositivo:', error);
      // Manejo de errores
    }
  };




  const handleAgregarDispositivo = () => {
    setMostrarFormulario(true);
  };

  const handleCancelarAgregarDispositivo = () => {
    setMostrarFormulario(false);
  };

  const agregarDispositivo = async nuevoDispositivo => {
    try {
      setMostrarFormulario(false);
      await obtenerUsuario();
      if (usuario && usuario.dispositivos.length > 0) {
        setDispositivoSeleccionado(usuario.dispositivos[usuario.dispositivos.length - 1]);
      }
    } catch (error) {
      console.error('Error:', error);
      // Manejo de errores
    }
  };

  const getColorTemperatura = () => {
    if (temperatura <= 20) {
      return '#3498db'; // Azul
    } else if (temperatura > 20 && temperatura <= 30) {
      return '#2ecc71'; // Verde
    } else {
      return '#e74c3c'; // Rojo
    }
  };

  const getColorHumedad = () => {
    if (humedad <= 40) {
      return '#3498db'; // Azul
    } else if (humedad > 40 && humedad <= 60) {
      return '#2ecc71'; // Verde
    } else {
      return '#e74c3c'; // Rojo
    }
  };

  const eliminarDispositivo = async (dispositivoId, nombreDispositivo) => {
    const confirmacion = window.confirm(`¿Está seguro de que desea eliminar el dispositivo "${nombreDispositivo}"?`);

    if (confirmacion) {
      try {
        const response = await fetch('https://apismartsweepers.vercel.app/api/usuarios/eliminardispositivo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idUsuario: '65f8f89c9007b457881dfc1b',
            idDispositivo: dispositivoId
          })
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el dispositivo del usuario');
        }

        alert(`El dispositivo "${nombreDispositivo}" se ha eliminado correctamente del usuario.`);

        const eliminarDispositivoResponse = await fetch(`https://apismartsweepers.vercel.app/api/dispositivo/${dispositivoId}`, {
          method: 'DELETE'
        });

        if (!eliminarDispositivoResponse.ok) {
          throw new Error('Error al eliminar el dispositivo');
        }

        alert(`El dispositivo "${nombreDispositivo}" se ha eliminado correctamente.`);
        obtenerUsuario();
      } catch (error) {
        console.error('Error:', error);
        alert('Ha ocurrido un error al intentar eliminar el dispositivo. Por favor, inténtelo de nuevo más tarde.');
      }
    }
  };

  return (
    <div className="container">
      <header className="pri">
        <div className="pricon">
          <h1 className="pre">Mis Dispositivos</h1>
        </div>
        {!cargando && (
          <div className="header-content">
            {datosDispositivos.length > 0 && (
              <select value={dispositivoSeleccionado ? dispositivoSeleccionado._id : ''} onChange={handleSelectChange}>
                {datosDispositivos.map(dispositivo => (
                  <option key={dispositivo._id} value={dispositivo._id}>
                    {dispositivo.nombre}
                  </option>
                ))}
              </select>
            )}
            <button className="btn-agregar" onClick={handleAgregarDispositivo}>
              <FaPlus color="#ECF0F1" size={20} style={{ marginRight: 5 }} /> Agregar dispositivo
            </button>
          </div>
        )}
      </header>
      <main>
        {mostrarFormulario ? (
          <AgregarDispositivo
            onAgregarDispositivo={agregarDispositivo}
            onCancel={handleCancelarAgregarDispositivo}
            idUser={'65f8f89c9007b457881dfc1b'}
          />
        ) : (
          <>
            {usuario && (
              <div>
                {cargando ? (
                  <p>Cargando dispositivos...</p>
                ) : (
                  <>
                    {datosDispositivos.length > 0 ? (
                      <div>
                        {dispositivoSeleccionado ? (
                          <div>
                            <h2 className="nombreDis">{dispositivoSeleccionado.nombre}</h2>
                            <div className="widget-container">
                              <div className={`widget ${dispositivoSeleccionado.estado === 'Activo' ? 'activo' : 'inactivo'}`} onClick={cambiarEstadoDispositivo}>
                                {dispositivoSeleccionado.estado === 'Activo' ? (
                                  <FaRobot size={80} color="#ECF0F1" /> 
                                ) : (
                                  <FaPowerOff size={80} color="#043464" />
                                )}
                              </div>
                            </div>
                            <div className="widget-info">
                              <p className="estado">Estado: {dispositivoSeleccionado.estado}</p>  
                            </div>
                            <div className="widget-container">
                                <div className="widget-temperatura" style={{ backgroundColor: getColorTemperatura() }}>
                                  <FaThermometerHalf size={40} color="#FFF" />
                                  <p style={{ fontWeight: 'bold',color:"#000" }}>{temperatura}°C</p>
                                </div>
                                <div className="widget-humedad" style={{ backgroundColor: getColorHumedad() }}>
                                  <FaTint size={40} color="#FFF" />
                                  <p style={{ fontWeight: 'bold',color:"#000"  }}>{humedad}%</p>
                                </div>
                              </div>
                            <div className="eliminar-dispositivo">
                              <button onClick={() => eliminarDispositivo(dispositivoSeleccionado._id, dispositivoSeleccionado.nombre)}>
                                <FaTrash /> Eliminar dispositivo
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p>Seleccione un dispositivo para ver su información.</p>
                        )}
                      </div>
                    ) : (
                      <p>No se encontraron dispositivos. ¡Adquiera una aspiradora ahora!</p>
                    )}
                  </>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default MisDispositivos;
