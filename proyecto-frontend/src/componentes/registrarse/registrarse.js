import React, { useState } from 'react';
import '../../assets/global.scss';
import '../background/background.scss';
import ErrorModal from '../../errorFolder/errores';
import Card from '../../errorFolder/card';

export default function Registrarse() {
  const [ingresarNombre, setIngresarNombre] = useState('');
  const [ingresarCorreo, setIngresarCorreo] = useState('');
  const [ingresarUsuario, setIngresarIngresarUsuario] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [ingresarContrasenia, setIngresarIngresarContrasenia] = useState('');

  const [error, setError] = useState({
    title: '',
    message: ''
  })

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

    if(ingresarCorreo.trim().length === 0 || ingresarNombre.trim().length === 0 || ingresarUsuario.trim().length === 0){
      setError({
        title: 'Campo vacío',
        message: 'Faltó rellenar algún valor, revise el formulario y envíelo devuelta.'
      })
      setInvalid(true);
      return;
    }
  }

  return (

    <div>

    {invalid && <ErrorModal title={error.title} message={error.message} onClick ={okay} ></ErrorModal>}
    <Card className='input' >
    <form  onSubmit={handleSubmit}>
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
        <button className="green-button">Registrarse</button>
        
      </div>
      
    </div>
    </form>
    </Card>
    </div>

  );
}


