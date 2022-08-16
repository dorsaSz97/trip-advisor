import React, { useContext, useState } from 'react';
import { Box, Paper, InputBase, Button, Typography } from '@mui/material';
import ScrollReveal from 'scrollreveal';

import AppContext from '../../store/app-context';
import { setSubmit, setLocation } from '../../store/actionCreators';

import { DETAILS } from '../../data/data';

const IntroForm = () => {
  const [state, dispatch] = useContext(AppContext);

  const [isSearchTouched, setSearchTouched] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');

  const isSearchValid = searchInputValue.trim().length !== 0;
  const isSearchInvalid = !isSearchValid && isSearchTouched;

  const searchChangeHandler = e => {
    setSearchInputValue(e.target.value);
  };

  const formSubmitHandler = e => {
    e.preventDefault();

    setSearchTouched(true);

    if (isSearchValid) {
      dispatch(setSubmit(true));
      dispatch(setLocation(searchInputValue));
    }
  };

  // ScrollReveal().reveal('.searchForm', {
  //   origin: 'left',
  //   distance: '150%',
  //   duration: 1000,
  //   opacity: 0,
  //   delay: 500,
  // });

  return (
    <Box
      className="searchForm"
      display="flex"
      flexDirection="column"
      gap="3"
      position="absolute"
      left="30%"
      top="50%"
      width="90%"
      zIndex="1"
      sx={{ transform: 'translateY(-50%)' }}
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
          {DETAILS.filter(detail => detail.category === state.category)[0].verb}
        </Typography>
        ?
      </Typography>

      <Paper
        component="form"
        onSubmit={formSubmitHandler}
        sx={{
          display: 'flex',
        }}
      >
        <InputBase
          placeholder="Enter a city name..."
          onChange={searchChangeHandler}
          onBlur={() => setSearchTouched(true)}
          sx={{ px: 2, flex: 1 }}
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
        <Typography component="p" variant="body1" color="customRed.main">
          You havent entered anything! Please enter a city name :)
        </Typography>
      )}
    </Box>
  );
};

export default IntroForm;
