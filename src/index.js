import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material';

import { AppContextProvider } from './store/app-context';

import App from './App';

import './index.css';

// overwrite some styles
const appTheme = createTheme({
  palette: {
    customBlack: {
      main: '#29293E',
    },
    customBlue: {
      main: '#148BE9',
      dark: '#0e7ad1',
    },
    customRed: {
      main: '#EA526F',
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
