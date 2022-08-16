import React, { useContext } from 'react';
import { Grid } from '@mui/material';

import AppContext from '../../store/app-context';

import Map from '../Map';
import IntroForm from '../IntroForm';
import IntroImage from '../IntroImage';
import ResultsList from '../ResultsList';
import VerticalNav from '../VerticalNav/VerticalNav';

const Hero = () => {
  const [state] = useContext(AppContext);

  return (
    <>
      {!state.isSubmitted && (
        <Grid container width="100%" height="100vh">
          <Grid item md={6} position="relative" height="100%">
            <IntroForm />
          </Grid>
          <Grid item md={6} height="100%">
            <IntroImage />
          </Grid>
        </Grid>
      )}

      {state.isSubmitted && (
        <Grid container width="100%" height="100vh">
          <Grid
            item
            md={6}
            position="relative"
            height="100%"
            sx={{ display: 'flex' }}
          >
            <VerticalNav />
            <ResultsList />
          </Grid>
          <Grid item md={6} height="100%">
            <Map />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Hero;
