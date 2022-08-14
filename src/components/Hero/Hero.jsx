import React, { useContext, useState, useEffect } from 'react';
import { Box, Grid, Paper, InputBase, Button, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ScrollReveal from 'scrollreveal';

import AppContext from '../../store/app-context';
import ChangeView from '../ChangeView';
import ResultsList from '../ResultsList';

function GetIcon() {
  return L.icon({
    iconUrl: require('../../assets/logo.webp'),
    iconSize: 36,
  });
}

const Hero = () => {
  const [searchClicked, setSearchClicked] = useState(false);
  const ctx = useContext(AppContext);
  const [searchInputValue, setSearchInputValue] = useState('');

  let verb;
  if (ctx.type === 'restaurants') {
    verb = 'eat';
  } else if (ctx.type === 'hotels') {
    verb = 'stay';
  } else if (ctx.type === 'attractions') {
    verb = 'visit';
  }

  const searchChangeHandler = e => {
    setSearchInputValue(e.target.value);
  };

  const searchClickHandler = e => {
    e.preventDefault();

    setSearchClicked(true);

    ctx.setPlace(searchInputValue);
  };

  useEffect(() => {
    if (searchClicked) {
      ScrollReveal().reveal('.headline', {
        origin: 'left',
        distance: '100px',
        duration: 800,
        opacity: 0,
        delay: 300,
      });
    }
  }, [searchClicked]);

  return (
    <Grid container width={'100%'} height={'100vh'}>
      <Grid
        item
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '50%',
        }}
      >
        {!searchClicked && (
          <Box
            display="flex"
            flexDirection="column"
            marginLeft="30%"
            width="100%"
            zIndex="1"
          >
            <Typography component="h2" variant="h2" sx={{ maxWidth: '13ch' }}>
              {`Where do you want to ${verb}?`}
            </Typography>

            <Paper
              onSubmit={searchClickHandler}
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {/* <Autocomplete
              onLoad={onLoadHandler}
              onPlaceChanged={onPlaceChangedHandler}
            > */}
              <InputBase
                onChange={searchChangeHandler}
                placeholder="Enter a country, city..."
                sx={{ ml: 1, flex: 1 }}
              />
              {/* </Autocomplete> */}
              <Button
                type="submit"
                sx={{
                  backgroundColor: 'customBlue.main',
                  color: 'white',
                  paddingBlock: '1rem',
                  '&:hover': {
                    color: 'customBlack.main',
                  },
                }}
              >
                Search
              </Button>
            </Paper>
          </Box>
        )}

        {searchClicked && <ResultsList />}
      </Grid>

      <Grid
        item
        sx={{ backgroundColor: '#aaa', width: '50%', height: '100vh' }}
      >
        {searchClicked && (
          <MapContainer
            center={[
              !ctx.placeCoords ? 0 : Number(ctx.placeCoords[0]),
              !ctx.placeCoords ? 0 : Number(ctx.placeCoords[1]),
            ]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ width: '100%', height: '100%' }}
            placeholder={<p>WAIT</p>}
          >
            <ChangeView />

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {ctx.results.length !== 0 &&
              ctx.results.map((c, i) => {
                if (!c.latitude || !c.longitude || !c.name) return '';
                return (
                  <Marker
                    icon={GetIcon()}
                    key={i}
                    position={[Number(c.latitude), Number(c.longitude)]}
                  >
                    <Popup>
                      <Box backgroundColor="customBlue.main" color="white">
                        <Typography variant="h6">{c.name}</Typography>
                        <Typography variant="p">{c.address}</Typography>
                        <Typography variant="p">{c.price}</Typography>
                        <Typography variant="p">{c.ranking}</Typography>
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
