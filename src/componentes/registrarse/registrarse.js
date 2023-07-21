/* eslint-disable brace-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../../assets/global.scss';
import '../background/background.scss';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Button from '../reusable/boton/button';
import ErrorModal from '../reusable/errorFolder/errores';
import CosoVerde from '../reusable/coso_verde/coso_verde';
import '../reusable/white_container/white_container.scss'; // LA CAJA BLANCA Y EL TEXTO
import '../reusable/input_box/input_box.scss'; // LAS CAJITAS DE TEXTO
import { post } from '../conexionBack/conexionBack';

export default function Registrarse() {
  const [ingresarNombre, setIngresarNombre] = useState('');
  const [ingresarCorreo, setIngresarCorreo] = useState('');
  const [ingresarFechaNacimiento, setIngresarFechaNacimiento] = useState('');
  const [campoNombreLleno, setcampoNombreLleno] = useState(false);
  const [invalid, setInvalid] = useState(false);
  // const [invalid2, setInvalid2] = useState(false);
  const [ingresarContrasenia, setIngresarIngresarContrasenia] = useState('');
  const [isInputFilled5, setIsInputFilled5] = useState(false);
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const eyeIcon = mostrarContrasenia ? <AiOutlineEyeInvisible /> : <AiOutlineEye />;

  const [error, setError] = useState({
    title: '',
    message: '',
  });

  const navigate = useNavigate();

  const handleInputChangePassword = (e) => {
    const { value } = e.target;
    setIngresarIngresarContrasenia(value);

    // Validar la contraseña
    const hasUpperCase = /[A-Z]/.test(value);
    const isValidLength = value.length >= 8;

    setIsInputFilled5(hasUpperCase && isValidLength);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ingresarCorreo.trim().length === 0 || ingresarNombre.trim().length === 0
    || ingresarFechaNacimiento.trim().length === 0 || ingresarContrasenia.trim().length === 0) {
      setcampoNombreLleno(false);
    } else if (!isInputFilled5) {
      setInvalid(true);
    } else {
      const data = {
        name: ingresarNombre, birthDate: ingresarFechaNacimiento, email: ingresarCorreo, password: ingresarContrasenia,
      };
      const response = await post('user/', data);
      const id = response.user._id;

      navigate(`/home/${id}`);
    }
  };

  return (

    <div className="gradient-background">
      <CosoVerde />

      <div>
        <div className="white-rectangle">
          <span className="container-text">Creá tu usuario</span>
          <form onSubmit={handleSubmit}>
            <input
              className={campoNombreLleno || isInputFilled ? 'sub-rectangle' : 'sub-rectangle-red'}
              type="text"
              placeholder="Ingrese su nombre"
              value={ingresarNombre}
              onChange={(e) => handleInputChange(e, setIngresarNombre)}
              style={{ color: isInputFilled ? 'black' : '#888' }}
            />
            <input
              className={campoNombreLleno || isInputFilled2 ? 'sub-rectangle' : 'sub-rectangle-red'}
              type="text"
              placeholder="Ingrese su correo electrónico"
              value={ingresarCorreo}
              onChange={(e) => handleInputChange(e, setIngresarCorreo)}
              style={{ color: isInputFilled2 ? 'black' : '#888' }}
            />
            <input
              className={campoNombreLleno || isInputFilled3 ? 'sub-rectangle' : 'sub-rectangle-red'}
              type="date"
              placeholder="Ingrese su fecha de nacimiento"
              value={ingresarFechaNacimiento}
              onChange={(e) => handleInputChange(e, setIngresarFechaNacimiento)}
              style={{ color: isInputFilled3 ? 'black' : '#888' }}
            />
            <input
              className={campoNombreLleno || isInputFilled4 ? 'sub-rectangle' : 'sub-rectangle-red'}
              type={mostrarContrasenia ? 'text' : 'password'}
              placeholder="Ingrese su contraseña"
              value={ingresarContrasenia}
              onChange={(e) => handleInputChangePassword(e, setIngresarIngresarContrasenia)}
              style={{ color: isInputFilled4 ? 'black' : '#888' }}
            />
            <span className="mostrar-ocultar" onClick={toggleMostrarContrasenia}>
              {eyeIcon}
            </span>
            {!isInputFilled5 && invalid && <p className="password-message">La contraseña debe tener al menos 8 caracteres y una mayúscula</p>}
            <Button type="submit" className="green-button">Registrarse </Button>
          </form>
        </div>

      </div>
    </div>

  );
}
