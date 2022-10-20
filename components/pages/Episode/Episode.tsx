/**
 * @file Episode.tsx
 * Component for Episode.
 */

import React, { useContext, useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Box,
  Container,
  Divider,
  Grid,
  Hidden,
  ListSubheader,
  Typography
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { EqualizerRounded } from '@material-ui/icons';
import { AudioPlayer } from '@components/AudioPlayer';
import { HtmlContent } from '@components/HtmlContent';
import { MetaTags } from '@components/MetaTags';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import {
  Sidebar,
  SidebarAudioList,
  SidebarCta,
  SidebarHeader,
  SidebarFooter,
  SidebarList,
  SidebarLatestStories
} from '@components/Sidebar';
import { SpotifyPlayer } from '@components/SpotifyPlayer';
import { StoryCard } from '@components/StoryCard';
import { CtaRegion } from '@components/CtaRegion';
import { AppContext } from '@contexts/AppContext';
import { RootState, UiAction } from '@interfaces/state';
import { parseUtcDate } from '@lib/parse/date';
import { appendResourceCollection } from '@store/actions/appendResourceCollection';
import { fetchEpisodeData } from '@store/actions/fetchEpisodeData';
import {
  getDataByResource,
  getCollectionData,
  getCtaRegionData
} from '@store/reducers';
import { episodeStyles, episodeTheme } from './Episode.styles';
import { EpisodeLede } from './components/EpisodeLede';
import { EpisodeHeader } from './components/EpisodeHeader';

export const Episode = () => {
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const store = useStore();
  const [state, setState] = useState(store.getState());
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const classes = episodeStyles({});
  let data = getDataByResource(state, type, id);

  if (!data) {
    return null;
  }

  const {
    metatags: dataMetatags,
    title,
    season,
    dateBroadcast,
    datePublished,
    body,
    audio,
    embeddedPlayerUrl,
    popoutPlayerUrl,
    hosts,
    producers,
    guests,
    reporters,
    spotifyPlaylist
  } = data;
  // const context = [`node:${data.id}`, `node:${data.program.id}`];
  const metatags = {
    ...dataMetatags,
    ...((dateBroadcast || datePublished) && {
      pubdate: parseUtcDate((dateBroadcast || datePublished) * 1000).join('-')
    })
  };
  const { segments } = audio || {};

  const storiesState = getCollectionData(state, type, id, 'stories');
  const { items: stories } = storiesState || {};

  // CTA data.
  const ctaInlineEnd = getCtaRegionData(
    state,
    'tw_cta_region_content_inline_end',
    type,
    id
  );
  const ctaSidebarTop = getCtaRegionData(
    state,
    'tw_cta_region_content_sidebar_01',
    type,
    id
  );
  const ctaSidebarBottom = getCtaRegionData(
    state,
    'tw_cta_region_content_sidebar_02',
    type,
    id
  );

  // Plausible Events.
  const props = {
    Title: title,
    ...(season && {
      Season: season
    }),
    ...(dateBroadcast &&
      (() => {
        const dt = parseUtcDate(dateBroadcast * 1000);
        return {
          'Broadcast Year': dt[0],
          'Broadcast Month': dt.slice(0, 1).join('-'),
          'Broadcast Date': dt.join('-')
        };
      })()),
    ...(datePublished &&
      (() => {
        const dt = parseUtcDate(datePublished * 1000);
        return {
          'Published Year': dt[0],
          'Published Month': dt.slice(0, 1).join('-'),
          'Published Date': dt.join('-')
        };
      })())
  };
  const plausibleEvents: PlausibleEventArgs[] = [['Episode', { props }]];

  [
    ...(hosts || []),
    ...(producers || []),
    ...(guests || []),
    ...(reporters || [])
  ].forEach(person => {
    plausibleEvents.push([
      `Person: ${person.title}`,
      {
        props: { 'Page Type': 'Episode' }
      }
    ]);
  });

  useEffect(() => {
    if (!data.complete) {
      (async () => {
        // Get content data.
        await store.dispatch<any>(fetchEpisodeData(id));
        data = getDataByResource(state, type, id);
      })();
    }

    // Show social hare menu.
    const { shareLinks } = data;
    store.dispatch<UiAction>({
      type: 'UI_SHOW_SOCIAL_SHARE_MENU',
      payload: {
        ui: {
          socialShareMenu: {
            links: [
              {
                key: 'twitter',
                link: shareLinks.twitter
              },
              {
                key: 'facebook',
                link: shareLinks.facebook
              },
              {
                key: 'linkedin',
                link: shareLinks.linkedin
              },
              {
                key: 'flipboard',
                link: shareLinks.flipboard
              },
              {
                key: 'whatsapp',
                link: shareLinks.whatsapp
              },
              {
                key: 'email',
                link: shareLinks.email
              }
            ]
          }
        }
      }
    });

    return () => {
      // Hide social hare menu.
      store.dispatch<UiAction>({
        type: 'UI_HIDE_SOCIAL_SHARE_MENU'
      });
      unsub();
    };
  }, [id]);

  return (
    <ThemeProvider theme={episodeTheme}>
      <MetaTags data={metatags} />
      <Plausible events={plausibleEvents} subject={{ type, id }} />
      <Container fixed>
        <Grid container>
          <Grid item xs={12}>
            <EpisodeHeader data={data} />
          </Grid>
          <Grid item xs={12}>
            {audio && (
              <AudioPlayer
                data={audio}
                message="Listen to the episode."
                embeddedPlayerUrl={embeddedPlayerUrl}
                popoutPlayerUrl={popoutPlayerUrl}
              />
            )}
            <Box className={classes.main}>
              <Box className={classes.content}>
                <EpisodeLede data={data} />
                <Box className={classes.body} my={2}>
                  <HtmlContent html={body} />
                </Box>
                {spotifyPlaylist && !!spotifyPlaylist.length && (
                  <Box my={3}>
                    <Divider />
                    <Typography variant="h4" component="h2">
                      Music heard on air
                    </Typography>
                    <Grid container spacing={2}>
                      {spotifyPlaylist.map(({ uri }) => (
                        <Grid item xs={12} sm={6} lg={4} key={uri}>
                          <SpotifyPlayer uri={uri} size="large" stretch />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
                {stories && (
                  <Box my={3}>
                    <Divider />
                    <Typography variant="h4">
                      Stories from this episode
                    </Typography>
                    {stories
                      .reduce((a, p) => [...a, ...p], [])
                      .map((item: IPriApiResource) => (
                        <Box mt={2} key={item.id}>
                          <StoryCard
                            data={item}
                            feature={item.displayTemplate !== 'standard'}
                          />
                        </Box>
                      ))}
                  </Box>
                )}
                {ctaInlineEnd && <CtaRegion data={ctaInlineEnd} />}
              </Box>
              <Sidebar container className={classes.sidebar}>
                {segments && (
                  <Sidebar item elevated>
                    <SidebarHeader>
                      <Typography variant="h2">
                        <EqualizerRounded /> In this episode:
                      </Typography>
                    </SidebarHeader>
                    <SidebarAudioList disablePadding data={segments} />
                    <SidebarFooter />
                  </Sidebar>
                )}
                {hosts && !!hosts.length && (
                  <Sidebar item elevated>
                    <SidebarList
                      data={hosts.map((item: IPriApiResource) => ({
                        ...item,
                        avatar: item.image
                      }))}
                      subheader={<ListSubheader>Hosts</ListSubheader>}
                    />
                  </Sidebar>
                )}
                {producers && !!producers.length && (
                  <Sidebar item elevated>
                    <SidebarList
                      data={producers.map((item: IPriApiResource) => ({
                        ...item,
                        avatar: item.image
                      }))}
                      subheader={<ListSubheader>Producers</ListSubheader>}
                    />
                  </Sidebar>
                )}
                {guests && !!guests.length && (
                  <Sidebar item elevated>
                    <SidebarList
                      data={guests.map((item: IPriApiResource) => ({
                        ...item,
                        avatar: item.image
                      }))}
                      subheader={<ListSubheader>Guests</ListSubheader>}
                    />
                  </Sidebar>
                )}
                {reporters && !!reporters.length && (
                  <Sidebar item elevated>
                    <SidebarList
                      data={reporters.map((item: IPriApiResource) => ({
                        ...item,
                        avatar: item.image
                      }))}
                      subheader={<ListSubheader>Reporters</ListSubheader>}
                    />
                  </Sidebar>
                )}
                {ctaSidebarTop && (
                  <Hidden smDown>
                    <Sidebar item>
                      <SidebarCta data={ctaSidebarTop} />
                    </Sidebar>
                  </Hidden>
                )}
                <SidebarLatestStories />
                {ctaSidebarBottom && (
                  <Hidden smDown>
                    <Sidebar item>
                      <SidebarCta data={ctaSidebarBottom} />
                    </Sidebar>
                  </Hidden>
                )}
              </Sidebar>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export const fetchData = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const type = 'node--episodes';
  const data = getDataByResource(getState(), type, id);

  if (!data) {
    await dispatch<any>(fetchEpisodeData(id));
    const { stories } = getDataByResource(getState(), type, id);

    if (stories) {
      dispatch(appendResourceCollection(stories, type, id, 'stories'));
    }
  }
};
