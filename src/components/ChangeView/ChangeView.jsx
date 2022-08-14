import { useContext, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import AppContext from '../../store/app-context';

const ChangeView = () => {
  const [state, dispatch] = useContext(AppContext);
  const map = useMap();

  console.log(state.searchedCoords);
  useEffect(() => {
    if (state.searchedCoords.lat && state.searchedCoords.lng) {
      map.setView([state.searchedCoords.lat, state.searchedCoords.lng], 15);
    } else {
      map.setView([0, 0], 15);
    }
  }, []);

  if (!state.searchedCoords.lat || !state.searchedCoords.lng) {
    return;
  }
  map.setView([state.searchedCoords.lat, state.searchedCoords.lng], 15);

  return null;
};

export default ChangeView;
