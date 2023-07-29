/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './verCultivos.scss';
import sojaImage from '../../images/soja.jpg';
import Header from '../reusable/header/header';

export default function VerCultivos() {
  const { userID } = useParams();
  const { field } = useParams();
  const images = [];
  const imageNames = [];
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem('name')) || {};

  console.log(field);

  const loadImage = (imageName) => {
    try {
      return require(`../../images/${imageName}.jpg`);
    } catch (error) {
    // Si la imagen no existe, puedes manejar el error aquí
      return null;
    }
  };
  user.fields.forEach((fiel, index) => {
    if (fiel._id === field) {
      user.fields[index].plots.forEach((plot) => {
        if (plot.crop === 'sunflower') {
          const imageName = 'Girasol';
          const image = loadImage('girasol');
          images.push(image);
          imageNames.push(imageName); // Usa el nombre del campo como nombre de la imagen
        } else if (plot.crop === 'soy') {
          const imageName = 'Soja';
          const image = loadImage('soja');
          images.push(image);
          imageNames.push(imageName); // Usa el nombre del campo como nombre de la imagen
        }
        if (plot.crop === 'wheat') {
          const imageName = 'Trigo';
          const image = loadImage('trigo');
          images.push(image);
          imageNames.push(imageName); // Usa el nombre del campo como nombre de la imagen
        }
        if (plot.crop === 'corn') {
          const imageName = 'Maiz';
          const image = loadImage('maiz');
          images.push(image);
          imageNames.push(imageName); // Usa el nombre del campo como nombre de la imagen
        }
      });
    }
  });

  const truncateString = (str, maxLength) => (str.length > maxLength ? `${str.substring(0, maxLength)}...` : str);

  return (
    <div>
      <Header />
      <h1 className="titulo-fachero-facherito">
        Mis cultivos
      </h1>
      <div className="image-container-cult">
        {images.map((image, index) => (
          <Link to={`/VerCultivos/${field}/${imageNames[index]}/${userID}`} key={index}>
            <div className="image-wrapper-cult">
              <img
                src={image}
                alt={`image ${index + 1}`}
                className="rounded-image-cult"
              />
              <div className="image-name-cult">{truncateString(imageNames[index], 10)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
