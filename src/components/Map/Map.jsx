import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import AppContext from '../../store/app-context';
import { setSelected } from '../../store/actionCreators';

import MapMovement from '../MapMovement';

import styles from './Map.module.css';

//----------------- DATA -----------------
const TILE_IMAGE = {
  url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
  attr: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
};

const ZOOM_LEVEL = 13;

const getMarkerIcon = () =>
  L.icon({
    iconUrl: require('../../assets/cutleryMarker.png'),
    iconSize: [40, 40],
  });
// ----------------- -----------------

const Map = () => {
  const [state, dispatch] = useContext(AppContext);

  return (
    <MapContainer
      center={[
        !state.searchedCoords.lat ? 0 : state.searchedCoords.lat,
        !state.searchedCoords.lng ? 0 : state.searchedCoords.lng,
      ]}
      zoom={ZOOM_LEVEL}
      scrollWheelZoom={false}
      className={styles.mapContainer}
    >
      {/* when the coords change, the map wont render on its own so we have to force that with making the child component re-render */}
      <MapMovement zoom={ZOOM_LEVEL} />

      <TileLayer url={TILE_IMAGE.url} attribution={TILE_IMAGE.attr} />
      {state.results.length !== 0 &&
        state.results.map((result, index) => {
          if (!result.latitude || !result.longitude || !result.name) return '';

          return (
            <Marker
              key={index}
              icon={getMarkerIcon()}
              position={[Number(result.latitude), Number(result.longitude)]}
              eventHandlers={{
                click: () => {
                  dispatch(setSelected(index));
                },
              }}
            >
              <Popup>
                <Box>
                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight="bold"
                    mb="0.8rem"
                  >
                    {result.name}
                  </Typography>
                  <Typography component="p" fontSize="0.9rem">
                    {result.address}
                  </Typography>
                  <Typography
                    component="p"
                    fontSize="0.9rem"
                    color="customBlue.main"
                  >
                    {result.phone}
                  </Typography>
                </Box>
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};

export default Map;
