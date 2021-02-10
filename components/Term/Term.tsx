/**
 * @file Term.tsx
 * Component for Term.
 */
import React, { useContext, useEffect, useState } from 'react';
import { IncomingMessage } from 'http';
import Head from 'next/head';
import Link from 'next/link';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Button, Hidden, Typography } from '@material-ui/core';
import { MenuBookRounded, NavigateNext } from '@material-ui/icons';
import { LandingPage } from '@components/LandingPage';
import { CtaRegion } from '@components/CtaRegion';
import {
  Sidebar,
  SidebarCta,
  SidebarFooter,
  SidebarHeader,
  SidebarList
} from '@components/Sidebar';
import { StoryCard } from '@components/StoryCard';
import { StoryCardGrid } from '@components/StoryCardGrid';
import { fetchApiTerm, fetchApiTermStories } from '@lib/fetch';
import { LandingPageHeader } from '@components/LandingPageHeader';
import { SidebarEpisode } from '@components/Sidebar/SidebarEpisode';
import { SidebarContent } from '@components/Sidebar/SidebarContent';
import { AppContext } from '@contexts/AppContext';
import { RootState } from '@interfaces/state';
import { appendResourceCollection, fetchCtaData } from '@store/actions';
import {
  getCollectionData,
  getCtaRegionData,
  getDataByResource
} from '@store/reducers';

export const Term = () => {
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
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
  const { items: stories, page } = storiesState;
  const { items: latestStories } = getCollectionData(
    state,
    'app',
    undefined,
    'latest'
  );
  const latestEpisodeState = getCollectionData(
    state,
    type,
    id,
    'latest episode'
  );
  const latestEpisode = latestEpisodeState && latestEpisodeState.items[1][0];
  const { title, description } = data;
  const [loading, setLoading] = useState(false);
  const [oldscrollY, setOldScrollY] = useState(0);

  useEffect(() => {
    // Something wants to keep the last interacted element in view.
    // When we have loaded a new page, we want to counter this scoll change.
    window.scrollBy({ top: oldscrollY - window.scrollY });
    setOldScrollY(window.scrollY);
  }, [page]);

  const loadMoreStories = async () => {
    setLoading(true);

    const moreStories = await fetchApiTermStories(id, page + 1);

    setOldScrollY(window.scrollY);
    setLoading(false);

    store.dispatch<any>(
      appendResourceCollection(moreStories, type, id, 'stories')
    );
  };

  const mainElements = [
    {
      key: 'main top',
      children: (
        <Box mt={3}>
          {featuredStory && <StoryCard data={featuredStory} feature />}
          {featuredStories && (
            <StoryCardGrid data={featuredStories[1]} mt={2} />
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
          {latestEpisode && (
            <SidebarEpisode data={latestEpisode} label="Latest Edition" />
          )}
          {description && (
            <Box mt={2}>
              <Sidebar item elevated>
                <SidebarContent
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </Sidebar>
            </Box>
          )}
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
        <title>{title}</title>
      </Head>
      <LandingPageHeader title={title} subhead={description} />
      <LandingPage main={mainElements} sidebar={sidebarElements} />
    </>
  );
};

Term.fetchData = (
  id: string,
  req: IncomingMessage
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const type = 'taxonomy_term--terms';
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
      latestEpisode,
      stories,
      ...payload
    } = await fetchApiTerm(id, req);

    dispatch({
      type: 'FETCH_CONTENT_DATA_SUCCESS',
      payload
    });

    if (latestEpisode) {
      dispatch(
        appendResourceCollection(
          { data: [latestEpisode], meta: { count: 1 } },
          type,
          id,
          'latest episode'
        )
      );
    }

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
  }

  // Get CTA message data.
  const context = [`term:${id}`];
  await dispatch<any>(
    fetchCtaData('tw_cta_regions_landing', type, id, context, req)
  );
};
