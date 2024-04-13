import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Estilos/Login.css';

const Login = ({ setUserType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://apismartsweepers.vercel.app/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: email,
          contrasenia: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.usuario.token_acceso;
        localStorage.setItem('token', token);

        const userType = data.usuario.tipo;
        localStorage.setItem('userType', userType);

        setUserType(userType);  // Actualiza el userType al iniciar sesión

        if (userType === 'cliente') {
          navigate('/Home');
        } else if (userType === 'admin') {
          navigate('/UsuarioLogueadoAdmin');
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isButtonDisabled = !email.trim() || !password.trim() || loading;

  return (
    <div className="login-container">
      <h1>Bienvenido de nuevo</h1>
      <p className="subtext">Inicia sesión en tu cuenta</p>
      <div className="form-container">
        <label htmlFor="email">Correo:</label>
        <div className="password-input-container">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-log-input "
          />
         </div>

        <label htmlFor="password">Contraseña:</label>
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-log-pass-input"
          />
          <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>


        {error && <p className="error-message">{error}</p>}

        <p className="forgot-password">
          <Link to={'/ForgotPasswordScreen'}>¿Olvidaste tu contraseña?</Link>
        </p>

        <div className="button-container">
          <button
            type="button"
            className={`login-button ${isButtonDisabled ? 'disabled' : ''}`}
            disabled={isButtonDisabled}
            onClick={handleLogin}
          >
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </div>

        <p className="create-account">
          No tienes cuenta? <Link to={'/Registro'}>Crear cuenta</Link>{' '}
        </p>
      </div>
    </div>
  );
};

export default Login;
