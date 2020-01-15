/**
 * @file _app.tsx
 * Override the main app component.
 */

import React from 'react';
import App from 'next/app';
import Link from 'next/link';
import grey from '@material-ui/core/colors/grey';
import {
  createStyles,
  Theme,
  ThemeProvider
} from '@material-ui/core/styles';
// Material Components
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  withStyles
} from '@material-ui/core';
// Material Icons
import MenuIcon from '@material-ui/icons/Menu';
// Theme
import { appTheme } from '@theme/App.theme';
// SVG
import Logo from '../assets/svg/tw-white.svg';

// Temp styles for placeholder app bar.
import { blue } from '@theme/colors';
const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      boxShadow: `inset 0 -3px 0 0 ${blue[400]}`
    },
    twLogo: {
      width: 'auto',
      height: theme.typography.pxToRem(28)
    },
    menuButton: {
      marginRight: theme.spacing(2),
      borderRadius: 0
    }
  });
type TwAppClassKey = 'appBar' | 'menuButton' | 'twLogo';
interface ITwAppProps {
  classes: Record<string, TwAppClassKey>;
}
// ...end placeholder app bar styles.

class TwApp extends App<ITwAppProps> {
  componentDidMount() {
    // Remove the server-side injected CSS.
    // Fix for https://github.com/mui-org/material-ui/issues/15073
    const jssStyles = document.querySelector('#jss-server-side');
    console.log(jssStyles);
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { classes, Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={appTheme}>
        <Box minHeight="100vh" display="flex" flexDirection="column">
          <AppBar className={classes.appBar} position="static">
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
          <Box flexGrow={1}>
            <Component {...pageProps} />
          </Box>
          <Box height={350} bgcolor={grey.A100} mt={3} />
        </Box>
        <CssBaseline />
      </ThemeProvider>
    );
  }
}

export default withStyles(styles, {})(TwApp);
