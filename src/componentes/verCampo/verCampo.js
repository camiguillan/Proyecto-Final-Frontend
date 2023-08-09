/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import MapContainer from '../reusable/mapContainer/mapContainer';
import { get } from '../conexionBack/conexionBack';
import { createHeatmap } from '../reusable/map/funcionesMapa';
import Loader from '../reusable/loader/loader';
import AgroMap from '../reusable/map/agroMap';

export default function VerCampo() {
  const { field } = useParams();
  const { userID } = useParams();
  const [campo, setCampo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
      setCampoFeatures(createHeatmap(campo));
    }
  }, [campo]);

  useEffect(() => {
    if (campo && campoFeatures) {
      setIsLoading(false);
    }
  });

  console.log(campo, campoFeatures);
  return (
    <div className="campo" id="mapa">
      {isLoading
        ? <Loader />
        : (
          <AgroMap
            coordinates={[campo.coordinates.lon, campo.coordinates.lat]}
            changeCoordinates={(cam) => { console.log(cam); }}
            addFeatures={(cam) => { console.log(cam); }}
            removeFeature={(cam, removedFeature) => { console.log(cam); }}
            feats={campoFeatures}
            featErased={null}
          />
        )}
    </div>
  );
}

// coordinates, changeCoordinates, addFeatures, removeFeature, feats, featErased,

// VerCampo.propTypes = {
//   // eslint-disable-next-line react/forbid-prop-types
//   campoInfo: PropTypes.object.isRequired,
// };
