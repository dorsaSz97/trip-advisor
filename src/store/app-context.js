import { createContext, useReducer } from 'react';

import initialAppState from './app-state';
import appReducer from './app-reducer';

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
