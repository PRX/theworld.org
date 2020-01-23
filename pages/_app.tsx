/**
 * @file _app.tsx
 * Override the main app component.
 */

import React from 'react';
import App, { AppContext, AppProps } from 'next/app';
import classNames from 'classnames/bind';
// Material Components
import {
  Box,
  CssBaseline
} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import {
  ThemeProvider
} from '@material-ui/core/styles';
// Theme
import { appTheme, appStyles } from '@theme/App.theme';
import AppHeader from '@components/AppHeader/AppHeader';
// API
import { fetchPriApiQueryMenu } from '@lib/fetch';
import { PriApiResource } from 'pri-api-library/types';
import parseMenu from '@lib/parse/menu';
// Contexts
import {default as TwAppContext} from '@contexts/AppContext';

interface TwAppProps extends AppProps {
  menus?: PriApiResource[]
}

interface TwAppState {
  javascriptDisabled: boolean
}

class TwApp extends App<TwAppProps, {}, TwAppState> {
  static async getInitialProps(ctx: AppContext) {

    const initialProps = await App.getInitialProps(ctx);

    // Fetch Menus
    const [
      drawerMainNav,
      drawerSocialnav,
      drawerTopNav,
      footerNav,
      headerNav
    ] = await Promise.all([
      fetchPriApiQueryMenu('menu-drawer-main-nav'),
      fetchPriApiQueryMenu('menu-drawer-social-nav'),
      fetchPriApiQueryMenu('menu-drawer-top-nav'),
      fetchPriApiQueryMenu('menu-footer-nav'),
      fetchPriApiQueryMenu('menu-header-nav')
    ])

    return {
      ...initialProps,
      menus: {
        drawerMainNav: parseMenu(drawerMainNav),
        drawerSocialnav: parseMenu(drawerSocialnav),
        drawerTopNav: parseMenu(drawerTopNav),
        footerNav: parseMenu(footerNav),
        headerNav: parseMenu(headerNav)
      }
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      javascriptDisabled: true
    };
  }

  componentDidMount() {
    // Flag javascript as enabled.
    this.setState({
      javascriptDisabled: false
    });

    // Remove the server-side injected CSS.
    // Fix for https://github.com/mui-org/material-ui/issues/15073
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, menus } = this.props;
    const { javascriptDisabled } = this.state;
    const cx = classNames.bind({
      noJs: 'no-js'
    });
    const appClasses = cx({
      noJs: javascriptDisabled
    });

    return (
      <ThemeProvider theme={appTheme}>
        <TwAppContext.Provider value={{ menus }}>
          <Box className={appClasses} minHeight="100vh" display="flex" flexDirection="column">
            <AppHeader/>
            <Box flexGrow={1}>
              <Component {...pageProps} />
            </Box>
            <Box height={350} bgcolor={grey.A100} mt={3} />
          </Box>
        </TwAppContext.Provider>
        <CssBaseline />
      </ThemeProvider>
    );
  }
}

export default TwApp;
