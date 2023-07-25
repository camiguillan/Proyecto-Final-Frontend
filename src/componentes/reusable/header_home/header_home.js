/* eslint-disable no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable object-curly-spacing */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../boton/button';
import Icon from '../../../assets/icons/icon';
import '../header/header.scss';
import '../../homePrincipal/homePrincipal.scss';
import '../../../assets/global.scss';

export default function HeaderHome() {
  const nav = useNavigate();

  return (
    <div className="layout">
      <header className="header-principal">
        <div className="agroIa" onClick={() => nav('../')}>
          <Icon className="bi bi-flower1" color="#2a7d2e" fontSize="6vh" />
          <h1>AGROIA</h1>
        </div>
        <div className="botonesInicio">
          <Button onClick={() => nav('/iniciarSesion')} className="green-button cancelar">Iniciar Sesion</Button>
          <Button onClick={() => nav('/registrarse')} className="green-button cancelar">Registrarse</Button>
        </div>
      </header>
    </div>
  );
}
