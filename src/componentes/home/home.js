/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import Header from '../reusable/header/header';
import './home.scss';

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
  let imageIndex = 1;
  const images = [];
  const imageNames = [];

  // Cargar imágenes hasta que no exista la siguiente
  while (true) {
    const imageName = `image${imageIndex}`;
    const image = loadImage(imageName);

    if (image === null) {
      break;
    }

    images.push(image);
    imageNames.push(String.fromCharCode(64 + imageIndex));
    imageIndex += 1;
  }

  return (
    <div>
      <Header />
      <div className="image-container">
        {images.map((image, index) => (
          <Link to={`/${userID}/VerCultivos/${imageNames[index]}`} key={index}>
            <div className="image-wrapper">
              <img
                src={image}
                alt={`image ${index + 1}`}
                className="rounded-image"
              />
              <div className="image-name">{imageNames[index]}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
