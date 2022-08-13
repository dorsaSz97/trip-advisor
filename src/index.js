import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
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
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppContextProvider>
    <BrowserRouter>
      <ThemeProvider theme={appTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </AppContextProvider>
);
