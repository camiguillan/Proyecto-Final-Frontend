/* eslint-disable no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable object-curly-spacing */
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Icon from '../../assets/icons/icon';
import '../reusable/header/header.scss';
import './homePrincipal.scss';
import grass from '../../images/grass3.jpg';
import leaf from '../../images/leaf.jpg';
import trigo from '../../images/trigo.jpg';
import vistaSat from '../../images/vistasatelital.jpg';
import '../../assets/global.scss';
import HeaderHome from '../reusable/header_home/header_home';

export default function HomePrincipal() {
  const listChooseUs = [{reason: 'Precisión en el diagnóstico', extra: 'Utilizamos algoritmos avanzados de inteligencia artificial y análisis de imágenes para identificar enfermedades, plagas y otros problemas de salud en los cultivos con alta precisión.'}, {reason: 'Optimización de recursos', extra: 'Ayudamos a maximizar la producción agrícola al optimizar el uso de recursos como el agua, los fertilizantes y los pesticidas.'}, {reason: 'Recomendaciones personalizadas', extra: 'Proporcionamos recomendaciones específicas y personalizadas para cada cultivo y situación, considerando factores como el tipo de cultivo, las condiciones climáticas y las características del suelo.'}];

  return (
    <div className="layout">
      <HeaderHome>.</HeaderHome>
      <div className="img-container">
        <div className="overlay"></div>
        <img src={grass} alt="Imagen 1" className="full-width-image" />
        <div className="image-text">
          <text className="image-title">
            ¿Qué es AgroIA?
          </text>
          <text className="image-text2">
            AgroIA es un sistema orientado a brindar soluciones y recomendaciones
            precisas en el cuidado y manejo de cultivos agrícolas
          </text>
        </div>
      </div>
      <div className="flexbox-container">
        <div className="green-title">
          AgroIA facilita la toma de decisiones relacionadas con la producción
          agraria
        </div>
        <div className="text-home-principal">
          Utilizando inteligencia artificial y análisis de imágenes agrícolas para brindar
          soluciones a diagnósticos generados por medio de imágenes de cultivos
        </div>
      </div>
      <div className="gray-square">
        <img src={vistaSat} alt="Imagen 4" className="small-img" />
        <div className="text-container">
          <div className="gray-title">
            ¿Cómo funciona AgroIA?
          </div>
          <div className="text-home-principal">
            AgroIA utiliza inteligencia artificial y análisis de imágenes agrícolas para
            diagnosticar y brindar recomendaciones precisas sobre el cuidado y manejo de
            cultivos. Ayuda a los agricultores a optimizar el rendimiento, reducir riesgos
            y tomar decisiones informadas para una producción agrícola más eficiente y sostenible.
          </div>
        </div>
      </div>
      <div className="section-left-aligned">
        <div className="green-title left">
          ¿Por qué elegirnos?
        </div>
        <div className="flex-container">
          <div>
            {listChooseUs.map((item) => (
              <div className="left">
                <div className="icon-reason">
                  <Icon className="bi bi-check2-circle" color="#2a7d2e" fontSize="2.7rem" />
                  <p className="text-home-principal checks">{item.reason}</p>
                </div>
                <div className="extra-reason">
                  <p className="text-home-principal">{item.extra}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="photo-container">
            <img src={leaf} alt="Imagen 4" className="small-img2" />
            <img src={trigo} alt="Imagen 4" className="small-img2" />
          </div>
        </div>
      </div>
      <div className="footer-ppal">
        <div className="flex-container center">
          <Icon className="bi bi-flower1" color="#2a7d2e" fontSize="2.7rem" />
          <h1>AGROIA</h1>
        </div>
        <div className="contact-info">
          <div className="text-home-2 margin">agroiaapp@gmail.com</div>
          <div className="text-home-2 margin">+54 9 11 6893-7938</div>
          <div className="text-home-2">Buenos Aires, Argentina</div>
        </div>
      </div>
    </div>
  );
}
