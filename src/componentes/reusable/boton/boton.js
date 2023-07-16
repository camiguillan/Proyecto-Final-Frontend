import React from 'react';
import './boton.scss';
import PropTypes from 'prop-types';

export default function Boton({
  type, className, onClick, text,
}) {
  return (
    <div>
      <button type={type || 'button'} className={`green-button ${className}`} onClick={() => onClick()}>{text}</button>
    </div>
  );
}

Boton.propTypes = ({
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
});
