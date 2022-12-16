/**
 * @file _app.tsx
 * Override the main app component.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useStore } from 'react-redux';
import { AppProps } from 'next/app';
import PlausibleProvider from 'next-plausible';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { analytics } from '@config';
import { AppCtaBanner } from '@components/AppCtaBanner';
import { AppCtaLoadUnder } from '@components/AppCtaLoadUnder';
import { AppFooter } from '@components/AppFooter';
import { AppHeader } from '@components/AppHeader';
import { AppLoadingBar } from '@components/AppLoadingBar';
import { AppSearch } from '@components/AppSearch';
import { AppContext } from '@contexts/AppContext';
import { SocialShareMenu } from '@components/SocialShareMenu';
import { baseMuiTheme, appTheme, useAppStyles } from '@theme/App.theme';
import { wrapper } from '@store';
import { Player } from '@components/Player';
import { AppPlayer } from '@components/AppPlayer/AppPlayer';
import { getUiPlayerOpen, getUiPlayerPlaylistOpen } from '@store/reducers';
import { Playlist } from '@components/Player/components';
import createEmotionCache from '@lib/generate/cache/emotion/createEmotionCache';
import '@theme/css/fonts.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const AppLayout = ({ children }) => {
  const rootRef = useRef<HTMLDivElement>();
  const uiFooterRef = useRef<HTMLDivElement>();
  const store = useStore();
  const [state, setState] = useState(store.getState());
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const playerOpen = getUiPlayerOpen(state);
  const playlistOpen = getUiPlayerPlaylistOpen(state);
  const { classes } = useAppStyles({ playerOpen, playlistOpen });

  useEffect(() => {
    const uiFooterRect = uiFooterRef.current?.getBoundingClientRect();
    const footerPadding = uiFooterRect?.height || 0;

    rootRef.current?.style.setProperty(
      '--footer-padding',
      `${footerPadding}px`
    );
  }, [playerOpen]);

  useEffect(() => () => {
    unsub();
  });

  return (
    <div ref={rootRef} className={classes.root}>
      <div
        {...(playlistOpen && {
          inert: 'inert'
        })}
      >
        <AppLoadingBar />
        <AppCtaBanner />
        <AppHeader />
      </div>
      <div
        className={classes.content}
        {...(playlistOpen && {
          inert: 'inert'
        })}
      >
        {children}
      </div>
      <AppFooter />
      <div ref={uiFooterRef} className={classes.uiFooter}>
        <div className={classes.loadUnderWrapper}>
          <div
            className={classes.playlistWrapper}
            {...(!playlistOpen && {
              inert: 'inert'
            })}
          >
            <Playlist className={classes.playlist} />
          </div>
          <div className={classes.playerWrapper}>
            <SocialShareMenu className={classes.socialShareMenu} />
            <AppPlayer />
          </div>
          <AppCtaLoadUnder />
        </div>
      </div>
    </div>
  );
};

const TwApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps
}: MyAppProps) => {
  const AnyComponent = Component as any;
  const [plausibleDomain, setPlausibleDomain] = useState(null);
  const { type, id, contentOnly } = pageProps;
  const contextValue = useMemo(
    () => ({
      page: {
        resource: {
          type,
          id
        }
      }
    }),
    [type, id]
  );

  useEffect(() => {
    setPlausibleDomain((window as any)?.location.hostname || analytics.domain);

    // Remove the server-side injected CSS.
    // Fix for https://github.com/mui-org/material-ui/issues/15073
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // Remove `no-js` styling flag class.
    document.documentElement.classList.remove('no-js');
  }, []);

  if (contentOnly) {
    return (
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={baseMuiTheme}>
          <PlausibleProvider
            domain={plausibleDomain}
            selfHosted
            trackOutboundLinks
            enabled={!!plausibleDomain}
          >
            <AnyComponent {...pageProps} />
          </PlausibleProvider>
          <CssBaseline />
        </ThemeProvider>
      </CacheProvider>
    );
  }

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={baseMuiTheme}>
        <ThemeProvider theme={appTheme}>
          <AppContext.Provider value={contextValue}>
            <PlausibleProvider
              domain={plausibleDomain}
              selfHosted
              trackOutboundLinks
              enabled={!!plausibleDomain}
            >
              <Player>
                <AppLayout>
                  <AnyComponent {...pageProps} />
                </AppLayout>
                <AppSearch />
              </Player>
            </PlausibleProvider>
          </AppContext.Provider>
          <CssBaseline />
        </ThemeProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default wrapper.withRedux(TwApp); // eslint-disable-line import/no-default-export
