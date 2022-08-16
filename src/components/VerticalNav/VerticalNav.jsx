import React, { useContext } from 'react';
import { Drawer, List } from '@mui/material';

import AppContext from '../../store/app-context';
import { setCategory } from '../../store/actionCreators';
import { NAV_LINKS } from '../../data/data';

import logoImg from '../../assets/logo.webp';

import styles from './VerticalNav.module.css';

const VerticalNav = () => {
  const [state, dispatch] = useContext(AppContext);

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
              onClick={() => dispatch(setCategory(link.category))}
            />
          );
        })}
      </List>
    </Drawer>
  );
};

export default VerticalNav;
