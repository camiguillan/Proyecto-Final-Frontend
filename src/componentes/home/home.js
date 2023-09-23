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
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Header from '../reusable/header/header';
import './home.scss';
import { get } from '../conexionBack/conexionBack';
import Loader from '../reusable/loader/loader';
import campito from '../../images/campito.jpg';
import CampoInfoCard from '../reusable/campoInfoCard/campoInfoCard';
import { CROP_TYPES_KEYS } from '../../constants/plots';
import { CROP_TYPES_TRANSLATIONS } from '../../constants/translations';

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

        const userActualiz = await get('user', {
          headers: {
            Authorization: accessToken,
          },
        });
        localStorage.setItem('name', JSON.stringify(userActualiz));
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

  const truncateString = (str, maxLength) => (str.length > maxLength ? `${str.substring(0, maxLength)}...` : str);

  const getCrops = (fieldId) => {
    const crops = [];

    if (user2 && user2.fields) {
      const selectedField = user2.fields.find((aField) => aField._id === fieldId);
      if (selectedField) {
        const fieldCrops = selectedField.plots.map((plot) => plot.crop);

        const distinctCrops = [...new Set(fieldCrops)];
        distinctCrops.forEach((cr) => {
          if (cr !== CROP_TYPES_KEYS.NONE) { crops.push(CROP_TYPES_TRANSLATIONS[cr] || cr); }
        });
      }
    }
    return crops;
  };

  return (
    <div>
      <Header />
      {user2
        ? (
          user2.fields.length > 0
            ? (
              <div className="container">
                <div className="row">
                  { images.map((image, index) => <CampoInfoCard index={index} imageId={imageNames[index]} fieldId={user2.fields[index]._id} crops={getCrops(user2.fields[index]._id)}> </CampoInfoCard>)}
                </div>
              </div>
            )
            : (

              <Card className="text-center card-no-campo">
                <Card.Header className="card-header-no-campo">
                  <Card.Img variant="left" src={campito} className="campito" />
                </Card.Header>
                <Card.Body>
                  <Card.Title className="card-title-no-campo">TODAVÍA NO TIENES NINGÚN CAMPO REGISTRADO</Card.Title>
                  <Card.Text className="card-text-no-campo">
                    ¡Empieza ahora! Crea tu primer campo haciendo click abajo
                  </Card.Text>
                  <Button variant="primary" onClick={nav(`/agregarCampo/${userID}`)}>Crear Campo</Button>
                </Card.Body>
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
