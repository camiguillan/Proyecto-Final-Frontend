/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/global.scss';
import '../background/background.scss';
import './iniciarSesion.scss';
import '../reusable/input_box/input_box.scss';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import '../reusable/white_container/white_container.scss';
import ErrorModal from '../reusable/errorFolder/errores';
import Button from '../reusable/boton/button';
import { post } from '../conexionBack/conexionBack';
import Icon from '../../assets/icons/icon';
import tractor from '../../images/granjero.png';

export default function IniciarSesion() {
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidUser, setInvalidUser] = useState(false);
  const [invalid, setInvalid] = useState(false);
  // const [invalid2, setInvalid2] = useState(false);
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const eyeIcon = mostrarContrasenia ? <AiOutlineEyeInvisible /> : <AiOutlineEye />;
  const [campoNombreLleno, setcampoNombreLleno] = useState(false);
  const [submit, setSubmit] = useState(false);

  const [error, setError] = useState({
    title: '',
    message: '',
  });

  const handleInputChange = (e, setInputValue) => {
    setInputValue(e.target.value);
  };

  const toggleMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
  };

  const isInputUsernameFilled = inputUsername.trim() !== '';
  const isInputPasswordFilled = inputPassword.trim() !== '';

  const navigate = useNavigate();

  const okay = () => setInvalid(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);

    if (inputUsername.trim().length === 0 || inputPassword.trim().length === 0) {
      setcampoNombreLleno(false);
    } else {
      const data = { email: inputUsername.toLowerCase(), password: inputPassword };
      try {
        const { user } = await post('sign_in/', data);
        localStorage.setItem('name', JSON.stringify(user));
        navigate(`/home/${user._id}`);
      } catch (error1) {
      // Verificar si el error es de tipo 404
        if (error1.response && error1.response.status === 404) {
          setInvalidUser(true);
          setInvalidPassword(false);
        } else if (error1.response && error1.response.status === 401) {
          setInvalidPassword(true);
          setInvalidUser(false);
        } else {
          setError({
            title: 'Error de conexión',
            message: `Ocurrió un error en la conexión con el servidor. Detalles del error: ${error1.message}`,
          });
          setInvalid(true);
        }
      }
    }
  };

  return (
    <div className="gradient-background">
      {invalid && <ErrorModal title={error.title} message={error.message} onClick={okay} />}
      <form onSubmit={handleSubmit}>
        <div>
          <div className="white-rectangle">
            <div className="flexbox-container2">
              <div className="title-inicio center">
                <div className="agroia2" onClick={() => navigate('../')}>
                  <Icon className="bi bi-flower1" color="#2a7d2e" fontSize="3.5rem" />
                  <h1>AGROIA</h1>
                </div>
                <div>
                  <img src={tractor} alt="Imagen 4" />
                </div>
                <div className="title-inicio2">Bienvenid@ de nuevo!</div>
              </div>
              <div className="text-home-principal">
                <text className="gray-title">Iniciá Sesión</text>
                <div className="espacio3" />
                <input
                  className={(campoNombreLleno || !submit) || isInputUsernameFilled ? 'sub-rectangle' : 'sub-rectangle-red'}
                  type="text"
                  placeholder="Ingrese su email"
                  value={inputUsername}
                  onChange={(e) => handleInputChange(e, setInputUsername)}
                  style={{ color: isInputUsernameFilled ? 'black' : '$gris-input-to-fill' }}
                />
                {invalidUser && (
                <p className="password-message-mail">
                  El mail ingresado no existe
                </p>
                )}
                <input
                  className={(campoNombreLleno || !submit) || isInputPasswordFilled ? 'sub-rectangle' : 'sub-rectangle-red'}
                  type={mostrarContrasenia ? 'text' : 'password'}
                  placeholder="Ingrese su contraseña"
                  value={inputPassword}
                  onChange={(e) => handleInputChange(e, setInputPassword)}
                  style={{ color: isInputPasswordFilled ? 'black' : '$gris-input-to-fill' }}
                />
                <span className="mostrar-ocultar-init-sesion" onClick={toggleMostrarContrasenia}>
                  {eyeIcon}
                </span>
                {invalidPassword && <p className="password-message-init-sesion">La contraseña ingresada es incorrecta</p>}

                <div className="green-text" onClick={() => navigate('../olvidoContra')}>¿Olvidó su contraseña?</div>

                <div className="espacio" />

                <Button type="submit" className="green-button cancelar-lleno">Iniciar Sesión </Button>

                <div className="espacio" />

                <div>
                  <text className="texto-normal">¿No tenés una cuenta? </text>
                  <text className="registrate" onClick={() => navigate('../registrarse')}>Regístrate!</text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
