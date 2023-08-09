/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../conexionBack/conexionBack';
import { createHeatmap } from '../reusable/map/funcionesMapa';
import Loader from '../reusable/loader/loader';
import AgroMap from '../reusable/map/agroMap';
import { CROP_TYPES_TRANSLATIONS } from '../../constants/translations';
import './verCampo.scss';

export default function VerCampo() {
  const { field } = useParams();
  const { userID } = useParams();
  const { crop } = useParams();
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

  return (
    <div className="campo-mapa-cultivo" id="mapa">
      {isLoading
        ? <Loader />
        : (
          <AgroMap
            coordinates={[campo.coordinates.lon, campo.coordinates.lat]}
            changeCoordinates={(cam) => {}}
            addFeatures={(cam) => { }}
            removeFeature={(cam, removedFeature) => { }}
            // eslint-disable-next-line max-len
            feats={campoFeatures.filter((feat) => crop === CROP_TYPES_TRANSLATIONS[feat.crop])}
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
