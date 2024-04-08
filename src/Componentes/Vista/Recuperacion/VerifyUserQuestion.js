import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VerifyUserQuestion = () => {
    const { correo } = useParams();
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [load, setLoad] = useState(false);
    const [res, setRes] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch(`https://apismartsweepers.vercel.app/api/usuarios/email/${correo}`);
                const obj = await res.json();
                if (obj.exists) {
                    setUserData(obj);
                    setSelectedOption(obj.pregunta_secreta);
                    setLoad(true);
                } else {
                    alert('Usuario no encontrado: No se encontró ningún usuario con este correo electrónico.');
                }
            } catch (error) {
                console.error('Error al recuperar datos del usuario:', error);
                alert('Ocurrió un error:', error.message);
            }
        };

        fetchUserData();
    }, [correo]);

    const handleCheckIdentity = async () => {
        if (!res || !selectedOption) {
            alert('Error: Por favor, completa todos los campos.');
            return;
        }

        try {
            const response = await fetch('https://apismartsweepers.vercel.app/api/usuarios/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correo: correo,
                    pregunta_secreta: selectedOption,
                    respuesta_secreta: res
                })
            });

            const result = await response.json();
            if (result.exists) {
                navigate('/PasswordUpdateForm', {
                    state: {
                        correo: correo,
                        id: userData._id
                    }
                });                
            } else {
                alert('Identidad no verificada: No se ha podido verificar la identidad del usuario.');
            }
        } catch (error) {
            console.error('Error al verificar la identidad:', error);
            alert('Error: Hubo un problema al verificar la identidad. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    if (!load) {
        return (
            <div>
                <p>Cargando datos...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Valida tu identidad</h2>
            <p style={styles.question}>{userData.pregunta_secreta}</p>

            <input
                type="text"
                placeholder="Respuesta"
                value={res}
                onChange={(e) => setRes(e.target.value)}
                style={styles.input}
            />
            <button style={styles.button} onClick={handleCheckIdentity}>Verificar</button>
            <button style={styles.button} onClick={() => navigate(-1)}>Regresar</button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
        padding: 16,
        backgroundColor: '#ECF0F1',
        paddingTop: 80,
        width:800,
        minHeight:400,
        margin: 'auto',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    question: {
        fontSize: 16,
        paddingBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        marginBottom: 20,
        paddingLeft: 10,
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#043464',
        color: '#ECF0F1',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
        marginBottom: 10,
    },
};

export default VerifyUserQuestion;
