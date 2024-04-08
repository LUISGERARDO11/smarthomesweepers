import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import '../Estilos/Footer.css';

function Footer() {
  
  return (


<footer className="footer">
  
  <nav className="nav-footer">
  <h3>Navegación</h3>
    <ul>
    <li>
            <Link to={'/Home'}>Home</Link> {/* Usa "to" en lugar de "href" */}
          </li>
          <li>
            <Link to={'/Productos'}>Tienda</Link> {/* Usa "to" en lugar de "href" */}
          </li>
          <li>
            <a href="/QuienesSomos">Quienes somos</a>
          </li>
          <li>
            <a href="/Contacto">Contacto</a>
          </li>
          <li>
            <a href="/Preguntas">Preguntas Frecuentes</a>
          </li>
          
    </ul>
  </nav>
  <div className="redes-sociales">
    {/* Agrega los logos de tus redes sociales aquí */}
    <img src={require('../img/Face.png')} alt="Facebook" />
    <img src={require('../img/Twiter.png')} alt="Twiter" />
    <img src={require('../img/Instagram.png')} alt="Instagram" />
  </div>
  <div className="ubicacion-derechos">
    <p>Ubicación: Calle Principal 123, Ciudad</p>
    <p>Todos los derechos reservados &copy; 2024</p>
  </div>
</footer>

);
}

export default Footer;
