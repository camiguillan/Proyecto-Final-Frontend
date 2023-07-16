/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../../assets/global.scss';
import '../background/background.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../reusable/boton/button';
import ErrorModal from '../reusable/errorFolder/errores';
import CosoVerde from '../reusable/coso_verde/coso_verde';
import '../reusable/white_container/white_container.scss'; // LA CAJA BLANCA Y EL TEXTO
import '../reusable/input_box/input_box.scss'; // LAS CAJITAS DE TEXTO
import enviarNombreAlBackend from '../conexionBack/conexionBack';

export default function Registrarse() {
  const [ingresarNombre, setIngresarNombre] = useState('');
  const [ingresarCorreo, setIngresarCorreo] = useState('');
  const [ingresarFechaNacimiento, setIngresarFechaNacimiento] = useState('');
  const [invalid, setInvalid] = useState(false);
  // const [invalid2, setInvalid2] = useState(false);
  const [ingresarContrasenia, setIngresarIngresarContrasenia] = useState('');

  const [error, setError] = useState({
    title: '',
    message: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const isInputFilled = ingresarNombre.trim() !== '';
  const isInputFilled2 = ingresarCorreo.trim() !== '';
  const isInputFilled3 = ingresarFechaNacimiento.trim() !== '';
  const isInputFilled4 = ingresarContrasenia.trim() !== '';

  const okay = () => setInvalid(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ingresarCorreo.trim().length === 0 || ingresarNombre.trim().length === 0
    || ingresarFechaNacimiento.trim().length === 0 || ingresarContrasenia.trim().length === 0) {
      setError({
        title: 'Campo vacío',
        message: 'Faltó rellenar algún valor, revise el formulario y envíelo devuelta.',
      });
      setInvalid(true);
    } else {
      enviarNombreAlBackend(ingresarNombre, ingresarCorreo, ingresarFechaNacimiento, ingresarContrasenia)
        .then((response) => {
          // Manejar la respuesta si es necesario
        })
        .catch((error) => {
          // Manejar el error si ocurre alguno
        });
      navigate('../iniciarSesion');
    }
  };

  return (

    <div className="gradient-background">
      <CosoVerde />

      {invalid && <ErrorModal title={error.title} message={error.message} onClick={okay} />}

      <div>
        <div className="white-rectangle">
          <span className="container-text">Creá tu usuario</span>
          <form onSubmit={handleSubmit}>
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
              type="date"
              placeholder="Ingrese su fecha de nacimiento"
              value={ingresarFechaNacimiento}
              onChange={(e) => handleInputChange(e, setIngresarFechaNacimiento)}
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

            <Button type="submit" className="green-button" onClick={handleSubmit}>Registrarse </Button>
          </form>
        </div>

      </div>
    </div>

  );
}
