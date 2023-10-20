import React, { useContext } from 'react';
import {
  ListItem,
  Card,
  CardActionArea,
  // CardMedia,
  CardContent,
  Box,
  Link,
  // Rating,
  Typography,
} from '@mui/material';

import AppContext from '../../store/app-context';
import { setCoords, setMap, setSelected } from '../../store/actionCreators';

// import StarIcon from '../Icons/StarIcon';
// import chefIcon from '../../assets/chef.svg';

const ResultItem = ({ result, index, refProp }) => {
  const [state, dispatch] = useContext(AppContext);

  return (
    <ListItem component="li" sx={{ p: 0 }} ref={refProp}>
      <Card
        onClick={() => {
          dispatch(setCoords(result.properties.lat, result.properties.lon));
          dispatch(setSelected(index));
          dispatch(setMap(true));
        }}
        sx={{ width: '100%' }}
      >
        <CardActionArea
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
          }}
        >
          {/* <CardMedia
            component="img"
            src={image}
            alt={result.properties.name}
            sx={{
              width: '200px',
              height: '130px',
              flexShrink: '0',
            }}
          /> */}

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
                  {result.properties.name}
                </Typography>
                {/* <Rating
                  readOnly
                  value={Math.floor(Number(result.properties.rating))}
                  precision={1}
                  icon={<StarIcon type="full" />}
                  emptyIcon={<StarIcon type="empty" />}
                /> */}
              </Box>
              <Typography component="p" color="#777" fontSize="15px">
                {result.properties.formatted}
              </Typography>
              {/* <Box display="flex">
                <img src={chefIcon} alt="Chef hat" />
                <Typography component="p">
                  {state.category === 'accommodation.hotel' &&
                    result.properties.categories[0]}
                  {state.category === 'catering' &&
                    result.properties.datasource.raw.cuisine}
                  {state.category === 'tourism.attraction' &&
                    result.properties.datasource.categories[0]}
                </Typography>
              </Box> */}
              <Link
                href={result.properties.datasource.raw.website}
                target="_blank"
                underline="always"
                rel="noreferrer"
                sx={{ mt: '30px', display: 'inline-block' }}
              >
                Visit their website
              </Link>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </ListItem>
  );
};

export default ResultItem;
