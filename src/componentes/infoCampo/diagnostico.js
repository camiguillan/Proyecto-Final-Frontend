/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import excelent from '../../images/excelent.png';
import bluewater from '../../images/bluewater.png';
import dry from '../../images/dry.png';
import congelado from '../../images/congelado.png';

export default function Diagnostico() {
  const diagnosticKeys = {
    EXCELENT: {
      name: 'EXCELENT',
      translate: 'Excelente',
      message: 'Felicidades! Tener un cultivo en excelentes condiciones implica cuidar cada aspecto del proceso agrícola. Los beneficios son notables: mayor rendimiento, resistencia a plagas y enfermedades, y una producción de alta calidad. ¡A seguir así!',
      image: excelent,
      className: 'cards-subtitle',
      classNameTitle: 'diagnostic-subtitle excellent-subtitle',
    },
    VERY_GOOD: {
      name: 'VERY_GOOD',
      translate: 'Muy bueno',
      message: '¡Excelente trabajo! Tu cultivo está en un estado muy bueno, demostrando un excelente manejo agrícola. Esto se refleja en un rendimiento destacado, alta resistencia a plagas y enfermedades, y una producción de calidad superior. Continúa con este esfuerzo para mantener y mejorar aún más los resultados.',
      image: excelent,
      className: 'diagnostic-class very-class',
      classNameTitle: 'diagnostic-subtitle excellent-subtitle',
    },
    GOOD: {
      name: 'GOOD',
      translate: 'Bueno',
      message: '¡Felicitaciones! Tener un cultivo en buen estado es el resultado de un buen manejo agrícola. Con un cuidado adecuado, tu cultivo se encuentra en un nivel satisfactorio, lo que se traduce en un rendimiento aceptable y resistencia a algunas plagas y enfermedades. Sigue así para obtener una producción de calidad.',
      image: excelent,
      className: 'diagnostic-class good-class',
      classNameTitle: 'diagnostic-subtitle excellent-subtitle',
    },
    FROSTING: {
      name: 'FROSTING',
      translate: 'Congelamiento',
      message: 'Atención! El campo congelado puede causar daños significativos a los cultivos, afectando su crecimiento y desarrollo. La congelación puede dañar las plantas y disminuir su producción. Toma medidas para proteger tus cultivos del frío extremo y asegúrate de que estén preparados para enfrentar las bajas temperaturas.',
      image: congelado,
      className: 'diagnostic-class frosting-class',
      classNameTitle: 'diagnostic-subtitle frosting-subtitle',
    },
    OVERHYDRATION: {
      name: 'OVERHYDRATION',
      translate: 'Sobrehidratación',
      message: '¡Cuidado con la sobrehidratación! Un exceso de agua en el cultivo puede reducir su rendimiento y calidad, además de propiciar el desarrollo de enfermedades y plagas. Mantén un equilibrio hídrico adecuado para un cultivo saludable y productivo.',
      image: bluewater,
      className: 'diagnostic-class overhydration-class',
      classNameTitle: 'diagnostic-subtitle overhydration-subtitle',
    },
    DEHYDRATION: {
      name: 'DEHYDRATION',
      translate: 'Deshidratación',
      message: '¡Atención! La falta de agua puede afectar negativamente el cultivo, provocando disminución del rendimiento y calidad. Asegúrate de proporcionar la cantidad de agua necesaria para un crecimiento óptimo.',
      image: dry,
      className: 'diagnostic-class dehydration-class',
      classNameTitle: 'diagnostic-subtitle dehydration-subtitle',
    },
  };
  const user = JSON.parse(localStorage.getItem('name')) || {};
  const [diagnostico, setdiagnostico] = useState('OVERHYDRATION');
  const {
    name, translate, message, image, className, classNameTitle,
  } = diagnosticKeys[diagnostico];

  return (
    <div className="cards-wrapper-diagnostico">
      <img src={image} alt="Imagen 4" style={{ width: '7rem', marginRight: '-1rem', marginLeft: '1rem' }} />
      <div className={classNameTitle}>
        {translate}
      </div>
      <div className={className}>
        {message}
      </div>
    </div>
  );
}
