/**
 * @file ContentLink.tsx
 * Component for links to content page.
 */

import React, { useContext } from 'react';
import Router from 'next/router';
// Material
import { Box, Button, ButtonGroup, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { mainMenuStyles } from './MainMenu.styles';
// Contexts
import AppContext from '@contexts/AppContext';
import parseMenu from '@lib/parse/menu';
import { IButton } from '@interfaces';
import { parse } from 'url';
import { Url } from 'url';

export default () => {
  const {
    menus: { drawerMainNav, drawerSocialNav, drawerTopNav }
  } = useContext(AppContext);
  const classes = mainMenuStyles({});
  const [state, setState] = React.useState({
    open: false
  });

  const handleButtonClick = (url: Url) => () =>
    Router.push({
      pathname: '/',
      query: {
        alias: url.pathname
      }
    }, url.pathname);

  return (
    <Box display="flex" flexDirection="column" height="100%">
      {/* Search Field */}

      {/* Top Nav */}
      {drawerTopNav && (
        <ButtonGroup
          className={classes.topNav}
          variant="contained"
          color="secondary"
          fullWidth={true}
          disableRipple={true}
        >
          {drawerTopNav.map(({ name, url, key }) => (
            <Button onClick={handleButtonClick(url)} key={key} disableRipple={true}>
              {name}
            </Button>
          ))}
        </ButtonGroup>
      )}

      {/* Main Nav */}
      <Box flexGrow="1" bgcolor="background.default">
        Main Nav
      </Box>

      {/* Social Nav */}
      <Box>Social Nav</Box>
    </Box>
  );
};
