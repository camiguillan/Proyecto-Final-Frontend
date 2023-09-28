import React from 'react';
import PropTypes from 'prop-types';

export default function Icon({ className, color, fontSize }) {
  return (
    <i className={className} style={{ color, fontSize }} />
  );
}

Icon.propTypes = {
  // eslint-disable-next-line react/require-default-props
  color: PropTypes.string,
  className: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
};
