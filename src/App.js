import { useEffect } from 'react';
import { CssBaseline } from '@mui/material';

import useSearch from './hooks/useSearch';
import useResults from './hooks/useResults';

import Header from './components/Header';
import Hero from './components/Hero';

function App() {
  const { getCoords } = useSearch();
  const { getResults } = useResults();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getCoords(signal);

    return () => controller.abort();
  }, [getCoords]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getResults(signal);

    // stops the fetching when the component unmounts(removed) or before the useEffect happens for the next time (readded)
    // also, sometimes we request multiple fetches and because its a game of who is faster, the right result might not show up (all fetches stop after a result is shown) => we stop the previous one first
    return () => controller.abort();
  }, [getResults]);

  return (
    <>
      {/* normalize some style properties */}
      <CssBaseline />

      <Header />

      <Hero />
    </>
  );
}

export default App;
