import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './loader.scss';

export default function Loader() {
  return (
    <div className="loader">
      <Spinner animation="grow" variant="success" />
    </div>
  );
}
