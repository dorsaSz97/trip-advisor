import { useContext } from 'react';
import { Box, Button, Drawer } from '@mui/material';

import AppContext from '../../store/app-context';
import { setCategory, setMap } from '../../store/actionCreators';
import { NAV_LINKS } from '../../data';

import logoImg from '../../assets/logo.webp';
import styles from './VerticalNav.module.css';

const VerticalNav = () => {
  const [state, dispatch] = useContext(AppContext);

  return (
    // navigation drawers (or "sidebars") can either be permanently on-screen or controlled by a navigation menu icon
    <Drawer variant="permanent" open={true} sx={{ width: '66px' }}>
      <Box
        component="nav"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          py: '6px',
        }}
      >
        <img src={logoImg} alt="Michelin logo" className={styles.logo} />

        {NAV_LINKS.map(link => {
          return (
            <img
              key={link.category}
              src={link.logo}
              alt={link.category}
              className={
                state.category !== link.category
                  ? styles.navIcon
                  : styles.navActive
              }
              onClick={() => {
                dispatch(setCategory(link.category));
                dispatch(setMap(false));
              }}
            />
          );
        })}
      </Box>

      <Button
        variant="text"
        onClick={() => dispatch(setMap(!state.isMap))}
        sx={{
          display: { md: 'none' },
          mt: 'auto',
          p: 2,
          textAlign: 'center',
          color: 'customBlue.main',
          fontWeight: 'bold',
        }}
      >
        Map
      </Button>
    </Drawer>
  );
};

export default VerticalNav;
