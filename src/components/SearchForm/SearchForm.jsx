import React, { useContext, useRef, useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import AppContext from '../../store/app-context';
import { setLocation } from '../../store/actionCreators';
import searchImg from '../../assets/search.svg';

const SearchForm = () => {
  const [, dispatch] = useContext(AppContext);
  const [searchInputValue, setSearchInputValue] = useState('');
  const searchInputRef = useRef();

  // const [isSearchTouched, setIsSearchTouched] = useState(false);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const isSearchValid = searchInputValue.trim().length !== 0;
  // const isSearchInvalid = !isSearchValid && isSearchTouched;

  const searchChangeHandler = e => {
    setSearchInputValue(e.target.value);
  };

  const searchClickHandler = e => {
    e.preventDefault();

    dispatch(setLocation(searchInputValue));
    searchInputRef.current.blur();
    // setSearchInputValue('');
    // setIsSearchTouched(true);
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
