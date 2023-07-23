/* eslint-disable no-shadow */
/* eslint-disable max-len */
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from '../reusable/header/header';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { squareGrid, booleanPointInPolygon } from '@turf/turf';
import Button from '../reusable/boton/button';
import Icon from '../../assets/icons/icon';
import '../reusable/header/header.scss';
import './homePrincipal.scss';
import Footer from '../reusable/footer/footer';
import Carousel from '../reusable/carousel/carousel';
import { PLOT_SIZE } from '../../constants/plots';
import '../reusable/map/funcionesMapa';

export default function HomePrincipal() {
  const nav = useNavigate();

  const arrayPolygons = [
    {
      polygon: {
        id: '8b8757926d83859f768d6c8b7388c41f',
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [
            [
              [
                -58.842927470178196,
                -34.713909381521454,
              ],
              [
                -58.83916704112572,
                -34.71070434243838,
              ],
              [
                -58.840789963137766,
                -34.7095003870391,
              ],
              [
                -58.844570183922,
                -34.7128030876505,
              ],
              [
                -58.842927470178196,
                -34.713909381521454,
              ],
            ],
          ],
          type: 'Polygon',
        },
      },
      crop: 'CORN',
    },
    {
      polygon: {
        id: '41a1e75ad36923c719db75f07e4ab95a',
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [
            [
              [
                -58.8408295466013,
                -34.70951665682382,
              ],
              [
                -58.84237330168635,
                -34.70828014409184,
              ],
              [
                -58.84613373073826,
                -34.711599162801576,
              ],
              [
                -58.84462955911725,
                -34.7128030876505,
              ],
              [
                -58.8408295466013,
                -34.70951665682382,
              ],
            ],
          ],
          type: 'Polygon',
        },
      },
      crop: 'AVOCADO',
    },
    {
      polygon: {
        id: '9c501507ecc9c4301acd9e76ce963eef',
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [
            [
              [
                -58.84231392649052,
                -34.708231333999294,
              ],
              [
                -58.8404930871598,
                -34.706588044085045,
              ],
              [
                -58.83730661833151,
                -34.70899602213684,
              ],
              [
                -58.839147249393974,
                -34.710688072888196,
              ],
              [
                -58.84231392649052,
                -34.708231333999294,
              ],
            ],
          ],
          type: 'Polygon',
        },
      },
      crop: 'SOY',
    },
  ];

  const createRectangle = (listOfPolygons) => {
    const latitudes = listOfPolygons.flatMap(({ polygon: { geometry: { coordinates } } }) => coordinates[0].map((coor) => coor[1]));
    const longitudes = listOfPolygons.flatMap(({ polygon: { geometry: { coordinates } } }) => coordinates[0].map((coor) => coor[0]));
    const lowestLongitude = Math.min(...longitudes);
    const lowestLatitude = Math.min(...latitudes);
    const highestLongitude = Math.max(...longitudes);
    const highestLatitude = Math.max(...latitudes);

    return [lowestLongitude, lowestLatitude, highestLongitude, highestLatitude];
  };

  const cropCheck = (coordinates, cropPolygons) => {
    const answer = cropPolygons.filter((oneCrop) => coordinates[0].some((corner) => booleanPointInPolygon(corner, oneCrop.polygon)))[0];

    if (!answer) {
      return 'NONE';
    }
    return answer.crop;
  };

  // eslint-disable-next-line no-unused-vars
  const cropCheckFullField = (cropPolygons) => {
    const bbox = createRectangle(cropPolygons);
    const options = { units: 'degrees' };
    const squareGridR = squareGrid(bbox, PLOT_SIZE, options);
    return squareGridR.features.map(({ geometry: { coordinates } }) => cropCheck(coordinates, cropPolygons));
  };

  const a = cropCheckFullField(arrayPolygons);
  console.log(a);

  return (
    <div className="layout">
      <header id="header">
        <div className="agroIa">
          <Icon className="bi bi-flower1" color="white" fontSize="6vh" />
          <h1>AGROIA</h1>
        </div>
        <div className="botonesInicio">
          <Button onClick={() => nav('/iniciarSesion')} className="green-button cancelar">Iniciar Sesion</Button>
          <Button onClick={() => nav('/registrarse')} className="green-button cancelar">Registrarse</Button>
        </div>
      </header>
      <Carousel />
      <h1 className="agregar-campo-titulo">
        {' '}
        {' '}
        ¿Que es AgroIA?
      </h1>
      <Footer>hola</Footer>
    </div>
  );
}
