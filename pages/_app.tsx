/**
 * @file _app.tsx
 * Override the main app component.
 */

import type React from 'react';
import type { RootState } from '@interfaces/state';
import {
  socialShareKeys,
  type IContentComponentProxyProps,
  type ISocialLink,
  type UiAction
} from '@interfaces';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useStore, Provider } from 'react-redux';
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

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type AppPageProps = IContentComponentProxyProps & {
  contentOnly?: boolean;
};

interface TwAppProps extends AppProps<AppPageProps> {
  emotionCache?: EmotionCache;
}

type AppLayoutProps = {
  children?: React.JSX.Element;
  shareLinks?: ISocialLink[];
};

const AppLayout = ({ children, shareLinks }: AppLayoutProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const uiFooterRef = useRef<HTMLDivElement>(null);
  const store = useStore<RootState>();
  const [state, updateForce] = useState(store.getState());
  const unsub = store.subscribe(() => {
    updateForce(store.getState());
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

  useEffect(() => {
    store.dispatch<UiAction>({
      type: 'UI_HIDE_SOCIAL_SHARE_MENU'
    });

    if (shareLinks) {
      store.dispatch<UiAction>({
        type: 'UI_SHOW_SOCIAL_SHARE_MENU',
        payload: {
          ui: {
            socialShareMenu: {
              links: socialShareKeys
                .map((key) =>
                  shareLinks.find((shareLink) => key === shareLink.key)
                )
                .filter((v): v is ISocialLink => !!v)
            }
          }
        }
      });
    }
  }, [shareLinks, store]);

  useEffect(
    () => () => {
      unsub();
    },
    [unsub]
  );

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
  ...rest
}: TwAppProps) => {
  const AnyComponent = Component as any;
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props as AppProps<AppPageProps>;
  const [plausibleDomain, setPlausibleDomain] = useState('');
  const { cookies, contentOnly, ...componentProps } = pageProps;
  const { type, id, shareLinks } = componentProps;
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
    // Configure Plausible provider.
    setPlausibleDomain((window as any)?.location.hostname || analytics.domain);

    // Remove the server-side injected CSS.
    // Fix for https://github.com/mui-org/material-ui/issues/15073
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }

    // Remove `no-js` styling flag class.
    document.documentElement.classList.remove('no-js');
  }, []);

  if (contentOnly) {
    return (
      <PlausibleProvider
        domain={plausibleDomain}
        selfHosted
        trackOutboundLinks
        enabled={!!plausibleDomain}
      >
        <Provider store={store}>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={baseMuiTheme}>
              <AnyComponent {...componentProps} />
              <CssBaseline />
            </ThemeProvider>
          </CacheProvider>
        </Provider>
      </PlausibleProvider>
    );
  }

  return (
    <PlausibleProvider
      domain={plausibleDomain}
      selfHosted
      trackOutboundLinks
      enabled={!!plausibleDomain}
    >
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={baseMuiTheme}>
            <ThemeProvider theme={appTheme}>
              <AppContext.Provider value={contextValue}>
                <Player>
                  <AppLayout shareLinks={shareLinks}>
                    <AnyComponent {...componentProps} />
                  </AppLayout>
                  <AppSearch />
                </Player>
              </AppContext.Provider>
              <CssBaseline />
            </ThemeProvider>
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </PlausibleProvider>
  );
};

export default TwApp; // eslint-disable-line import/no-default-export
