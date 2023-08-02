/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import React from 'react';
import '../../assets/global.scss';
import '../background/background.scss';
import '../olvidoContra/olvidoContra.scss';
import { useNavigate } from 'react-router-dom';
import '../reusable/white_container/white_container.scss'; // LA CAJA BLANCA Y EL TEXTO
import '../reusable/input_box/input_box.scss'; // LAS CAJITAS DE TEXTO
import Icon from '../../assets/icons/icon';

export default function PswUpdated() {
  const navigate = useNavigate();
  return (
    <div className="gradient-background">
      <div>
        <div className="small-white-rectangle">
          <div className="agroia-olvidocontra" onClick={() => navigate('../')}>
            <Icon className="bi bi-flower1" color="#2a7d2e" fontSize="3.5rem" />
            <h1>AGROIA</h1>
          </div>
          <div className="espacio" />
          <span className="title-olvidocontra agrego-width">Se ha actualizado su contraseña con éxito!</span>
          <div className="espacio" />
          <div>
            <span className="texto-normal no-bold">Por favor, </span>
            <span className="registrate" onClick={() => navigate('../iniciarSesion')}>iniciá sesión.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
