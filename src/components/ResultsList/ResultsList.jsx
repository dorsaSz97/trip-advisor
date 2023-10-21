import React, { useContext, useEffect, useState, createRef } from 'react';
import { Box, List, Typography } from '@mui/material';

import AppContext from '../../store/app-context';
import { MAX_ITEMS } from '../../data';

import SearchForm from '../SearchForm';
import ResultItem from '../ResultItem';
import ItemSkeleton from '../ItemSkeleton';

const ResultsList = () => {
  const [state] = useContext(AppContext);

  // TODO:why cant i use the isloading and iserror in the hooks
  const isError =
    !state.resultsBounds.p1 ||
    !state.resultsBounds.p2 ||
    !state.resultsBounds.p3 ||
    !state.resultsBounds.p4;

  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    // create ref for each result item
    const refs = Array(state.results.length)
      .fill()
      .map((_, index) => elRefs[index] || createRef()); // create new ones for the first time and keep them for the rest of the renders (we want to have access to each li DOM element)

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

  return (
    <Box
      sx={{
        flex: { md: 1 },
        display: { md: 'flex', xs: `${!state.isMap ? 'flex' : 'none'}` },
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <Box
        mx="auto"
        display="flex"
        flexDirection="column"
        gap="50px"
        height="100%"
        width="100%"
        padding={'3rem'}
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
          {state.results.length === 0 &&
            !isError &&
            Array(MAX_ITEMS)
              .fill() // filed with undefined
              .map((_, index) => {
                return <ItemSkeleton key={index} />;
              })}
          {state.results.length !== 0 &&
            isError &&
            state.results.map((result, index) => {
              return (
                <ResultItem
                  key={index} // items arent gonna be deleted so this is fine for now
                  index={index}
                  refProp={elRefs[index]}
                  result={result}
                />
              );
            })}
          {state.results.length === 0 && isError && (
            <Typography
              component="p"
              variant="body1"
              color="customRed.main"
              sx={{ textAlign: 'center' }}
            >
              Nothing found
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default ResultsList;
