import React from 'react';
import PropTypes from 'prop-types';

export default function EditIcon({ color }) {
  return (
    <i className="bi bi-pencil-square" style={{ color }} />
  );
}

EditIcon.propTypes = {
  color: PropTypes.string.isRequired,
};
