import React from 'react';
import '../Estilos/UsuarioLogueadoAdmin.css'; 

function UsuarioLogueadoAdmin({ onLogout }) {
  return (
    <div className="container">
      <h2>Bienvenido Administrador</h2>
      <p>Has iniciado sesión exitosamente como administrador.</p>
      <button onClick={onLogout}>Cerrar sesión</button>
      {/* Aquí puedes agregar más contenido o funcionalidades específicas para un administrador */}
    </div>
  );
}

export default UsuarioLogueadoAdmin;
