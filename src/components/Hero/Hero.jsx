import React, { useContext, useState, useEffect } from 'react';
import { Box, Grid, Paper, InputBase, Button, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ScrollReveal from 'scrollreveal';

import AppContext from '../../store/app-context';
import { setLocation } from '../../store/actionCreators';

import MoveMap from '../MoveMap';
import ResultsList from '../ResultsList';

import attractionsImg from '../../assets/attractions.jpg';
import restaurantsImg from '../../assets/restaurants.jpg';
import hotelsImg from '../../assets/hotels.jpg';

function GetIcon() {
  return L.icon({
    iconUrl: require('../../assets/cutlery.png'),
    iconSize: 40,
  });
}

const Hero = ({ setClickStatus }) => {
  const [state, dispatch] = useContext(AppContext);

  const [searchInputValue, setSearchInputValue] = useState('');
  const [isSearchTouched, setIsSearchTouched] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isSearchValid = searchInputValue.trim().length !== 0;
  const isSearchInvalid = !isSearchValid && isSearchTouched;

  let verb;
  let imgCategory;
  if (state.category === 'restaurants') {
    verb = 'eat';
    imgCategory = restaurantsImg;
  } else if (state.category === 'hotels') {
    verb = 'stay';
    imgCategory = hotelsImg;
  } else if (state.category === 'attractions') {
    verb = 'visit';
    imgCategory = attractionsImg;
  }

  const searchChangeHandler = e => {
    setSearchInputValue(e.target.value);
  };

  const searchClickHandler = e => {
    e.preventDefault();

    setIsSearchTouched(true);
    setIsSubmitted(true);
    setClickStatus(true);

    dispatch(setLocation(searchInputValue));
  };

  // useEffect(() => {
  //   ScrollReveal().reveal('.search-form', {
  //     origin: 'left',
  //     distance: '150%',
  //     duration: 800,
  //     opacity: 0,
  //     delay: 500,
  //   });
  // }, []);

  return (
    <Grid container width="100%" height="100vh">
      <Grid item xs={12} md={6} position="relative">
        {!isSubmitted && (
          <Box
            className="search-form"
            display="flex"
            flexDirection="column"
            position="absolute"
            left="30%"
            top="50%"
            width="90%"
            zIndex="1"
            sx={{ transform: 'translateY(-50%)', gap: 3 }}
          >
            <Typography
              component="h2"
              variant="h2"
              sx={{
                maxWidth: '14ch',
              }}
            >
              Where do you want to
              <Typography
                component="span"
                variant="h2"
                sx={{ color: 'customBlue.main' }}
              >
                {' '}
                {verb}
              </Typography>
              ?
            </Typography>

            <Paper
              component="form"
              sx={{
                display: 'flex',
              }}
              onSubmit={searchClickHandler}
            >
              <InputBase
                placeholder="Enter a city name..."
                sx={{ px: 2, flex: 1 }}
                onChange={searchChangeHandler}
                onBlur={() => setIsSearchTouched(true)}
              />
              <Button
                type="submit"
                sx={{
                  backgroundColor: 'customBlue.main',
                  color: 'white',
                  p: 2,
                  '&:hover': {
                    backgroundColor: 'customBlue.dark',
                  },
                }}
              >
                Search
              </Button>
            </Paper>
            {isSearchInvalid && (
              <Typography variant="body1" color="red">
                You havent entered anything! Please enter a city name :)
              </Typography>
            )}
          </Box>
        )}

        {isSubmitted && <ResultsList />}
      </Grid>

      <Grid item xs={12} md={6}>
        {!isSubmitted && (
          <img
            src={imgCategory}
            alt={state.cateogry}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}

        {isSubmitted && (
          <MapContainer
            center={[
              !state.searchedCoords.lat ? 0 : Number(state.searchedCoords.lat),
              !state.searchedCoords.lng ? 0 : Number(state.searchedCoords.lng),
            ]}
            zoom={12}
            scrollWheelZoom={false}
            style={{ width: '100%', height: '100%' }}
          >
            {/* the map wont render on its own when the coords change so we have to force that with changing the props in a child component */}
            <MoveMap />

            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            />
            {state.results.length !== 0 &&
              state.results.map((result, i) => {
                if (!result.latitude || !result.longitude || !result.name)
                  return '';
                return (
                  <Marker
                    key={i}
                    icon={GetIcon()}
                    position={[
                      Number(result.latitude),
                      Number(result.longitude),
                    ]}
                  >
                    <Popup>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {result.name}
                        </Typography>
                        <Typography variant="p">{result.address}</Typography>
                      </Box>
                    </Popup>
                  </Marker>
                );
              })}
          </MapContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default Hero;
