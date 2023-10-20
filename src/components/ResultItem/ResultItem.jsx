import { useContext } from 'react';
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

const ResultItem = ({ result, index, refProp }) => {
  const [, dispatch] = useContext(AppContext);

  return (
    <ListItem component="li" sx={{ p: 1 }} ref={refProp}>
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
            p: 1,
          }}
        >
          <CardContent>
            <Box>
              <Typography component="h3" fontSize="17px">
                {result.properties.name}
              </Typography>
            </Box>
            <Typography component="p" color="#777" fontSize="15px">
              {result.properties.formatted}
            </Typography>

            <Link
              href={result.properties.datasource.raw.website}
              target="_blank"
              underline="always"
              rel="noreferrer"
              sx={{ mt: '30px', display: 'inline-block' }}
            >
              Visit their website
            </Link>
          </CardContent>
        </CardActionArea>
      </Card>
    </ListItem>
  );
};

export default ResultItem;
