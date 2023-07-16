import React from 'react';
import PropTypes from 'prop-types';

export default function Icon({ iconType, color }) {
  return (
    <i className={iconType} style={{ color }} />
  );
}

Icon.propTypes = {
  color: PropTypes.string.isRequired,
  iconType: PropTypes.string.isRequired,
};
