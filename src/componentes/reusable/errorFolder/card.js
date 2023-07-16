import React from 'react';
import './card.scss';
import PropTypes from 'prop-types';

export default function Card({ className, children }) {
  return (
    <div className={`card ${className}`}>
      {children}
      {' '}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
