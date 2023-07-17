/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './verCultivos.scss';
import sojaImage from '../../images/soja.jpg';
import Header from '../reusable/header/header';

export default function VerCultivos() {
  const { imageName } = useParams();
  //const imageName = 'soja';

  return (
    <div>
      <Header />
      <div className="image-container-mini">
        <div className="image-wrapper-mini">
          <Link to={`/user/VerCultivos/${imageName}/soja`}>
            <img src={sojaImage} alt="Soja" className="rounded-image-mini" />
            <div className="text-name">Soja</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
