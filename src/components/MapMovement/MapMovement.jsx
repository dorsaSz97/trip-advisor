import { useContext, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import AppContext from '../../store/app-context';
import { ZOOM_LEVEL } from '../../data/data';

const MapMovement = () => {
  const [state] = useContext(AppContext);

  const map = useMap();

  useEffect(() => {
    if (state.searchedCoords.lat && state.searchedCoords.lng) {
      map.setView(
        [state.searchedCoords.lat, state.searchedCoords.lng],
        ZOOM_LEVEL
      );
      map.closePopup();
    } else {
      map.setView([0, 0], ZOOM_LEVEL);
    }
  }, [state.searchedCoords, map]);

  return null;
};

export default MapMovement;
