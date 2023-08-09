/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.scss';

function ImageDisplay({ imageId }) {
  const [imageUrl, setImageUrl] = useState('');
  const BACKEND_URL = 'http://localhost:8081/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}image/${imageId}`, { responseType: 'blob' });
        const imageUrl1 = URL.createObjectURL(response.data);
        setImageUrl(imageUrl1);
      } catch (error) {
        console.error('Error al obtener la imagen:', error);
      }
    };

    fetchData(); // Llama a la función asincrónica
  }, [imageId]);

  return (
    <div className="image-wrapper">
      {imageUrl ? (
        <img src={imageUrl} alt={`Image ${imageId}`} className="rounded-image" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
}

export default ImageDisplay;
