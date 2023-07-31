/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { squareGrid, booleanPointInPolygon } from '@turf/turf';
import { PLOT_SIZE, CROP_TYPES_KEYS } from '../../../constants/plots';

export const createRectangle = (listOfPolygons) => {
  console.log(listOfPolygons);
  const aux = listOfPolygons;
  const latitudes = aux.flatMap(({ polygon: { geometry: { coordinates } } }) => coordinates[0].map((coor) => coor[1]));
  const longitudes = aux.flatMap(({ polygon: { geometry: { coordinates } } }) => coordinates[0].map((coor) => coor[0]));
  const lowestLongitude = Math.min(...longitudes);
  const lowestLatitude = Math.min(...latitudes);
  const highestLongitude = Math.max(...longitudes);
  const highestLatitude = Math.max(...latitudes);

  return [lowestLongitude, lowestLatitude, highestLongitude, highestLatitude];
};

const moveCoordinates = ({ lat, lon }, y, x) => ({
  lat: lat - y * PLOT_SIZE,
  lon: lon + x * PLOT_SIZE,
});

const plotToCoordinates = (height, width, coordinates) => {
  const coordinatesForPlots = [];
  for (let y = 0; y < height; y += 1) {
    const line = [];
    for (let x = 0; x < width; x += 1) {
      line.push(moveCoordinates(coordinates, y, x));
    }
    coordinatesForPlots.push(line);
  }
  return coordinatesForPlots;
};

const cropCheck = (coordinates, cropPolygons) => {
  // console.log(cropPolygons);
  const answer = cropPolygons.filter((oneCrop) => coordinates[0].some((corner) => booleanPointInPolygon(corner, oneCrop.polygon)))[0];

  if (!answer) {
    return { crop: CROP_TYPES_KEYS.NONE };
  }
  return { crop: answer.crop };
};

// eslint-disable-next-line no-unused-vars
const cropCheckFullField = (cropPolygons) => {
  const bbox = createRectangle(cropPolygons);
  const lowestLongitude = bbox[0];
  const lowestLatitude = bbox[1];
  const highestLongitude = bbox[2];
  const highestLatitude = bbox[3];
  const topCoordinates = [lowestLongitude, highestLatitude];

  // Calculate latitude and longitude ranges
  const latitudeRange = highestLatitude - lowestLatitude;
  const longitudeRange = highestLongitude - lowestLongitude;

  // Calculate the number of rows and columns in the matrix
  const height = Math.ceil(latitudeRange / PLOT_SIZE);
  const width = Math.ceil(longitudeRange / PLOT_SIZE);
  const options = { units: 'degrees' };
  const squareGridR = squareGrid(bbox, PLOT_SIZE, options);
  const tempList = cropPolygons;
  tempList.splice(0, 1);
  // console.log('CROPPOLYGONS, SHIF, SPLICE, REMAINING LIST', cropPolygons, cropPolygons.shift(), removed, tempList);
  const plots = squareGridR.features.map(({ geometry: { coordinates } }) => cropCheck(coordinates, tempList));// le saco el primero
  return {
    plots,
    height,
    width,
    coordinates: { lat: topCoordinates[1], lon: topCoordinates[0] },
  };
};

export default cropCheckFullField;

const polygonToField = (polygonCoordinates) => {
  const rectangleObject = createRectangle(polygonCoordinates);
  const {
    highestLatitude, highestLongitude, lowestLatitude, lowestLongitude,
  } = rectangleObject;

  const coordinates = [highestLongitude, highestLatitude];

  // Calculate latitude and longitude ranges
  const latitudeRange = highestLatitude - lowestLatitude;
  const longitudeRange = highestLongitude - lowestLongitude;

  // Calculate the number of rows and columns in the matrix
  const height = Math.ceil(latitudeRange / PLOT_SIZE);
  const width = Math.ceil(longitudeRange / PLOT_SIZE);
};

const plotInsidePolygon = (polygonCoordinates, plotCoordinates) => {
  // Step 1: Calculate the coordinates of the top-left and bottom-right corners of the plot
  const plotTopLeft = {
    x: plotCoordinates.x,
    y: plotCoordinates.y,
  };
  const plotBottomRight = {
    x: plotCoordinates.x + PLOT_SIZE,
    y: plotCoordinates.y + PLOT_SIZE,
  };

  // Step 2: Check if all four corners of the plot are inside the polygon
  const isPointInsidePolygon = (point, polygon) => {
    let isInside = false;
    const [x, y] = point;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i + 1) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];

      const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

      if (intersect) isInside = !isInside;
    }

    return isInside;
  };

  // Check if all four corners of the plot are inside the polygon
  const corners = [
    [plotTopLeft.x, plotTopLeft.y],
    [plotBottomRight.x, plotTopLeft.y],
    [plotTopLeft.x, plotBottomRight.y],
    [plotBottomRight.x, plotBottomRight.y],
  ];

  return corners.some((corner) => isPointInsidePolygon(corner, polygonCoordinates));
};

// CROP ARRAY EXAMPLE:
// const arrayPolygons = [
//   {
//     polygon: {
//       id: '8b8757926d83859f768d6c8b7388c41f',
//       type: 'Feature',
//       properties: {},
//       geometry: {
//         coordinates: [
//           [
//             [
//               -58.842927470178196,
//               -34.713909381521454,
//             ],
//             [
//               -58.83916704112572,
//               -34.71070434243838,
//             ],
//             [
//               -58.840789963137766,
//               -34.7095003870391,
//             ],
//             [
//               -58.844570183922,
//               -34.7128030876505,
//             ],
//             [
//               -58.842927470178196,
//               -34.713909381521454,
//             ],
//           ],
//         ],
//         type: 'Polygon',
//       },
//     },
//     crop: 'CORN',
//   },
//   {
//     polygon: {
//       id: '41a1e75ad36923c719db75f07e4ab95a',
//       type: 'Feature',
//       properties: {},
//       geometry: {
//         coordinates: [
//           [
//             [
//               -58.8408295466013,
//               -34.70951665682382,
//             ],
//             [
//               -58.84237330168635,
//               -34.70828014409184,
//             ],
//             [
//               -58.84613373073826,
//               -34.711599162801576,
//             ],
//             [
//               -58.84462955911725,
//               -34.7128030876505,
//             ],
//             [
//               -58.8408295466013,
//               -34.70951665682382,
//             ],
//           ],
//         ],
//         type: 'Polygon',
//       },
//     },
//     crop: 'AVOCADO',
//   },
//   {
//     polygon: {
//       id: '9c501507ecc9c4301acd9e76ce963eef',
//       type: 'Feature',
//       properties: {},
//       geometry: {
//         coordinates: [
//           [
//             [
//               -58.84231392649052,
//               -34.708231333999294,
//             ],
//             [
//               -58.8404930871598,
//               -34.706588044085045,
//             ],
//             [
//               -58.83730661833151,
//               -34.70899602213684,
//             ],
//             [
//               -58.839147249393974,
//               -34.710688072888196,
//             ],
//             [
//               -58.84231392649052,
//               -34.708231333999294,
//             ],
//           ],
//         ],
//         type: 'Polygon',
//       },
//     },
//     crop: 'SOY',
//   },
// ];
