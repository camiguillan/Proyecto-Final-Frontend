/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import './App.css';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import AgregarCampo from './componentes/agregarCampo/agregarCampo';
import EditarCampo from './componentes/editarCampo/editarCampo';
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
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePrincipal />} />
        <Route path="/:userID/agregarCampo" element={<AgregarCampo />} />
        <Route path="/:userID/editarCampo" element={<EditarCampo />} />
        <Route path="/:userID/home" element={<Home />} />
        <Route path="/iniciarSesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/:userID/campo/dashboards" element={<Dashboards />} />
        <Route path="/olvidoContra" element={<OlvidoContra />} />
        <Route path="/recuperarContra" element={<RecuperarContra />} />
        <Route path="/:userID/editarPerfil" element={<EditarPerfil />} />
        <Route path="/:userID/VerCultivos/:imageName" element={<VerCultivos />} />
      </Routes>
    </div>
  );
}

export default App;
