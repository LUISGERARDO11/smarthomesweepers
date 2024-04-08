import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Estilos/Header.css';

function HeaderLogueado({ setUserType }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (typeof setUserType === 'function') {
      setUserType('');
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      navigate('/Home', { replace: true });
    } else {
      console.error('setUserType is not a function');
    }
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
          <li><Link to={'/Home'}>Home</Link></li>
          <li><Link to={'/Productos'}>Tienda</Link></li>
          <li><Link to={'/Contacto'}>Contacto</Link></li>
          <li><Link to={'/Perfil'}>Perfil</Link></li>
          <li><Link to={'/MisDispositivos'}>Mis Dispositivos</Link></li>
          <li><button onClick={handleLogout}>Cerrar sesión</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderLogueado;
