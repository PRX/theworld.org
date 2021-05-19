/**
 * @file ContentLink.tsx
 * Component for links to content page.
 */

import React, { useEffect, useState } from 'react';
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
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames/bind';
import { ReactComponent as Logo } from '@svg/tw-white.svg';
import { AppHeaderNav } from './AppHeaderNav';
import { DrawerTopNav } from './DrawerTopNav';
import { DrawerMainNav } from './DrawerMainNav';
import { DrawerSocialNav } from './DrawerSocialNav';
import { appHeaderStyles } from './AppHeader.styles';

export const AppHeader = () => {
  const classes = appHeaderStyles({});
  const cx = classNames.bind(classes);
  const [{ open }, setState] = useState({ open: false });
  const setOpenState = (isOpen: boolean) =>
    setState({
      open: isOpen
    });

  useEffect(() => {
    function handleRouteChangeComplete() {
      window.setTimeout(() => {
        setOpenState(false);
      }, 300);
    }

    Router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return function cleanup() {
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  const handleDrawerOpen = () => () => {
    setOpenState(true);
  };

  const handleDrawerClose = () => () => {
    setOpenState(false);
  };

  return (
    <>
      <AppBar className={cx({ root: true })} position="static">
        <Toolbar>
          <NoSsr>
            <IconButton
              edge="start"
              className={cx('menuButton')}
              disableRipple
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen()}
            >
              <MenuIcon />
            </IconButton>
          </NoSsr>

          <Link href="/">
            <a href="/" aria-label="The World">
              <Logo className={cx({ twLogo: true })} />
            </a>
          </Link>

          <div className={cx('grow')} />

          {/* Subscribe Button */}

          {/* Header Nav */}
          <AppHeaderNav />
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
              className={cx({ closeBtn: true })}
              classes={{
                startIcon: cx({ closeBtnIcon: true })
              }}
            >
              Close
            </Button>
          </Box>

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
