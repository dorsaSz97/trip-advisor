import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material';

import App from './App';

import { AppContextProvider } from './store/app-context';

import './index.css';

const appTheme = createTheme({
  palette: {
    customBlack: {
      main: '#29293E',
    },
    customBlue: {
      main: '#148BE9',
      dark: '#0e7ad1',
    },
    text: {
      primary: '#29293E',
    },
  },
  typography: {
    h2: {
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppContextProvider>
    <ThemeProvider theme={appTheme}>
      <App />
    </ThemeProvider>
  </AppContextProvider>
);
