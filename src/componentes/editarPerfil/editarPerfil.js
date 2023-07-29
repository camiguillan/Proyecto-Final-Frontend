/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import '../../assets/global.scss';
import '../background/background.scss';
import '../homePrincipal/homePrincipal.scss';
import './editarPerfil.scss';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import ErrorModal from '../reusable/errorFolder/errores';
import '../reusable/white_container/white_container.scss'; // LA CAJA BLANCA Y EL TEXTO
import '../reusable/input_box/input_box.scss'; // LAS CAJITAS DE TEXTO
import Header from '../reusable/header/header';
import Button from '../reusable/boton/button';
import { post } from '../conexionBack/conexionBack';
import Icon from '../../assets/icons/icon';
import Campito from '../../images/segador.png';
import HeaderWhite from '../reusable/header_white/header_white';

export default function EditarPerfil() {

  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem('name')) || {};

  console.log(user);

  const [ingresarNombre, setIngresarNombre] = useState(user.name);
  const [ingresarCorreo, setIngresarCorreo] = useState(user.email);
  const [ingresarFechaNacimiento, setIngresarFechaNacimiento] = useState(user.birthDate.slice(0, 10));
  const [invalid, setInvalid] = useState(false);
  // const [invalid2, setInvalid2] = useState(false);
  const [ingresarContrasenia, setIngresarIngresarContrasenia] = useState('juanchoPirata2000');
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [campoNombreLleno, setcampoNombreLleno] = useState(false);
  const eyeIcon = mostrarContrasenia ? <AiOutlineEyeInvisible /> : <AiOutlineEye />;
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();
  console.log(user.password);

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
  const [isInputFilled5, setIsInputFilled5] = useState(false);

  const handleInputChangePassword = (e) => {
    const { value } = e.target;
    setIngresarIngresarContrasenia(value);

    // Validar la contraseña
    const hasUpperCase = /[A-Z]/.test(value);
    const isValidLength = value.length >= 8;

    setIsInputFilled5(hasUpperCase && isValidLength);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    if (ingresarCorreo.trim().length === 0 || ingresarNombre.trim().length === 0
    || ingresarFechaNacimiento.trim().length === 0 || ingresarContrasenia.trim().length === 0) {
      setcampoNombreLleno(false);
    } else if (!isInputFilled5) {
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
      <HeaderWhite />
      <form onSubmit={handleSubmit}>
        <div className="fondoverde">
          <div className="white-rectangle3">
            <div className="flexbox-container4">
              <div className="title-inicio center">
                <input
                  className={(campoNombreLleno || !submit) || isInputFilled ? 'sub-rectangle' : 'sub-rectangle-red'}
                  type="text"
                  placeholder="Ingrese su nombre"
                  value={ingresarNombre}
                  onChange={(e) => handleInputChange(e, setIngresarNombre)}
                  style={{ color: isInputFilled ? 'black' : '$gris-input-to-fill' }}
                />
                <input
                  className={(campoNombreLleno || !submit) || isInputFilled2 ? 'sub-rectangle' : 'sub-rectangle-red'}
                  type="text"
                  placeholder="Ingrese su correo electrónico"
                  value={ingresarCorreo}
                  onChange={(e) => handleInputChange(e, setIngresarCorreo)}
                  style={{ color: isInputFilled2 ? 'black' : '$gris-input-to-fill' }}
                />
                <input
                  className={(campoNombreLleno || !submit) || isInputFilled3 ? 'sub-rectangle' : 'sub-rectangle-red'}
                  type="date"
                  placeholder="Ingrese su fecha de nacimiento"
                  value={ingresarFechaNacimiento}
                  onChange={(e) => handleInputChange(e, setIngresarFechaNacimiento)}
                  style={{ color: isInputFilled3 ? 'black' : '$gris-input-to-fill' }}
                />
                <input
                  className={(campoNombreLleno || !submit) || isInputFilled4 ? 'sub-rectangle' : 'sub-rectangle-red'}
                  type={mostrarContrasenia ? 'text' : 'password'}
                  placeholder="Ingrese su contraseña"
                  value={ingresarContrasenia}
                  onChange={(e) => {
                    handleInputChangePassword(e, setIngresarIngresarContrasenia);
                    setIngresarIngresarContrasenia(e.target.value);
                  }}
                />
                <span className="mostrar-ocultar-edit-perfil" onClick={toggleMostrarContrasenia}>
                  {eyeIcon}
                </span>
                {!isInputFilled5 && invalid && <p className="password-message">La contraseña debe tener al menos 8 caracteres y una mayúscula</p>}
                <Button type="submit" className="green-button cancelar">Actualizar datos </Button>
              </div>
              <div>
                <h1 className="gray-title2">
                  Editar Perfil
                </h1>
                <div>
                  <img src={Campito} alt="Imagen 4" className="imagen-editarperf" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
