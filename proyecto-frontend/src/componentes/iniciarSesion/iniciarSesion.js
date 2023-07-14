import React, { useState } from 'react';
import '../../assets/global.scss';
import '../background/background.scss';
import '../iniciarSesion/iniciarSesion.scss'
import '../reusables_CF/input_box/input_box.scss'
import '../reusables_CF/boton/boton.scss'
import CosoVerde from '../reusables_CF/coso_verde/coso_verde';
import '../reusables_CF/white_container/white_container.scss';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import ErrorModal from '../../errorFolder/errores';
import Card from '../../errorFolder/card';


export default function IniciarSesion() {
  
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [invalid2, setInvalid2] = useState(false);
  
    const [error, setError] = useState({
      title: '',
      message: ''
    })

    const handleInputChange = (e, setInputValue) => {
        setInputValue(e.target.value);
    };

    const isInputUsernameFilled = inputUsername.trim() !== '';
    const isInputPasswordFilled = inputPassword.trim() !== '';


    const navigate = useNavigate();

    function okay(){
        setInvalid(false);
      }
    
      function handleSubmit(e){
        e.preventDefault();
    
        if(inputUsername.trim().length === 0 || inputPassword.trim().length === 0){
          setError({
            title: 'Campo vacío',
            message: 'Faltó rellenar algún valor, revise el formulario y envíelo devuelta.'
          })
          setInvalid(true);
          return;
        }else{navigate("../home")} return;
      }
     

    return (
    <div className='gradient-background'>
    {invalid && <ErrorModal title={error.title} message={error.message} onClick ={okay} ></ErrorModal>}
        <Card >
            <form  onSubmit={handleSubmit}>
                <div > 
                    <CosoVerde></CosoVerde>
                    <div className="white-rectangle">
                        <span className="container-text">Iniciá Sesion</span>
                        
                        <input
                        className="sub-rectangle"
                        type="text"
                        placeholder="  Ingrese su nombre de usuario"
                        value={inputUsername}
                        onChange={(e) => handleInputChange(e, setInputUsername)}
                        style={{ color: isInputUsernameFilled ? 'black' : '#888' }}
                        />
                        <input
                        className="sub-rectangle"
                        type="text"
                        placeholder="  Ingrese su contraseña"
                        value={inputPassword}
                        onChange={(e) => handleInputChange(e, setInputPassword)}
                        style={{ color: isInputPasswordFilled ? 'black' : '#888' }}
                        />

                        <div className='espacio'></div>

                        <div className='green-text' onClick={() => navigate("../olvidoContra")}>¿Olvido su contraseña?</div>

                        <div className='espacio'></div>

                        <button className="green-button" onClick={handleSubmit}>Iniciar Sesion</button>

                        <div className='espacio'></div>

                        <div>
                            <text className='texto-normal'>¿No tienes una cuenta? </text> 
                            <text className='registrate' onClick={() => navigate("../registrarse")}>Regístrate!</text>
                        </div>
                        
                    </div>
                </div>
            </form>
        </Card>
    </div>
  )
}
