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
import { useNavigate, useParams } from 'react-router-dom';
import '../reusable/white_container/white_container.scss'; // LA CAJA BLANCA Y EL TEXTO
import '../reusable/input_box/input_box.scss'; // LAS CAJITAS DE TEXTO
import Header from '../reusable/header/header';
import Button from '../reusable/boton/button';
import { patch } from '../conexionBack/conexionBack';
import Campito from '../../images/segador.png';
import HeaderWhite from '../reusable/header_white/header_white';
import '../reusable/popup/popup.scss';

export default function EditarPerfil() {
  const { userID } = useParams();
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem('name')) || {};

  console.log(user);

  const [ingresarNombre, setIngresarNombre] = useState(user.name);
  const [ingresarCorreo, setIngresarCorreo] = useState(user.email);
  const [ingresarFechaNacimiento, setIngresarFechaNacimiento] = useState(user.birthDate.slice(0, 10));
  const [invalid, setInvalid] = useState(false);
  // const [invalid2, setInvalid2] = useState(false);
  const [campoNombreLleno, setcampoNombreLleno] = useState(false);
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();
  console.log(user.password);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const isInputFilled = ingresarNombre.trim() !== '';
  const isInputFilled2 = ingresarCorreo.trim() !== '';
  const isInputFilled3 = ingresarFechaNacimiento.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    if (ingresarCorreo.trim().length === 0 || ingresarNombre.trim().length === 0
    || ingresarFechaNacimiento.trim().length === 0) {
      setcampoNombreLleno(false);
    } else {
      const data = {
        name: ingresarNombre, birthDate: ingresarFechaNacimiento, email: ingresarCorreo.toLowerCase(),
      };
      const accessToken = `Bearer ${userID}`;
      patch('update_user/', data, {
        headers: {
          Authorization: accessToken,
        },
      });

      // Obtener el objeto 'user' del localStorage
      const user = JSON.parse(localStorage.getItem('name')) || {};

      // Actualizar las propiedades deseadas
      user.name = ingresarNombre;
      user.birthDate = ingresarFechaNacimiento;
      user.email = ingresarCorreo.toLowerCase();

      // Guardar el objeto actualizado de vuelta en el localStorage
      localStorage.setItem('name', JSON.stringify(user));
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  const handlePopUp = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
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
                <div>
                  <Button onClick={handlePopUp} type="submit" className="green-button cancelar-lleno">Continuar </Button>
                  {showPopup && (
                    <div className="popup">
                      <div className="popup-content">
                        <p>Se ha editado su perfil con éxito.</p>
                        <button onClick={closePopup} className="green-button cancelar-lleno popup-button">Cerrar</button>
                      </div>
                    </div>
                  )}
                </div>
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
