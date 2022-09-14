import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import AppContext from '../../store/app-context';
import { setSelected } from '../../store/actionCreators';
import { ZOOM_LEVEL, TILE_IMAGE } from '../../data/data';

import MapMovement from '../MapMovement';

import styles from './Map.module.css';

//----------------- DATA -----------------

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
      <MapMovement />

      <TileLayer url={TILE_IMAGE.url} attribution={TILE_IMAGE.attr} />
      {state.results.length !== 0 &&
        state.results.map((result, index) => {
          if (
            !result.properties.lat ||
            !result.properties.lon ||
            !result.properties.name
          )
            return '';

          return (
            <Marker
              key={index}
              icon={getMarkerIcon()}
              position={[
                Number(result.properties.lat),
                Number(result.properties.lon),
              ]}
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
                    {result.properties.name}
                  </Typography>
                  <Typography component="p" fontSize="0.9rem">
                    {result.properties.formatted}
                  </Typography>
                  <Typography
                    component="p"
                    fontSize="0.9rem"
                    color="customBlue.main"
                  >
                    {result.properties.datasource.raw.phone}
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
