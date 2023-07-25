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
    if (fiel.name === field) {
      user.fields[index].plots.forEach((plot) => {
        if (plot.crop === 'sunflower' || plot.crop === 'girasol' || plot.crop === 'Sunflower' || plot.crop === 'Sunflower' || plot.crop === 'Girasol') {
          const imageName = 'Girasol';
          const image = loadImage('girasol');
          images.push(image);
          imageNames.push(imageName); // Usa el nombre del campo como nombre de la imagen
        } else if (plot.crop === 'soja' || plot.crop === 'soy' || plot.crop === 'SOY' || plot.crop === 'Soy' || plot.crop === 'Soja') {
          const imageName = 'Soja';
          const image = loadImage('soja');
          images.push(image);
          imageNames.push(imageName); // Usa el nombre del campo como nombre de la imagen
        }
        if (plot.crop === 'WHEAT' || plot.crop === 'Wheat' || plot.crop === 'wheat' || plot.crop === 'trigo' || plot.crop === 'Trigo') {
          const imageName = 'Trigo';
          const image = loadImage('trigo');
          images.push(image);
          imageNames.push(imageName); // Usa el nombre del campo como nombre de la imagen
        }
        if (plot.crop === 'CORN' || plot.crop === 'Corn' || plot.crop === 'corn' || plot.crop === 'maiz' || plot.crop === 'Maiz') {
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
          <Link to={`/VerCultivos/${user.fields[index].name}/${userID}`} key={index}>
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
