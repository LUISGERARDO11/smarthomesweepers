import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Bienvenido</h1>
      <p>¡Has iniciado sesión exitosamente!</p>
      <p>Aquí puedes ver el contenido exclusivo para usuarios logueados.</p>
      <p>Puedes agregar más contenido y funcionalidades según las necesidades de tu aplicación.</p>
      <Link to="/Logout">Cerrar sesión</Link>
    </div>
  );
};

export default Home;
