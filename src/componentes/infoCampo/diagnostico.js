/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import excelent from '../../images/excelent.png';
import bluewater from '../../images/bluewater.png';
import dry from '../../images/dry.png';
import congelado from '../../images/congelado.png';

function Diagnostico() {
  const user = JSON.parse(localStorage.getItem('name')) || {};
  const [diagnostico, setdiagnostico] = useState('DEHYDRATION');
  const getTitle = () => {
    if (diagnostico === 'EXCELENTE') {
      return 'Excelente';
    } if (diagnostico === 'OVERHYDRATION') {
      return 'Sobrehidratación';
    } if (diagnostico === 'FROSTING') {
      return 'Congelamiento';
    } if (diagnostico === 'GOOD') {
      return 'Bueno';
    } if (diagnostico === 'VERY_GOOD') {
      return 'Muy_bueno';
    }
    return 'Deshidratación';
  };

  const getMessage = () => {
    if (diagnostico === 'EXCELENTE') {
      return 'Felicidades! Tener un cultivo en excelentes condiciones implica cuidar cada aspecto del proceso agrícola. Los beneficios son notables: mayor rendimiento, resistencia a plagas y enfermedades, y una producción de alta calidad. ¡A seguir así!';
    } if (diagnostico === 'OVERHYDRATION') {
      return '¡Cuidado con la sobrehidratación! Un exceso de agua en el cultivo puede reducir su rendimiento y calidad, además de propiciar el desarrollo de enfermedades y plagas. Mantén un equilibrio hídrico adecuado para un cultivo saludable y productivo.';
    } if (diagnostico === 'FROSTING') {
      return 'Atención! El campo congelado puede causar daños significativos a los cultivos, afectando su crecimiento y desarrollo. La congelación puede dañar las plantas y disminuir su producción. Toma medidas para proteger tus cultivos del frío extremo y asegúrate de que estén preparados para enfrentar las bajas temperaturas.';
    } if (diagnostico === 'GOOD') {
      return '¡Felicitaciones! Tener un cultivo en buen estado es el resultado de un buen manejo agrícola. Con un cuidado adecuado, tu cultivo se encuentra en un nivel satisfactorio, lo que se traduce en un rendimiento aceptable y resistencia a algunas plagas y enfermedades. Sigue así para obtener una producción de calidad.';
    } if (diagnostico === 'VERY_GOOD') {
      return '¡Excelente trabajo! Tu cultivo está en un estado muy bueno, demostrando un excelente manejo agrícola. Esto se refleja en un rendimiento destacado, alta resistencia a plagas y enfermedades, y una producción de calidad superior. Continúa con este esfuerzo para mantener y mejorar aún más los resultados.';
    }
    return '¡Atención! La falta de agua puede afectar negativamente el cultivo, provocando disminución del rendimiento y calidad. Asegúrate de proporcionar la cantidad de agua necesaria para un crecimiento óptimo.';
  };

  const getImage = () => {
    if (diagnostico === 'OVERHYDRATION') {
      return bluewater;
    } if (diagnostico === 'DEHYDRATION') {
      return dry;
    } if (diagnostico === 'FROSTING') {
      return congelado;
    } if (diagnostico === 'GOOD') {
      return excelent;
    } if (diagnostico === 'VERY_GOOD') {
      return excelent;
    }
    return excelent;
  };

  const getClass = () => {
    if (diagnostico === 'OVERHYDRATION') {
      return 'overhydration-class';
    } if (diagnostico === 'DEHYDRATION') {
      return 'dehydration-class';
    } if (diagnostico === 'FROSTING') {
      return 'frosting-class';
    } if (diagnostico === 'GOOD') {
      return 'good-class';
    } if (diagnostico === 'VERY_GOOD') {
      return 'very-class';
    }
    return 'cards-subtitle';
  };

  const getClassTitle = () => {
    if (diagnostico === 'OVERHYDRATION') {
      return 'overhydration-subtitle';
    } if (diagnostico === 'DEHYDRATION') {
      return 'dehydration-subtitle';
    } if (diagnostico === 'FROSTING') {
      return 'frosting-subtitle';
    } if (diagnostico === 'GOOD') {
      return 'good-subtitle';
    } if (diagnostico === 'VERY_GOOD') {
      return 'very-subtitle';
    }
    return 'excellent-class';
  };

  return (
    <div className="cards-wrapper">
      <img src={getImage()} alt="Imagen 4" style={{ width: '7rem', marginRight: '-1rem' }} />
      <div className={getClassTitle()}>{getTitle()}</div>
      <div className={getClass()}>{getMessage()}</div>
    </div>
  );
}

export default Diagnostico;
