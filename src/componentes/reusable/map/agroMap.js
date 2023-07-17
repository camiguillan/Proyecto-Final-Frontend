import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder'; // SEARCH BAR
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import PropTypes from 'prop-types';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import 'mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'; // search bar css
import './agroMap.scss';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FtaWd1aWxsYW4iLCJhIjoiY2xrNXNvcHdpMHg4czNzbXI2NzFoMHZnbyJ9.vQDn8tglYPjpua0CYCsyhw';

function AgroMap({ coordinates }) {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-58.702963, -34.671792], // Default center coordinates
      zoom: 12, // Default zoom level
    });

    const drawOptions = {
      displayControlsDefault: false,
      controls: {
        trash: true,
        polygon: true,
        // Add or customize modes as per your requirements

      },
    };

    const draw = new MapboxDraw(drawOptions);
    map.addControl(draw);

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'bottom-right');

    const geocoderContainer = () => <div id="geocoder-container" className="geocoder-container" style={{ width: '100%', borderRadius: '10px' }} />;
    // SEARCH BAR
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl,
      countries: 'AR',
      bbox: [-73.560222, -55.057499, -53.637810, -21.781235], // Limitamos resultados a solo arg
      container: geocoderContainer,
    });

    map.addControl(geocoder, 'top-left');

    map.on('result', (event) => {
      const { result } = event;

      // Retrieve the coordinates from the geocoding result
      const { center } = result.geometry;

      // Center the map to the selected location
      map.setCenter(center);
    });

    function handleDraw() {
      const features = draw.getAll();
      coordinates(features.features[0].geometry.coordinates);
      // console.log(features.features[0].geometry.coordinates, coordinates);

      // Call your API with the processed data
      // Example: fetch('YOUR_API_URL', { method: 'POST', body: JSON.stringify(features) })
    }

    function handleDrawDelete() {
      // Handle when a user deletes a drawn feature
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
  coordinates: PropTypes.func.isRequired,
};
