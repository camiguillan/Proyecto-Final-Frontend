/* eslint-disable no-unused-vars */
import React from 'react';
import './campoInfoCard.scss';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function CampoInfoCard({
  imageNames, index, fieldId,
}) {
  const { userID } = useParams();
  const nav = useNavigate();
  return (

    <div className="col-lg-3 mb-4">
      <div className="card-container" onClick={() => nav(`/${userID}/infoCampo/${fieldId}`)}>
        <Card style={{ width: '' }} className="card-home">
          <Card.Img variant="top" src="grass" />
          <Card.Body>
            <Card.Title>{imageNames[index]}</Card.Title>
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
  imageNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  fieldId: PropTypes.number.isRequired,
};
