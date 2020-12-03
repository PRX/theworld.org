/**
 * @file _app.tsx
 * Override the main app component.
 */

import React, { useEffect } from 'react';
import App, { AppContext as NextAppContext, AppProps } from 'next/app';
import { Box, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { IPriApiResource } from 'pri-api-library/types';
import { IButton } from '@interfaces/button';
import { ICtaMessage } from '@interfaces/cta';
import { AppContext } from '@contexts/AppContext';
import { AppCtaBanner } from '@components/AppCtaBanner';
import { AppCtaLoadUnder } from '@components/AppCtaLoadUnder';
import { AppHeader } from '@components/AppHeader';
import { AppFooter } from '@components/AppFooter';
import { postJsonPriApiCtaRegion } from '@lib/fetch';
import { fetchApiApp } from '@lib/fetch/api';
import { baseMuiTheme, appTheme } from '@theme/App.theme';
import { wrapper } from '@store';

interface TwAppProps extends AppProps {
  ctaRegions?: {
    banner?: ICtaMessage[];
    loadUnder?: ICtaMessage[];
  };
  latestStories?: IPriApiResource[];
  menus?: {
    [K: string]: IButton[];
  };
}

const TwApp = ({
  Component,
  ctaRegions,
  pageProps,
  menus,
  latestStories
}: TwAppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    // Fix for https://github.com/mui-org/material-ui/issues/15073
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={baseMuiTheme}>
      <ThemeProvider theme={appTheme}>
        <AppContext.Provider value={{ ctaRegions, latestStories, menus }}>
          <Box minHeight="100vh" display="flex" flexDirection="column">
            <AppCtaBanner />
            <AppHeader />
            <Box flexGrow={1}>
              <Component {...pageProps} />
            </Box>
            <AppFooter />
            <AppCtaLoadUnder />
          </Box>
        </AppContext.Provider>
        <CssBaseline />
      </ThemeProvider>
    </ThemeProvider>
  );
};

TwApp.getInitialProps = async (ctx: NextAppContext) => {
  const { req } = ctx.ctx;
  const initialProps = await App.getInitialProps(ctx);
  const {
    pageProps: { data: contentData }
  } = initialProps;
  const { context } = contentData || {};

  // Fetch App Data
  const data = await fetchApiApp(req);

  // Fetch CTA Messages
  const { subqueues: ctaRegions } = (await postJsonPriApiCtaRegion(
    'tw_cta_regions_site',
    {
      context
    }
  )) as IPriApiResource;
  const banner = ctaRegions.tw_cta_region_site_banner;
  const loadUnder = ctaRegions.tw_cta_region_site_load_under;

  console.log(initialProps);

  return {
    ...initialProps,
    ctaRegions: {
      ...(banner && { banner }),
      ...(loadUnder && { loadUnder })
    },
    ...data
  };
};

export default wrapper.withRedux(TwApp); // eslint-disable-line import/no-default-export
