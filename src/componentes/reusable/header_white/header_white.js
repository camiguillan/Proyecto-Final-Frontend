/* eslint-disable no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable object-curly-spacing */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Icon from '../../../assets/icons/icon';
import '../header/header.scss';
import '../../homePrincipal/homePrincipal.scss';
import '../../../assets/global.scss';

export default function HeaderWhite() {
  const nav = useNavigate();

  return (
    <div className="layout">
      <header className="header-principal">
        <div className="agroIa" onClick={() => nav('../')}>
          <Icon className="bi bi-flower1" color="#2a7d2e" fontSize="6vh" />
          <h1>AGROIA</h1>
        </div>
      </header>
    </div>
  );
}
