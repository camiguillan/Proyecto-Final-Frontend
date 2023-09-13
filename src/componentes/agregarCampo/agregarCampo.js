/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Header from '../reusable/header/header';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './agregarCampo.scss';
import Icon from '../../assets/icons/icon';
import MapContainer from '../reusable/mapContainer/mapContainer';

export default function AgregarCampo() {
  return (
    <div className="fondoGris">
      <Header />
      <h1 className="agregar-campo-titulo">
        {' '}
        <Icon className="bi bi-plus-square" color="#464E47" fontSize="" />
        {' '}
        AGREGAR CAMPO
      </h1>
      <MapContainer
        campInfo={{
          nombreCampo: '',
          imagen: '',
          coordinates: [-58.44657291015618, -34.595435305682834],
          features: [],
        }}
        cultivosSeleccionados={['']}
        feats={[]}
        campoPrincipal={{
          geometry: [],
          id: '',
          properties: {},
          type: '',
        }}
        edit={false}
      />

    </div>
  );
}
