import React, { useState, useRef } from 'react';
import '../Estilos/Registro.css';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

const Registro = () => {
  const [step, setStep] = useState(1);

  // Primer paso
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');

  // Segundo paso
  const [pais, setPais] = useState('');
  const [estado, setEstado] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [colonia, setColonia] = useState('');
  const [calle, setCalle] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [referencia, setReferencia] = useState('');

  // Tercer paso
  const [password, setPassword] = useState('');
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const toast = useRef(null);

  const handlePrev = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const validarCorreo = (correo) => {
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexCorreo.test(correo)) {
      return 'El correo electrónico ingresado no es válido';
    }
return '';
  };

  const validarTelefono = (telefono) => {
    const regexTelefono = /^[0-9]{10}$/;
    if (!regexTelefono.test(telefono)) {
      return 'El número de teléfono ingresado no es válido';
    }
    
    return '';
  };

  const handleNext = () => {
    let isValid = true;

    switch (step) {
      case 1:
        if (!nombre) {

      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Por favor, ingresa tu nombre' });

          
        } else if (!apellidos) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'ingresa tus apellidos' });

        } else if (!validarCorreo(correo)) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'ingresa tus correo' });

          // errorMessage = validarCorreo(correo);

        } else if (!validarTelefono(telefono)) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'ingresa tus numero' });

          // errorMessage = validarTelefono(telefono);
        }
        isValid = nombre && apellidos && validarCorreo(correo) && validarTelefono(telefono);
        break;


      case 2:
        isValid = nombre && apellidos && correo && telefono;
        break;
      case 3:
        isValid = pais && estado && ciudad && colonia && calle && codigoPostal && referencia;
        break;
      case 4:
        isValid = password && pregunta && respuesta;
        break;
      default:
        break;
    }

    if (isValid && step < 3) {
      setStep(prev => prev + 1);
    } else if (!isValid) {
      toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, completa todos los campos antes de continuar' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos antes de enviar
    if (!nombre || !apellidos || !correo || !telefono || !pais || !estado || !ciudad || !colonia || !calle || !codigoPostal || !password || !pregunta || !respuesta) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Todos los campos son obligatorios' });

      return;
    }

    // Aquí puedes manejar la lógica de enviar el formulario según los datos que necesites

    toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Registro exitoso' });
  };

  return (
    <div>
      <h1>Registro</h1>

      <div className="steps">
        <div className={`step ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)}>1</div>
        <div className={`step ${step === 2 ? 'active' : ''}`} onClick={() => setStep(2)}>2</div>
        <div className={`step ${step === 3 ? 'active' : ''}`} onClick={() => setStep(3)}>3</div>
      </div>

      <Toast ref={toast} />

      <div>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <div className="input-group">
                <label>Nombre</label>
                <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Apellidos</label>
                <input placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Correo Electrónico</label>
                <input type='email' placeholder="Correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Teléfono</label>
                <input type='number' placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="input-group">
                <label>Pais</label>
                <input placeholder="País" value={pais} onChange={(e) => setPais(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Estado</label>
                <input placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Ciudad</label>
                <input placeholder="Ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Colonia</label>
                <input placeholder="Colonia" value={colonia} onChange={(e) => setColonia(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Calle</label>
                <input placeholder="Calle" value={calle} onChange={(e) => setCalle(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Código Postal</label>
                <input placeholder="Código Postal" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Referencia</label>
                <input placeholder="Referencia" value={referencia} onChange={(e) => setReferencia(e.target.value)} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="input-group">
                <label>Contraseña</label>
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Selecciona una pregunta</label>
                <select value={pregunta} onChange={(e) => setPregunta(e.target.value)}>
                  <option value="">Selecciona una pregunta</option>
                  <option value="¿Cuál es el nombre de tu primera mascota?">¿Cuál es el nombre de tu primera mascota?</option>
                  <option value="¿Cuál es tu canción favorita?">¿Cuál es tu canción favorita?</option>
                  <option value="¿En qué cuidad nació tu madre?">¿En qué cuidad nació tu madre?</option>
                  <option value="¿Cuál es tu comida favorita
?">¿Cuál es tu comida favorita?</option>
                  <option value="¿Cuál es el nombre de tu mejor amigo de la infancia?">¿Cuál es el nombre de tu mejor amigo de la infancia?</option>
                </select>
              </div>
              <div className="input-group">
                <label>Respuesta</label>
                <input placeholder="Respuesta" value={respuesta} onChange={(e) => setRespuesta(e.target.value)} />
              </div>
            </div>
          )}

          <Toast ref={toast} />
          <div className="buttons">
            {step !== 1 && <button type="button" onClick={handlePrev}>Anterior</button>}
            {step !== 3 ?
              <button type="button" onClick={handleNext}>Siguiente</button> :
              <button type="submit">Registrarse</button>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registro;
