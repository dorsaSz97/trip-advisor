import { useContext, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import AppContext from '../../store/app-context';

const ChangeView = () => {
  const ctx = useContext(AppContext);
  const map = useMap();

  useEffect(() => {
    if (
      ctx.centerCoord.length === 0 ||
      !ctx.centerCoord[0] ||
      !ctx.centerCoord[1]
    ) {
      return;
    }
    map.setView([ctx.centerCoord[0], ctx.centerCoord[1]], 15);
  }, [ctx.centerCoord, map]);

  if (ctx.placeCoords[0] && ctx.placeCoords[1]) {
    map.setView([ctx.placeCoords[0], ctx.placeCoords[1]], 15);
  } else {
    map.setView([0, 0], 15);
  }
  return null;
};

export default ChangeView;
