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
      map.setView(
        [Number(state.searchedCoords.lat), Number(state.searchedCoords.lng)],
        13
      );
    } else {
      map.setView([0, 0], 13);
    }
  }, []);

  if (!state.searchedCoords.lat || !state.searchedCoords.lng) {
    return;
  }
  map.setView(
    [Number(state.searchedCoords.lat), Number(state.searchedCoords.lng)],
    13
  );

  return null;
};

export default MoveMap;
