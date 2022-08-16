import React, { useContext, useState, useEffect, createRef } from 'react';
import { Box, Grid, Paper, InputBase, Button, Typography } from '@mui/material';
import ScrollReveal from 'scrollreveal';

import AppContext from '../../store/app-context';
import { setLocation } from '../../store/actionCreators';

import ResultsList from '../ResultsList';

import attractionsImg from '../../assets/attractions.jpg';
import restaurantsImg from '../../assets/restaurants.jpg';
import hotelsImg from '../../assets/hotels.jpg';
import Map from '../Map';

const Hero = ({ setClickStatus }) => {
  const [state, dispatch] = useContext(AppContext);

  const [searchInputValue, setSearchInputValue] = useState('');
  const [isSearchTouched, setIsSearchTouched] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isSearchValid = searchInputValue.trim().length !== 0;
  const isSearchInvalid = !isSearchValid && isSearchTouched;

  const [selectedIndex, setSelectedIndex] = useState(null);
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
  ScrollReveal().reveal('.search-form', {
    origin: 'left',
    distance: '150%',
    duration: 1000,
    opacity: 0,
    delay: 500,
  });
  useEffect(() => {}, []);

  return (
    <Grid container width="100%" height="100vh">
      <Grid
        item
        xs={12}
        md={6}
        position="relative"
        height="100%"
        // sx={{ overflowY: 'hidden' }}
      >
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

        {isSubmitted && <ResultsList selectedMarker={selectedIndex} />}
      </Grid>

      <Grid item xs={12} md={6} height="100%">
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

        {isSubmitted && <Map setSelectedIndex={setSelectedIndex} />}
      </Grid>
    </Grid>
  );
};

export default Hero;
