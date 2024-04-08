import React, { useState } from 'react';
import '../Estilos/AgregarDispositivo.css';

function AgregarDispositivo({ onAgregarDispositivo, onCancel, idUser }) {
  const [nombre, setNombre] = useState('');
  const [clave, setClave] = useState('');
  const [nombreValidado, setNombreValidado] = useState(true);
  const [claveValidado, setClaveValidado] = useState(true);

  const userId = idUser || '';
  const temperaturaInicial = 25; // Valor inicial de la temperatura
  const humedadInicial = 50; // Valor inicial de la humedad

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dispositivoData = {
      nombre: nombre,
      clave: clave,
      temperatura: temperaturaInicial, // Se envía el valor inicial de la temperatura
      humedad: humedadInicial, // Se envía el valor inicial de la humedad
      estado: 'Inactivo',
      usuario_id: userId
    };

    try {
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

      onAgregarDispositivo({ nombre, clave, userId });

      setNombre('');
      setClave('');

      const agregarDispositivoData = {
        id: userId,
        dispositivoId: dispositivoId
      };

      const agregarDispositivoResponse = await fetch('https://apismartsweepers.vercel.app/api/usuarios/anadirdispositivos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(agregarDispositivoData)
      });

      if (!agregarDispositivoResponse.ok) {
        throw new Error('Error al agregar el dispositivo al usuario');
      }

      alert('El dispositivo se ha registrado correctamente');
      onCancel();
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al registrar el dispositivo');
    }
  };

  const handleChangeClave = (event) => {
    const inputValue = event.target.value;

    if (inputValue.length <= 6) {
      setClave(inputValue);
      setClaveValidado(inputValue.match(/^[a-zA-Z0-9]*$/));
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="agregar-dispositivo">
      <h2>Agregar Dispositivo</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group2">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className={!nombreValidado ? 'invalid' : ''} placeholder="Ej. Mi aspiradora" />
          {!nombreValidado && <span className="error">El nombre es requerido</span>}
        </div>
        <div className="form-group2">
          <label htmlFor="clave">Clave:</label>
          <input type="text" id="clave" value={clave} onChange={handleChangeClave} className={!claveValidado ? 'invalid' : ''} placeholder="Ej. 00aa01" />
          {!claveValidado && <span className="error">La clave es requerida y debe contener solo letras mayúsculas, minúsculas y números (máximo 6 caracteres)</span>}
        </div>
        <div className="form-actions">
            <button type="submit" className="add-button">Agregar</button>
            <button type="button" onClick={handleCancel} className="cancel-button">Cancelar</button>
        </div>
      </form>
    </div>
  );

}

export default AgregarDispositivo;
