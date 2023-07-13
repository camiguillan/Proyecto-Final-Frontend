import React, { useState } from 'react';
import '../../assets/global.scss';
import '../background/background.scss';

export default function Registrarse() {
  const [inputValue, setInputValue] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');

  const handleInputChange = (e, setInputValue) => {
    setInputValue(e.target.value);
  };

  const isInputFilled = inputValue.trim() !== '';
  const isInputFilled2 = inputValue2.trim() !== '';
  const isInputFilled3 = inputValue3.trim() !== '';
  const isInputFilled4 = inputValue4.trim() !== '';

  return (
    <div className="gradient-background">
      <div className="green-rectangle">
        <span className="text">AGROIA</span>
      </div>
      <div className="white-rectangle">
        <span className="crea-usuario">Creá tu usuario</span>
        <input
          className="sub-rectangle-first"
          type="text"
          placeholder="Ingrese su nombre"
          value={inputValue}
          onChange={(e) => handleInputChange(e, setInputValue)}
          style={{ color: isInputFilled ? 'black' : '#888' }}
        />
        <input
          className="sub-rectangle"
          type="text"
          placeholder="Ingrese su correo electrónico"
          value={inputValue2}
          onChange={(e) => handleInputChange(e, setInputValue2)}
          style={{ color: isInputFilled2 ? 'black' : '#888' }}
        />
        <input
          className="sub-rectangle"
          type="text"
          placeholder="Ingrese su nombre de usuario"
          value={inputValue3}
          onChange={(e) => handleInputChange(e, setInputValue3)}
          style={{ color: isInputFilled3 ? 'black' : '#888' }}
        />
        <input
          className="sub-rectangle"
          type="text"
          placeholder="Ingrese su contraseña"
          value={inputValue4}
          onChange={(e) => handleInputChange(e, setInputValue4)}
          style={{ color: isInputFilled4 ? 'black' : '#888' }}
        />
      </div>
    </div>
  );
}