/**
 * @file ContentLink.tsx
 * Component for links to content page.
 */

import React from 'react';
import Link from 'next/link';
import { Link as MuiLink, AppBar, Toolbar, IconButton } from '@material-ui/core';
// Material Icons
import MenuIcon from '@material-ui/icons/Menu';
import { appHeaderStyles } from './AppHeader.styles';
// SVG
import Logo from '@svg/tw-white.svg';

export default () => {
  const classes = appHeaderStyles({});

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          disableRipple={true}
          color="inherit"
          aria-label="menu"
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
  );
};
