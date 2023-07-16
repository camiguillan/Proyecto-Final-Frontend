import React from 'react';
import './error.scss';
import PropTypes from 'prop-types';
import Card from './card';
// import { useState } from 'react';
import Button from './button';

export default function ErrorModal({ onClick, title, message }) {
  return (
    <div>
      <div className="backdrop" onClick={onClick} />
      <Card className="modal">
        <header className="header-error">
          <h2>
            {' '}
            {title}
            {' '}
          </h2>
        </header>
        <div className="content">
          <p>
            {message}
            {' '}
          </p>
        </div>
        <footer className="actions">
          <Button onClick={onClick}>Okay</Button>
        </footer>
      </Card>
    </div>
  );
}

ErrorModal.propTypes = ({
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
});
