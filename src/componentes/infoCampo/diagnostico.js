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
      classNameTitle: 'excellent-class',
    },
    VERY_GOOD: {
      name: 'VERY_GOOD',
      translate: 'Muy_bueno',
      message: '¡Excelente trabajo! Tu cultivo está en un estado muy bueno, demostrando un excelente manejo agrícola. Esto se refleja en un rendimiento destacado, alta resistencia a plagas y enfermedades, y una producción de calidad superior. Continúa con este esfuerzo para mantener y mejorar aún más los resultados.',
      image: excelent,
      className: 'very-class',
      classNameTitle: 'very-subtitle',
    },
    GOOD: {
      name: 'GOOD',
      translate: 'Bueno',
      message: '¡Felicitaciones! Tener un cultivo en buen estado es el resultado de un buen manejo agrícola. Con un cuidado adecuado, tu cultivo se encuentra en un nivel satisfactorio, lo que se traduce en un rendimiento aceptable y resistencia a algunas plagas y enfermedades. Sigue así para obtener una producción de calidad.',
      image: excelent,
      className: 'good-class',
      classNameTitle: 'good-subtitle',
    },
    FROSTING: {
      name: 'FROSTING',
      translate: 'Congelamiento',
      message: 'Atención! El campo congelado puede causar daños significativos a los cultivos, afectando su crecimiento y desarrollo. La congelación puede dañar las plantas y disminuir su producción. Toma medidas para proteger tus cultivos del frío extremo y asegúrate de que estén preparados para enfrentar las bajas temperaturas.',
      image: congelado,
      className: 'frosting-class',
      classNameTitle: 'frosting-subtitle',
    },
    OVERHYDRATION: {
      name: 'OVERHYDRATION',
      translate: 'Sobrehidratación',
      message: '¡Cuidado con la sobrehidratación! Un exceso de agua en el cultivo puede reducir su rendimiento y calidad, además de propiciar el desarrollo de enfermedades y plagas. Mantén un equilibrio hídrico adecuado para un cultivo saludable y productivo.',
      image: bluewater,
      className: 'overhydration-class',
      classNameTitle: 'overhydration-subtitle',
    },
    DEHYDRATION: {
      name: 'DEHYDRATION',
      translate: 'Deshidratación',
      message: '¡Atención! La falta de agua puede afectar negativamente el cultivo, provocando disminución del rendimiento y calidad. Asegúrate de proporcionar la cantidad de agua necesaria para un crecimiento óptimo.',
      image: dry,
      className: 'dehydration-class',
      classNameTitle: 'dehydration-subtitle',
    },
  };
  const user = JSON.parse(localStorage.getItem('name')) || {};
  const [diagnostico, setdiagnostico] = useState('OVERHYDRATION');

  return (
    <div className="cards-wrapper">
      <img src={diagnosticKeys[diagnostico].image} alt="Imagen 4" style={{ width: '7rem', marginRight: '-1rem' }} />
      <div className={diagnosticKeys[diagnostico].classNameTitle}>
        {diagnosticKeys[diagnostico].translate}
      </div>
      <div className={diagnosticKeys[diagnostico].className}>
        {diagnosticKeys[diagnostico].message}
      </div>
    </div>
  );
}
