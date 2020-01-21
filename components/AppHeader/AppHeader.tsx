/**
 * @file ContentLink.tsx
 * Component for links to content page.
 */

import React, { useContext } from 'react';
import Link from 'next/link';
// Material
import {
  Link as MuiLink,
  AppBar,
  Box,
  Drawer,
  Toolbar,
  IconButton,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { appHeaderStyles } from './AppHeader.styles';
// SVG
import Logo from '@svg/tw-white.svg';
// Contexts
import AppContext from '../../contexts/AppContext';

export default () => {
  const {
    menus: { headerNav }
  } = useContext(AppContext);
  const classes = appHeaderStyles({});
  const [state, setState] = React.useState({
    open: false
  });

  const handleDrawerOpen = () => () => {
    setState({ open: true });
  };

  const handleDrawerClose = () => () => {
    setState({ open: false });
  };

  return (
    <>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            disableRipple={true}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen()}
          >
            <MenuIcon />
          </IconButton>

          <Link href="/">
            <a href="/">
              <Logo className={classes.twLogo} title="The World" />
            </a>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer open={state.open} onClose={handleDrawerClose()}>
        <Box width="100vw" maxWidth="300px">
          <Typography variant="body1">Main Nav</Typography>
        </Box>
      </Drawer>
    </>
  );
};
