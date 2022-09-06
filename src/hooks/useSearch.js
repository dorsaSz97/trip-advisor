/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState, useContext } from 'react';
import axios from 'axios';

import AppContext from '../store/app-context';
import { setCoords, setBounds } from '../store/actionCreators';

const useSearch = () => {
  const [state, dispatch] = useContext(AppContext);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getCoords = useCallback(
    signal => {
      setIsLoading(true);
      setIsError(false);

      if (!state.searchedLocation) {
        return;
      }

      console.log('during fetch');

      const options = {
        method: 'GET',
        url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/forward',
        params: {
          city: state.searchedLocation.toLowerCase(),
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com',
        },
        signal: signal,
      };

      axios
        .request(options)
        .then(response => {
          // console.log(response.data[0]);
          setIsLoading(false);
          setIsError(false);

          dispatch(
            setCoords(
              Number(response.data[0].lat),
              Number(response.data[0].lon)
            )
          );
          dispatch(
            setBounds(
              response.data[0].boundingbox[0],
              response.data[0].boundingbox[1],
              response.data[0].boundingbox[2],
              response.data[0].boundingbox[3]
            )
          );
        })
        .catch(_ => {
          setIsLoading(false);
          setIsError('Fetching coords from FWREVERSE API went wrong');
        });
    },
    [state.searchedLocation]
  ); //dispatch method is ensured by react to not change on each render

  return { getCoords, isLoading, isError };
};

export default useSearch;
