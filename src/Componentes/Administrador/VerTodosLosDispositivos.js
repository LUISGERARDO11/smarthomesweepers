import React, { useState, useEffect } from 'react';
import '../Estilos/VerTodosLosDispositivos.css'; // Importar la hoja de estilos CSS

function VerTodosLosDispositivos() {
  const [usuariosConDispositivos, setUsuariosConDispositivos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerUsuariosConDispositivos = async () => {
      try {
        // Obtener usuarios con dispositivos asignados
        const responseUsuarios = await fetch('https://apismartsweepers.vercel.app/api/us/usuarioscondispositivos');
        if (!responseUsuarios.ok) {
          throw new Error('Error al obtener la lista de usuarios con dispositivos');
        }
        const dataUsuarios = await responseUsuarios.json();

        // Obtener información de todos los dispositivos
        const dispositivosPromises = dataUsuarios.map(async (usuario) => {
          const dispositivos = await Promise.all(usuario.dispositivos.map(obtenerInfoDispositivo));
          return { ...usuario, dispositivos };
        });

        // Esperar a que se completen todas las promesas de dispositivos
        const usuariosConDispositivos = await Promise.all(dispositivosPromises);
        setUsuariosConDispositivos(usuariosConDispositivos);
      } catch (error) {
        console.error('Error al obtener usuarios con dispositivos:', error);
        setError('Ocurrió un error al obtener usuarios con dispositivos. ' + error.message);
      }
    };

    obtenerUsuariosConDispositivos();
  }, []);

  const obtenerInfoDispositivo = async (dispositivoId) => {
    try {
      const response = await fetch(`https://apismartsweepers.vercel.app/api/dispositivo/${dispositivoId}`);
      if (!response.ok) {
        throw new Error(`Error al obtener información del dispositivo ${dispositivoId}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error al obtener información del dispositivo ${dispositivoId}:`, error);
      return null;
    }
  };

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h2>Usuarios con Dispositivos Asignados</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Clave del Dispositivo</th>
            <th>Nombre del Dispositivo</th>
            <th>Propietario</th>
          </tr>
        </thead>
        <tbody>
          {usuariosConDispositivos.map((usuario) => (
            usuario.dispositivos.map((dispositivo, index) => (
              <tr key={index}>
                <td>{dispositivo.clave}</td>
                <td>{dispositivo.nombre}</td>
                <td>{usuario.nombre_completo}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VerTodosLosDispositivos;
