import './App.css';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import AgregarCampo from './componentes/agregarCampo2/agregarCampo';
import EditarCampo from './componentes/editarCampo/editarCampo';
import AgregarLotes from './componentes/agregarLotes/agregarLotes';
import Home from './componentes/home/home';
import IniciarSesion from './componentes/iniciarSesion/iniciarSesion';
import Registrarse from './componentes/registrarse/registrarse';
import Dashboards from './componentes/dashboards/dashboards';
import OlvidoContra from './componentes/olvidoContra/olvidoContra';
import EditarPerfil from './componentes/editarPerfil/editarPerfil';
import VerCultivos from './componentes/verCultivos/verCultivos';
import RecuperarContra from './componentes/recuperarContra/recuperarContra';
import HomePrincipal from './componentes/homePrincipal/homePrincipal';

function App() {
  document.title = 'AGROIA';
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePrincipal />} />
        <Route path="/agregarCampo/:userID" element={<AgregarCampo />} />
        <Route path="/agregarLotes/:userID" element={<AgregarLotes />} />
        <Route path="/editarCampo/:userID/:fieldID" element={<EditarCampo />} />
        <Route path="/home/:userID" element={<Home />} />
        <Route path="/iniciarSesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/campo/dashboards/:userID" element={<Dashboards />} />
        <Route path="/olvidoContra" element={<OlvidoContra />} />
        <Route path="/recover_password/:userID" element={<RecuperarContra />} />
        <Route path="/editarPerfil/:userID" element={<EditarPerfil />} />
        <Route path="/VerCultivos/:userID" element={<VerCultivos />} />
      </Routes>
    </div>
  );
}

export default App;
