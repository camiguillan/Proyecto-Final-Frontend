import React from 'react';
import { useNavigate } from 'react-router-dom';
import './coso_verde.scss';
import Icon from '../../../assets/icons/icon';

export default function CosoVerde() {
  const navigate = useNavigate();

  return (
    <div className="green-rectangle" onClick={() => navigate('../')}>
      <Icon className="bi bi-flower1" color="white" fontSize="6vh" />
      <span className="text"> AGROIA</span>
    </div>
  );
}
