import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export default function Button({
  type, children, onClick, className,
}) {
  return (
    <button
      type={type || 'button'}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = ({
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
});
