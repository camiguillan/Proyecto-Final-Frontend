/* eslint-disable no-unused-vars */
import './campoInfoCard.scss';
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchImage } from '../../conexionBack/conexionBack';

export default function CampoInfoCard({
  imageId, fieldId,
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

    <div className="col-lg-3 mb-4">
      <div className="card-container" onClick={() => nav(`/${userID}/infoCampo/${fieldId}`)}>
        <Card style={{ width: '' }} className="card-home">
          {imageUrl
            ? <Card.Img variant="top" src={imageUrl} alt={`Image ${imageId}`} />
            : <p>Loading image...</p>}
          <Card.Body>
            <Card.Title>{imageId}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the content.
            </Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
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
  imageId: PropTypes.number.isRequired,
  fieldId: PropTypes.number.isRequired,
};
