/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { lineToPolygon, difference, booleanPointInPolygon } from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import PropTypes, { func } from 'prop-types';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import _ from 'lodash';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './agroMap.scss';
import styles from './styles';
import { CROP_TYPES_TRANSLATIONS } from '../../../constants/translations';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

function splitPolygon(draw, polygon) {
  const features = draw.getAll();

  const drawnGeometry = features.features[features.features.length - 1].geometry;

  if (drawnGeometry.type === 'LineString') {
    const tempPolygon = lineToPolygon(drawnGeometry);

    const splitPolygons = difference(polygon, tempPolygon);
    draw.add(splitPolygons);
  }
}

function AgroMap({
  coordinates, changeCoordinates, addFeatures, removeFeature, feats, featErased, edit,
}) {
  const mapContainer = useRef(null);
  const drawRef = useRef(null);
  const mapRef = useRef(null);
  function removeFeatureMap() {
    if (drawRef.current) {
      const { features } = drawRef.current.getAll();

      if (features.length !== 0 && featErased !== '') {
        drawRef.current.delete(featErased);
      }
    }
  }

  const addFeats = () => {
    console.log(feats);
    if (edit && drawRef.current && mapRef.current) {
      const tempFeats = feats.map((feat) => feat.polygon);
      tempFeats.map((feature) => drawRef.current.add(feature));
      let long = 0;
      let lat = 0;

      if (tempFeats[0].type !== 'FeatureCollection') {
        const [longitude, latitude] = tempFeats[0].geometry.coordinates[0][0];
        long = longitude;
        lat = latitude;
      } else {
        const middleIndex = Math.floor(tempFeats[0].features.length / 2);
        const [longitude, latitude] = tempFeats[0].features[middleIndex].geometry.coordinates[0][0];
        long = longitude;
        lat = latitude;
      }
      mapRef.current.setCenter([long, lat]);
      mapRef.current.flyTo({ center: [long, lat], zoom: 14 });
    }
  };

  const reDrawCrops = () => {
    if (edit && drawRef.current && feats.length > 0) {
      drawRef.current.deleteAll();
      addFeats();
    } else if (edit) {
      drawRef.current.deleteAll();
    }
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: coordinates,
      zoom: 11,
    });
    mapRef.current = map;
    const NewSimpleSelect = _.extend(MapboxDraw.modes.simple_select, {
      dragMove() {},
    });

    const NewDirectSelect = _.extend(MapboxDraw.modes.direct_select, {
      dragFeature() {},
    });
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
        geocodes.push(coordinateFeature(coord2, coord1));
      }

      if (coord1 < -90 || coord1 > 90) {
        geocodes.push(coordinateFeature(coord1, coord2));
      }

      if (geocodes.length === 0) {
        geocodes.push(coordinateFeature(coord2, coord1));
        geocodes.push(coordinateFeature(coord1, coord2));
      }

      return geocodes;
    };
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

    addFeats();

    map.on('result', (event) => {
      const { result } = event;

      const { center } = result.geometry;

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
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    map.on('mousemove', (e) => {
      map.getCanvas().style.cursor = 'pointer';
      const { lngLat } = e;
      const coords = [lngLat.lng, lngLat.lat];
      let hoveredFeature = '';
      if (edit) {
        if (feats[0].polygon.type === 'FeatureCollection') {
          // console.log('ACA LOGICA DE PLOTS');
        } else {
          const feats2 = feats.filter((poly) => booleanPointInPolygon(coords, poly.polygon))[0];
          hoveredFeature = feats2;
        }
      }
      if (hoveredFeature !== '' && hoveredFeature) {
        popup.setLngLat(e.lngLat)
          .setText(CROP_TYPES_TRANSLATIONS[hoveredFeature.crop])
          .addTo(map);
      } else {
        map.getCanvas().style.cursor = '';
        popup.remove();
      }
    });

    map.on('mouseleave', () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });

    function handleDraw() {
      const features = draw.getAll();
      const lastDrawn = features.features[features.features.length - 1];
      const color = getRandomColor(features.features.length);

      draw.setFeatureProperty(lastDrawn.id, 'portColor', color);
      changeCoordinates(features.features[0].geometry.coordinates[0][0]);
      if (features.features.length !== 0) {
        addFeatures(features.features);
      } else if (feats.length > 0) {
        const polygons = feats.map((f) => f.polygon);
        addFeatures(polygons);
      }
    }

    function handleDrawDelete(event) {
      const fts = draw.getAll();
      const removedFeature = event.features;
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
    removeFeatureMap();
  });

  useEffect(() => {
    reDrawCrops();
  }, [feats]);

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
  edit: PropTypes.bool.isRequired,
};
