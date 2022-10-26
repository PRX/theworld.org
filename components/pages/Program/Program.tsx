/**
 * @file Program.tsx
 * Component for Program.
 */

import React, { useContext, useEffect, useState } from 'react';
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
  Tabs
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { CtaRegion } from '@components/CtaRegion';
import { HtmlContent } from '@components/HtmlContent';
import { LandingPage } from '@components/LandingPage';
import { MetaTags } from '@components/MetaTags';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import {
  Sidebar,
  SidebarContent,
  SidebarCta,
  SidebarEpisode,
  SidebarLatestStories,
  SidebarList
} from '@components/Sidebar';
import { StoryCard } from '@components/StoryCard';
import { StoryCardGrid } from '@components/StoryCardGrid';
import { fetchApiProgramEpisodes, fetchApiProgramStories } from '@lib/fetch';
import { LandingPageHeader } from '@components/LandingPageHeader';
import { EpisodeCard } from '@components/EpisodeCard';
import { AppContext } from '@contexts/AppContext';
import { RootState } from '@interfaces/state';
import { appendResourceCollection } from '@store/actions/appendResourceCollection';
import { fetchCtaData } from '@store/actions/fetchCtaData';
import { fetchProgramData } from '@store/actions/fetchProgramData';
import {
  getCollectionData,
  getCtaRegionData,
  getDataByResource
} from '@store/reducers';
import { generateLinkPropsForContent } from '@lib/routing';
import { programStyles, programTheme } from './Program.styles';

export const Program = () => {
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const router = useRouter();
  const { query } = router;
  const store = useStore();
  const [state, setState] = useState(store.getState());
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const classes = programStyles({});
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
    metatags,
    title,
    teaser,
    bannerImage,
    podcastLogo,
    hosts,
    sponsors,
    body
  } = data;
  const [loadingStories, setLoadingStories] = useState(false);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);
  const [oldscrollY, setOldScrollY] = useState(0);

  // Plausible Events.
  const props = {
    Title: title
  };
  const plausibleEvents: PlausibleEventArgs[] = [['Page', { props }]];

  useEffect(() => {
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    // Something wants to keep the last interacted element in view.
    // When we have loaded a new page, we want to counter this scoll change.
    window.scrollBy({
      top: oldscrollY - window.scrollY
    });
    setOldScrollY(window.scrollY);
  }, [page, episodesPage]);

  useEffect(() => {
    (async () => {
      // Get CTA message data.
      const context = [`node:${id}`];
      await store.dispatch<any>(
        fetchCtaData(type, id, 'tw_cta_regions_landing', context)
      );
    })();
  }, [id]);

  const loadMoreStories = async () => {
    setLoadingStories(true);

    const moreStories = await fetchApiProgramStories(id, page + 1);

    setOldScrollY(window.scrollY);
    setLoadingStories(false);

    store.dispatch<any>(
      appendResourceCollection(moreStories, type, id, 'stories')
    );
  };

  const loadMoreEpisodes = async () => {
    setLoadingEpisodes(true);

    const moreEpisodes = await fetchApiProgramEpisodes(id, episodesPage + 1);

    setOldScrollY(window.scrollY);
    setLoadingEpisodes(false);

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
        <>
          {body && !hasContentLinks && (
            <Box className={classes.body}>
              <HtmlContent html={body} />
            </Box>
          )}
          {!isEpisodesView && (
            <Box display="grid" gridGap={8}>
              {featuredStory && (
                <StoryCard data={featuredStory} feature priority />
              )}
              {featuredStories && (
                <StoryCardGrid data={featuredStories[1]} gridGap={8} />
              )}
            </Box>
          )}
          {isEpisodesView && (
            <EpisodeCard data={latestEpisode} label="Latest Episode" />
          )}
          {ctaInlineTop && (
            <>
              <Hidden xsDown>
                <CtaRegion data={ctaInlineTop} />
              </Hidden>
              <Hidden smUp>
                <SidebarCta data={ctaInlineTop} />
              </Hidden>
            </>
          )}
        </>
      )
    },
    {
      key: 'main bottom',
      children: (
        <>
          {!isEpisodesView && (
            <>
              {stories &&
                stories
                  .reduce((a, p) => [...a, ...p], [])
                  .map((item: IPriApiResource) => (
                    <StoryCard
                      data={item}
                      feature={
                        item.displayTemplate &&
                        item.displayTemplate !== 'standard'
                      }
                      key={item.id}
                    />
                  ))}
              {next && (
                <Box>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    fullWidth
                    disabled={loadingStories}
                    disableElevation={loadingStories}
                    onClick={() => {
                      loadMoreStories();
                    }}
                  >
                    {loadingStories ? 'Loading Stories...' : 'More Stories'}
                  </Button>
                </Box>
              )}
            </>
          )}
          {isEpisodesView && (
            <>
              {episodes
                .reduce((a, p) => [...a, ...p], [])
                .map((item: IPriApiResource) => (
                  <EpisodeCard data={item} key={item.id} />
                ))}
              {episodesNext && (
                <Box>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    fullWidth
                    disabled={loadingEpisodes}
                    disableElevation={loadingEpisodes}
                    onClick={() => {
                      loadMoreEpisodes();
                    }}
                  >
                    {loadingEpisodes ? 'Loading Episodes...' : 'More Episodes'}
                  </Button>
                </Box>
              )}
            </>
          )}
          {ctaInlineBottom && (
            <>
              <Hidden xsDown>
                <CtaRegion data={ctaInlineBottom} />
              </Hidden>
              <Hidden smUp>
                <SidebarCta data={ctaInlineBottom} />
              </Hidden>
            </>
          )}
        </>
      )
    }
  ];

  const sidebarElements = [
    {
      key: 'sidebar top',
      children: (
        <>
          {latestEpisode && !isEpisodesView && (
            <SidebarEpisode data={latestEpisode} label="Latest Episode" />
          )}
          <Sidebar item elevated>
            {body && hasContentLinks && (
              <SidebarContent>
                <HtmlContent html={body} />
              </SidebarContent>
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
          {ctaSidebarTop && (
            <>
              <Hidden only="sm">
                <SidebarCta data={ctaSidebarTop} />
              </Hidden>
              <Hidden xsDown mdUp>
                <CtaRegion data={ctaSidebarTop} />
              </Hidden>
            </>
          )}
        </>
      )
    },
    {
      key: 'sidebar bottom',
      children: (
        <>
          <SidebarLatestStories />
          {ctaSidebarBottom && (
            <>
              <Hidden only="sm">
                <SidebarCta data={ctaSidebarBottom} />
              </Hidden>
              <Hidden xsDown mdUp>
                <CtaRegion data={ctaSidebarBottom} />
              </Hidden>
            </>
          )}
        </>
      )
    }
  ];

  return (
    <ThemeProvider theme={programTheme}>
      <MetaTags
        data={{
          ...metatags,
          title: `${metatags.title} | ${
            !isEpisodesView ? 'Stories' : 'Episodes'
          }`
        }}
      />
      <Plausible events={plausibleEvents} subject={{ type, id }} />
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
      <LandingPage
        main={mainElements}
        sidebar={sidebarElements}
        mt={3}
        gridGap={8}
      />
    </ThemeProvider>
  );
};

export const fetchData = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const type = 'node--programs';
  const state = getState();
  const data = getDataByResource(state, type, id);

  // Get missing content data.
  if (!data) {
    // Get content data.
    await dispatch<any>(fetchProgramData(id));
  }
};
