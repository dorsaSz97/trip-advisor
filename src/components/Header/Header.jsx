import React, { useContext } from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material';

import AppContext from '../../store/app-context';
import { setCategory } from '../../store/actionCreators';

import logoImg from '../../assets/logo.webp';
import { NAV_LINKS } from '../../data/data';

import styles from './Header.module.css';

const HeaderBox = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
});

const Header = () => {
  const [state, dispatch] = useContext(AppContext);

  return (
    <>
      {!state.isSubmitted && (
        <HeaderBox component="header">
          <AppBar
            component="nav"
            sx={{
              position: 'static',
              backgroundColor: 'transparent',
              color: 'customBlack.main',
              boxShadow: 'none',
            }}
          >
            <Toolbar>
              <Box flexGrow="1" display="flex" alignItems="center" gap="5px">
                <img
                  src={logoImg}
                  alt="Michelin logo"
                  className={styles.logo}
                />
                <Typography
                  component="h1"
                  fontSize="1.5rem"
                  fontWeight="bold"
                  fontStyle="italic"
                >
                  MICHELIN
                </Typography>
              </Box>
              <Box
                component="ul"
                display="flex"
                fontWeight="bold"
                sx={{ listStyle: 'none', gap: 3 }}
              >
                {NAV_LINKS.map((item, index) => (
                  <li
                    key={index}
                    className={styles.navLink}
                    onClick={() => dispatch(setCategory(item.category))}
                  >
                    {item.text}
                  </li>
                ))}
              </Box>
            </Toolbar>
          </AppBar>
        </HeaderBox>
      )}
    </>
  );
};

export default Header;
