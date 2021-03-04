/**
 * @file Program.tsx
 * Component for Program.
 */
import React, { useContext, useEffect, useState } from 'react';
import { IncomingMessage } from 'http';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPriApiResource } from 'pri-api-library/types';
import {
  AppBar,
  Box,
  Button,
  Container,
  Hidden,
  ListSubheader,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import { MenuBookRounded, NavigateNext } from '@material-ui/icons';
import { LandingPage } from '@components/LandingPage';
import { CtaRegion } from '@components/CtaRegion';
import {
  Sidebar,
  SidebarContent,
  SidebarCta,
  SidebarEpisode,
  SidebarFooter,
  SidebarHeader,
  SidebarList
} from '@components/Sidebar';
import { StoryCard } from '@components/StoryCard';
import { StoryCardGrid } from '@components/StoryCardGrid';
import {
  fetchApiProgram,
  fetchApiProgramEpisodes,
  fetchApiProgramStories
} from '@lib/fetch';
import { LandingPageHeader } from '@components/LandingPageHeader';
import { EpisodeCard } from '@components/EpisodeCard';
import { AppContext } from '@contexts/AppContext';
import { RootState } from '@interfaces/state';
import { appendResourceCollection, fetchCtaData } from '@store/actions';
import {
  getCollectionData,
  getCtaRegionData,
  getDataByResource
} from '@store/reducers';
import { generateLinkPropsForContent } from '@lib/routing';

export const Program = () => {
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const router = useRouter();
  const { query } = router;
  const store = useStore();
  const state = store.getState();
  const data = getDataByResource(state, type, id);
  const ctaInlineTop = getCtaRegionData(
    state,
    type,
    id,
    'tw_cta_region_landing_inline_01'
  );
  const ctaInlineBottom = getCtaRegionData(
    state,
    type,
    id,
    'tw_cta_region_landing_inline_02'
  );
  const ctaSidebarTop = getCtaRegionData(
    state,
    type,
    id,
    'tw_cta_region_landing_sidebar_01'
  );
  const ctaSidebarBottom = getCtaRegionData(
    state,
    type,
    id,
    'tw_cta_region_landing_sidebar_02'
  );
  const featuredStoryState = getCollectionData(
    state,
    type,
    id,
    'featured story'
  );
  const featuredStory = featuredStoryState.items[1][0];
  const { items: featuredStories } = getCollectionData(
    state,
    type,
    id,
    'featured stories'
  );
  const storiesState = getCollectionData(state, type, id, 'stories');
  const { items: stories, page, next, count } = storiesState;
  const { items: latestStories } = getCollectionData(
    state,
    'app',
    undefined,
    'latest'
  );
  const hasStories = count > 0;
  const episodesState = getCollectionData(state, type, id, 'episodes');
  const {
    items: episodes,
    page: episodesPage,
    next: episodesNext,
    count: episodesCount
  } = episodesState || {};
  const hasEpisodes = episodesCount > 0;
  const isEpisodesView =
    (query.v === 'episodes' && hasEpisodes) || (hasEpisodes && !hasStories);
  const latestEpisode = episodes && episodes[1].shift();
  const hasContentLinks = hasStories || hasEpisodes;
  const {
    title,
    teaser,
    bannerImage,
    podcastLogo,
    hosts,
    sponsors,
    body
  } = data;
  const [loading, setLoading] = useState(false);
  const [oldscrollY, setOldScrollY] = useState(0);

  useEffect(() => {
    // Something wants to keep the last interacted element in view.
    // When we have loaded a new page, we want to counter this scoll change.
    window.scrollBy({ top: oldscrollY - window.scrollY });
    setOldScrollY(window.scrollY);
  }, [page, episodesPage]);

  const loadMoreStories = async () => {
    setLoading(true);

    const moreStories = await fetchApiProgramStories(id, page + 1);

    setOldScrollY(window.scrollY);
    setLoading(false);

    store.dispatch<any>(
      appendResourceCollection(moreStories, type, id, 'stories')
    );
  };

  const loadMoreEpisodes = async () => {
    setLoading(true);

    const moreEpisodes = await fetchApiProgramEpisodes(id, episodesPage + 1);

    setOldScrollY(window.scrollY);
    setLoading(false);

    store.dispatch<any>(
      appendResourceCollection(moreEpisodes, type, id, 'episodes')
    );
  };

  const handleFilterChange = (e: object, value: any) => {
    const { href, as: alias } = generateLinkPropsForContent(data, {
      ...(value === 1 && { v: 'episodes' })
    });

    router.push(href, alias);
  };

  const mainElements = [
    {
      key: 'main top',
      children: (
        <Box mt={3}>
          {body && !hasContentLinks && (
            <SidebarContent dangerouslySetInnerHTML={{ __html: body }} />
          )}
          {!isEpisodesView && (
            <>
              {featuredStory && <StoryCard data={featuredStory} feature />}
              {featuredStories && (
                <StoryCardGrid data={featuredStories[1]} mt={2} />
              )}
            </>
          )}
          {isEpisodesView && (
            <EpisodeCard data={latestEpisode} label="Latest Edition" />
          )}
          {ctaInlineTop && (
            <Box mt={3}>
              <Hidden xsDown>
                <CtaRegion data={ctaInlineTop} />
              </Hidden>
              <Hidden smUp>
                <SidebarCta data={ctaInlineTop} />
              </Hidden>
            </Box>
          )}
        </Box>
      )
    },
    {
      key: 'main bottom',
      children: (
        <Box mt={3}>
          {!isEpisodesView && (
            <>
              {stories &&
                stories
                  .reduce((a, p) => [...a, ...p], [])
                  .map((item: IPriApiResource, index: number) => (
                    <Box mt={index ? 2 : 0} key={item.id}>
                      <StoryCard
                        data={item}
                        feature={item.displayTemplate !== 'standard'}
                      />
                    </Box>
                  ))}
              {next && (
                <Box mt={3}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    onClick={() => {
                      loadMoreStories();
                    }}
                  >
                    {loading ? 'Loading Stories...' : 'More Stories'}
                  </Button>
                </Box>
              )}
            </>
          )}
          {isEpisodesView && (
            <>
              {episodes
                .reduce((a, p) => [...a, ...p], [])
                .map((item: IPriApiResource, index: number) => (
                  <Box mt={index ? 2 : 0} key={item.id}>
                    <EpisodeCard data={item} />
                  </Box>
                ))}
              {episodesNext && (
                <Box mt={3}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    onClick={() => {
                      loadMoreEpisodes();
                    }}
                  >
                    {loading ? 'Loading Episodes...' : 'More Episodes'}
                  </Button>
                </Box>
              )}
            </>
          )}
          {ctaInlineBottom && (
            <Box mt={3}>
              <Hidden xsDown>
                <CtaRegion data={ctaInlineBottom} />
              </Hidden>
              <Hidden smUp>
                <SidebarCta data={ctaInlineBottom} />
              </Hidden>
            </Box>
          )}
        </Box>
      )
    }
  ];

  const sidebarElements = [
    {
      key: 'sidebar top',
      children: (
        <Box mt={3}>
          {latestEpisode && !isEpisodesView && (
            <SidebarEpisode data={latestEpisode} label="Latest Edition" />
          )}
          <Box mt={2}>
            <Sidebar item elevated>
              {body && hasContentLinks && (
                <SidebarContent dangerouslySetInnerHTML={{ __html: body }} />
              )}
              {hosts && !!hosts.length && (
                <SidebarList
                  data={hosts.map((item: IPriApiResource) => ({
                    ...item,
                    avatar: item.image
                  }))}
                  subheader={<ListSubheader>Hosted by</ListSubheader>}
                />
              )}
              {sponsors && !!sponsors.length && (
                <SidebarList
                  data={sponsors}
                  subheader={<ListSubheader>Supported by</ListSubheader>}
                />
              )}
            </Sidebar>
          </Box>
          {ctaSidebarTop && (
            <Box mt={3}>
              <Hidden only="sm">
                <SidebarCta data={ctaSidebarTop} />
              </Hidden>
              <Hidden xsDown mdUp>
                <CtaRegion data={ctaSidebarTop} />
              </Hidden>
            </Box>
          )}
        </Box>
      )
    },
    {
      key: 'sidebar bottom',
      children: (
        <Box mt={3}>
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
          {ctaSidebarBottom && (
            <Box mt={3}>
              <Hidden only="sm">
                <SidebarCta data={ctaSidebarBottom} />
              </Hidden>
              <Hidden xsDown mdUp>
                <CtaRegion data={ctaSidebarBottom} />
              </Hidden>
            </Box>
          )}
        </Box>
      )
    }
  ];

  return (
    <>
      <Head>
        <title>
          {title} | {!isEpisodesView ? 'Stories' : 'Episodes'}
        </title>
      </Head>
      <LandingPageHeader
        title={title}
        subhead={teaser}
        image={bannerImage}
        logo={podcastLogo}
      />
      {hasStories && hasEpisodes && (
        <AppBar position="static" color="transparent">
          <Container fixed>
            <Tabs
              indicatorColor="primary"
              centered
              value={!isEpisodesView ? 0 : 1}
              onChange={handleFilterChange}
              aria-label="filter links"
            >
              <Tab label="Stories" />
              <Tab label="Episodes" />
            </Tabs>
          </Container>
        </AppBar>
      )}
      <LandingPage main={mainElements} sidebar={sidebarElements} />
    </>
  );
};

Program.fetchData = (
  id: string,
  req: IncomingMessage
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const type = 'node--programs';
  const state = getState();
  const data = getDataByResource(state, type, id);

  // Get missing content data.
  if (!data) {
    dispatch({
      type: 'FETCH_CONTENT_DATA_REQUEST',
      payload: {
        type,
        id
      }
    });

    const {
      featuredStory,
      featuredStories,
      stories,
      episodes,
      ...payload
    } = await fetchApiProgram(id, req);

    dispatch({
      type: 'FETCH_CONTENT_DATA_SUCCESS',
      payload
    });

    dispatch(
      appendResourceCollection(
        { data: [featuredStory], meta: { count: 1 } },
        type,
        id,
        'featured story'
      )
    );

    dispatch(
      appendResourceCollection(
        { data: [...featuredStories], meta: { count: featuredStories.length } },
        type,
        id,
        'featured stories'
      )
    );

    dispatch(appendResourceCollection(stories, type, id, 'stories'));

    dispatch(appendResourceCollection(episodes, type, id, 'episodes'));
  }

  // Get CTA message data.
  const context = [`node:${id}`];
  await dispatch<any>(
    fetchCtaData('tw_cta_regions_landing', type, id, context, req)
  );
};
