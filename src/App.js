import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material';

import useSearch from './hooks/useSearch';
import useResults from './hooks/useResults';

import Header from './components/Header';
import Hero from './components/Hero';

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    getCoords,
    isError: searchError,
    isLoading: isSearchLoading,
  } = useSearch();
  const { getResults } = useResults();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    console.log('before fetch');
    getCoords(signal);
    console.log('after fetch');
    return () => controller.abort();
  }, [getCoords]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getResults(signal);

    return () => controller.abort();
  }, [getResults]);

  const setClickStatus = status => {
    setIsSubmitted(status);
  };

  return (
    <>
      {/* normalize some style properties */}
      <CssBaseline />

      <Header isSubmitted={isSubmitted} />

      <Hero setClickStatus={setClickStatus} />
    </>
  );
}

export default App;
