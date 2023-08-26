/* eslint-disable no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable object-curly-spacing */
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Icon from '../../../assets/icons/icon';
import '../header/header.scss';
import '../../homePrincipal/homePrincipal.scss';
import '../../../assets/global.scss';
import HambMenu from '../hambMenu/hambMenu';

export default function HeaderWhite() {
  const nav = useNavigate();
  const { userID } = useParams();
  return (
    <div className="layout">
      <HambMenu pageWrapId="page-wrap" outerContainerId="user" />
      <header className="header-principal">
        <div className="agroIa" onClick={() => nav(`/home/${userID}`)}>
          <Icon className="bi bi-flower1" color="#2a7d2e" fontSize="3rem" />
          <h1>AGROIA</h1>
        </div>
        <div className="user" id="user">
          <div id="page-wrap" className="bm-menu-wrap" />
        </div>
      </header>
    </div>
  );
}
