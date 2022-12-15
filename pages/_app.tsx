/**
 * @file _app.tsx
 * Override the main app component.
 */

import React, { FC, useEffect, useRef, useState } from 'react';
import { useStore } from 'react-redux';
import { AppProps } from 'next/app';
import PlausibleProvider from 'next-plausible';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { analytics } from '@config';
import { AppCtaBanner } from '@components/AppCtaBanner';
import { AppCtaLoadUnder } from '@components/AppCtaLoadUnder';
import { AppFooter } from '@components/AppFooter';
import { AppHeader } from '@components/AppHeader';
import { AppLoadingBar } from '@components/AppLoadingBar';
import { AppSearch } from '@components/AppSearch';
import { AppContext } from '@contexts/AppContext';
import { SocialShareMenu } from '@components/SocialShareMenu/SocialShareMenu';
import { baseMuiTheme, appTheme, useAppStyles } from '@theme/App.theme';
import { wrapper } from '@store';
import { Player } from '@components/Player';
import { AppPlayer } from '@components/AppPlayer/AppPlayer';
import { getUiPlayerOpen, getUiPlayerPlaylistOpen } from '@store/reducers';
import { Playlist } from '@components/Player/components';

const AppLayout: FC = ({ children }) => {
  const rootRef = useRef<HTMLDivElement>();
  const uiFooterRef = useRef<HTMLDivElement>();
  const store = useStore();
  const [state, setState] = useState(store.getState());
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const playerOpen = getUiPlayerOpen(state);
  const playlistOpen = getUiPlayerPlaylistOpen(state);
  const styles = useAppStyles({ playerOpen, playlistOpen });

  useEffect(() => {
    const uiFooterRect = uiFooterRef.current?.getBoundingClientRect();
    const footerPadding = uiFooterRect?.height || 0;

    rootRef.current?.style.setProperty(
      '--footer-padding',
      `${footerPadding}px`
    );
  }, [uiFooterRef?.current, playerOpen]);

  useEffect(() => () => {
    unsub();
  });

  return (
    <div ref={rootRef} className={styles.root}>
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
        className={styles.content}
        {...(playlistOpen && {
          inert: 'inert'
        })}
      >
        {children}
      </div>
      <AppFooter />
      <div ref={uiFooterRef} className={styles.uiFooter}>
        <div className={styles.loadUnderWrapper}>
          <div
            className={styles.playlistWrapper}
            {...(!playlistOpen && {
              inert: 'inert'
            })}
          >
            <Playlist className={styles.playlist} />
          </div>
          <div className={styles.playerWrapper}>
            <SocialShareMenu className={styles.socialShareMenu} />
            <AppPlayer />
          </div>
          <AppCtaLoadUnder />
        </div>
      </div>
    </div>
  );
};

const TwApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [plausibleDomain, setPlausibleDomain] = useState(null);
  const { type, id, contentOnly } = pageProps;
  const contextValue = {
    page: {
      resource: {
        type,
        id
      }
    }
  };

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
      <ThemeProvider theme={baseMuiTheme}>
        <PlausibleProvider
          domain={plausibleDomain}
          selfHosted
          trackOutboundLinks
          enabled={!!plausibleDomain}
        >
          <Component {...pageProps} />
        </PlausibleProvider>
        <CssBaseline />
      </ThemeProvider>
    );
  }

  return (
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
                <Component {...pageProps} />
              </AppLayout>
              <AppSearch />
            </Player>
          </PlausibleProvider>
        </AppContext.Provider>
        <CssBaseline />
      </ThemeProvider>
    </ThemeProvider>
  );
};

export default wrapper.withRedux(TwApp); // eslint-disable-line import/no-default-export
