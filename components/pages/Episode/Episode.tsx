/**
 * @file Episode.tsx
 * Component for Episode.
 */
import React, { useContext, useEffect } from 'react';
import { IncomingMessage } from 'http';
import Head from 'next/head';
import Link from 'next/link';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Hidden,
  ListSubheader,
  Typography
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  EqualizerRounded,
  MenuBookRounded,
  NavigateNext
} from '@material-ui/icons';
import { AudioPlayer } from '@components/AudioPlayer';
import {
  Sidebar,
  SidebarAudioList,
  SidebarCta,
  SidebarHeader,
  SidebarFooter,
  SidebarList
} from '@components/Sidebar';
import { SpotifyPlayer } from '@components/SpotifyPlayer';
import { StoryCard } from '@components/StoryCard';
import { CtaRegion } from '@components/CtaRegion';
import { AppContext } from '@contexts/AppContext';
import { RootState } from '@interfaces/state';
import {
  appendResourceCollection,
  fetchCtaData,
  fetchEpisodeData
} from '@store/actions';
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
  const state = store.getState();
  const classes = episodeStyles({});
  let data = getDataByResource(state, type, id);

  if (!data) {
    return null;
  }

  const {
    title,
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
  const { segments } = audio || {};

  const storiesState = getCollectionData(state, type, id, 'stories');
  const { items: stories } = storiesState || {};
  const ctaInlineEnd = getCtaRegionData(
    state,
    type,
    id as string,
    'tw_cta_region_content_inline_end'
  );
  const ctaSidebarTop = getCtaRegionData(
    state,
    type,
    id as string,
    'tw_cta_region_content_sidebar_01'
  );
  const ctaSidebarBottom = getCtaRegionData(
    state,
    type,
    id as string,
    'tw_cta_region_content_sidebar_02'
  );
  const { items: latestStories } = getCollectionData(
    state,
    'app',
    null,
    'latest'
  );

  useEffect(() => {
    if (!data.complete) {
      (async () => {
        // Get content data.
        await store.dispatch<any>(fetchEpisodeData(id));
        data = getDataByResource(state, type, id);
      })();
    }

    // Get CTA message data.
    const context = [`node:${data.id}`, `node:${data.program.id}`];
    (async () => {
      await store.dispatch<any>(
        fetchCtaData('tw_cta_regions_content', type, id, context)
      );
    })();
  }, [id]);

  return (
    <ThemeProvider theme={episodeTheme}>
      <Head>
        <title>{title}</title>
        {/* TODO: WIRE UP ANALYTICS */}
      </Head>
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
                <Box
                  className={classes.body}
                  my={2}
                  dangerouslySetInnerHTML={{ __html: body }}
                />
                {spotifyPlaylist && !!spotifyPlaylist.length && (
                  <Box my={3}>
                    <Divider />
                    <Typography variant="h4">Music heard on air</Typography>
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
                {latestStories && (
                  <Sidebar item elevated>
                    <SidebarHeader>
                      <Typography variant="h2">
                        <MenuBookRounded /> Latest world news headlines
                      </Typography>
                    </SidebarHeader>
                    <SidebarList disablePadding data={latestStories[1]} />
                    <SidebarFooter>
                      <Link href="/latest/stories" passHref>
                        <Button
                          component="a"
                          color="primary"
                          variant="contained"
                          fullWidth
                          disableElevation
                        >
                          More stories <NavigateNext />
                        </Button>
                      </Link>
                    </SidebarFooter>
                  </Sidebar>
                )}
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

Episode.fetchData = (
  id: string,
  req: IncomingMessage
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const type = 'node--episodes';
  const data = getDataByResource(getState(), type, id);

  if (!data) {
    await dispatch<any>(fetchEpisodeData(id, req));
    const { stories } = getDataByResource(getState(), type, id);

    if (stories) {
      dispatch(appendResourceCollection(stories, type, id, 'stories'));
    }
  }
};
