import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FtaWd1aWxsYW4iLCJhIjoiY2xrNXNvcHdpMHg4czNzbXI2NzFoMHZnbyJ9.vQDn8tglYPjpua0CYCsyhw';

function Mapbox() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-58.702963, -34.671792], // Default center coordinates Orden: [longitud, latitud]
      zoom: 17, // Default zoom level
    });

    const draw = new MapboxDraw();
    map.addControl(draw);

    function handleDraw() {
      const features = draw.getAll();
      console.log(features);

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

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
}

export default Mapbox;
