/**
 * @file _app.tsx
 * Override the main app component.
 */

import React from 'react';
import App, { AppContext as NextAppContext, AppProps } from 'next/app';
import classNames from 'classnames/bind';
// Material Components
import {
  Box,
  CssBaseline
} from '@material-ui/core';
import {
  ThemeProvider
} from '@material-ui/core/styles';
// Theme
import { appTheme } from '@theme/App.theme';
import { AppHeader } from '@components/AppHeader';
import { AppFooter } from '@components/AppFooter';
// API
import { PriApiResource } from 'pri-api-library/types';
import { fetchPriApiQueryMenu } from '@lib/fetch';
import { parseMenu } from '@lib/parse/menu';
// Contexts
import { AppContext } from '@contexts/AppContext';

interface TwAppProps extends AppProps {
  menus?: PriApiResource[];
}

interface TwAppState {
  javascriptDisabled: boolean;
}

class TwApp extends App<TwAppProps, {}, TwAppState> {
  static async getInitialProps(ctx: NextAppContext) {
    const initialProps = await App.getInitialProps(ctx);

    // Fetch Menus
    const [
      drawerMainNav,
      drawerSocialNav,
      drawerTopNav,
      footerNav,
      headerNav
    ] = await Promise.all([
      fetchPriApiQueryMenu('menu-drawer-main-nav'),
      fetchPriApiQueryMenu('menu-drawer-social-nav'),
      fetchPriApiQueryMenu('menu-drawer-top-nav'),
      fetchPriApiQueryMenu('menu-footer'),
      fetchPriApiQueryMenu('menu-header-nav')
    ]);

    return {
      ...initialProps,
      menus: {
        drawerMainNav: parseMenu(drawerMainNav),
        drawerSocialNav: parseMenu(drawerSocialNav),
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
    const copyrightDate = (new Date()).getFullYear();

    return (
      <ThemeProvider theme={appTheme}>
        <AppContext.Provider value={{ menus, copyrightDate }}>
          <Box className={appClasses} minHeight="100vh" display="flex" flexDirection="column">
            <AppHeader/>
            <Box flexGrow={1}>
              <Component {...pageProps} />
            </Box>
            <AppFooter />
          </Box>
        </AppContext.Provider>
        <CssBaseline />
      </ThemeProvider>
    );
  }
}

export default TwApp; // eslint-disable-line import/no-default-export
