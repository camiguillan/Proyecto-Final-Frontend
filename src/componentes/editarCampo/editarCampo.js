/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../reusable/header/header';
import MapContainer from '../reusable/mapContainer/mapContainer';
import Icon from '../../assets/icons/icon';
import { get } from '../conexionBack/conexionBack';
// import { campoPrueba } from '../reusable/map/campoPrueba';
import { createPolygonFromPlots } from '../reusable/map/funcionesMapa';
import { campoPrueba } from '../reusable/map/campoPrueba';
import Loader from '../reusable/loader/loader';

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

  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [campo, setCampo] = useState(null);
  const [campoFeatures, setCampoFeatures] = useState(null);

  const getField = async () => {
    const accessToken = `Bearer ${userID}`;
    const response = await get(`field/${fieldID}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    setCampo(response);
  };

  useEffect(() => {
    getField();
  }, [fieldID]);

  useEffect(() => {
    // Update campo variable when userData changes
    console.log(campo);
    if (campo) {
      setCampoFeatures(createPolygonFromPlots(campo));
      setLoading(false);
    }
  }, [campo]);

  console.log('CAMPOFEATURES ', campoFeatures);

  // useEffect(() => {
  //   getField();
  // });
  // console.log(campoMockeado);

  return (
    <div>
      <Header />
      {isLoading ? ( // Show loader while loading data
        <Loader />
      ) : (
        <>
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
            edit
          />
        </>
      )}
    </div>
  );
}
