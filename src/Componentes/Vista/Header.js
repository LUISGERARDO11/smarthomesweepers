import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import '../Estilos/Header.css';
function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo">
          {/* Agrega la imagen del logotipo aquí */}
          <img src={require('../img/LogoAspiradora.png')} alt="aspiradoras" />
        </div>

        {/* Agrega el texto del lado del logo */}
        <span className="logo-text">SMART HOMES SWEEPERS</span>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to={'/Home'}>Home</Link> {/* Usa "to" en lugar de "href" */}
          </li>
          <li>
            <Link to={'/Productos'}>Tienda</Link> {/* Usa "to" en lugar de "href" */}
          </li>
          <li>
            <Link to={'/Login'}>
              <FiUser /> {/* Icono de usuario */}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

