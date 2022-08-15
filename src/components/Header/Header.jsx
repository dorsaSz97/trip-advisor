import React, { useContext } from 'react';
import { Box, AppBar, Toolbar, Typography, List, Drawer } from '@mui/material';
import { styled } from '@mui/material';

import AppContext from '../../store/app-context';
import { setCategory } from '../../store/actionCreators';
import useResults from '../../hooks/useResults';

import hotelImg from '../../assets/home.svg';
import restaurantImg from '../../assets/cutlery.svg';
import attractionImg from '../../assets/pin.svg';
import logoImg from '../../assets/logo.webp';

const navLinks = [
  { text: 'hotels', category: 'hotels', logo: hotelImg },
  { text: 'restaurants', category: 'restaurants', logo: restaurantImg },
  { text: 'tourist sites', category: 'attractions', logo: attractionImg },
];

const HeaderBox = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
});

const Header = ({ isSubmitted }) => {
  const [state, dispatch] = useContext(AppContext);
  const { getResults, isError, isLoading } = useResults();

  return (
    <>
      {!isSubmitted && (
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
              <Box
                component="ul"
                display="flex"
                sx={{ gap: 3, listStyle: 'none', fontWeight: 'bold' }}
              >
                {navLinks.map((item, i) => (
                  <li
                    key={i}
                    onClick={() => dispatch(setCategory(item.category))}
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
      )}

      {isSubmitted && (
        <Drawer variant="permanent" open={false}>
          <List
            component="nav"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '40px',
            }}
          >
            <img
              src={logoImg}
              alt="Michelin logo"
              style={{ width: '50px', height: '50px' }}
            />
            {navLinks.map(link => {
              return (
                <img
                  key={link.category}
                  src={link.logo}
                  alt={link.category}
                  style={{
                    cursor: 'pointer',
                    paddingInline: '1.2rem',
                    paddingBlock: '0.8rem',
                    border: '5px solid transparent',
                    borderRightColor: `${
                      state.category === link.category
                        ? '#148BE9'
                        : 'transparent'
                    }`,
                  }}
                  onClick={() => {
                    dispatch(setCategory(link.category));
                    console.log(state.category);
                  }}
                />
              );
            })}
          </List>
        </Drawer>
      )}
    </>
  );
};

export default Header;
