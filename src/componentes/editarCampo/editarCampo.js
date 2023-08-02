import React from 'react';
import Header from '../reusable/header/header';
import Icon from '../../assets/icons/icon';
import MapContainer from '../reusable/mapContainer/mapContainer';

export default function EditarCampo() {
  return (
    <div>
      <Header />
      <h1 className="agregar-campo-titulo">
        {' '}
        <Icon className="bi bi-pencil-square" color="#464E47" fontSize="" />
        {' '}
        EDITAR CAMPO
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
        edit
      />
    </div>
  );
}
