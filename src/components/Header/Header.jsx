import { useContext, useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  Menu,
} from '@mui/material';
import { styled } from '@mui/material';

import AppContext from '../../store/app-context';
import { setCategory } from '../../store/actionCreators';

import logoImg from '../../assets/logo.webp';
import { NAV_LINKS } from '../../data';
import styles from './Header.module.css';

const HeaderBox = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
});

const Header = () => {
  const [state, dispatch] = useContext(AppContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {!state.isSubmitted && (
        <HeaderBox component="header" zIndex={1000}>
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
              <Box flex="1" display="flex" alignItems="center" gap="5px">
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
                fontWeight="bold"
                sx={{
                  listStyle: 'none',
                  gap: 3,
                  display: { xs: 'none', md: 'flex' },
                  // flexDirection: { xs: 'column', md: 'row' },
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
              <Button
                color="customBlack"
                onClick={handleClick}
                sx={{
                  display: { md: 'none', xs: 'flex' },
                }}
              >
                Categories
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                {NAV_LINKS.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      dispatch(setCategory(item.category));
                      handleClose();
                    }}
                  >
                    {item.text}
                  </MenuItem>
                ))}
              </Menu>
            </Toolbar>
          </AppBar>
        </HeaderBox>
      )}
    </>
  );
};

export default Header;
