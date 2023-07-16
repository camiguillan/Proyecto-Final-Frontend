import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useControl } from 'react-map-gl';
import PropTypes from 'prop-types';

export default function DrawControl({
  position, displayControlsDefault, polygon, trash,
  defaultMode,
  onCreate,
  onUpdate,
  onDelete,
}) {
  const mapDraw = {
    position,
    displayControlsDefault,
    controls: {
      polygon,
      trash,
    },
    defaultMode,
    onCreate,
    onUpdate,
    onDelete,
  };

  useControl(
    () => new MapboxDraw(mapDraw),
    ({ map }) => {
      map.on('draw.create', onCreate);
      map.on('draw.update', onUpdate);
      map.on('draw.delete', onDelete);
    },
    ({ map }) => {
      map.off('draw.create', onCreate);
      map.off('draw.update', onUpdate);
      map.off('draw.delete', onDelete);
    },
    {
      position,
    },
  );

  return null;
}

DrawControl.propTypes = {
  position: PropTypes.string.isRequired,
  displayControlsDefault: PropTypes.bool.isRequired,
  // controls: PropTypes.object.isRequired,
  polygon: PropTypes.bool.isRequired,
  trash: PropTypes.bool.isRequired,
  defaultMode: PropTypes.string.isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
