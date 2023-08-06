/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../reusable/header/header';
import Icon from '../../assets/icons/icon';
import MapContainer from '../reusable/mapContainer/mapContainer';
import { get } from '../conexionBack/conexionBack';
// import { campoPrueba } from '../reusable/map/campoPrueba';
import { createPolygonFromPlots } from '../reusable/map/funcionesMapa';
import { campoPrueba } from '../reusable/map/campoPrueba';

// const campoMockeado = {
//   nombreCampo: 'campo1',
//   imagen: {},
//   coordinates: [
//     -59.08147243140732,
//     -34.655428938108024,
//   ],
//   features: [
//     {
//       polygon: {
//         id: '25f9c160774c397b91a3ada60dc82776',
//         type: 'Feature',
//         properties: {},
//         geometry: {
//           coordinates: [
//             [
//               [
//                 -59.08143788345612,
//                 -34.65540051941959,
//               ],
//               [
//                 -59.07435555351029,
//                 -34.66474974193862,
//               ],
//               [
//                 -59.07086621046389,
//                 -34.662817466312916,
//               ],
//               [
//                 -59.077741252704186,
//                 -34.65363854174527,
//               ],
//               [
//                 -59.08143788345612,
//                 -34.65540051941959,
//               ],
//             ],
//           ],
//           type: 'Polygon',
//         },
//       },
//       crop: 'soy',
//     },
//   ],
// };

export default function EditarCampo() {
  const { fieldID } = useParams();
  const { userID } = useParams();
  const campo = campoPrueba.field;
  const campoFeatures = createPolygonFromPlots(campoPrueba.field);
  console.log('CAMPOFEATURES ', campoFeatures);
  const getField = () => {
    console.log(fieldID, userID);
    const accessToken = `Bearer ${userID}`;
    get(`field/${fieldID}`, {
      headers: {
        Authorization: accessToken,
      },
    }).then((res) => {
      console.log(res);
    });
  };
  // useEffect(() => {
  //   getField();
  // });
  // console.log(campoMockeado);

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
          nombreCampo: campo.name,
          imagen: '',
          coordinates: [campo.coordinates.lon, campo.coordinates.lat],
          features: campoFeatures,
        }}
        cultivosSeleccionados={campoFeatures.map((f) => f.crop)}
        feats={campoFeatures.map((f) => f.polygon)}
        // campoPrincipal={{
        //   geometry: [],
        //   id: campoMockeado.id,
        //   properties: campoMockeado.properties,
        //   type: campoMockeado.type,
        // }}
        edit
      />
    </div>

  );
}
