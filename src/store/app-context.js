import React, { useState } from 'react';

const AppContext = React.createContext({
  type: '',
  setCategory: type => {},
});

export const AppContextProvider = props => {
  const [type, setType] = useState('');

  const setCategory = type => {
    setType(type);
  };

  const contextState = {
    type,
    setCategory,
  };

  return (
    <AppContext.Provider value={contextState}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
