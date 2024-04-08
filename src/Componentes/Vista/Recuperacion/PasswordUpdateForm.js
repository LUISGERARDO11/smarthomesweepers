import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa los iconos de ojo

const PasswordUpdateForm = () => {
    // Aquí puedes acceder a los parámetros pasados desde la navegación
    const location = useLocation();
    const { correo, id } = location.state || {};

    const [contra, setContra] = useState('');
    const [confirmContra, setConfirmContra] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Lógica para actualizar la contraseña, etc.
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

    const handleNext = async () => {
        if (contra !== confirmContra) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(contra)) {
            alert('La contraseña debe contener al menos una mayúscula, una minúscula, un carácter especial y un número, y tener al menos 8 caracteres en total.');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`https://apismartsweepers.vercel.app/api/usuarios/actualizarcontrasena/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nuevaContrasena: contra,
                    token_acceso: generateRandomToken(),
                }),
            });

            if (response.ok) {
                alert('Contraseña actualizada correctamente');
                // Redirigir a la pantalla de inicio de sesión
                window.location.href = '/Login';
            } else {
                alert('Error al actualizar la contraseña');
            }
        } catch (error) {
            console.error('Error al actualizar la contraseña:', error);
            alert('Error al actualizar la contraseña. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        // Redirigir a la pantalla de inicio de sesión
        window.location.href = '/Login';
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.heading}>Restablece tu contraseña</h3>
            <div style={styles.inputWrapper}>
                <input
                    style={styles.input}
                    placeholder="Contraseña"
                    value={contra}
                    onChange={(e) => setContra(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                />
                <button onClick={handleTogglePasswordVisibility} style={styles.iconButton}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
            <div style={styles.inputWrapper}>
                <input
                    style={styles.input}
                    placeholder="Confirmar Contraseña"
                    value={confirmContra}
                    onChange={(e) => setConfirmContra(e.target.value)}
                    type={showConfirmPassword ? 'text' : 'password'}
                />
                <button onClick={handleToggleConfirmPasswordVisibility} style={styles.iconButton}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
            <div style={styles.buttonContainer}>
                <button
                    style={styles.button2}
                    onClick={handleCancel}
                >
                    Cancelar
                </button>
                <button
                    style={{ ...styles.button, backgroundColor: '#043464', color: '#ECF0F1' }}
                    onClick={handleNext}
                    disabled={loading}
                >
                    Restablecer
                </button>
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
        width: 800,
        minHeight: 400,
        margin: 'auto',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputWrapper: {
        position: 'relative',
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: 'calc(100% - 32px)', // Ancho del input menos el ancho del botón
        borderColor: '#043464',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    iconButton: {
        position: 'absolute',
        top: '50%',
        right: 8,
        transform: 'translateY(-50%)',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        color: '#FF6600',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button2: {
        padding: '10px 20px',
        borderRadius: 5,
        backgroundColor: '#ECF0F1',
        color: '#043464',
        marginRight: 10,
        cursor: 'pointer',
    },
};

export default PasswordUpdateForm;
