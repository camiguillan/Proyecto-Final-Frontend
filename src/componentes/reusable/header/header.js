/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './header.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Icon from '../../../assets/icons/icon';

export default function Header({ inicioSesion }) {
  const nav = useNavigate();
  const { userID } = useParams();
  // const [activeTab, setActiveTab] = useState('home');
  const path = window.location.pathname;
  const activeTab = path.split('/')[1];

  return (
    <Navbar expand="lg" className="bg-body-tertiary agro-nav">
      <Container className="agro-header">

        <Navbar.Brand href={`/home/${userID}`}>
          {' '}
          <Icon className="bi bi-flower1" color="#2a7d2e" fontSize="3rem" />
          {' '}
          <h1>AGROIA</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" variant="underline" defaultActiveKey={activeTab}>
            <Nav.Item>
              <Nav.Link eventKey="home" href={`/home/${userID}`}>
                {' '}
                <Icon className="bi bi-house-door" fontSize="2vh" />
                {' '}
                Mis Campos
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="agregarCampo" href={`/agregarCampo/${userID}`}>
                {' '}
                <Icon className="bi bi-plus-square" fontSize="2vh" />
                {' '}
                Agregar Campo
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>

        <Nav.Item className=" justify-content-end">
          {inicioSesion === false
            ? (
              <div className="btn-container">
                <Button variant="outline-primary">Iniciar Sesion</Button>
                <Button variant="outline-primary">Registrarse</Button>
              </div>
            ) : (
              <div className="user-info-item">

                <Icon className="bi bi-person-circle" fontSize="3vh" />
                <NavDropdown title="" id="navbarScrollingDropdown" align="end">
                  <NavDropdown.Item href={`/editarPerfil/${userID}`}>
                    <Icon className="bi bi-pencil-square" fontSize="2vh" />
                    Editar Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/iniciarSesion">
                    <Icon className="bi bi-box-arrow-left" fontSize="2vh" />
                    Cerrar Sesion
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            )}

          {/* <Icon className="bi bi-person-circle" fontSize='3vh'></Icon> */}

        </Nav.Item>
      </Container>

    </Navbar>
  );
}

Header.propTypes = {
  inicioSesion: PropTypes.bool.isRequired,
};
