/**
 * @file _app.tsx
 * Override the main app component.
 */

import React from 'react';
import Link from 'next/link';
import grey from '@material-ui/core/colors/grey'
import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme,
  ThemeProvider
} from '@material-ui/core/styles';
// Material Components
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar
} from '@material-ui/core';
// Material Icons
import MenuIcon from '@material-ui/icons/Menu';
// SVG
import Logo from '../assets/svg/tw-white.svg';

// TODO: move this it own module.
const brandBlue = {
  100: '#E6F4F9',
  200: '#B3D9EF',
  300: '#75BBE1',
  400: '#3F94C6',
  500: '#0089BD',
  600: '#0072A3',
  700: '#004E75',
  800: '#003A57',
  900: '#002533'
};
const brandOrange = {
  100: '#FAEFE1',
  200: '#F8DEBA',
  300: '#FCCC88',
  400: '#FAB452',
  500: '#FF9600',
  600: '#D17A00',
  700: '#8A570F',
  800: '#5B3C10',
  900: '#2B1B08'
}
const headingStyles = {
  fontFamily:
    '"Montserrat","Source Sans Pro","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif',
  fontWeight: 700
};
const theme = createMuiTheme({
  palette: {
    primary: {
      main: brandBlue[600]
    },
    secondary: {
      main: brandOrange[500]
    }
  },
  typography: {
    fontFamily:
      '"Source Sans Pro","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif',
    caption: {
      fontSize: '0.9rem',
      lineHeight: '1.35rem'
    },
    h1: {
      ...headingStyles,
      color: brandBlue[900]
    },
    h2: {
      ...headingStyles
    },
    h3: {
      ...headingStyles
    },
    h4: {
      ...headingStyles
    },
    h5: {
      ...headingStyles
    },
    h6: {
      ...headingStyles
    }
  }
});
const useStyles = makeStyles((theme: Theme) => createStyles({
  appBar: {
    boxShadow: `inset 0 -3px 0 0 ${brandBlue[400]}`
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
      <Box minHeight='100vh' display="flex" flexDirection="column">
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
        <Box flexGrow={1}>
          <Component {...pageProps} />
        </Box>
        <Box height={350} bgcolor={grey.A100} mt={3}/>
      </Box>
      <CssBaseline />
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
