/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import '../../assets/global.scss';
import '../background/background.scss';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../reusable/errorFolder/errores';
import CosoVerde from '../reusable/coso_verde/coso_verde';
import '../reusable/white_container/white_container.scss'; // LA CAJA BLANCA Y EL TEXTO
import '../reusable/input_box/input_box.scss'; // LAS CAJITAS DE TEXTO
import Button from '../reusable/boton/button';
import { post } from '../conexionBack/conexionBack';

export default function OlvidoContra() {
  const [ingresarCorreo, setIngresarCorreo] = useState('');
  const [invalid, setInvalid] = useState(false);

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

    if (ingresarCorreo.trim().length === 0) {
      setError({
        title: 'Campo vacío',
        message: 'Faltó rellenar algún valor, revise el formulario y envíelo devuelta.',
      });
      setInvalid(true);
    } else {
      const data = { email: ingresarCorreo };
      const response = await post('restore_password/', data);
    }
  };

  return (

    <div className="gradient-background">

      {invalid && <ErrorModal title={error.title} message={error.message} onClick={okay} />}
      <form onSubmit={handleSubmit}>
        <div>
          <CosoVerde />
          <div className="small-white-rectangle">
            <span className="container-text">¿Olvido su contraseña?</span>
            <input
              className="sub-rectangle"
              type="text"
              placeholder="Ingrese su correo electrónico"
              value={ingresarCorreo}
              onChange={(e) => handleInputChange(e, setIngresarCorreo)}
              style={{ color: isInputFilled2 ? 'black' : '#888' }}
            />
            <Button type="submit" className="green-button">
              <span className="button-text">Enviar link de</span>
              <span className="button-text">recuperación</span>

            </Button>
          </div>

        </div>
      </form>
    </div>

  );
}
