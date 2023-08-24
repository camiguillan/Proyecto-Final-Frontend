/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../reusable/header/header';
import './home.scss';
import ImageDisplay from './imageDisplay';
import { get } from '../conexionBack/conexionBack';
import Loader from '../reusable/loader/loader';
import Card from '../reusable/card/card';
import Button from '../reusable/boton/button';
import campito from '../../images/campito.jpg';

export default function Home() {
  const { userID } = useParams();
  const [images, setImages] = useState([]);
  const [imageNames, setImageNames] = useState([]);
  const user = JSON.parse(localStorage.getItem('name')) || {};
  const [user2, setUser2] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = `Bearer ${userID}`;
        const user22 = await get('user/fields/', {
          headers: {
            Authorization: accessToken,
          },
        });
        setUser2(user22);
        const fetchedImages = [];
        const fetchedImageNames = [];

        user22.fields.forEach((field, index) => {
          const imageName = `${field.image}`;
          fetchedImages.push(imageName);
          const capitalizedImageName = field.name.charAt(0).toUpperCase() + field.name.slice(1);
          fetchedImageNames.push(capitalizedImageName);
        });

        setImages(fetchedImages);
        setImageNames(fetchedImageNames);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [userID]);

  console.log(user2);

  const truncateString = (str, maxLength) => (str.length > maxLength ? `${str.substring(0, maxLength)}...` : str);

  return (
    <div>
      <Header />
      {user2
        ? (
          user2.fields.length > 0
            ? (
              <div className="image-container">
                {images.map((image, index) => (
                  <Link to={`/${userID}/infoCampo/${user2.fields[index]._id}`} key={index}>
                    <div className="image-wrapper">
                      <ImageDisplay imageId={user2.fields[index]._id} />
                      <div className="image-name">{imageNames[index]}</div>
                      {/* <div className="image-name">{truncateString(imageNames[index], 10)}</div> */}
                    </div>
                  </Link>
                ))}
              </div>
            )
            : (
              <Card className="agregar-campo-container home max-content">
                <div className="no-campos-container">
                  <h1 className="sin-campo-titulo"> TODAVÍA NO TIENES NINGÚN CAMPO REGISTRADO </h1>
                  <h3>¡Empieza ahora! Crea tu primer campo haciendo click abajo</h3>
                  <Button type="button" onClick={() => nav(`/agregarCampo/${userID}`)} className="green-button cancelar">CREAR CAMPO</Button>
                </div>
                <img src={campito} alt="Imagen 4" />
              </Card>
            )
        )
        : (
          <div className="loader-container">
            <Loader />
          </div>

        )}
    </div>
  );
}
