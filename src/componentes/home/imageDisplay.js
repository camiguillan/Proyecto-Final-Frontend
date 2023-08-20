/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './home.scss';
import { fetchImage } from '../conexionBack/conexionBack';

function ImageDisplay({ imageId }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const image = await fetchImage(imageId);
      const imageUrl1 = URL.createObjectURL(image);
      setImageUrl(imageUrl1);
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
