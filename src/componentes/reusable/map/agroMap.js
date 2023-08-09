/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { lineToPolygon, difference } from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'; // SEARCH BAR
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import PropTypes from 'prop-types';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import _ from 'lodash';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'; // search bar css
import './agroMap.scss';
import styles from './styles';
import {
  createRectangle, createGrid, createPolygonFromPlots, createGridFromPlots,
} from './funcionesMapa';
import { CROP_TYPES_KEYS, PLOT_SIZE } from '../../../constants/plots';
import { campoPrueba } from './campoPrueba';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FtaWd1aWxsYW4iLCJhIjoiY2xrNXNvcHdpMHg4czNzbXI2NzFoMHZnbyJ9.vQDn8tglYPjpua0CYCsyhw';
function splitPolygon(draw, polygon) {
  const features = draw.getAll();

  const drawnGeometry = features.features[features.features.length - 1].geometry;

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
  const edit = feats.length > 0;
  const mapContainer = useRef(null);
  const drawRef = useRef(null);
  // const [searchedCoordinates, setSearchedCoordinates] = useState([-58.702963, -34.671792]);
  // console.log(coordinates);
  function removeFeatureMap() {
    if (drawRef.current) {
      const { features } = drawRef.current.getAll();

      if (features.length !== 0 && featErased !== '') {
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

    const NewSimpleSelect = _.extend(MapboxDraw.modes.simple_select, {
      dragMove() {},
    });

    const NewDirectSelect = _.extend(MapboxDraw.modes.direct_select, {
      dragFeature() {},
    });
    console.log(styles.sort((a, b) => a.type.localeCompare(b.type)));
    const drawOptions = {
      displayControlsDefault: false,
      userProperties: true,
      styles,
      controls: {
        trash: !edit,
        polygon: !edit,
        line_string: !edit,
      },
      modes: {
        ...MapboxDraw.modes,
        simple_select: edit ? NewSimpleSelect : MapboxDraw.modes.simple_select,
        direct_select: edit ? NewDirectSelect : MapboxDraw.modes.direct_select,
      },
    };

    const draw = new MapboxDraw(drawOptions);
    drawRef.current = draw;
    map.addControl(draw);

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'bottom-right');

    const geocoderContainer = () => <div id="geocoder-container" className="geocoder-container" style={{ width: '100%', borderRadius: '10px' }} />;
    const coordinatesGeocoder = (query) => {
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

    if (edit) {
      const tempFeats = feats.map((feat) => feat.polygon);
      tempFeats.map((feature) => draw.add(feature));
      let long = 0;
      let lat = 0;

      if (tempFeats[0].type !== 'FeatureCollection') {
        const [longitude, latitude] = tempFeats[0].geometry.coordinates[0][0];
        long = longitude;
        lat = latitude;
      } else {
        const [longitude, latitude] = tempFeats[0].features[0].geometry.coordinates[0][0];
        long = longitude;
        lat = latitude;
      }
      console.log(long, lat);
      map.setCenter([long, lat]);
      map.flyTo({ center: [long, lat], zoom: 14 });
    }

    map.on('result', (event) => {
      const { result } = event;

      // Retrieve the coordinates from the geocoding result
      const { center } = result.geometry;

      // Center the map to the selected location
      map.setCenter(center);
    });

    const marker = new mapboxgl.Marker({ draggable: false, color: 'red' });
    geocoder.on('result', (e) => {
      marker.remove(map);
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
      const lastDrawn = features.features[features.features.length - 1];
      const color = getRandomColor(features.features.length);

      draw.setFeatureProperty(lastDrawn.id, 'portColor', color);
      // console.log(features);
      changeCoordinates(features.features[0].geometry.coordinates[0][0]);
      if (features.features.length !== 0) {
        addFeatures(features.features, color);
      } else if (feats.length > 0) {
        const polygons = feats.map((f) => f.polygon);
        addFeatures(polygons, color);
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

    return () => {
      map.off('draw.create', handleDraw);
      map.off('draw.update', handleDraw);
      map.off('draw.delete', handleDrawDelete);
      map.remove();
    };
  }, []);
  useEffect(() => {
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
