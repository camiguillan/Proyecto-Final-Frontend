import React from 'react';
import "./boton.scss";

export default function Boton(props) {
  return (
    <div>
        <button className="green-button" onClick={() => props.handleSubmit()}>{props.text}</button>        
    </div>
  )
}
