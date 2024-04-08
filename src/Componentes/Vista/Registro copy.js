import React, { useState } from 'react';
import '../Estilos/Registro.css';

// Función para generar un token aleatorio
const generateRandomToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const tokenLength = 6;
    let token = '';

    for (let i = 0; i < tokenLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }

    return token;
};

const Registro = () => {
    const [error, setError] = useState('');

    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [pregunta, setPregunta] = useState('');
    const [respuesta, setRespuesta] = useState('');
    const [pais, setPais] = useState('');
    const [estado, setEstado] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [colonia, setColonia] = useState('');
    const [calle, setCalle] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [referencia, setReferencia] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = {
                nombre_completo: `${nombre} ${apellidos}`,
                correo,
                contrasenia: password,
                pregunta_secreta: pregunta,
                respuesta_secreta: respuesta,
                direccion: {
                    pais,
                    estado,
                    ciudad,
                    colonia,
                    calle,
                    codigo_postal: codigoPostal,
                    referencia
                },
                telefono,
                fecha_registro: new Date().toISOString(),  // Agregar fecha de registro actual
                token_acceso: generateRandomToken(),  // Generar token aleatorio
                tipo: 'cliente'  // Agregar tipo de usuario (por ejemplo, 'user')
            };

            const response = await fetch('https://apismartsweepers.vercel.app/api/usuarios/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al registrar usuario');
            }

            alert('Cuenta creada con éxito');
            setNombre('');
            setApellidos('');
            setCorreo('');
            setTelefono('');
            setPassword('');
            setPregunta('');
            setRespuesta('');
            setPais('');
            setEstado('');
            setCiudad('');
            setColonia('');
            setCalle('');
            setCodigoPostal('');
            setReferencia('');
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            setError(error.message || 'Error en registro de usuario');
        }
    };

    return (
        <div>
            <h1>Registro</h1>
            <div>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        <input placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
                        <input placeholder="Correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                        <input placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </div>
                    <div>
                        <input placeholder="País" value={pais} onChange={(e) => setPais(e.target.value)} />
                        <input placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
                        <input placeholder="Ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
                        <input placeholder="Colonia" value={colonia} onChange={(e) => setColonia(e.target.value)} />
                        <input placeholder="Calle" value={calle} onChange={(e) => setCalle(e.target.value)} />
                        <input placeholder="Código Postal" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />
                        <input placeholder="Referencia" value={referencia} onChange={(e) => setReferencia(e.target.value)} />
                    </div>
                    <div>
                        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <select value={pregunta} onChange={(e) => setPregunta(e.target.value)}>
                            <option value="">Selecciona una pregunta</option>
                            <option value="¿Cuál es el nombre de tu primera mascota?">¿Cuál es el nombre de tu primera mascota?</option>
                            <option value="¿Cuál es tu canción favorita?">¿Cuál es tu canción favorita?</option>
                            <option value="¿En qué cuidad nació tu madre?">¿En qué cuidad nació tu madre?</option>
                            <option value="¿Cuál es tu comida favorita?">¿Cuál es tu comida favorita?</option>
                            <option value="¿Cuál es el nombre de tu mejor amigo de la infancia?">¿Cuál es el nombre de tu mejor amigo de la infancia?</option>
                        </select>
                        <input placeholder="Respuesta" value={respuesta} onChange={(e) => setRespuesta(e.target.value)} />
                    </div>
                    {error && <p>{error}</p>}
                    <button id="registroButton" type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
};


export default Registro;
