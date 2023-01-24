/**
 * @file Episode.tsx
 * Component for Episode.
 */

import React, { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Box,
  Container,
  Divider,
  Grid,
  Hidden,
  Typography
} from '@mui/material';
import { EqualizerRounded } from '@mui/icons-material';
import { NoJsPlayer } from '@components/AudioPlayer/NoJsPlayer';
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
import { UiAction } from '@interfaces/state';
import { parseUtcDate } from '@lib/parse/date';
import {
  getDataByResource,
  getCollectionData,
  getCtaRegionData
} from '@store/reducers';
import { episodeStyles } from './Episode.styles';
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
  const { classes, cx } = episodeStyles();
  const data = getDataByResource(state, type, id);

  const {
    metatags: dataMetatags,
    title,
    season,
    dateBroadcast,
    datePublished,
    body,
    audio,
    hosts,
    producers,
    guests,
    reporters,
    spotifyPlaylist,
    shareLinks
  } = data || ({} as typeof data);
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
          'Broadcast Month': dt.slice(0, 2).join('-'),
          'Broadcast Date': dt.join('-')
        };
      })()),
    ...(datePublished &&
      (() => {
        const dt = parseUtcDate(datePublished * 1000);
        return {
          'Published Year': dt[0],
          'Published Month': dt.slice(0, 2).join('-'),
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
    if (shareLinks) {
      // Show social hare menu.
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
    }

    return () => {
      // Hide social hare menu.
      store.dispatch<UiAction>({
        type: 'UI_HIDE_SOCIAL_SHARE_MENU'
      });
    };
  }, [shareLinks, store]);

  useEffect(
    () => () => {
      unsub();
    },
    [unsub]
  );

  return (
    <>
      <MetaTags data={metatags} />
      <Plausible events={plausibleEvents} subject={{ type, id }} />
      <Container fixed>
        <Grid container>
          <Grid item xs={12}>
            <EpisodeHeader data={data} />
            {audio ? <NoJsPlayer url={audio.url} /> : null}
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.main}>
              <Box className={classes.content}>
                <EpisodeLede data={data} />
                <Box className={classes.body} my={2}>
                  <HtmlContent html={body} />
                </Box>
                {spotifyPlaylist && !!spotifyPlaylist.length && (
                  <Box my={3}>
                    <Divider classes={{ root: classes.MuiDividerRoot }} />
                    <Typography
                      variant="h4"
                      component="h2"
                      className={classes.heading}
                    >
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
                    <Typography
                      variant="h4"
                      component="h2"
                      className={classes.heading}
                    >
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
                      <EqualizerRounded />
                      <Typography variant="h2">In this episode:</Typography>
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
                      subheaderText="Hosts"
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
                      subheaderText="Producers"
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
                      subheaderText="Guests"
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
                      subheaderText="Reporters"
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
    </>
  );
};
