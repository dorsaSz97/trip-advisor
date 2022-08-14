import { useCallback, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import AppContext from '../store/app-context';
import { setCoords, setBounds } from '../store/actionCreators';

const useSearch = () => {
  const [state, dispatch] = useContext(AppContext);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getCoords = useCallback(() => {
    setIsLoading(true);

    if (state.searchedLocation.trim().length === 0) {
      console.log('entersth');
      setIsError('enter sth');
      return;
    }

    const options = {
      method: 'GET',
      url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/forward',
      params: {
        city: state.searchedLocation,
      },
      headers: {
        'X-RapidAPI-Key': 'a26de7b984msh26050a96285dd51p181f31jsn8eb4383ff23d',
        'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(response => {
        console.log(response.data);
        setIsLoading(false);
        setIsError(false);
        dispatch(setCoords(response.data[0].lat, response.data[0].lon));
        dispatch(
          setBounds(
            response.data[0].boundingbox[0],
            response.data[0].boundingbox[1],
            response.data[0].boundingbox[2],
            response.data[0].boundingbox[3]
          )
        );
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [state.searchedLocation]);

  return { getCoords, isLoading };
};

export default useSearch;
