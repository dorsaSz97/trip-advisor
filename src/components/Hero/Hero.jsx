import React, { useContext } from 'react';
import { Box, Grid, Paper, InputBase, Button, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import AppContext from '../../store/app-context';

const Hero = () => {
  const ctx = useContext(AppContext);
const [searchInputValue,setSearchInputValue] = useState('');

  let verb;
  if (ctx.type === 'restaurants') {
    verb = 'eat';
  } else if (ctx.type === 'hotels') {
    verb = 'stay';
  } else if (ctx.type === 'attractions') {
    verb = 'visit';
  }

  const searchChangeHandler = (e) => {setSearchInputValue(e.target.value)}

  const searchClickHandler = () => {
    console.log(searchInputValue)

  }
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
            onPlaceChanged={searchChangeHandler}
              placeholder="Enter a country, city..."
              sx={{ ml: 1, flex: 1 }}
            />
            {/* </Autocomplete> */}
            <Button onClick={searchClickHandler}
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
      </Grid>

      <Grid item sx={{ backgroundColor: '#aaa', width: '50%' }}>
        <MapContainer
          style={{ height: '100%', width: '100%' }}
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}></Marker>
        </MapContainer>
      </Grid>
    </Grid>
  );
};

export default Hero;
