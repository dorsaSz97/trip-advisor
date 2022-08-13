import React, { useContext } from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material';

import AppContext from '../../store/app-context';
import logoImg from '../../assets/logo.webp';

const navLinks = [
  { text: 'hotels', category: 'hotels' },
  { text: 'restaurants', category: 'restaurants' },
  { text: 'tourist sites', category: 'attractions' },
];

const HeaderBox = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
});

const Header = () => {
  const ctx = useContext(AppContext);

  return (
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
              style={{ width: '30px', height: '30px' }}
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
          <Box component="ul" display="flex" gap="20px">
            {navLinks.map((item, i) => (
              <li
                key={i}
                onClick={() => ctx.setCategory(item.category)}
                style={{
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                }}
              >
                {item.text}
              </li>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </HeaderBox>
  );
};

export default Header;
