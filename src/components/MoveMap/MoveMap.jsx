import { useContext, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import AppContext from '../../store/app-context';

const MoveMap = () => {
  const [state, dispatch] = useContext(AppContext);
  const map = useMap();

  console.log(state.searchedCoords);
  useEffect(() => {
    if (state.searchedCoords.lat && state.searchedCoords.lng) {
      map.setView([state.searchedCoords.lat, state.searchedCoords.lng], 12);
    } else {
      map.setView([0, 0], 12);
    }
  }, []);

  if (!state.searchedCoords.lat || !state.searchedCoords.lng) {
    return;
  }
  map.setView([state.searchedCoords.lat, state.searchedCoords.lng], 12);

  return null;
};

export default MoveMap;
