import React, { useState, useRef } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';

const VerifyToken = () => {
    const location = useLocation();
    const id = location.state.id || {};
    const [token, setToken] = useState('');
    const [tokenbd, setTokenbd] = useState('');
    const inputsRef = useRef([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (index, value) => {
        // Eliminar cualquier caracter no permitido del input
        const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, '');

        setToken((prevToken) => {
            let newToken = prevToken.split('');

            // Si el valor actual está vacío, retrocede un input
            if (!sanitizedValue && index > 0) {
                inputsRef.current[index - 1].focus();
            }

            newToken[index] = sanitizedValue.charAt(0);
            return newToken.join('');
        });

        // Pasar el foco al siguiente input si el valor actual es válido
        if (sanitizedValue && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleVerifyToken = async () => {
        if (token.length !== 6) {
            alert('Token inválido', 'El token debe contener exactamente 6 caracteres.');
            return;
        }
      
        setLoading(true);
      
        try {
            const response = await fetch('https://apismartsweepers.vercel.app/api/usuarios/' + id);
            if (!response.ok) {
                throw new Error('Error al obtener los datos del servidor');
            }
            
            const data = await response.json();
            if (data && data.token_acceso) {
                setTokenbd(data.token_acceso);
          
                // Validar si los tokens son iguales
                if (token === data.token_acceso) {
                    // Si los tokens son iguales, navegar a la ventana PasswordUpdateForm
                    navigate('/PasswordUpdateForm', {
                        state: {
                            id: data._id
                        }
                    });  
                } else {
                    // Si los tokens no son iguales, mostrar una alerta
                    alert('Tokens no coinciden', 'Los tokens no son iguales. Por favor, verifica tu token e intenta de nuevo.');
                }
            } else {
                throw new Error('Token no encontrado');
            }
        } catch (error) {
            console.error('Error al verificar el correo electrónico:', error);
            alert('Error', 'No se pudo verificar el correo electrónico. Por favor, intenta de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div style={styles.container}>
            <h3 style={styles.textIndicaciones}>Valida tu identidad</h3>
            <p style={styles.textPregunta}>Ingresa el token que se envió a tu correo</p>
            <div style={styles.tokenInputsContainer}>
                {[...Array(6)].map((_, index) => (
                    <input
                        key={index}
                        ref={(ref) => (inputsRef.current[index] = ref)}
                        style={styles.tokenInput}
                        type="text"
                        maxLength={1}
                        value={token[index] || ''}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                ))}
            </div>
            <div style={styles.buttonContainer}>
                <button style={styles.btnVerificar} onClick={handleVerifyToken}>Verificar</button>
                {loading && <div>Loading...</div>}
            </div>
            <Link to="/Login" style={styles.regresar}>Cancelar</Link>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#ECF0F1',
        width: '80%',
        minHeight: 400,
        margin: 'auto',
        paddingTop: 120,
    },
    textPregunta: {
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 20,
    },
    textIndicaciones: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 20,
        paddingBottom: 20,
    },
    tokenInputsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center', // Centra horizontalmente los elementos
        alignItems: 'center',
    },
    tokenInput: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        margin: 5,
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
        textAlign: 'center',
    },
    btnVerificar: {
        padding: 10,
        backgroundColor: '#043464',
        color: '#ECF0F1',
        borderRadius: 5,
        marginBottom: 10,
        cursor: 'pointer',
    },
    regresar: {
        fontSize: 16,
        color: '#043464',
        textDecoration: 'underline',
        margin: 20,
        cursor: 'pointer',
    },
};

export default VerifyToken;
