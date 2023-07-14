import React from 'react';
import "./boton.scss";

export default function Boton(props) {
  return (
    <div>
        <button type={props.type || 'button'} className={`green-button ${props.className}`} onClick={() => props.onClick()}>{props.text}</button>        
    </div>
  )
}
