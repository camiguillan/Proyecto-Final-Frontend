import React from 'react';
import "./header.scss";
import AgroIcon from '../../../assets/icons/agroIcon';
import HambMenu from '../hambMenu/hambMenu';

export default function Header() {
  return (
    <div>
      <HambMenu pageWrapId={"page-wrap"} outerContainerId={"user"}></HambMenu>
      <header id='header'>
        <div className='agroIa'>
        <AgroIcon></AgroIcon>
          <h1>AGROIA</h1>
        </div>
        <div className='user' id= "user">
        <div id="page-wrap" className='bm-menu-wrap' ></div>
        </div>
      </header>
    </div>
  )
}
