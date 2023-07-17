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

function App() {
  document.title = 'AGROIA';
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IniciarSesion />} />
        <Route path="/user/agregarCampo" element={<AgregarCampo />} />
        <Route path="/user/editarCampo" element={<EditarCampo />} />
        <Route path="/user/home" element={<Home />} />
        <Route path="/iniciarSesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/user/campo/dashboards" element={<Dashboards />} />
        <Route path="/olvidoContra" element={<OlvidoContra />} />
        <Route path="/user/editarPerfil" element={<EditarPerfil />} />
      </Routes>
    </div>
  );
}

export default App;
