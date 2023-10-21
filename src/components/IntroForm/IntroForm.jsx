import { useContext, useState } from 'react';
import { Box, Paper, InputBase, Button, Typography } from '@mui/material';

import AppContext from '../../store/app-context';
import { setSubmit, setLocation } from '../../store/actionCreators';

import { DETAILS } from '../../data';

const IntroForm = () => {
  const [state, dispatch] = useContext(AppContext);

  const [isSearchTouched, setSearchTouched] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState(
    state.searchedLocation
  );

  const isSearchValid = searchInputValue.trim().length !== 0;
  const isSearchInvalid = !isSearchValid && isSearchTouched;

  const searchChangeHandler = e => {
    setSearchInputValue(e.target.value);
  };

  const formSubmitHandler = e => {
    e.preventDefault();

    setSearchTouched(true);

    if (isSearchValid) {
      dispatch(setLocation(searchInputValue));
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      position="absolute"
      left="30%"
      top="50%"
      zIndex="2"
      sx={{
        transform: 'translateY(-50%)',
        width: { xs: '90vw', md: '90%' },
        marginX: { xs: '5vw', md: 'unset' },
      }}
    >
      <Typography
        component="h2"
        variant="h2"
        sx={{
          maxWidth: '14ch',
          mb: '13px',
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

      {/* shadowed div */}
      <Paper
        component="form"
        sx={{
          display: 'flex',
        }}
        onSubmit={formSubmitHandler}
      >
        <InputBase
          placeholder="Enter a city name..."
          onChange={searchChangeHandler}
          onBlur={() => setSearchTouched(true)}
          onFocus={() => setSearchTouched(false)}
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
        <Typography
          component="p"
          variant="body1"
          color="customRed.main"
          mt={'10px'}
        >
          You haven't entered anything! Please enter a city name :)
        </Typography>
      )}
    </Box>
  );
};

export default IntroForm;
