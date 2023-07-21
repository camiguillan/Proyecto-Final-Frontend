/* eslint-disable no-shadow */
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from '../reusable/header/header';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../reusable/boton/button';
import Icon from '../../assets/icons/icon';
import '../reusable/header/header.scss';
import './homePrincipal.scss';
import Footer from '../reusable/footer/footer';
import Carousel from '../reusable/carousel/carousel';

export default function HomePrincipal() {
  const nav = useNavigate();

  return (
    <div className="layout">
      <header id="header">
        <div className="agroIa">
          <Icon className="bi bi-flower1" color="white" fontSize="6vh" />
          <h1>AGROIA</h1>
        </div>
        <div className="botonesInicio">
          <Button onClick={() => nav('/iniciarSesion')} className="green-button cancelar">Iniciar Sesion</Button>
          <Button onClick={() => nav('/registrarse')} className="green-button cancelar">Registrarse</Button>
        </div>
      </header>
      <Carousel />
      <h1 className="agregar-campo-titulo">
        {' '}
        {' '}
        ¿Que es AgroIA?
      </h1>
      <Footer>hola</Footer>
    </div>
  );
}
