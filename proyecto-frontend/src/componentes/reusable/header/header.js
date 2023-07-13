import React from 'react';
import "./header.scss";
import AgroIcon from '../../../assets/icons/agroIcon';
import UserInfo from '../userInfo/userInfo';
import HambMenu from '../hambMenu/hambMenu';

export default function Header() {
  return (
    <header id='header'>
      <div className='agroIa'>
       <AgroIcon></AgroIcon>
        <h1>AGROIA</h1>
      </div>
      <div className='user'>
      <HambMenu pageWrapId={"page-wrap"} outerContainerId={"header"}></HambMenu>
      <div id="page-wrap" className='bm-menu-wrap' ></div>
      </div>
    </header>
  )
}
