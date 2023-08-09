/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../reusable/header/header';
import MapContainer from '../reusable/mapContainer/mapContainer';
import Icon from '../../assets/icons/icon';
import { get } from '../conexionBack/conexionBack';
import { createPolygonFromPlots } from '../reusable/map/funcionesMapa';
import Loader from '../reusable/loader/loader';

export default function EditarCampo() {
  const { field } = useParams();
  const { userID } = useParams();

  const [isLoading, setLoading] = useState(true);
  const [campo, setCampo] = useState(null);
  const [campoFeatures, setCampoFeatures] = useState(null);

  const getField = async () => {
    const accessToken = `Bearer ${userID}`;
    const response = await get(`field/${field}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    setCampo(response);
  };

  useEffect(() => {
    getField();
  }, [field]);

  useEffect(() => {
    // Update campo variable when userData changes
    if (campo) {
      setCampoFeatures(createPolygonFromPlots(campo));
      setLoading(false);
    }
  }, [campo]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Header />
      {isLoading ? ( // Show loader while loading data
        <div style={{
          width: '100%', height: '100%', top: '50%', position: 'relative', marginTop: '14%',
        }}
        >
          <Loader />
        </div>
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
