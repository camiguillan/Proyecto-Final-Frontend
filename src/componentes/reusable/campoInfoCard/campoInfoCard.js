/* eslint-disable no-unused-vars */
import './campoInfoCard.scss';
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes, { string } from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchImage } from '../../conexionBack/conexionBack';
import Loader from '../loader/loader';

export default function CampoInfoCard({
  index, imageId, fieldId, crops,
}) {
  const { userID } = useParams();
  const nav = useNavigate();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const image = await fetchImage(fieldId);
      const imageUrl1 = URL.createObjectURL(image);
      setImageUrl(imageUrl1);
    };

    fetchData(); // Llama a la función asincrónica
  }, [imageId]);

  return (

    <div key={index} className="card-deck col-lg-3 mb-4">
      <div className="card-container" onClick={() => nav(`/${userID}/infoCampo/${fieldId}`)}>
        <Card style={{ width: '' }} className="card-home agrandar">
          <Card.Header className="campo-info-header">
            {imageUrl
              ? <Card.Img variant="top" src={imageUrl} alt={`Image ${imageId}`} />
              : <p>Cargando Imagen...</p>}
          </Card.Header>
          <Card.Body>
            <Card.Title>{imageId}</Card.Title>
            <Card.Text>
              <ul>
                <li>
                  <div className="d-flex">
                    <h6 className="underline">
                      Cultivos:
                    </h6>
                    {' '}
                    {crops.join(', ')}

                  </div>
                </li>
                <li>
                  <div className="d-flex">
                    <h6 className="underline">
                      Estado:
                    </h6>
                    {' '}
                    Sano
                  </div>
                </li>
              </ul>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

CampoInfoCard.propTypes = {
  imageId: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  crops: PropTypes.arrayOf(PropTypes.string).isRequired,
};
