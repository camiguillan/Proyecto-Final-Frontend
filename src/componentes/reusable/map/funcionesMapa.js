/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import {
  squareGrid, booleanPointInPolygon, convex, multiPoint, concave, union, simplify,
} from '@turf/turf';
import { PLOT_SIZE, CROP_TYPES_KEYS, CROP_COLORS } from '../../../constants/plots';

const fixedDecimals4 = (number) => Number(number.toFixed(4));
export const createRectangle = (listOfPolygons) => {
  const aux = listOfPolygons;
  const latitudes = aux.flatMap(({ polygon: { geometry: { coordinates } } }) => coordinates[0].map((coor) => coor[1]));
  const longitudes = aux.flatMap(({ polygon: { geometry: { coordinates } } }) => coordinates[0].map((coor) => coor[0]));
  const lowestLongitude = Math.min(...longitudes);
  const lowestLatitude = Math.min(...latitudes);
  const highestLongitude = Math.max(...longitudes);
  const highestLatitude = Math.max(...latitudes);

  return [lowestLongitude, lowestLatitude, highestLongitude, highestLatitude];
};

const getNDVIColor = (ndvi) => {
  switch (true) {
    case ndvi <= 0:
      return '#a50026';
    case ndvi <= 0.1:
      return '#d73027';
    case ndvi <= 0.2:
      return '#f46d43';
    case ndvi <= 0.3:
      return '#fdae61';
    case ndvi <= 0.4:
      return '#fee08b';
    case ndvi <= 0.5:
      return '#ffffbf';
    case ndvi <= 0.6:
      return '#d9ef8b';
    case ndvi <= 0.7:
      return '#a6d96a';
    case ndvi <= 0.8:
      return '#66bd63';
    case ndvi <= 0.9:
      return '#1a9850';
    case ndvi <= 1:
      return '#006837';
    case ndvi === 3:
      return '#85807f';
    default:
      return '#000000';
  }
};

const moveCoordinates = ({ lat, lon }, y, x) => ({
  lat: lat - y * PLOT_SIZE,
  lon: lon + x * PLOT_SIZE,
});
function calculateLongitudeIncrement(latitude, boxSize) {
  return boxSize / Math.cos(latitude * (Math.PI / 180));
}
const plotToCoordinates2 = (height, width, topLeftCoordinates, index) => {
  const { lat: topLeftLat, lon: topLeftLon } = topLeftCoordinates;
  // Calculate the row and column of the plot in the matrix
  const row = Math.floor(index / width);
  const col = index % width;

  // Calculate the latitude and longitude of the plot based on its position in the matrix
  const lat = fixedDecimals4(topLeftLat - row * PLOT_SIZE);
  const lon = fixedDecimals4(topLeftLon + col * PLOT_SIZE);

  return { lon, lat };
};

function getCoordinatesFromPosition(topLeftRow, topLeftCol, matrixWidth, position) {
  // Calculate the row and column offset from the top-left corner
  const rowOffset = Math.floor(position / matrixWidth);
  const colOffset = position % matrixWidth;

  // Calculate the actual row and column in the matrix
  const row = topLeftRow + rowOffset;
  const col = topLeftCol + colOffset;

  return { row, col };
}

const plotToCoordinates = (height, width, coordinates) => {
  const coordinatesForPlots = [];
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const topLeftCoordinate = moveCoordinates(coordinates, y, x);
      coordinatesForPlots.push(topLeftCoordinate);
    }
  }
  return coordinatesForPlots;
};

const createBox = (lowestLongitude, highestLatitude, boxSize) => {
  const longitudeIncrement = calculateLongitudeIncrement(highestLatitude, boxSize);
  // console.log(longitudeIncrement);
  const highestLongitude = fixedDecimals4(lowestLongitude + boxSize);// L -> H SE SUMA
  const lowestLatitude = fixedDecimals4(highestLatitude - boxSize); // H -> L SE RESTA

  return [
    [lowestLongitude, highestLatitude], // top left
    [highestLongitude, highestLatitude], // top right
    [highestLongitude, lowestLatitude], // bottom right
    [lowestLongitude, lowestLatitude], // bottom left
    [lowestLongitude, highestLatitude], // Closing the polygon
  ];
};
const createBox2 = (lowestLongitude, highestLatitude, boxSize) => {
  const longitudeIncrement = calculateLongitudeIncrement(highestLatitude, boxSize);
  // console.log(longitudeIncrement);
  const highestLongitude = lowestLongitude + boxSize;// L -> H SE SUMA
  const lowestLatitude = highestLatitude - boxSize; // H -> L SE RESTA

  return [
    [lowestLongitude, highestLatitude], // top left
    [highestLongitude, highestLatitude], // top right
    [highestLongitude, lowestLatitude], // bottom right
    [lowestLongitude, lowestLatitude], // bottom left
    [lowestLongitude, highestLatitude], // Closing the polygon
  ];
};

export const createCombinedPolygon = (listOfPolygons) => {
  // Extract all the coordinates from the list of polygons
  // let allCoordinates = [];
  // listOfPolygons.forEach(({ polygon: { geometry: { coordinates } } }) => {
  //   allCoordinates = allCoordinates.concat(coordinates[0]);
  // });
  const onlyPolygons = listOfPolygons.map((poly) => poly.polygon);

  return onlyPolygons.reduce((accumulator, currentPolygon) => union(accumulator, currentPolygon));
};

export const createGridFromPlots = (field) => {
  const {
    plots, height, width, coordinates,
  } = field;

  const plotsCoordinates = plots.map((plot, index) => ({ crop: plot.crop, coordinate: plotToCoordinates2(height, width, coordinates, index) }));
  // .filter((obj) => obj.crop === CROP_TYPES_KEYS.SOY);

  const plotsFeatures = plotsCoordinates.map(({ crop, coordinate }) => {
    const polygonCoordinates = createBox(coordinate.lon, coordinate.lat, PLOT_SIZE);
    const color = CROP_COLORS[crop.toUpperCase()];
    return {
      type: 'Feature',
      properties: { portColor: color },
      geometry: {
        type: 'Polygon',
        coordinates: [polygonCoordinates],
      },
    };
  });
  return { type: 'FeatureCollection', features: plotsFeatures };
};

const addColor = (feat) => {
  // const randomValue = (Math.floor(Math.random() * 21) - 10) / 10;
  let ndvi = 3;

  if (feat.ndvi) {
    ndvi = feat.ndvi;
  }

  return {
    ...feat,
    properties: {
      ...feat.properties.plotInfo,
      fillColor: getNDVIColor(ndvi),
    },
  };
};

export const createPolygonFromPlots = (field, heatmap) => {
  const {
    plots, height, width, coordinates,
  } = field;
  const plotsCoordinates = plots.map((plot, index) => ({ crop: plot.crop, coordinate: plotToCoordinates2(height, width, coordinates, index), plot }));
  // .filter((obj) => obj.crop === CROP_TYPES_KEYS.SOY);
  const plotsFeatures = plotsCoordinates.map(({ crop, coordinate, plot }) => {
    // console.log(coordinate);
    const polygonCoordinates = createBox(coordinate.lon, coordinate.lat, PLOT_SIZE);
    const color = CROP_COLORS[crop.toUpperCase()];
    return {
      polygon: {
        type: 'Feature',
        properties: { portColor: color, plotInfo: JSON.stringify(plot) },
        geometry: {
          type: 'Polygon',
          coordinates: [polygonCoordinates],
        },
      },
      crop,
    };
  });

  // Group the plotsCoordinates by crop type
  const plotsByCrop = {};
  plotsFeatures.forEach(({ crop, polygon }) => {
    if (crop !== CROP_TYPES_KEYS.NONE) {
      if (!plotsByCrop[crop]) {
        plotsByCrop[crop] = [];
      }
      plotsByCrop[crop].push({ crop, polygon });
    }
  });

  const features = [];
  let contador = 0;
  Object.keys(plotsByCrop).forEach((crop) => {
    const coordinatesForCrop = plotsByCrop[crop];
    // const box = createRectangle(coordinatesForCrop);
    if (!heatmap) {
      const poly = createCombinedPolygon(coordinatesForCrop);

      const color = CROP_COLORS[crop.toUpperCase()];
      const options = { tolerance: 0.00001, highQuality: false };
      const newPoly = simplify(poly, options);
      features.push({
        polygon: {
          id: contador.toString(),
          properties: { portColor: color },
          geometry: newPoly.geometry,
          type: newPoly.type,
        },
        crop,
      });
    } else {
      const poly = {};
      const coloredFeatures = coordinatesForCrop.map((feat) => addColor(feat.polygon));
      features.push({
        polygon: {
          id: contador.toString(),
          features: coloredFeatures,
          type: 'FeatureCollection',
        },
        crop,
      });
    }
    contador += 1;
  });

  return features;
};

export const createHeatmap = (field) => createPolygonFromPlots(field, true);

const cropCheck = (coordinates, cropPolygons) => {
  // console.log(cropPolygons);
  const answer = cropPolygons.filter((oneCrop) => coordinates[0].some((corner) => booleanPointInPolygon(corner, oneCrop.polygon)))[0];

  if (!answer) {
    return { crop: CROP_TYPES_KEYS.NONE };
  }
  return { crop: answer.crop };
};

export const createGrid = (bbox, boxSize) => {
  const grid = {
    type: 'FeatureCollection',
    features: [],
  };

  const factor = 10 ** 4; // 10 raised to the power of 4 (4 decimal places)

  // Adjust the bounding box to ensure divisibility by boxSize
  const lowestLongitude = Math.floor(bbox[0] * factor) / factor;
  const lowestLatitude = Math.floor(bbox[1] * factor) / factor;
  const highestLongitude = Math.ceil(bbox[2] * factor) / factor;
  const highestLatitude = Math.ceil(bbox[3] * factor) / factor;

  // Calculate the number of boxes in each direction (width and height as multiples of boxSize)
  const width = Math.ceil(fixedDecimals4(highestLongitude - lowestLongitude) / boxSize);
  const height = Math.ceil(fixedDecimals4(highestLatitude - lowestLatitude) / boxSize);

  // Loop through each mini square and create the coordinates
  for (let j = 0; j < height; j += 1) {
    for (let i = 0; i < width; i += 1) {
      const boxHighestLatitude = fixedDecimals4(highestLatitude - fixedDecimals4(j * boxSize));
      const boxLowestLongitude = fixedDecimals4(lowestLongitude + fixedDecimals4(i * boxSize));
      // console.log('Adding to ', highestLatitude, ' ', fixedDecimals4(j * boxSize));
      // console.log('Adding to ', lowestLongitude, ' ', fixedDecimals4(i * boxSize));
      // console.log('New lat: ', boxHighestLatitude, ' New long ', boxLowestLongitude);
      const boxCoordinates = createBox(boxLowestLongitude, boxHighestLatitude, boxSize);

      const feature = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [boxCoordinates],
        },
      };

      grid.features.push(feature);
    }
  }

  return {
    squareGridR: grid, height, width, lowestLongitude, highestLatitude,
  };
};

// eslint-disable-next-line no-unused-vars
const cropCheckFullField = (cropPolygons) => {
  const bbox = createRectangle(cropPolygons);
  const {
    squareGridR, height, width, lowestLongitude, highestLatitude,
  } = createGrid(bbox, PLOT_SIZE);
  // console.log('CROPPOLYGONS, SHIF, SPLICE, REMAINING LIST', cropPolygons, cropPolygons.shift(), removed, tempList);
  const plots = squareGridR.features.map(({ geometry: { coordinates } }) => cropCheck(coordinates, cropPolygons));
  return {
    plots,
    height,
    width,
    coordinates: { lat: highestLatitude, lon: lowestLongitude },
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
