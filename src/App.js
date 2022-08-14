import React from 'react';
import Header from './components/Header';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import Hero from './components/Hero';
import useSearch from './hooks/useSearch';
import useResults from './hooks/useResults';

function App() {
  const { getCoords } = useSearch();
  const { getResults } = useResults();

  useEffect(() => {
    // TODO: abort the fetching
    getCoords();
  }, [getCoords]);

  useEffect(() => {
    // TODO: abort the fetching
    getResults();
  }, [getResults]);

  return (
    <>
      <CssBaseline />

      <Header />

      <Hero />
    </>
  );
}

export default App;
