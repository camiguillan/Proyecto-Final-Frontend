/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import '../../assets/global.scss';
import '../background/background.scss';
import './olvidoContra.scss';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../reusable/errorFolder/errores';
import '../reusable/white_container/white_container.scss'; // LA CAJA BLANCA Y EL TEXTO
import '../reusable/input_box/input_box.scss'; // LAS CAJITAS DE TEXTO
import Button from '../reusable/boton/button';
import { post } from '../conexionBack/conexionBack';
import Icon from '../../assets/icons/icon';

export default function OlvidoContra() {
  const [ingresarCorreo, setIngresarCorreo] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [campoNombreLleno, setcampoNombreLleno] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [invalidUser, setInvalidUser] = useState(false);

  const [error, setError] = useState({
    title: '',
    message: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const isInputFilled2 = ingresarCorreo.trim() !== '';

  const okay = () => setInvalid(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    if (ingresarCorreo.trim().length === 0) {
      setcampoNombreLleno(false);
    } else {
      const data = { email: ingresarCorreo.toLowerCase() };
      try {
        const response = await post('restore_password/', data);

        navigate('../iniciarSesion');
      } catch (error1) {
        if (error1.response && error1.response.status === 401) {
          setInvalidUser(true);
        }
      }
    }
  };

  return (

    <div className="gradient-background">

      {invalid && <ErrorModal title={error.title} message={error.message} onClick={okay} />}
      <form onSubmit={handleSubmit}>
        <div>
          <div className="small-white-rectangle">
            <div className="agroia-olvidocontra" onClick={() => navigate('../')}>
              <Icon className="bi bi-flower1" color="#2a7d2e" fontSize="3.5rem" />
              <h1>AGROIA</h1>
            </div>
            <span className="title-olvidocontra">¿Olvidó su contraseña?</span>
            <text className="texto-normal">Introduzca su correo electrónico y se le enviará un link de recuperación.</text>
            <div className="espacio" />
            <input
              className={(campoNombreLleno || !submit) || isInputFilled2 ? 'sub-rectangle' : 'sub-rectangle-red'}
              type="text"
              placeholder="Ingrese su correo electrónico"
              value={ingresarCorreo}
              onChange={(e) => handleInputChange(e, setIngresarCorreo)}
              style={{ color: isInputFilled2 ? 'black' : '$gris-input-to-fill' }}
            />
            {invalidUser && (
            <p className="password-message-olvido-contra">
              El mail ingresado no existe
            </p>
            )}
            <Button type="submit" className="green-button cancelar">
              <span className="button-text">Enviar</span>
            </Button>
          </div>

        </div>
      </form>
    </div>

  );
}
