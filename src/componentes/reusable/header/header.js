import React from 'react';
import './header.scss';
import { useNavigate } from 'react-router-dom';
import AgroIcon from '../../../assets/icons/agroIcon';
import HambMenu from '../hambMenu/hambMenu';

export default function Header() {
  const nav = useNavigate();

  return (
    <div>
      <HambMenu pageWrapId="page-wrap" outerContainerId="user" />
      <header id="header">
        <div className="agroIa" onClick={() => nav('/user/home')}>
          <AgroIcon />
          <h1>AGROIA</h1>
        </div>
        <div className="user" id="user">
          <div id="page-wrap" className="bm-menu-wrap" />
        </div>
      </header>
    </div>
  );
}
