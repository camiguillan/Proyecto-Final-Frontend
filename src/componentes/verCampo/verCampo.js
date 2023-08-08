/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../reusable/header/header';
import MapContainer from '../reusable/mapContainer/mapContainer';
import Icon from '../../assets/icons/icon';
import { get } from '../conexionBack/conexionBack';
// import { campoPrueba } from '../reusable/map/campoPrueba';
import { createHeatmap } from '../reusable/map/funcionesMapa';
import { campoPrueba } from '../reusable/map/campoPrueba';
import Loader from '../reusable/loader/loader';

export default function VerCampo() {
  const { fieldID } = useParams();
  const { userID } = useParams();

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
      console.log(createHeatmap(campo));
      setCampoFeatures(createHeatmap(campo));
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
