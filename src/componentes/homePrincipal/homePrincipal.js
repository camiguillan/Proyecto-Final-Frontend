/* eslint-disable no-shadow */
/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from '../reusable/header/header';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../reusable/boton/button';
import Icon from '../../assets/icons/icon';
import '../reusable/header/header.scss';
import './homePrincipal.scss';
// import Footer from '../reusable/footer/footer';
// import Carousel from '../reusable/carousel/carousel';
import grass from '../../images/grass3.jpg';
import vistaSat from '../../images/vistasatelital.jpg';
import '../../assets/global.scss';

export default function HomePrincipal() {
  const nav = useNavigate();

  const [listChooseUs] = useState(['Analisis de imagenes de alta calidad', 'Diagnosticos acertivos', 'Bla bla bla']);

  return (
    <div className="layout">
      <header className="header-principal">
        <div className="agroIa">
          <Icon className="bi bi-flower1" color="#2a7d2e" fontSize="6vh" />
          <h1>AGROIA</h1>
        </div>
        <div className="botonesInicio">
          <Button onClick={() => nav('/iniciarSesion')} className="green-button cancelar">Iniciar Sesion</Button>
          <Button onClick={() => nav('/registrarse')} className="green-button cancelar">Registrarse</Button>
        </div>
      </header>
      <div className="img-container">
        <div className="overlay"></div>
        <img src={grass} alt="Imagen 1" className="full-width-image" />
        <div className="image-text">
          <text className="image-title">
            ¿Qué es AgroIA?
          </text>
          <text className="image-text2">
            AgroIA es un sistema para bla bla bla bla bla bla bla bla
          </text>
        </div>
      </div>
      <div className="flexbox-container">
        <div className="green-title">
          AgroIA permite bla bla bla bla bla bla bla bla bla
        </div>
        <div className="text-home-principal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a neque
          nec ligula bibendum auctor. Nunc dignissim euismod justo, nec ultrices
          elit consectetur a. Vivamus id neque quis nunc tincidunt consectetur.
        </div>
      </div>
      <div className="gray-square">
        <img src={vistaSat} alt="Imagen 4" className="small-img" />
        <div className="text-container">
          <div className="gray-title">
            ¿Cómo funciona AgroIA?
          </div>
          <div className="text-home-principal">
            AgroIA utiliza imagenes satelitales para bla bla bla lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Proin a neque nec ligula bibendum auctor.
          </div>
        </div>
      </div>
      <div className="section-left-aligned">
        <div className="green-title left">
          ¿Por qué elegirnos?
        </div>
        <div>
          {listChooseUs.map((item) => (
            <div className="left">
              <Icon className="bi bi-check2-circle" color="#2a7d2e" fontSize="6vh" />
              <span className="text-home-principal checks">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        Contactanos!
      </div>
    </div>
  );
}
