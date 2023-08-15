/**
 * @file Term.tsx
 * Component for Term.
 */
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from 'react-redux';
import { IPriApiResource } from 'pri-api-library/types';
import {
  AppBar,
  Box,
  Button,
  Container,
  Hidden,
  Tab,
  Tabs
} from '@mui/material';
import { LandingPage } from '@components/LandingPage';
import { CtaRegion } from '@components/CtaRegion';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import { SidebarCta, SidebarLatestStories } from '@components/Sidebar';
import { StoryCard } from '@components/StoryCard';
import { StoryCardGrid } from '@components/StoryCardGrid';
import { fetchApiTermEpisodes, fetchApiTermStories } from '@lib/fetch';
import { EpisodeCard } from '@components/EpisodeCard';
import { LandingPageHeader } from '@components/LandingPageHeader';
import { MetaTags } from '@components/MetaTags';
import { SidebarEpisode } from '@components/Sidebar/SidebarEpisode';
import { AppContext } from '@contexts/AppContext';
import { appendResourceCollection } from '@store/actions/appendResourceCollection';
import {
  getCollectionData,
  getCtaRegionData,
  getDataByResource
} from '@store/reducers';
import { generateLinkPropsForContent } from '@lib/routing';
import { RootState } from '@interfaces/state';

export const Term = () => {
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const router = useRouter();
  const { query } = router;
  const store = useStore<RootState>();
  const [state, setState] = useState(store.getState());
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const data = getDataByResource(state, type, id);

  // CTA data.
  const ctaInlineTop = getCtaRegionData(
    state,
    'tw_cta_region_landing_inline_01',
    type,
    id
  );
  const ctaInlineBottom = getCtaRegionData(
    state,
    'tw_cta_region_landing_inline_02',
    type,
    id
  );
  const ctaSidebarTop = getCtaRegionData(
    state,
    'tw_cta_region_landing_sidebar_01',
    type,
    id
  );
  const ctaSidebarBottom = getCtaRegionData(
    state,
    'tw_cta_region_landing_sidebar_02',
    type,
    id
  );

  const featuredStoryState = getCollectionData(
    state,
    type,
    id,
    'featured story'
  );
  const featuredStory = featuredStoryState?.items[1][0];
  const { items: featuredStories } =
    getCollectionData(state, type, id, 'featured stories') || {};
  const storiesState = getCollectionData(state, type, id, 'stories');
  const { items: stories, page, next, count } = storiesState || {};
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
  const { metatags, title, description } = data;
  const [loadingStories, setLoadingStories] = useState(false);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);
  const [oldScrollY, setOldScrollY] = useState(0);

  // Plausible Events.
  const props = {
    Title: title
  };
  const plausibleEvents: PlausibleEventArgs[] = [['Term', { props }]];

  useEffect(
    () => () => {
      unsub();
    },
    [unsub]
  );

  useEffect(() => {
    // Something wants to keep the last interacted element in view.
    // When we have loaded a new page, we want to counter this scroll change.
    window.scrollBy({
      top: oldScrollY - window.scrollY
    });
    setOldScrollY(window.scrollY);
  }, [oldScrollY, page]);

  const loadMoreStories = async () => {
    setLoadingStories(true);

    const moreStories = await fetchApiTermStories(id, page + 1);

    setOldScrollY(window.scrollY);
    setLoadingStories(false);

    store.dispatch<any>(
      appendResourceCollection(moreStories, type, id, 'stories')
    );
  };

  const loadMoreEpisodes = async () => {
    setLoadingEpisodes(true);

    const moreEpisodes = await fetchApiTermEpisodes(id, episodesPage + 1);

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
          {!isEpisodesView && (
            <Box display="grid" gap={1}>
              {featuredStory && (
                <StoryCard data={featuredStory} feature priority />
              )}
              {featuredStories && (
                <StoryCardGrid data={featuredStories[1]} gap={1} />
              )}
            </Box>
          )}
          {isEpisodesView && <EpisodeCard data={latestEpisode} />}
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
            <SidebarEpisode
              data={{
                ...latestEpisode,
                program: data
              }}
              label="Latest Episode"
            />
          )}
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
    <>
      <MetaTags data={metatags} />
      <Plausible events={plausibleEvents} subject={{ type, id }} />
      <LandingPageHeader title={title} subhead={description} />
      {hasStories && hasEpisodes && (
        <AppBar position="static" color="transparent" elevation={0}>
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
        gap={1}
      />
    </>
  );
};
