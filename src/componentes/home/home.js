/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
// import { squareGrid } from '@turf/turf';
import { Link, useParams, useLocation } from 'react-router-dom';
import Header from '../reusable/header/header';
import './home.scss';
import { PLOT_SIZE } from '../../constants/plots';

const loadImage = (imageName) => {
  try {
    return require(`../../images/${imageName}.jpg`);
  } catch (error) {
    // Si la imagen no existe, puedes manejar el error aquí
    return null;
  }
};

export default function Home() {
  const { userID } = useParams();
  const images = [];
  const imageNames = [];

  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem('name')) || {};

  // Recorre el array user.fields y genera los nombres de las imágenes
  user.fields.forEach((field, index) => {
    const imageName = `image${index + 1}`;
    const image = loadImage(imageName);

    if (image) {
      images.push(image);
      const capitalizedImageName = field.name.charAt(0).toUpperCase() + field.name.slice(1);
      imageNames.push(capitalizedImageName); // Usa el nombre del campo como nombre de la imagen
    }
  });

  const truncateString = (str, maxLength) => (str.length > maxLength ? `${str.substring(0, maxLength)}...` : str);

  return (
    <div>
      <Header />
      <div className="image-container">
        {images.map((image, index) => (
          <Link to={`/${userID}/VerCultivos/${user.fields[index]._id}`} key={index}>
            <div className="image-wrapper">
              <img
                src={image}
                alt={`image ${index + 1}`}
                className="rounded-image"
              />
              <div className="image-name">{truncateString(imageNames[index], 10)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
