/* eslint-disable no-unused-vars */
import { PLOT_SIZE } from '../../../constants/plots';

function getHL(coordinates) {
  let highestLatitude = -Infinity;
  let lowestLatitude = Infinity;
  let highestLongitude = -Infinity;
  let lowestLongitude = Infinity;

  for (const [longitude, latitude] of coordinates) {
    highestLatitude = Math.max(highestLatitude, latitude);
    lowestLatitude = Math.min(lowestLatitude, latitude);
    highestLongitude = Math.max(highestLongitude, longitude);
    lowestLongitude = Math.min(lowestLongitude, longitude);
  }

  return [highestLatitude, lowestLatitude, highestLongitude, lowestLongitude];
}

function createRectangle(coordinates) {
  const {
    highestLatitude, lowestLatitude, highestLongitude, lowestLongitude,
  } = getHL(coordinates);
  const rectangleCoordinates = [
    [lowestLongitude, highestLatitude], // Top left
    [highestLongitude, highestLatitude], // Top right
    [highestLongitude, lowestLatitude], // Bottom right
    [lowestLongitude, lowestLatitude], // Bottom left
    [lowestLongitude, highestLatitude], // Closing the rectangle
  ];

  return {
    rectangleCoordinates,
    highestLatitude,
    lowestLatitude,
    highestLongitude,
    lowestLongitude,
  };
}

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

  return corners.some((corner) => isPointInPoly(corner, polygonCoordinates));
};

const isPointInPoly = (poly, pt) => {
  for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) {
    ((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) ||
      (poly[j][1] <= pt[1] && pt[1] < poly[i][1])) &&
      pt[0] <
        ((poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1])) /
          (poly[j][1] - poly[i][1]) +
          poly[i][0] &&
      (c = !c);
  }
  return c;
};
