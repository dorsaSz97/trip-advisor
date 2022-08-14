import React, { createContext, useReducer } from 'react';
import { initialAppState } from './app-state';
import { appReducer } from './app-reducer';

// {
//   type: '',
//   setType: type => {},

//   searchedLocation: '',
//   setSearchedLocation: location => {},

//   searchedCoords: {},
//   setSearchedCoords: (lat, lng) => {},

//   results: [],
//   setResults: results => {},

//   resultsBounds: {},
//   setResultsBounds: (p1, p2, p3, p4) => {},

//   centerCoord: [],
//   placeCoords: [],
//   setPlace: place => {},
//   setCenter: (lat, lng) => {},
//   setSearchCoords: (lat, lng) => {},
// }

const AppContext = createContext(initialAppState);

export const AppContextProvider = props => {
  const [state, dispatch] = useReducer(appReducer, { ...initialAppState });

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
