import { useState, useCallback, useContext } from 'react';
import axios from 'axios';

import AppContext from '../store/app-context';
import { setResults } from '../store/actionCreators';

const useResults = () => {
  const [state, dispatch] = useContext(AppContext);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // preventing this function to be recreated every time the state changes (only when the category/bounds does), that would cause a loop in the App file's useEffect
  const getResults = useCallback(
    signal => {
      setIsLoading(true);
      setIsError(false);
      console.log(state.resultsBounds);

      console.log('p1:', state.resultsBounds.p1);
      console.log('p2:', state.resultsBounds.p2);
      console.log('p3:', state.resultsBounds.p3);
      console.log('p4:', state.resultsBounds.p4);
      const isEmptyObject = Object.keys(state.resultsBounds).length === 0;

      if (isEmptyObject) {
        // state.resultsBounds is an empty object
        setIsError(true);
        setIsLoading(false); // Ensure isLoading is set to false when there's an error
        return;
      }

      // if (
      //   !state.resultsBounds.p1 ||
      //   !state.resultsBounds.p2 ||
      //   !state.resultsBounds.p3 ||
      //   !state.resultsBounds.p4
      // ) {
      //   console.log('here');
      //   setIsLoading(false);
      //   setIsError(true);
      //   return;
      // }

      const options = {
        method: 'GET',
        url: `https://api.geoapify.com/v2/places?categories=${state.category}&filter=rect:${state.resultsBounds.p3},${state.resultsBounds.p1},${state.resultsBounds.p4},${state.resultsBounds.p2}&apiKey=${process.env.REACT_APP_GEOAPIFY_KEY}`,
        signal: signal,
      };

      axios
        .request(options)
        .then(response => {
          const results = [...response.data.features];

          console.log(results);

          dispatch(setResults(results));

          setIsLoading(false);
          setIsError(false);
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
