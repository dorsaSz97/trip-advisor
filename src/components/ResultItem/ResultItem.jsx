import React, { useContext } from 'react';
import {
  ListItem,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  Link,
  Rating,
  Typography,
} from '@mui/material';

import AppContext from '../../store/app-context';
import { setCoords } from '../../store/actionCreators';

import StarIcon from '../Icons/StarIcon';
import chefIcon from '../../assets/chef.svg';

const ResultItem = ({ result, refProp }) => {
  const [state, dispatch] = useContext(AppContext);

  return (
    <ListItem component="li" sx={{ p: 0 }} ref={refProp}>
      <Card
        onClick={() => dispatch(setCoords(result.latitude, result.longitude))}
        sx={{ width: '100%' }}
      >
        <CardActionArea
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
          }}
        >
          <CardMedia
            component="img"
            src={result.photo.images.original.url}
            alt={result.name}
            sx={{
              width: '200px',
              height: '130px',
              flexShrink: '0',
            }}
          />

          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mb: 'auto',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography component="h3" fontSize="17px">
                  {result.name}
                </Typography>
                <Rating
                  readOnly
                  value={Math.floor(Number(result.rating))}
                  precision={1}
                  icon={<StarIcon type="full" />}
                  emptyIcon={<StarIcon type="empty" />}
                />
              </Box>
              <Typography component="p" color="#777" fontSize="15px">
                {result.address}
              </Typography>
              <Box display="flex">
                <img src={chefIcon} alt="Chef hat" />
                <Typography component="p">
                  {state.category === 'hotels' && result.subcategory_type_label}
                  {state.category === 'restaurants' && result.cuisine[0].name}
                  {state.category === 'attractions' && result.subtype[0].name}
                </Typography>
              </Box>
              <Link
                href={result.web_url}
                target="_blank"
                underline="always"
                rel="noreferrer"
                sx={{ mt: '30px', display: 'inline-block' }}
              >
                Read the reviews
              </Link>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </ListItem>
  );
};

export default ResultItem;
