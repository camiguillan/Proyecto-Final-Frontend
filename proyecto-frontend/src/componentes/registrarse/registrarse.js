import React, { useState } from 'react';
import '../../assets/global.scss';
import '../background/background.scss';
import ErrorModal from '../../errorFolder/errores';
import Card from '../../errorFolder/card';
import {useNavigate} from 'react-router-dom'
import CosoVerde from '../reusables_CF/coso_verde/coso_verde';
import '../reusables_CF/white_container/white_container.scss'; //LA CAJA BLANCA Y EL TEXTO
import '../reusable/input_box/input_box.scss' // LAS CAJITAS DE TEXTO
import '../reusables_CF/boton/boton.scss'

export default function Registrarse() {
  const [ingresarNombre, setIngresarNombre] = useState('');
  const [ingresarCorreo, setIngresarCorreo] = useState('');
  const [ingresarUsuario, setIngresarIngresarUsuario] = useState('');
  const [invalid, setInvalid] = useState(false);
  //const [invalid2, setInvalid2] = useState(false);
  const [ingresarContrasenia, setIngresarIngresarContrasenia] = useState('');

  const [error, setError] = useState({
    title: '',
    message: ''
  })

  const navigate = useNavigate();


  const handleInputChange = (e, setIngresarNombre) => {
    setIngresarNombre(e.target.value);
  };

  const isInputFilled = ingresarNombre.trim() !== '';
  const isInputFilled2 = ingresarCorreo.trim() !== '';
  const isInputFilled3 = ingresarUsuario.trim() !== '';
  const isInputFilled4 = ingresarContrasenia.trim() !== '';

  function okay(){
    setInvalid(false);
  }

  function handleSubmit(e){
    e.preventDefault();

    if(ingresarCorreo.trim().length === 0 || ingresarNombre.trim().length === 0 || ingresarUsuario.trim().length === 0 || ingresarContrasenia.trim().length === 0){
      setError({
        title: 'Campo vacío',
        message: 'Faltó rellenar algún valor, revise el formulario y envíelo devuelta.'
      })
      setInvalid(true);
      return;
    }else{navigate("../iniciarSesion")} return;
  }
 
  

  return (

    <div className="gradient-background">

    {invalid && <ErrorModal title={error.title} message={error.message} onClick ={okay} ></ErrorModal>}
    <Card >
    <form  onSubmit={handleSubmit}>
    <div >
      <CosoVerde></CosoVerde>
      <div className="white-rectangle">
        <span className="container-text">Creá tu usuario</span>
        <input
          className="sub-rectangle"
          type="text"
          placeholder="Ingrese su nombre"
          value={ingresarNombre}
          onChange={(e) => handleInputChange(e, setIngresarNombre)}
          style={{ color: isInputFilled ? 'black' : '#888' }}
        />
        <input
          className="sub-rectangle"
          type="text"
          placeholder="Ingrese su correo electrónico"
          value={ingresarCorreo}
          onChange={(e) => handleInputChange(e, setIngresarCorreo)}
          style={{ color: isInputFilled2 ? 'black' : '#888' }}
        />
        <input
          className="sub-rectangle"
          type="text"
          placeholder="Ingrese su nombre de usuario"
          value={ingresarUsuario}
          onChange={(e) => handleInputChange(e, setIngresarIngresarUsuario)}
          style={{ color: isInputFilled3 ? 'black' : '#888' }}
        />
        <input
          className="sub-rectangle"
          type="text"
          placeholder="Ingrese su contraseña"
          value={ingresarContrasenia}
          onChange={(e) => handleInputChange(e, setIngresarIngresarContrasenia)}
          style={{ color: isInputFilled4 ? 'black' : '#888' }}
        />
        <button className="green-button" onClick={handleSubmit}>Registrarse</button>        
      </div>
      
    </div>
    </form>
    </Card>
    </div>

  );
}


