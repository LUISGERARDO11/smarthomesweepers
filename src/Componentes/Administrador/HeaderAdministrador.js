import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Estilos/Header.css';

function HeaderAdministrador({ setUserType }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Actualizar el estado del userType a una cadena vacía
    setUserType('');
    // Eliminar el token y el tipo de usuario del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/Home', { replace: true });
  };

  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo">
          <img src={require('../img/LogoAspiradora.png')} alt="aspiradoras" />
        </div>
        <span className="logo-text">SMART HOMES SWEEPERS</span>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to={'/UsuarioLogueadoAdmin'}>Home</Link></li>
          <li><Link to={'/Asignacion'}>Asignacion</Link></li>
          <li><Link to={'/CrudProductos'}>Productos</Link></li>
          <li><Link to={'/CrudContacto'}>Contacto</Link></li>
          <li><Link to={'/CrudPoliticas'}>Politicas</Link></li>
          <li><Link to={'/CrudPreguntas'}>Preguntas</Link></li>
          <li><button onClick={handleLogout}>Cerrar sesión</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderAdministrador;
