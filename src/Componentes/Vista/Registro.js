import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const PrimerPasoForm = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [numero, setNumero] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            const { nombre, correo, numero } = location.state;
            setNombre(nombre || '');
            setCorreo(correo || '');
            setNumero(numero || '');
        }
    }, [location.state]);

    const handleNext = async () => {
        if (nombre.trim() === '' || correo.trim() === '' || numero.trim() === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }
    
        if (!correo.includes('@')) {
            alert('Ingrese un correo electrónico válido.');
            return;
        }
    
        if (!/^[\d]{10}$/.test(numero)) {
            alert('Ingrese un número de teléfono válido (10 dígitos exactos).');
            return;
        }
    
        try {
            // Realizar la solicitud al servidor para verificar si existe un usuario con el correo proporcionado
            const response = await fetch(`https://apismartsweepers.vercel.app/api/usuarios/email/${correo}`);
            const data = await response.json();
    
            if (data.exists) {
                // Si existe un usuario con el correo proporcionado, mostrar una alerta y no permitir continuar
                alert('Ya existe un usuario con ese correo electrónico. Por favor, utilice otro correo electrónico.');
            } else {
                // Si no existe un usuario con el correo proporcionado, continuar al siguiente paso del formulario
                navigate('/SegundoPasoForm', {
                    state: {
                        nombre,
                        correo,
                        numero
                    }
                });
            }
        } catch (error) {
            console.error('Error al verificar el correo electrónico:', error);
            alert('Error al verificar el correo electrónico. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div style={{ backgroundColor: '#ECF0F1', marginTop: 40, padding: '0 20px' }}>
            <h1 style={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>Registro</h1>

            <p style={{ fontSize: 24, paddingTop: 10, textAlign: 'center', paddingBottom: 15, fontWeight: 'bold' }}>Crea una nueva cuenta</p>
            
            <p style={{ fontSize: 24, paddingTop: 10, textAlign: 'center', paddingBottom: 15, fontWeight: 'bold' }}>Información personal</p>
            <p style={{ fontSize: 17, textAlign: 'center', paddingBottom: 15, fontWeight: 'bold' }}>1 de 3</p>
            <div style={{ marginBottom: 20 }}>
                <input
                    style={{ backgroundColor: '#fff', borderRadius: 5, padding: '12px 10px', marginBottom: 15, width: '100%', boxSizing: 'border-box' }}
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    style={{ backgroundColor: '#fff', borderRadius: 5, padding: '12px 10px', marginBottom: 15, width: '100%', boxSizing: 'border-box' }}
                    placeholder="Correo electrónico"
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />
                <input
                    style={{ backgroundColor: '#fff', borderRadius: 5, padding: '12px 10px', marginBottom: 15, width: '100%', boxSizing: 'border-box' }}
                    placeholder="Número de teléfono"
                    type="tel"
                    pattern="[0-9]{10}"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <p style={{ backgroundColor: '#ECF0F1', borderRadius: 5, padding: '12px 20px', borderWidth: 1, borderColor: '#043464', cursor: 'pointer' }}>
                    <Link to={'/Login'}>Cancelar</Link>
                </p>
                <div style={{ width: 30 }} />
                <button style={{ backgroundColor: '#043464', borderRadius: 5, padding: '12px 20px', borderWidth: 1, borderColor: '#ECF0F1', color: '#ECF0F1', cursor: 'pointer' }} onClick={handleNext}>
                    Siguiente &gt;
                </button>
            </div>
        </div>
    );
};

export default PrimerPasoForm;
