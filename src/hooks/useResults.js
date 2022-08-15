import { useContext, useCallback, useState } from 'react';
import axios from 'axios';

import AppContext from '../store/app-context';
import { setResults } from '../store/actionCreators';

const useResults = () => {
  const [state, dispatch] = useContext(AppContext);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getResults = useCallback(
    signal => {
      setIsLoading(true);
      setIsError(false);

      if (
        !state.resultsBounds.p1 ||
        !state.resultsBounds.p2 ||
        !state.resultsBounds.p3 ||
        !state.resultsBounds.p4
      ) {
        return;
      }

      const options = {
        method: 'GET',
        url: `https://travel-advisor.p.rapidapi.com/${state.category}/list-in-boundary`,
        params: {
          bl_latitude: state.resultsBounds.p1,
          tr_latitude: state.resultsBounds.p2,
          bl_longitude: state.resultsBounds.p3,
          tr_longitude: state.resultsBounds.p4,
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
        signal: signal,
      };

      axios
        .request(options)
        .then(response => {
          console.log(response.data.data);
          setIsLoading(false);
          setIsError(false);

          dispatch(setResults([...response.data.data]));
        })
        .catch(_ => {
          setIsLoading(false);
          setIsError('Fetching results from TRIPADVISOR API went wrong');
        });
    },
    [state.resultsBounds, state.category]
  );

  return { getResults, isLoading, isError };
};

export default useResults;
