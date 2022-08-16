import React, { useContext, useEffect, useState, createRef } from 'react';
import {
  Box,
  List,
  ListItem,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Rating,
  Paper,
  Button,
  InputBase,
  Typography,
  Skeleton,
} from '@mui/material';
import AppContext from '../../store/app-context';
import { setLocation } from '../../store/actionCreators';

const SearchForm = () => {
  const [state, dispatch] = useContext(AppContext);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isSearchTouched, setIsSearchTouched] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isSearchValid = searchInputValue.trim().length !== 0;
  const isSearchInvalid = !isSearchValid && isSearchTouched;

  const searchChangeHandler = e => {
    setSearchInputValue(e.target.value);
  };

  const searchClickHandler = e => {
    e.preventDefault();

    setIsSearchTouched(true);
    dispatch(setLocation(searchInputValue));
  };

  return (
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
  );
};

export default SearchForm;
