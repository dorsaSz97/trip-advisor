import { useContext, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import AppContext from '../../store/app-context';

const MapMovement = ({ zoom }) => {
  const [state] = useContext(AppContext);

  const map = useMap();

  useEffect(() => {
    if (state.searchedCoords.lat && state.searchedCoords.lng) {
      map.setView([state.searchedCoords.lat, state.searchedCoords.lng], zoom);
    } else {
      map.setView([0, 0], zoom);
    }
  }, [state.searchedCoords, zoom, map]);

  return null;
};

export default MapMovement;
