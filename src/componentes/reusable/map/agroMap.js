/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
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
  coordinates, changeCoordinates, addFeatures, removeFeature,
}) {
  const mapContainer = useRef(null);
  // const [searchedCoordinates, setSearchedCoordinates] = useState([-58.702963, -34.671792]);
  // console.log(coordinates);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: coordinates,
      zoom: 15, // Default zoom level
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
    const usedColors = [];
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';

      do {
        color = '#'; // Reset color on each iteration

        for (let i = 0; i < 6; i += 1) {
          color += letters[Math.floor(Math.random() * 16)];
        }
      } while (usedColors.includes(color)); // Continue generating until a distinct color is found

      usedColors.push(color);

      return color;
    }

    function handleDraw() {
      const features = draw.getAll();
      const lastDrawn = features.features[features.features.length - 1];

      draw.setFeatureProperty(lastDrawn.id, 'portColor', getRandomColor());
      console.log(features);
      changeCoordinates(features.features[0].geometry.coordinates[0]);
      // splitPolygon(draw, defaultPolygon);
      // eslint-disable-next-line guard-for-in
      addFeatures(features.features);

      // addCentroid(draw, lastDrawn);
    }

    function handleDrawDelete() {
      const feats = draw.getAll();
      console.log('FEATURES REMOVES', feats.features);
      removeFeature(feats.features);
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
};
