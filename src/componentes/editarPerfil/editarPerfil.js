/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import '../../assets/global.scss';
import '../background/background.scss';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../reusable/errorFolder/errores';
import '../reusable/white_container/white_container.scss'; // LA CAJA BLANCA Y EL TEXTO
import '../reusable/input_box/input_box.scss'; // LAS CAJITAS DE TEXTO
import Header from '../reusable/header/header';
import Button from '../reusable/boton/button';
import { post } from '../conexionBack/conexionBack';

export default function EditarPerfil() {

  const [ingresarNombre, setIngresarNombre] = useState('Juancho Pirata');
  const [ingresarCorreo, setIngresarCorreo] = useState('juanchoPirata00@hotmail.com');
  const [ingresarFechaNacimiento, setIngresarFechaNacimiento] = useState('02/25/2000');
  const [invalid, setInvalid] = useState(false);
  // const [invalid2, setInvalid2] = useState(false);
  const [ingresarContrasenia, setIngresarIngresarContrasenia] = useState('juanchoPirata2000');
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);

  const [error, setError] = useState({
    title: '',
    message: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const toggleMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
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
      post(ingresarNombre, ingresarCorreo, ingresarFechaNacimiento, ingresarContrasenia)
        .then((response) => {
          // Manejar la respuesta si es necesario
        })
        .catch((error) => {
          // Manejar el error si ocurre alguno
        });
      navigate('../user/home');
    }
  };

  return (
    <div>
      <Header />
      {invalid && <ErrorModal title={error.title} message={error.message} onClick={okay} />}
      <form onSubmit={handleSubmit}>
        <div>
          <div className="invisible-white-rectangle">
            <span className="container-text">Editar Perfil</span>
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
            <div className="sub-rectangle-container">
              <input
                className="sub-rectangle"
                type={mostrarContrasenia ? 'text' : 'password'}
                placeholder="Ingrese su contraseña"
                value={ingresarContrasenia}
                onChange={(e) => {
                  handleInputChange(e, setIngresarIngresarContrasenia);
                  setIngresarIngresarContrasenia(e.target.value);
                }}
                style={{ color: isInputFilled4 ? 'black' : '#888' }}
              />
              <button type="button" className="mostrar-ocultar" onClick={toggleMostrarContrasenia}>
                {mostrarContrasenia ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            <Button type="submit" className="green-button" onClick={handleSubmit}>Actualizar Datos</Button>
          </div>

        </div>
      </form>
    </div>
  );
}
