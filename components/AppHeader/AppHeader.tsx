/**
 * @file ContentLink.tsx
 * Component for links to content page.
 */

import React, { useContext } from 'react';
import Link from 'next/link';
import { IButton } from '@interfaces';
import parseMenu from '@lib/parse/menu';
import MainMenu from '@components/MainMenu/MainMenu';
// Material and Theme
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Toolbar,
  IconButton,
  Typography
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import { appHeaderStyles } from './AppHeader.styles';
// SVG
import Logo from '@svg/tw-white.svg';
// Contexts
import AppContext from '@contexts/AppContext';

export default () => {
  const {
    menus: { headerNav }
  } = useContext(AppContext);
  const classes = appHeaderStyles({});
  const [state, setState] = React.useState({
    open: true
  });

  const handleDrawerOpen = () => () => {
    setState({ open: true });
  };

  const handleDrawerClose = () => () => {
    setState({ open: false });
  };

  const renderButton = (button: IButton) => {
    return <div>Button</div>;
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

          {/* Subscribe Button */}

          {/* Header Nav */}
        </Toolbar>
      </AppBar>
      <Drawer open={state.open} onClose={handleDrawerClose()}>
        <Box
          width="100vw"
          height="100%"
          maxWidth="360px"
          minHeight="100vh"
          display="flex"
          flexDirection="column"
          bgcolor="primary.main"
        >
          <Box display="flex" justifyContent="flex-end">
            <Button
              disableRipple={true}
              startIcon={<ChevronLeftIcon />}
              onClick={handleDrawerClose()}
              className={classes.closeBtn}
              classes={{
                startIcon: classes.closeBtnIcon
              }}
            >
              Close
            </Button>
          </Box>

          <Box flexGrow="1">
            <MainMenu/>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
