import React, { useContext, useEffect, useState, createRef } from 'react';
import { Box, List } from '@mui/material';

import AppContext from '../../store/app-context';
import { MAX_ITEMS } from '../../data/data';

import SearchForm from '../SearchForm';
import ResultItem from '../ResultItem';
import ItemSkeleton from '../ItemSkeleton';

const ResultsList = () => {
  const [state] = useContext(AppContext);

  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    // create ref for each result item
    const refs = Array(state.results.length)
      .fill()
      .map((_, index) => elRefs[index] || createRef()); // create new ones for the first time and keep them for the rest of the renders

    setElRefs(refs);
  }, [state.results]);

  useEffect(() => {
    elRefs[0]?.current?.scrollIntoView({
      behavior: 'smooth',
    });
    if (state.selectedResult) {
      elRefs[state.selectedResult]?.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [state.selectedResult, elRefs]);

  // useEffect(() => {
  //   getResults();
  // }, [getResults]);

  return (
    <Box flex="1" height="100%" overflow="hidden">
      <Box
        mx="auto"
        display="flex"
        flexDirection="column"
        gap="50px"
        height="100%"
        width="100%"
        sx={{ p: 4 }}
      >
        <SearchForm />

        <List
          component="ul"
          sx={{
            overflow: 'scroll',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
          }}
        >
          {state.results.length === 0
            ? Array(MAX_ITEMS)
                .fill()
                .map((_, index) => {
                  return <ItemSkeleton key={index} />;
                })
            : state.results.map((result, index) => {
                return (
                  <ResultItem
                    key={index} // items arent gonna be deleted so this is fine for now
                    index={index}
                    refProp={elRefs[index]}
                    result={result}
                  />
                );
              })}
        </List>
      </Box>
    </Box>
  );
};

export default ResultsList;
