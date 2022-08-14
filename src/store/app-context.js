import React, { useState } from 'react';

const AppContext = React.createContext({
  type: '',
  search: '',
  results: [],
  centerCoord: [],
  placeCoords: [],
  setCategory: type => {},
  setPlace: place => {},
  setRes: resArr => {},
  setCenter: (lat, lng) => {},
  setSearchCoords: (lat, lng) => {},
});

export const AppContextProvider = props => {
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [centerCoord, setCenterCoord] = useState([]);
  const [placeCoords, setPlaceCoords] = useState('');
  const setCategory = type => {
    setType(type);
  };
  const setPlace = place => {
    setSearch(place);
  };
  const setRes = resArr => {
    setResults([...resArr]);
  };
  const setCenter = (lat, lng) => {
    setCenterCoord([Number(lat), Number(lng)]);
  };
  const setSearchCoords = (lat, lng) => {
    setPlaceCoords([lat, lng]);
  };

  const contextState = {
    type,
    search,
    setCategory,
    setPlace,
    setRes,
    results,
    setCenter,
    centerCoord,
    setSearchCoords,
    placeCoords,
  };

  return (
    <AppContext.Provider value={contextState}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
