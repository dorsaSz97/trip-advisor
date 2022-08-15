import React, { useContext } from 'react';
import {
  Box,
  List,
  ListItem,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Rating,
  Typography,
} from '@mui/material';

import chefIcon from '../../assets/chef.svg';
import moneyIcon from '../../assets/money.svg';

import AppContext from '../../store/app-context';
import StarIcon from '../Icons/StarIcon';
import { setCoords } from '../../store/actionCreators';

const ResultsList = () => {
  // get all the results from the context ctx.results
  const [state, dispatch] = useContext(AppContext);

  return (
    <Box height="100vh" overflow="scroll" paddingInline="5rem">
      <List component="ul">
        {state.results.length !== 0 &&
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
          })}
      </List>
    </Box>
  );
};

export default ResultsList;
