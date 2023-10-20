import { useCallback, useState, useContext } from 'react';
import axios from 'axios';

import AppContext from '../store/app-context';
import { setCoords, setBounds, setSubmit } from '../store/actionCreators';

const useSearch = () => {
  const [state, dispatch] = useContext(AppContext);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // preventing this function to be recreated every time the state changes (only when the search term does), that would cause a loop in the App file's useEffect
  const getCoords = useCallback(
    signal => {
      setIsLoading(true);
      setIsError(false);

      if (!state.searchedLocation) {
        return;
      }
      const options = {
        method: 'GET',
        url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/forward',
        params: {
          city: state.searchedLocation.toLowerCase().trim(),
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com',
        },
        signal,
      };

      axios
        .request(options)
        .then(response => {
          setIsLoading(false);
          setIsError(false);

          const result = response.data[0];

          dispatch(setCoords(Number(result.lat), Number(result.lon)));

          dispatch(
            setBounds(
              result.boundingbox[0],
              result.boundingbox[1],
              result.boundingbox[2],
              result.boundingbox[3]
            )
          );
        })
        .catch(_ => {
          setIsLoading(false);
          setIsError('Fetching coords from FWREVERSE API went wrong');

          alert('Couldnt get any information! Try again...');
          dispatch(setSubmit(false));
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.searchedLocation]
  ); //dispatch method is ensured by react to not change on each render

  return { getCoords, isLoading, isError };
};

export default useSearch;
