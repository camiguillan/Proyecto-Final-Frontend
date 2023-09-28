import React from 'react';
import './error.scss';
import PropTypes from 'prop-types';
import Card from '../card/card';
// import { useState } from 'react';
// import Card from 'react-bootstrap/Card';
import Button from '../boton/button';
import tractor from '../../../images/tractor.png';

export default function ErrorModal({ onClick, title, message }) {
  return (
    <div>
      <div className="backdrop" onClick={onClick} />
      <Card className="agro-card agro-modal">
        <header className="header-error">
          <h2>
            {' '}
            {title}
            {' '}
          </h2>
        </header>
        <div className="d-flex">
          <img src={tractor} alt="Imagen 4" className="modal-image" />
          <div className="d-flex a-card-wrapper">
            <div className="content">
              <p className="modal-message">
                {message}
                {' '}
              </p>
            </div>
            <footer className="actions">
              <Button onClick={onClick} className="button">Okay</Button>
            </footer>
          </div>
        </div>
      </Card>
    </div>
  );
}

ErrorModal.propTypes = ({
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
});
