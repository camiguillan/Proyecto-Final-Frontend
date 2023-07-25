/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import '../../assets/global.scss';
import '../background/background.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import CosoVerde from '../reusable/coso_verde/coso_verde';
import '../reusable/white_container/white_container.scss'; // LA CAJA BLANCA Y EL TEXTO
import '../reusable/input_box/input_box.scss'; // LAS CAJITAS DE TEXTO
import Button from '../reusable/boton/button';
import { post } from '../conexionBack/conexionBack';

export default function RecuperarContra() {
  const [ingresarContrasenia, setIngresarIngresarContrasenia] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [isInputFilled5, setIsInputFilled5] = useState(false);
  const [campoNombreLleno, setcampoNombreLleno] = useState(false);
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const eyeIcon = mostrarContrasenia ? <AiOutlineEyeInvisible /> : <AiOutlineEye />;

  const { userID } = useParams();

  const navigate = useNavigate();

  const handleInputChangePassword = (e) => {
    const { value } = e.target;
    setIngresarIngresarContrasenia(value);

    // Validar la contraseña
    const hasUpperCase = /[A-Z]/.test(value);
    const isValidLength = value.length >= 8;

    setIsInputFilled5(hasUpperCase && isValidLength);
  };

  const toggleMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
  };

  const isInputFilled2 = ingresarContrasenia.trim() !== '';

  async function handleSubmit(e) {
    e.preventDefault();

    if (ingresarContrasenia.trim().length === 0) {
      setcampoNombreLleno(false);
      setInvalid(true);
    } else if (!isInputFilled5) {
      setInvalid(true);
    } else {
      const data = {
        password: ingresarContrasenia,
      };
      post(`change_password/${userID}`, data);

      navigate('../iniciarSesion');
    }
  }

  const isInputFilled = ingresarContrasenia.trim() !== '';

  return (

    <div className="gradient-background">

      <form onSubmit={handleSubmit}>
        <div>
          <CosoVerde />
          <div className="small-white-rectangle">
            <span className="container-text">Recuperar contraseña</span>
            <div className={campoNombreLleno || isInputFilled ? 'sub-rectangle-recupContra-overlay' : 'sub-rectangle-overlay-recupContra-red'} />
            <input
              className={campoNombreLleno || isInputFilled ? 'sub-rectangle' : 'sub-rectangle-red'}
              type={mostrarContrasenia ? 'text' : 'password'}
              placeholder="Ingrese su nueva contraseña"
              value={ingresarContrasenia}
              onChange={(e) => handleInputChangePassword(e, setIngresarIngresarContrasenia)}
              style={{ color: isInputFilled2 ? 'black' : '#888' }}
            />
            {' '}
            <span className="mostrar-ocultar-mini" onClick={toggleMostrarContrasenia}>
              {eyeIcon}
            </span>
            {!isInputFilled5 && invalid && <p className="password-message-mini">La contraseña debe tener al menos 8 caracteres y una mayúscula</p>}

            <Button type="submit" className="green-button">
              <span className="button-text">Cambiar contraseña</span>

            </Button>
          </div>

        </div>
      </form>
    </div>

  );
}
