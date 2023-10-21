import { useContext, useState } from 'react';
import {
  styled,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  Menu,
} from '@mui/material';

import AppContext from '../../store/app-context';
import { setCategory } from '../../store/actionCreators';

import logoImg from '../../assets/logo.webp';
import { NAV_LINKS } from '../../data';
import styles from './Header.module.css';

// 1
const HeaderBox = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 10000,
});

const Header = () => {
  const [state, dispatch] = useContext(AppContext);

  return (
    <>
      {!state.isSubmitted && (
        <HeaderBox component="header">
          {/* displays information and actions relating to the current screen for branding (nav + logo) */}
          <AppBar
            component="nav"
            // 2
            sx={{
              backgroundColor: 'transparent',
              color: 'customBlack.main',
              boxShadow: 'none',
            }}
          >
            {/* flex container */}
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              {/* div wrapper that can have all the styles added to it directly */}
              <Box
                // 3
                display="flex"
                alignItems="center"
                gap="5px"
              >
                <img
                  src={logoImg}
                  alt="Michelin logo"
                  className={styles.logo}
                />
                {/* span element that standardizes the text but can be other components as well*/}
                <Typography
                  component="h1"
                  fontSize="1.5rem"
                  fontWeight="bold"
                  fontStyle="italic"
                >
                  MICHELIN
                </Typography>
              </Box>

              <DesktopMenu />
              <MobileMenu />
            </Toolbar>
          </AppBar>
        </HeaderBox>
      )}
    </>
  );
};

export default Header;

const MobileMenu = () => {
  const [, dispatch] = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        sx={{
          color: 'customBlue.main',
          fontWeight: 'bold',
          display: { md: 'none', xs: 'flex' },
        }}
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        Categories
      </Button>

      <Menu
        open={open} // if true, the menu opens
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl} // the menu's position is related to this el
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          zIndex: 1000000,
        }}
      >
        {NAV_LINKS.map((item, index) => (
          <MenuItem
            key={index}
            onClick={e => {
              dispatch(setCategory(item.category));
              setAnchorEl(e.currentTarget);
            }}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const DesktopMenu = () => {
  const [, dispatch] = useContext(AppContext);
  return (
    <Box
      component="ul"
      sx={{
        listStyle: 'none',
        display: { xs: 'none', md: 'flex' },
        gap: 3,
      }}
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
  );
};
