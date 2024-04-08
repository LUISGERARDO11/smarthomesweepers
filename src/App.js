import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Componentes/Vista/Header';
import HeaderLogueado from './Componentes/Cliente/HeaderLogueado';
import HeaderAdministrador from './Componentes/Administrador/HeaderAdministrador';
import Home from './Componentes/Vista/Home';
import Productos from './Componentes/Vista/Productos';
import Detalle from './Componentes/Vista/Detalle';
import Login from './Componentes/Vista/Login';
import Registro from './Componentes/Vista/Registro';
import Footer from './Componentes/Vista/Footer';
import Preguntas from './Componentes/Vista/Preguntas';
import QuienesSomos from './Componentes/Vista/QuienesSomos';
import Contacto from './Componentes/Vista/Contacto';
import CrudProductos from './Componentes/Administrador/CrudProductos';
import RegistroContacto from './Componentes/Administrador/RegistroContacto';
import CrudContacto from './Componentes/Administrador/CrudContacto';
import Editar from './Componentes/Administrador/Editar';
import Preguntar from './Componentes/Cliente/Preguntar';
import Perfil from './Componentes/Cliente/Perfil';
import FormularioPregunta from './Componentes/Cliente/FormularioPregunta';
import Contactoempresa from './Componentes/Vista/Contactoempresa';
import UsuarioLogueadoAdmin from './Componentes/Administrador/UsuarioLogueadoAdmin';
import Asignacion from './Componentes/Administrador/Asignacion';
import VerTodosLosDispositivos from './Componentes/Administrador/VerTodosLosDispositivos';
import CrudPoliticas from './Componentes/Administrador/CrudPoliticas';
import CrudPreguntas from './Componentes/Administrador/CrudPreguntas';
import AgregarDispositivo from './Componentes/Cliente/AgregarDispositivo';
import MisDispositivos from './Componentes/Cliente/MisDispositivos';

import ForgotPasswordScreen from './Componentes/Vista/Recuperacion/ForgotPasswordScreen';
import VerifyUserQuestion from './Componentes/Vista/Recuperacion/VerifyUserQuestion';
import PasswordUpdateForm from './Componentes/Vista/Recuperacion/PasswordUpdateForm';
import VerifyToken from './Componentes/Vista/Recuperacion/VerifyToken';


function App() {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  return (
    <Router>
      <main>
        <div>
          {userType === 'cliente' && <HeaderLogueado setUserType={setUserType} />}
          {userType === 'admin' && <HeaderAdministrador setUserType={setUserType} />}
          {!userType && <Header />}
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/Detalle/:id" element={<Detalle />} />
            <Route path="/Perfil" element={<Perfil />} />
            <Route path="/Login" element={<Login setUserType={setUserType} />} />
            <Route path="/Registro" element={<Registro />} />
            <Route path="/Preguntas" element={<Preguntas />} />
            <Route path="/QuienesSomos" element={<QuienesSomos />} />
            <Route path="/Contacto" element={<Contacto />} />
            <Route path="/CrudProductos" element={<CrudProductos/>} />
            <Route path="/CrudContacto" element={<CrudContacto/>} />
            <Route path="/Editar" element={<Editar />} />
            <Route path="/Preguntar" element={<Preguntar />} />
            <Route path="/FormularioPregunta" element={<FormularioPregunta />} />
            <Route path="/Contactoempresa" element={<Contactoempresa />} />
            <Route path="/UsuarioLogueadoAdmin" element={<UsuarioLogueadoAdmin />} />
            <Route path="/RegistroContacto" element={<RegistroContacto/>} />
            <Route path="/Asignacion" element={<Asignacion />} />
            <Route path="/VerTodosLosDispositivos" element={<VerTodosLosDispositivos/>}/>
            <Route path="/CrudPoliticas" element = {<CrudPoliticas />}/>
            <Route path="/CrudPreguntas" element={<CrudPreguntas/>}/>
            <Route path="/AgregarDispositivo" element={<AgregarDispositivo />}/>
            <Route path="/MisDispositivos" element={<MisDispositivos />}/>

            <Route path="/ForgotPasswordScreen" element = {<ForgotPasswordScreen />}/>
            <Route path="/VerifyUserQuestion/:correo" element={<VerifyUserQuestion />} />
            <Route path="/PasswordUpdateForm" element={<PasswordUpdateForm />}/>
            <Route path="/VerifyToken" element={<VerifyToken />}/>
          </Routes>
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;


