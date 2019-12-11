/**
 * @file _app.tsx
 * Override the main app component.
 */

import React from 'react';
import Link from 'next/link';
import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme,
  ThemeProvider
} from '@material-ui/core/styles';
// Material Components
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
// Material Icons
import MenuIcon from '@material-ui/icons/Menu';
// SVG
import Logo from '../assets/svg/tw-white.svg';

// TODO: move this it own module.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#37729D'
    }
  }
});

console.log(theme.typography);

const useStyles = makeStyles((theme: Theme) => createStyles({
  appBar: {
    boxShadow: 'inset 0 -3px 0 0 #0388BB'
  },
  twLogo: {
    width: 'auto',
    height: theme.typography.pxToRem(28)
  },
  menuButton: {
    marginRight: theme.spacing(2),
    borderRadius: 0
  }
}));

const TwApp = (props) => {
  const classes = useStyles({});
  const { Component, pageProps } = props;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <IconButton  edge="start" className={ classes.menuButton} disableRipple={true} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Link href="/">
            <a href="/">
              <Logo className={classes.twLogo} title="The World"/>
            </a>
          </Link>
        </Toolbar>
      </AppBar>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

TwApp.componentDidMount = () => {
  // Remove the server-side injected CSS.
  // Fix for https://github.com/mui-org/material-ui/issues/15073
  const jssStyles = document.querySelector('#jss-server-side');
  if (jssStyles) {
    jssStyles.parentElement.removeChild(jssStyles);
  }
}

export default TwApp;
