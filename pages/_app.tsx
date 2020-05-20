/**
 * @file _app.tsx
 * Override the main app component.
 */

import React from 'react';
import App, { AppContext as NextAppContext, AppProps } from 'next/app';
import classNames from 'classnames/bind';
import { Box, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { PriApiResource, IPriApiResource } from 'pri-api-library/types';
import { ILink } from '@interfaces/link';
import { parseMenu } from '@lib/parse/menu';
import { AppContext } from '@contexts/AppContext';
import { AppCtaBanner } from '@components/AppCtaBanner';
import { AppHeader } from '@components/AppHeader';
import { AppFooter } from '@components/AppFooter';
import {
  fetchPriApiQuery,
  fetchPriApiQueryMenu,
  postJsonPriApiCtaRegion
} from '@lib/fetch';
import { baseMuiTheme, appTheme } from '@theme/App.theme';

interface TwAppProps extends AppProps {
  ctaRegions?: {
    [K: string]: PriApiResource[];
  };
  latestStories?: PriApiResource[];
  menus?: {
    [K: string]: PriApiResource[];
  };
}

interface TwAppState {
  javascriptDisabled: boolean;
}

class TwApp extends App<TwAppProps, {}, TwAppState> {
  static async getInitialProps(ctx: NextAppContext) {
    const initialProps = await App.getInitialProps(ctx);
    const {
      pageProps: {
        data: { context }
      }
    } = initialProps;

    // Fetch Menus
    const [
      drawerMainNav,
      drawerSocialNav,
      drawerTopNav,
      footerNav,
      headerNav,
      latestStories
    ] = await Promise.all([
      fetchPriApiQueryMenu('menu-drawer-main-nav'),
      fetchPriApiQueryMenu('menu-drawer-social-nav'),
      fetchPriApiQueryMenu('menu-drawer-top-nav'),
      fetchPriApiQueryMenu('menu-footer'),
      fetchPriApiQueryMenu('menu-header-nav'),
      fetchPriApiQuery('node--stories', {
        'filter[status]': 1,
        sort: '-date_published',
        range: 10
      })
    ]);

    // Fetch CTA Messages
    const { subqueues: ctaRegions } = (await postJsonPriApiCtaRegion(
      'tw_cta_regions_site',
      {
        context
      }
    )) as IPriApiResource;

    return {
      ...initialProps,
      ctaRegions: {
        banner: ctaRegions.tw_cta_region_site_banner,
        loadUnder: ctaRegions.tw_cta_region_site_load_under
      },
      latestStories,
      menus: {
        drawerMainNav: parseMenu(drawerMainNav as ILink[]),
        drawerSocialNav: parseMenu(drawerSocialNav as ILink[]),
        drawerTopNav: parseMenu(drawerTopNav as ILink[]),
        footerNav: parseMenu(footerNav as ILink[]),
        headerNav: parseMenu(headerNav as ILink[])
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
    const {
      Component,
      ctaRegions,
      pageProps,
      menus,
      latestStories
    } = this.props;
    const { javascriptDisabled } = this.state;
    const cx = classNames.bind({
      noJs: 'no-js'
    });
    const appClasses = cx({
      noJs: javascriptDisabled
    });
    const copyrightDate = new Date().getFullYear();
    const appContextValue = { ctaRegions, latestStories, menus, copyrightDate };

    return (
      <ThemeProvider theme={baseMuiTheme}>
        <ThemeProvider theme={appTheme}>
          <AppContext.Provider value={appContextValue}>
            <Box
              className={appClasses}
              minHeight="100vh"
              display="flex"
              flexDirection="column"
            >
              <AppCtaBanner />
              <AppHeader />
              <Box flexGrow={1}>
                <Component {...pageProps} />
              </Box>
              <AppFooter />
              {/* <AppCtaLoadUnder /> */}
            </Box>
          </AppContext.Provider>
          <CssBaseline />
        </ThemeProvider>
      </ThemeProvider>
    );
  }
}

export default TwApp; // eslint-disable-line import/no-default-export
