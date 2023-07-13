import React, { useState } from 'react';
import '../../assets/global.scss';
import '../background/background.scss';
import '../iniciarSesion/iniciarSesion.scss'
import '../reusables_CF/input_box/input_box.scss'
import CosoVerde from '../reusables_CF/coso_verde/coso_verde';
import '../reusables_CF/white_container/white_container.scss';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'


export default function IniciarSesion() {
  
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');


    const handleInputChange = (e, setInputValue) => {
        setInputValue(e.target.value);
    };

    const isInputUsernameFilled = inputUsername.trim() !== '';
    const isInputPasswordFilled = inputPassword.trim() !== '';


    const navigate = useNavigate();

    return (
    <div className='gradient-background'> 
        <CosoVerde></CosoVerde>
        <div className="white-rectangle">
            <span className="container-text">Inicia Sesion</span>
            <input
            className="sub-rectangle"
            type="text"
            placeholder="Ingrese su nombre de usuario"
            value={inputUsername}
            onChange={(e) => handleInputChange(e, setInputUsername)}
            style={{ color: isInputUsernameFilled ? 'black' : '#888' }}
            />
            <input
            className="sub-rectangle"
            type="text"
            placeholder="Ingrese su contraseña"
            value={inputPassword}
            onChange={(e) => handleInputChange(e, setInputPassword)}
            style={{ color: isInputPasswordFilled ? 'black' : '#888' }}
            />

            <div className='green-text' onClick={() => navigate("../olvidoContra")}>¿Olvido su contraseña?</div>

            <div>BOTON DE INICIAR SESION</div>

            <div>
                <text className='texto-normal'>¿No tienes una cuenta? </text> 
                <text className='registrate'>Regístrate!</text>
            </div>
            
        </div>
    </div>
  )
}
