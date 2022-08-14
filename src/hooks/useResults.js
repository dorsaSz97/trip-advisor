import { useCallback, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import AppContext from '../store/app-context';
import { setCoords, setResults } from '../store/actionCreators';

const useResults = () => {
  const [state, dispatch] = useContext(AppContext);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getResults = useCallback(() => {
    setIsLoading(true);

    console.log(state.resultsBounds);
    if (
      !state.resultsBounds.p1 ||
      !state.resultsBounds.p2 ||
      !state.resultsBounds.p3 ||
      !state.resultsBounds.p4
    ) {
      console.log('bounds not found');
      return;
    }

    const options = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
      params: {
        bl_latitude: state.resultsBounds.p1,
        tr_latitude: state.resultsBounds.p2,
        bl_longitude: state.resultsBounds.p3,
        tr_longitude: state.resultsBounds.p4,
      },
      headers: {
        'X-RapidAPI-Key': 'a26de7b984msh26050a96285dd51p181f31jsn8eb4383ff23d',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(response => {
        setIsLoading(false);
        setIsError(false);
        dispatch(setResults([...response.data.data]));
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [state.resultsBounds]);

  return { getResults, isLoading };
};

export default useResults;
