import { useState, useCallback, useContext } from 'react';
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
        url: `https://api.geoapify.com/v2/places?categories=${state.category}&filter=rect:${state.resultsBounds.p3},${state.resultsBounds.p1},${state.resultsBounds.p4},${state.resultsBounds.p2}&apiKey=${process.env.REACT_APP_GEOAPIFY_KEY}`,
        signal: signal,
      };

      axios
        .request(options)
        .then(response => {
          setIsLoading(false);
          setIsError(false);

          const results = [...response.data.features];

          dispatch(setResults(results));
        })
        .catch(_ => {
          setIsLoading(false);
          setIsError('Fetching results from GEOAPIFY went wrong');
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.resultsBounds, state.category]
  );

  return { getResults, isLoading, isError };
};

export default useResults;
