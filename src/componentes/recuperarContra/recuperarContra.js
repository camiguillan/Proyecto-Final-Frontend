/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import '../../assets/global.scss';
import '../background/background.scss';
import '../olvidoContra/olvidoContra.scss';
import './recuperarContra.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import '../reusable/white_container/white_container.scss'; // LA CAJA BLANCA Y EL TEXTO
import '../reusable/input_box/input_box.scss'; // LAS CAJITAS DE TEXTO
import Button from '../reusable/boton/button';
import { post } from '../conexionBack/conexionBack';
import Icon from '../../assets/icons/icon';

export default function RecuperarContra() {
  const [ingresarContrasenia, setIngresarIngresarContrasenia] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [isInputFilled5, setIsInputFilled5] = useState(false);
  const [campoNombreLleno, setcampoNombreLleno] = useState(false);
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const eyeIcon = mostrarContrasenia ? <AiOutlineEyeInvisible /> : <AiOutlineEye />;
  const [submit, setSubmit] = useState(false);

  const { userID } = useParams();

  const navigate = useNavigate();

  const handleInputChangePassword = (e) => {
    const { value } = e.target;
    setIngresarIngresarContrasenia(value);

    // Validar la contraseña
    const hasUpperCase = /[A-Z]/.test(value);
    const isValidLength = value.length >= 8;
    const hasLowerCase = /[a-z]/.test(value);

    setIsInputFilled5(hasUpperCase && isValidLength && hasLowerCase);
  };

  const toggleMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
  };

  const isInputFilled2 = ingresarContrasenia.trim() !== '';

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmit(true);
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

      navigate('../pswUpdated');
    }
  }

  const isInputFilled = ingresarContrasenia.trim() !== '';

  return (

    <div className="gradient-background">

      <form onSubmit={handleSubmit}>
        <div>
          <div className="small-white-rectangle">
            <div className="agroia-olvidocontra" onClick={() => navigate('../')}>
              <Icon className="bi bi-flower1" color="#2a7d2e" fontSize="3.5rem" />
              <h1>AGROIA</h1>
            </div>
            <span className="container-text">Recuperar contraseña</span>
            <input
              className={(campoNombreLleno || !submit) || isInputFilled ? 'sub-rectangle' : 'sub-rectangle-red'}
              type={mostrarContrasenia ? 'text' : 'password'}
              placeholder="Ingrese su nueva contraseña"
              value={ingresarContrasenia}
              onChange={(e) => handleInputChangePassword(e, setIngresarIngresarContrasenia)}
              style={{ color: isInputFilled2 ? 'black' : '$gris-input-to-fill' }}
            />
            {' '}
            <span className="mostrar-ocultar-mini" onClick={toggleMostrarContrasenia}>
              {eyeIcon}
            </span>
            {!isInputFilled5 && invalid && <p className="password-message-mini">La contraseña debe tener al menos 8 caracteres y una mayúscula</p>}
            <div className="espacio3" />
            <Button type="submit" className="green-button cancelar">
              <span className="button-text">Cambiar contraseña</span>
            </Button>
          </div>

        </div>
      </form>
    </div>

  );
}
