import React, { useContext } from 'react';
import { Button, Drawer, List, Typography } from '@mui/material';

import AppContext from '../../store/app-context';
import { setCategory, setMap } from '../../store/actionCreators';
import { NAV_LINKS } from '../../data';

import logoImg from '../../assets/logo.webp';

import styles from './VerticalNav.module.css';

const VerticalNav = () => {
  const [state, dispatch] = useContext(AppContext);
  console.log(state.isMap);

  return (
    <Drawer variant="permanent" open={false} sx={{ width: '66px' }}>
      <List
        component="nav"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
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
      </List>
      <Button
        color="customBlue"
        onClick={() => dispatch(setMap(!state.isMap))}
        variant="text"
        sx={{ mt: 'auto', textAlign: 'center', p: 2, display: { md: 'none' } }}
      >
        Map
      </Button>
    </Drawer>
  );
};

export default VerticalNav;
