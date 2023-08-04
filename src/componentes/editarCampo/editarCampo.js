import React from 'react';
import Header from '../reusable/header/header';
import Icon from '../../assets/icons/icon';
import MapContainer from '../reusable/mapContainer/mapContainer';

const campoMockeado = {
  nombreCampo: 'campo1',
  imagen: {},
  coordinates: [
    -59.08147243140732,
    -34.655428938108024,
  ],
  features: [
    {
      polygon: {
        id: '25f9c160774c397b91a3ada60dc82776',
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [
            [
              [
                -59.08143788345612,
                -34.65540051941959,
              ],
              [
                -59.07435555351029,
                -34.66474974193862,
              ],
              [
                -59.07086621046389,
                -34.662817466312916,
              ],
              [
                -59.077741252704186,
                -34.65363854174527,
              ],
              [
                -59.08143788345612,
                -34.65540051941959,
              ],
            ],
          ],
          type: 'Polygon',
        },
      },
      crop: 'soy',
    },
  ],
};

export default function EditarCampo() {
  console.log(campoMockeado);
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
          nombreCampo: campoMockeado.nombreCampo,
          imagen: '',
          coordinates: [-58.44657291015618, -34.595435305682834],
          features: campoMockeado.features,
        }}
        cultivosSeleccionados={['soy']}
        feats={campoMockeado.features.map((f) => f.polygon)}
        campoPrincipal={{
          geometry: [],
          id: campoMockeado.id,
          properties: campoMockeado.properties,
          type: campoMockeado.type,
        }}
        edit
      />
    </div>
  );
}
