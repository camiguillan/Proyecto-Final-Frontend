/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../reusable/header/header';
import HeaderWhite from '../reusable/header_white/header_white';
import './home.scss';
import ImageDisplay from './imageDisplay';
import { get } from '../conexionBack/conexionBack';
import Loader from '../reusable/loader/loader';

export default function Home() {
  const { userID } = useParams();
  const [images, setImages] = useState([]);
  const [imageNames, setImageNames] = useState([]);
  const user = JSON.parse(localStorage.getItem('name')) || {};
  const [user2, setUser2] = useState(null);

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
    <div className="fondoverde">
      <HeaderWhite />
      {user2
        ? (
          <div className="image-container">
            {images.map((image, index) => (
              <Link to={`/${userID}/infoCampo/${user2.fields[index]._id}`} key={index}>
                <div className="image-wrapper">
                  <ImageDisplay imageId={user2.fields[index]._id} />
                  <div className="image-name">{truncateString(imageNames[index], 10)}</div>
                </div>
              </Link>
            ))}
          </div>
        )
        : (
          <div className="loader-container">
            <Loader />
          </div>

        )}
    </div>
  );
}
