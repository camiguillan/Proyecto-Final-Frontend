import React from 'react';
import "./coso_verde.scss";
import AgroIcon from '../../../assets/icons/agroIcon'; 



export default function CosoVerde() {
    return (
        <div className="green-rectangle">
            <AgroIcon></AgroIcon>
            <span className="text"> AGROIA</span>
        </div>
    )
  }