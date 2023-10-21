import { useContext, useRef, useState } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';

import AppContext from '../../store/app-context';
import { setLocation } from '../../store/actionCreators';

import searchImg from '../../assets/search.svg';

const SearchForm = () => {
  const [state, dispatch] = useContext(AppContext);

  const [searchInputValue, setSearchInputValue] = useState(
    state.searchedLocation
  );
  const searchInputRef = useRef();

  const [isSearchTouched, setSearchTouched] = useState(false);

  const isSearchValid = searchInputValue.trim().length !== 0;
  const isSearchInvalid = !isSearchValid && isSearchTouched;

  const searchChangeHandler = e => {
    setSearchInputValue(e.target.value);
  };

  const searchClickHandler = e => {
    e.preventDefault();

    setSearchTouched(true);

    if (isSearchValid) {
      dispatch(setLocation(searchInputValue));
      searchInputRef.current.blur();
    }
  };

  return (
    <Box
      display="flex"
      component="form"
      onSubmit={searchClickHandler}
      position="relative"
      mx="auto"
      width="80%"
    >
      <TextField
        label="Enter a city name"
        variant="standard"
        sx={{ flex: 1 }}
        onChange={searchChangeHandler}
        // onBlur={() => setIsSearchTouched(true)}
        value={searchInputValue}
        inputRef={searchInputRef}
      />
      {isSearchInvalid && (
        <Typography
          component="p"
          variant="body1"
          color="customRed.main"
          sx={{ position: 'absolute', top: '100%', left: '0' }}
        >
          You haven't entered anything! Please enter a city name :)
        </Typography>
      )}
      <IconButton
        type="submit"
        sx={{
          p: 2,
          position: 'absolute',
          right: 0,
          top: '40%',
          transform: 'translateY(-50%)',
        }}
      >
        <img src={searchImg} alt="" />
      </IconButton>
    </Box>
  );
};

export default SearchForm;

// TODO: add validation like the other form
