/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function FieldsButtons({ fields }) {
  const { userID } = useParams();
  const nav = useNavigate();

  return (
    <div className="fields-container">
      {fields.map((field) => (
        <div
          className="menu-drop-down"
          onClick={() => {
            nav(`/editarCampo/${userID}/${field._id}`);
            window.location.reload();
          }}
        >
          <h5 className="menu-drop-down-header">{field.name}</h5>
        </div>
      ))}
    </div>
  );
}

FieldsButtons.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
};
