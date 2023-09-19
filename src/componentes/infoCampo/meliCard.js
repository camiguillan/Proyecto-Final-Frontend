/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import './infoCampo.scss';
import { Card } from 'react-bootstrap';

function MeliCard({ product }) {
  const titlePreview = product.title.substring(0, 20);
  const truncatedTitle = product.title.length > 20 ? `${titlePreview}...` : product.title;

  const handleProductClick = () => {
    window.open(product.permalink, '_blank'); // Abre el enlace en una nueva pestaña
  };

  return (
    // <div className="product-card" onClick={handleProductClick}>
    //   <img src={product.thumbnail} alt={product.title} className="product-image" />
    //   <h1 className="nombre-producto">{truncatedTitle}</h1>
    //   <p className="product-price">
    //     $
    //     {product.price}
    //   </p>
    // </div>
    <div className="card-container" onClick={handleProductClick}>
      <Card style={{ width: '' }} className="product-card agrandar">
        <Card.Img variant="top" src={product.thumbnail} alt={product.title} className="product-image" />
        <Card.Body>
          <Card.Title className="nombre-producto">{truncatedTitle}</Card.Title>
          <Card.Text>
            $
            {product.price}
          </Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
}

MeliCard.propTypes = {
  product: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    permalink: PropTypes.string.isRequired, // Agrega la propiedad "permalink" para la URL del producto
    // Agrega otras propiedades necesarias del objeto product
  }).isRequired,
};

export default MeliCard;
