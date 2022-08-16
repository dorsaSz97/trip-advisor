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
import SearchForm from '../SearchForm/SearchForm';

const ResultsList = ({ selectedMarker }) => {
  const { getResults, isLoading, isError } = useResults();
  const [elRefs, setElRefs] = useState([]);

  const [state, dispatch] = useContext(AppContext);

  useEffect(() => {
    console.log(state.results.length);
    const refs = Array(state.results.length)
      .fill()
      .map((_, index) => elRefs[index] || createRef());
    setElRefs(refs);
  }, [state.results]);

  useEffect(() => {
    if (selectedMarker) {
      elRefs[selectedMarker]?.current?.scrollIntoView({ behavior: 'smooth' });
      console.log(elRefs);
    }
  }, [selectedMarker]);

  useEffect(() => {
    getResults();
  }, [getResults]);

  return (
    <Box paddingInline="5rem" height="100%" overflow="hidden">
      <SearchForm />

      <List component="ul" sx={{ overflow: 'scroll' }}>
        {state.results.length === 0
          ? Array(30)
              .fill()
              .map(() => {
                return (
                  <Box display="flex" width="100%" sx={{ p: 2, gap: '1rem' }}>
                    <Skeleton variant="rectangular" width={210} height={130} />
                    <Box
                      flexDirection="column"
                      sx={{ display: 'flex', flex: 1 }}
                    >
                      <Box
                        width="100%"
                        display="flex"
                        mb="1"
                        justifyContent="space-between"
                      >
                        <Skeleton variant="text" width="50%" />
                        <Skeleton variant="text" width="30%" />
                      </Box>
                      <Skeleton variant="text" width="90%" />
                      <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
                      <Skeleton variant="text" width="40%" />
                    </Box>
                  </Box>
                );
              })
          : state.results.map((result, index) => {
              if (!result.name) return ''; // ad result
              return (
                <ListItem key={index} component="li" ref={elRefs[index]}>
                  <Card
                    sx={{ width: '100%' }}
                    onClick={() =>
                      dispatch(
                        setCoords(
                          Number(result.latitude),
                          Number(result.longitude)
                        )
                      )
                    }
                  >
                    <CardActionArea
                      sx={{
                        display: 'flex',
                        p: 2,
                        alignItems: 'center',
                      }}
                    >
                      <CardMedia
                        sx={{
                          width: '200px',
                          height: '130px',
                          flexShrink: '0',
                        }}
                        component="img"
                        src={result.photo?.images.original.url}
                        alt={result.name}
                      />

                      <CardContent>
                        <Box>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Typography
                              component="h3"
                              sx={{ fontSize: '17px' }}
                            >
                              {result.name}
                            </Typography>
                            <Rating
                              readOnly
                              value={Math.floor(Number(result.rating))}
                              precision={1}
                              icon={<StarIcon clr="full" />}
                              emptyIcon={<StarIcon clr="empty" />}
                            />
                          </Box>
                          <Typography
                            component="p"
                            sx={{ color: '#777', fontSize: '15px' }}
                          >
                            {result.address}
                          </Typography>
                        </Box>
                        <Box>
                          <List component="ul" sx={{ display: 'flex' }}>
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
            })}
      </List>
    </Box>
  );
};

export default ResultsList;
