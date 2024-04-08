import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Estilos/DatosPerfil.css';

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        // Obtener datos del usuario sin ID inicial
        const respuesta = await fetch('https://apismartsweepers.vercel.app/api/usuarios/:id');
        
        if (!respuesta.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }

        const datos = await respuesta.json();
        
        // Suponiendo que la respuesta contiene un array de usuarios y tomamos el primer usuario como el perfil actual
        const primerUsuario = datos[0];
        if (!primerUsuario || !primerUsuario.id) {
          throw new Error('ID del usuario no encontrado');
        }

        console.log("ID del usuario:", primerUsuario.id);

        // Obtener datos del usuario usando el ID obtenido
        const respuestaPerfil = await fetch(`https://apismartsweepers.vercel.app/api/usuarios/${primerUsuario.id}`);
        
        if (!respuestaPerfil.ok) {
          throw new Error('Error al obtener los datos del perfil del usuario');
        }

        const datosPerfil = await respuestaPerfil.json();
        console.log("Datos del usuario:", datosPerfil);
        
        setUser(datosPerfil);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la información del perfil:', error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    obtenerDatosUsuario();
  }, []);

  const handleEdit = () => {
    console.log('Redirigir a página de edición');
  };

  if (loading) {
    return <div>Cargando datos del perfil...</div>;
  }

  if (error) {
    return <div>Error al obtener los datos del perfil: {error}</div>;
  }

  return (
    <div className="registro-container">
      <h1>Perfil</h1>
      <div className="list-container">
        <ul className="profile-list">
          <li>
            <strong>Nombre:</strong> {user?.nombre_completo}
          </li>
          <li>
            <strong>Correo:</strong> {user?.correo}
          </li>
          <li>
            <strong>Teléfono:</strong> {user?.telefono}
          </li>
        </ul>
      </div>
      <div className="button-container">
        <button type="button" className="edit-button" onClick={handleEdit}>
          Editar
        </button>
      </div>
      <p className="create-account">¿Ya tienes cuenta? <Link to={'/Login'}>Inicia sesión</Link></p>
    </div>
  );
};

export default Perfil;
