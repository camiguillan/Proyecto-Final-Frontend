import React from 'react';
import "./header.scss";
import AgroIcon from '../../../assets/icons/agroIcon';

export default function Header() {
  return (
    <header>
      <div className='agroIa'>
       <AgroIcon></AgroIcon>
        <h1>AGROIA</h1>
      </div>
    </header>
  )
}
