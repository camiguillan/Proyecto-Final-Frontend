import React from 'react';
import PropTypes from 'prop-types';
import './input_box.scss';

export default function Input({
  value, placeholder, onChange, type,
}) {
  return (
    <input
      className="sub-rectangle"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      type={type}
    />
  );
}

Input.propTypes = PropTypes.any;

// Button.propTypes = ({
//   type: PropTypes.string.isRequired,
//   children: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired,
// });
