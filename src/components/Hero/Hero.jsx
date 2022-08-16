import React, { useContext } from 'react';
import { Grid } from '@mui/material';

import AppContext from '../../store/app-context';

import Map from '../Map';
import IntroForm from '../IntroForm';
import IntroImage from '../IntroImage';
import ResultsList from '../ResultsList';

const Hero = () => {
  const [state] = useContext(AppContext);

  return (
    <Grid container width="100%" height="100vh">
      {!state.isSubmitted && (
        <Grid item md={6} position="relative" height="100%">
          <IntroForm />
        </Grid>
      )}

      {state.isSubmitted && (
        <Grid item md={6} position="relative" height="100%">
          <ResultsList />
        </Grid>
      )}

      {/* DONE */}
      <Grid item md={6} height="100%">
        {!state.isSubmitted && <IntroImage />}

        {state.isSubmitted && <Map />}
      </Grid>
    </Grid>
  );
};

export default Hero;
