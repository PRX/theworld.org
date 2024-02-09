/**
 * @file ContentLink.tsx
 * Component for links to content page.
 */

import type { RootState } from '@interfaces';
import React, { useEffect } from 'react';
import { useStore } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Toolbar,
  IconButton,
  NoSsr
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Logo from '@svg/tw-white.svg';
import { getUiDrawerOpen } from '@store/reducers';
import { AppHeaderNav } from './AppHeaderNav';
import { DrawerTopNav } from './DrawerTopNav';
import { DrawerMainNav } from './DrawerMainNav';
import { DrawerSearch } from './DrawerSearch';
import { DrawerSocialNav } from './DrawerSocialNav';
import { appHeaderStyles } from './AppHeader.styles';

export const AppHeader = () => {
  const store = useStore<RootState>();
  const state = store.getState();
  const open = getUiDrawerOpen(state) || false;
  const { classes } = appHeaderStyles();

  useEffect(() => {
    function handleRouteChangeComplete() {
      window.setTimeout(() => {
        store.dispatch({ type: 'UI_DRAWER_CLOSE' });
      }, 300);
    }

    Router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return function cleanup() {
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [store]);

  const handleDrawerOpen = () => () => {
    store.dispatch({ type: 'UI_DRAWER_OPEN' });
  };

  const handleDrawerClose = () => () => {
    store.dispatch({ type: 'UI_DRAWER_CLOSE' });
  };

  const handleSearchOpen = () => () => {
    store.dispatch({ type: 'SEARCH_OPEN' });
  };

  return (
    <>
      <AppBar className={classes.root} position="static" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <NoSsr>
            <IconButton
              edge="start"
              className={classes.menuButton}
              disableRipple
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen()}
            >
              <MenuIcon />
            </IconButton>
          </NoSsr>

          <Link href="/" aria-label="The World">
            <Logo className={classes.twLogo} />
          </Link>

          <div className={classes.grow} />

          {/* Subscribe Button */}

          {/* Header Nav */}
          <AppHeaderNav />

          {/* Search Button */}
          <NoSsr>
            <IconButton
              edge="end"
              className={classes.closeBtn}
              disableRipple
              color="inherit"
              aria-label="site search"
              onClick={handleSearchOpen()}
            >
              <SearchIcon />
            </IconButton>
          </NoSsr>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={handleDrawerClose()}>
        <Box
          width="100vw"
          height="100%"
          maxWidth="360px"
          minHeight="100vh"
          display="flex"
          flexDirection="column"
        >
          <Box display="flex" justifyContent="flex-end">
            <Button
              color="inherit"
              disableRipple
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

          <DrawerSearch />

          <DrawerTopNav />

          <Box flexGrow="1" bgcolor="background.default" p={2}>
            <DrawerMainNav />
          </Box>

          <DrawerSocialNav />
        </Box>
      </Drawer>
    </>
  );
};
