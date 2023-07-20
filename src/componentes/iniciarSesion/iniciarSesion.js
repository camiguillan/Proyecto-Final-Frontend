/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/global.scss';
import '../background/background.scss';
import './iniciarSesion.scss';
import '../reusable/input_box/input_box.scss';
import CosoVerde from '../reusable/coso_verde/coso_verde';
import '../reusable/white_container/white_container.scss';
import ErrorModal from '../reusable/errorFolder/errores';
import Button from '../reusable/boton/button';
import { post } from '../conexionBack/conexionBack';

export default function IniciarSesion() {
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  // const [invalid2, setInvalid2] = useState(false);

  const [error, setError] = useState({
    title: '',
    message: '',
  });

  const handleInputChange = (e, setInputValue) => {
    setInputValue(e.target.value);
  };

  const isInputUsernameFilled = inputUsername.trim() !== '';
  const isInputPasswordFilled = inputPassword.trim() !== '';

  const navigate = useNavigate();

  const okay = () => setInvalid(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputUsername.trim().length === 0 || inputPassword.trim().length === 0) {
      setError({
        title: 'Campo vacío',
        message: 'Faltó rellenar algún valor, revise el formulario y envíelo devuelta.',
      });
      setInvalid(true);
    } else {
      const data = { email: inputUsername, password: inputPassword };
      try {
        const { user } = await post('sign_in/', data);
        navigate(`/home/${user._id}`);
      } catch (error1) {
      // Verificar si el error es de tipo 404
        if (error1.response && error1.response.status === 404) {
          setError({
            title: 'No se encontró usuario asociado al mail ingresado',
            message: 'Por favor, revise el mail ingresado.',
          });
        } else if (error1.response && error1.response.status === 401) {
          setError({
            title: 'La contraseña ingresada es incorrecta',
            message: 'Por favor, revise la contraseña ingresada.',
          });
        } else {
          setError({
            title: 'Error de conexión',
            message: `Ocurrió un error en la conexión con el servidor. Detalles del error: ${error1.message}`,
          });
        }
        setInvalid(true);
      }
    }
  };

  return (
    <div className="gradient-background">
      <CosoVerde />
      {invalid && <ErrorModal title={error.title} message={error.message} onClick={okay} />}
      <form onSubmit={handleSubmit}>
        <div>
          <div className="white-rectangle">
            <span className="container-text">Iniciá Sesion</span>

            <input
              className="sub-rectangle"
              type="text"
              placeholder="  Ingrese su email"
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

            <div className="espacio" />

            <div className="green-text" onClick={() => navigate('../olvidoContra')}>¿Olvido su contraseña?</div>

            <div className="espacio" />

            <Button type="submit" className="green-button">Iniciar Sesion </Button>

            <div className="espacio" />

            <div>
              <text className="texto-normal">¿No tienes una cuenta? </text>
              <text className="registrate" onClick={() => navigate('../registrarse')}>Regístrate!</text>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}
