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

export default function PswRecoveryEmailSent() {
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
          <div className="espacio" />
          <span className="title-olvidocontra">¿Olvidó su contraseña?</span>
          <text className="texto-normal agrego-width">Se le ha enviado un link de recuperación al email ingresado. Por favor, consulte su correo electrónico.</text>
        </div>
      </div>
    </div>
  );
}
