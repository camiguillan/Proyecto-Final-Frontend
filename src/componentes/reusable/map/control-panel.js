import * as React from 'react';
import area from '@turf/area';
import PropTypes from 'prop-types';

function ControlPanel({ polygons }) {
  let polygonArea = 0;
  for (const polygon of polygons) {
    polygonArea += area(polygon);
  }

  return (
    <div className="control-panel">
      {polygonArea > 0 && (
        <p>
          {Math.round(polygonArea * 100) / 100}
          {' '}
          <br />
          square meters
        </p>
      )}
    </div>
  );
}

export default React.memo(ControlPanel);

ControlPanel.propTypes = {
  polygons: PropTypes.arrayOf().isRequired,
};
