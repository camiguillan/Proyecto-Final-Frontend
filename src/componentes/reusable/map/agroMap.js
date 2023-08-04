/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/named */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { lineToPolygon, difference } from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'; // SEARCH BAR
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import PropTypes from 'prop-types';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'; // search bar css
import './agroMap.scss';
import styles from './styles';
import { createRectangle, createGrid, createPolygonFromPlots } from './funcionesMapa';
import { CROP_TYPES_KEYS, PLOT_SIZE } from '../../../constants/plots';
import { campoPrueba } from './campoPrueba';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FtaWd1aWxsYW4iLCJhIjoiY2xrNXNvcHdpMHg4czNzbXI2NzFoMHZnbyJ9.vQDn8tglYPjpua0CYCsyhw';
function splitPolygon(draw, polygon) {
  const features = draw.getAll();

  const drawnGeometry = features.features[features.features.length - 1].geometry;

  console.log(drawnGeometry);
  if (drawnGeometry.type === 'LineString') {
    // Create a temporary polygon from the LineString to use with difference
    const tempPolygon = lineToPolygon(drawnGeometry);

    // Split the defaultPolygon with the temporary polygon (LineString)
    const splitPolygons = difference(polygon, tempPolygon);
    // Add the resulting polygons to the map
    draw.add(splitPolygons);
  }
}

// function addCentroid(draw, polygon) {
//   draw.add(centroid(polygon));
// }

function AgroMap({
  coordinates, changeCoordinates, addFeatures, removeFeature, feats, featErased,
}) {
  const mapContainer = useRef(null);
  const drawRef = useRef(null);
  // const [searchedCoordinates, setSearchedCoordinates] = useState([-58.702963, -34.671792]);
  // console.log(coordinates);
  function removeFeatureMap() {
    if (drawRef.current) {
      const { features } = drawRef.current.getAll();
      console.log('All Features:', features);

      if (features.length !== 0 && featErased !== '') {
        // const idsInFeats = feats.map(({ polygon }) => polygon.id);
        // const tempFeatures = features.filter((feature) => !idsInFeats.includes(feature.id));
        // console.log('Features to Remove:', tempFeatures);
        // tempFeatures.forEach((feat) => drawRef.current.delete(feat.id));
        console.log('Feat to erase: ', featErased);
        drawRef.current.delete(featErased);
      }
    }
  }

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: coordinates,
      zoom: 11, // Default zoom level
    });

    const drawOptions = {
      displayControlsDefault: false,
      userProperties: true,
      styles,
      controls: {
        trash: true,
        polygon: true,
        line_string: true,
        // Add or customize modes as per your requirements

      },
    };

    const draw = new MapboxDraw(drawOptions);
    drawRef.current = draw;
    map.addControl(draw);

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'bottom-right');

    const geocoderContainer = () => <div id="geocoder-container" className="geocoder-container" style={{ width: '100%', borderRadius: '10px' }} />;
    const coordinatesGeocoder = function (query) {
      // Match anything which looks like
      // decimal degrees coordinate pair.
      const matches = query.match(
        /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i,
      );
      if (!matches) {
        return null;
      }

      function coordinateFeature(lng, lat) {
        return {
          center: [lng, lat],
          geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          place_name: `Lat: ${lat} Lng: ${lng}`,
          place_type: ['coordinate'],
          properties: {},
          type: 'Feature',
        };
      }

      const coord1 = Number(matches[1]);
      const coord2 = Number(matches[2]);

      console.log(`Coord1: ${coord1} Coord2: ${coord2}`);
      const geocodes = [];

      if (coord2 < -90 || coord2 > 90) {
        // must be lat, lng
        geocodes.push(coordinateFeature(coord2, coord1));
      }

      if (coord1 < -90 || coord1 > 90) {
        // must be lng, lat
        geocodes.push(coordinateFeature(coord1, coord2));
      }

      if (geocodes.length === 0) {
        // else could be either lng, lat or lat, lng
        geocodes.push(coordinateFeature(coord2, coord1));
        geocodes.push(coordinateFeature(coord1, coord2));
      }

      return geocodes;
    };
    // SEARCH BAR
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl,
      countries: 'AR',
      bbox: [-73.560222, -55.057499, -53.637810, -21.781235], // Limitamos resultados a solo arg
      container: geocoderContainer,
      marker: {
        color: 'red',
      },
      localGeocoder: coordinatesGeocoder,
      reverseGeocode: true,
    });

    map.addControl(geocoder, 'top-left');

    // const defaultPolygon = {
    //   type: 'Feature',
    //   geometry: {
    //     type: 'Polygon',
    //     coordinates: [
    //       [
    //         [-58.78905150033654, -34.68022022276631],
    //         [-58.78518370701069, -34.6825252635452],
    //         [-58.788616916816935, -34.68570575709246],
    //         [-58.79224568920641, -34.68341867294826],
    //         [-58.78905150033654, -34.68022022276631],
    //       ],
    //     ],
    //   },
    //   properties: {},
    // };

    // draw.add(defaultPolygon);

    if (feats.length > 0) {
      const tempFeats = feats.map((feat) => feat.polygon);
      console.log('feats agro map', tempFeats);
      tempFeats.map((feature) => draw.add(feature));
      const long = tempFeats[0].geometry.coordinates[0][0][0];
      const lat = tempFeats[0].geometry.coordinates[0][0][1];
      console.log(long, lat);
      map.setCenter([long, lat]);
      map.flyTo({ center: [long, lat], zoom: 14 });
    }

    map.on('result', (event) => {
      const { result } = event;
      console.log(result);

      // Retrieve the coordinates from the geocoding result
      const { center } = result.geometry;

      // Center the map to the selected location
      map.setCenter(center);
    });

    const marker = new mapboxgl.Marker({ draggable: false, color: 'red' });
    geocoder.on('result', (e) => {
      marker.remove(map);
      console.log(e.result.center);
      // eslint-disable-next-line no-underscore-dangle
      marker
        .setLngLat(e.result.center)
        .addTo(map);
      map.flyTo({ center: e.result.center, zoom: 17 });
    });
    const Colors = ['#21f216', '#16f2ee', '#f23400', '#be03fc', '#f29e0c', '#73b564', '#f08473', '#696261'];
    function getRandomColor(index) {
      return Colors[index - 1];
    }

    function handleDraw() {
      const features = draw.getAll();
      console.log(features, 'ACA ROMPE?');
      const lastDrawn = features.features[features.features.length - 1];
      const color = getRandomColor(features.features.length);
      // if (features.features.length === 2) {
      //   draw.add(createGrid(createRectangle([{ polygon: features.features[0], crop: 'NONE' }]), PLOT_SIZE).squareGridR);
      // }
      // if (features.features.length === 1) {
      //   draw.add(createPolygonFromPlots(campoPrueba.field));
      // }

      draw.setFeatureProperty(lastDrawn.id, 'portColor', color);
      // console.log(features);
      changeCoordinates(features.features[0].geometry.coordinates[0][0]);
      if (features.features.length !== 0) {
        addFeatures(features.features, color);
      }
      if (feats.length > 0) {
        addFeatures(feats, color);
      }
      // addCentroid(draw, lastDrawn);
    }

    function handleDrawDelete(event) {
      const fts = draw.getAll();
      const removedFeature = event.features;
      // console.log('FEATURES REMOVES', feats.features);
      removeFeature(fts.features, removedFeature);
    }
    map.on('draw.create', handleDraw);
    map.on('draw.update', handleDraw);
    map.on('draw.delete', handleDrawDelete);
    // Assuming draw is initialized correctly before this code block

    // document.getElementById('grid').addEventListener('click', () => {
    //   if (draw.getAll) {
    //     const allFeatures = draw.getAll();

    //     if (allFeatures !== null && allFeatures.length !== 0) {
    //       console.log(allFeatures);
    //       const cropPolygons = allFeatures.features[0];
    //       const bbox = createRectangle([{ polygon: cropPolygons, crop: 'NONE' }]);
    //       console.log(bbox);
    //       const options = { units: 'degrees' };
    //       const squareGridR = squareGrid(bbox, PLOT_SIZE, options);
    //       console.log(squareGridR);
    //       draw.add(squareGridR);
    //     } else {
    //       console.error("No features found in 'draw' object.");
    //     }
    //   } else {
    //     console.error("'draw' object or its 'getAll' method is not available.");
    //   }
    // });

    return () => {
      map.off('draw.create', handleDraw);
      map.off('draw.update', handleDraw);
      map.off('draw.delete', handleDrawDelete);
      map.remove();
    };
  }, []);
  useEffect(() => {
    console.log('FEATURES IN AGROMAP PROP: ', feats);
    console.log('ERASED IN AGROMAP PROP: ', featErased);

    // Call the removeFeatureMap function here (inside the useEffect where drawRef is assigned).
    removeFeatureMap();
  });
  return (
    <div ref={mapContainer} className="mapa" style={{ height: '100%', borderRadius: '10px' }} />
  );
}

export default AgroMap;

AgroMap.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  changeCoordinates: PropTypes.func.isRequired,
  addFeatures: PropTypes.func.isRequired,
  removeFeature: PropTypes.func.isRequired,
  feats: PropTypes.arrayOf(PropTypes.object).isRequired,
  featErased: PropTypes.arrayOf(PropTypes.string).isRequired,
};
