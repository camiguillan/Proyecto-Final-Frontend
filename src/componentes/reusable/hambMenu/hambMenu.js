import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import './hambMenu.scss';
import UserInfo from '../userInfo/userInfo';
import Icon from '../../../assets/icons/icon';

export default function HambMenu({ pageWrapId, outerContainerId }) {
  const { userID } = useParams();
  const nav = useNavigate();

  function handleCerrarSesion() {
    nav('/iniciarSesion');
  }

  return (
    <Menu
      burgerBarClassName="bm-burger-button"
      crossButtonClassName="bi bi-x-circle bm-cross"
      menuClassName="bm-menu"
      right
      burgerButtonClassName="bm-burger-button"
      pageWrapId={pageWrapId}
      overlayClassName={outerContainerId}
    >
      <div className="menuNav">
        <UserInfo />
        <div className="menuNavItem" onClick={() => nav(`/${userID}/editarPerfil`)}>
          <h5>
            {' '}
            <Icon className="bi bi-person-fill" color="white" />
            {' '}
            Editar Perfil
          </h5>
        </div>

        <div className="menuNavItem" onClick={() => nav(`/${userID}/agregarCampo`)}>

          <h5>
            {' '}
            <Icon className="bi bi-plus-square" color="white" />
            {' '}
            Agregar Campo
          </h5>
        </div>

        <div className="menuNavItem" onClick={() => nav(`/${userID}/editarCampo`)}>
          <h5>
            {' '}
            <Icon className="bi bi-pencil-square" color="white" />
            {' '}
            Editar Campo
          </h5>
        </div>

      </div>
      <div className="cerrar-sesion-container">
        <button onClick={handleCerrarSesion} className="cerrar-sesion">CERRAR SESION</button>
      </div>
    </Menu>
  );
}

HambMenu.propTypes = {
  pageWrapId: PropTypes.string.isRequired,
  outerContainerId: PropTypes.string.isRequired,
};
