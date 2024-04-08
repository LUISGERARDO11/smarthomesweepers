import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordScreen = () => {
    const [correo, setCorreo] = useState('');
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [emailExists, setEmailExists] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCheckEmail = async () => {
        if (correo.trim() === '') {
            alert('Por favor, completa el campo de correo.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('https://apismartsweepers.vercel.app/api/usuarios/email/' + correo);
            const data = await response.json();

            if (data.exists) {
                setEmailExists(true);
                setToken(data.token);
                setId(data._id);
            } else {
                alert('No existe una cuenta asociada a este correo electrónico.');
            }
        } catch (error) {
            console.error('Error al verificar el correo electrónico:', error);
            alert('No se pudo verificar el correo electrónico. Por favor, intenta de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetByEmail = async () => {
        if (!emailExists) {
            alert('Por favor, primero verifica tu correo electrónico.');
            return;
        }

        try {
            setLoading(true);

            const response = await fetch('https://apismartsweepers.vercel.app/enviarcorreo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ destinatario: correo, token: token })
            });

            const responseData = await response.json();

            if (response.ok) {
                alert('Correo enviado', responseData.message);
                navigate('/VerifyToken', {
                    state: {
                        id: id
                    }
                });
            } else {
                alert('Error al enviar correo', responseData.error);
            }
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            alert('No se pudo enviar el correo electrónico. Por favor, intenta de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            {loading && <div style={styles.activityIndicator}>Loading...</div>}
            <div style={styles.textIndicaciones}>Para reestablecer tu contraseña, valida tu correo electrónico</div>
            <input
                type="email"
                placeholder="Correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                style={styles.input}
            />
            <div style={styles.buttonContainer}>
                <button onClick={handleCheckEmail} style={styles.btnVerificar}>Verificar correo electrónico</button>
                {emailExists && (
                    <div style={styles.buttonContainer}>
                        <Link to={`/VerifyUserQuestion/${correo}`} style={styles.link}>Recuperar por pregunta secreta</Link>
                        <button onClick={handleResetByEmail} style={styles.btnRecuperar}>Recuperar por correo electrónico</button>
                    </div>
                )}
                <button style={styles.regresar} onClick={() => navigate(-1)}>Regresar</button>
            </div>
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
        paddingTop: 120,
        width:800,
        minHeight:400,
        margin: 'auto',
    },
    activityIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: '50%',
        zIndex: 9999,
    },
    buttonContainer: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textIndicaciones: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    btnVerificar: {
        padding: '10px 20px',
        backgroundColor: '#043464',
        color: '#ECF0F1',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
        marginBottom: 10,
    },
    btnRecuperar: {
        padding: '10px 20px',
        backgroundColor: '#043464',
        color: '#ECF0F1',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
        marginBottom: 10,
    },
    input: {
        height: 40,
        width: '80%', // Modifica el ancho de los inputs aquí
        borderColor: '#043464',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
    regresar: {
        fontSize: 14,
        color: '#043464',
        textDecoration: 'underline',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
    },
    link: {
        fontSize: 14,
        textDecoration: 'none', // Elimina el subrayado
        cursor: 'pointer',
        padding: '10px 20px',
        backgroundColor: '#043464',
        color: '#ECF0F1',
        border: 'none',
        borderRadius: 5,
        marginBottom: 10,
    },
};

export default ForgotPasswordScreen;
