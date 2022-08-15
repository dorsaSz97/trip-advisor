import React, { useContext, useEffect, useState } from 'react';
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

import useResults from '../../hooks/useResults';

import StarIcon from '../Icons/StarIcon';
import { setCoords } from '../../store/actionCreators';

import chefIcon from '../../assets/chef.svg';
import moneyIcon from '../../assets/money.svg';

import AppContext from '../../store/app-context';
import { setLocation } from '../../store/actionCreators';

import attractionsImg from '../../assets/attractions.jpg';
import restaurantsImg from '../../assets/restaurants.jpg';
import hotelsImg from '../../assets/hotels.jpg';

const ResultsList = () => {
  const { getResults, isLoading, isError } = useResults();

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
    dispatch(setLocation(searchInputValue));
  };

  useEffect(() => {
    getResults();
  }, [getResults]);

  return (
    <Box height="100vh" overflow="scroll" paddingInline="5rem">
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
      <List component="ul">
        {state.results.length === 0 ? (
          <Skeleton variant="rectangular" width={210} height={118} />
        ) : (
          state.results.map((result, index) => {
            if (!result.name) return null;
            return (
              <ListItem key={index} component="li">
                <Card
                  sx={{ width: '100%' }}
                  onClick={() =>
                    dispatch(setCoords(result.latitude, result.longitude))
                  }
                >
                  <CardActionArea>
                    <CardMedia
                      sx={{ width: '100px', height: '100px' }}
                      component="img"
                      src={result.photo?.images.original.url}
                      alt={result.name}
                    />

                    <CardContent>
                      <Typography component="h3">{result.name}</Typography>
                      <Typography component="p">{result.address}</Typography>
                      <Rating
                        readOnly
                        value={Number(result.rating)}
                        precision={0.5}
                        icon={<StarIcon />}
                        emptyIcon={''}
                      />
                      <Box>
                        <List component="ul">
                          <ListItem component="li">
                            <img src={moneyIcon} alt="Money" />
                            <Typography component="p">
                              {state.category === 'hotels' &&
                                result.subcategory_type_label}
                              {state.category === 'restaurants' &&
                                result.cuisine &&
                                result.cuisine[0].name}
                              {state.category === 'attractions' &&
                                result.subtype[0].name}
                            </Typography>
                          </ListItem>
                          <ListItem component="li">
                            <img src={chefIcon} alt="Chefs Hat" />
                            <Typography component="p">
                              {result.price_level}
                            </Typography>
                          </ListItem>
                        </List>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                  {/* web_url: "https://www.tripadvisor.com/Attraction_Review-g562654-d12238131-Reviews-Sambil_Outlet-Leganes.html"
website */}
                </Card>
              </ListItem>
            );
          })
        )}
      </List>
    </Box>
  );
};

export default ResultsList;
