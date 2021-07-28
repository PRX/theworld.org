/**
 * @file Bio.tsx
 * Component for Bio.
 */

import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Button, Hidden, Typography } from '@material-ui/core';
import { EqualizerRounded, PublicRounded } from '@material-ui/icons';
import Pagination from '@material-ui/lab/Pagination';
import { LandingPage } from '@components/LandingPage';
import { CtaRegion } from '@components/CtaRegion';
import { HtmlContent } from '@components/HtmlContent';
import { MetaTags } from '@components/MetaTags';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import {
  Sidebar,
  SidebarAudioList,
  SidebarCta,
  SidebarFooter,
  SidebarHeader,
  SidebarLatestStories,
  SidebarList
} from '@components/Sidebar';
import { StoryCard } from '@components/StoryCard';
import { fetchApiPersonAudio, fetchApiPersonStories } from '@lib/fetch';
import { AppContext } from '@contexts/AppContext';
import { RootState } from '@interfaces/state';
import {
  appendResourceCollection,
  fetchCtaData,
  fetchPersonData
} from '@store/actions';
import {
  getCollectionData,
  getCtaRegionData,
  getDataByResource
} from '@store/reducers';
import { StoryCardGrid } from '@components/StoryCardGrid';
import { BioHeader } from './components/BioHeader';
import { bioStyles } from './Bio.styles';

export const Bio = () => {
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
  const data = getDataByResource(state, type, id);
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
  const { items: featuredStories } =
    getCollectionData(state, type, id, 'featured stories') || {};
  const storiesState = getCollectionData(state, type, id, 'stories');
  const { items: stories, page, next } = storiesState || {};
  const segmentsState = getCollectionData(state, type, id, 'segments');
  const { items: segments, count: segmentsCount, size: segmentsSize } =
    segmentsState || {};
  const segmentsPageCount = Math.ceil(segmentsCount / segmentsSize);
  const {
    metatags,
    title,
    teaser,
    image,
    bio,
    program,
    position,
    socialLinks
  } = data;
  const { twitter, tumblr, podcast, blog, website, rss, contact } =
    socialLinks || {};
  const followLinks = [
    twitter,
    tumblr,
    podcast,
    blog,
    website,
    rss,
    contact
  ].filter(v => !!v);
  const [loading, setLoading] = useState(false);
  const [oldscrollY, setOldScrollY] = useState(0);
  const [segmentsPage, setSegmentsPage] = useState(1);
  const classes = bioStyles({});
  const cx = classNames.bind(classes);

  // Plausible Events.
  const props = {
    Name: title
  };
  const plausibleEvents: PlausibleEventArgs[] = [['Person', { props }]];

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
  }, [page]);

  useEffect(() => {
    (async () => {
      // Get CTA message data.
      const context = [`node:${id}`];
      await store.dispatch<any>(
        fetchCtaData('tw_cta_regions_landing', type, id, context)
      );
    })();
  }, [id]);

  const loadMoreStories = async () => {
    setLoading(true);

    const moreStories = await fetchApiPersonStories(id, page + 1);

    setOldScrollY(window.scrollY);
    setLoading(false);

    store.dispatch<any>(
      appendResourceCollection(moreStories, type, id, 'stories')
    );
  };

  const handleSegmentsPageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const pageItems = segmentsState.items[value];

    if (!pageItems || !pageItems.length) {
      const moreSegments = await fetchApiPersonAudio(
        id as string,
        'program-segment',
        value,
        10
      );

      store.dispatch<any>(
        appendResourceCollection(moreSegments, type, id, 'segments')
      );
    }

    setSegmentsPage(value);
  };

  const mainElements = [
    {
      key: 'main top',
      children: bio && (
        <>
          <Box mt={3}>
            <Box className={cx('body')}>
              <HtmlContent html={bio} />
            </Box>
          </Box>
          <Box mt={bio ? 6 : 3}>
            {featuredStory && (
              <StoryCard data={featuredStory} feature priority />
            )}
            {featuredStories && (
              <StoryCardGrid data={featuredStories[1]} mt={2} />
            )}
          </Box>
        </>
      )
    },
    {
      key: 'main bottom',
      children: stories && (
        <>
          {stories
            .reduce((a, p) => [...a, ...p], [])
            .map((item: IPriApiResource, index: number) => (
              <Box mt={index ? 2 : 3} key={item.id}>
                <StoryCard
                  data={item}
                  feature={
                    item.displayTemplate && item.displayTemplate !== 'standard'
                  }
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
      )
    }
  ];

  const sidebarElements = [
    {
      key: 'sidebar top',
      children: (
        <Box mt={3}>
          {segments && !!segments[1].length && (
            <Sidebar item elevated>
              <SidebarHeader>
                <Typography variant="h2">
                  <EqualizerRounded /> Latest segments from {title}
                </Typography>
              </SidebarHeader>
              <SidebarAudioList disablePadding data={segments[segmentsPage]} />
              <SidebarFooter>
                {segmentsPageCount > 1 && (
                  <Pagination
                    count={segmentsPageCount}
                    page={segmentsPage}
                    color="primary"
                    onChange={handleSegmentsPageChange}
                  />
                )}
              </SidebarFooter>
            </Sidebar>
          )}
          {!!followLinks.length && (
            <Sidebar item elevated>
              <SidebarHeader>
                <Typography variant="h2">
                  <PublicRounded /> Follow {title}
                </Typography>
              </SidebarHeader>
              <SidebarList disablePadding data={followLinks} />
              <SidebarFooter />
            </Sidebar>
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
          <SidebarLatestStories />
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
      <MetaTags data={metatags} />
      <Plausible events={plausibleEvents} subject={{ type, id }} />
      <BioHeader
        title={title}
        position={position}
        subhead={teaser}
        image={image}
        program={program}
      />
      <LandingPage main={mainElements} sidebar={sidebarElements} />
    </>
  );
};

export const fetchData = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const type = 'node--people';
  const state = getState();
  const data = getDataByResource(state, type, id);

  // Get missing content data.
  if (!data?.complete) {
    // Get content data.
    await dispatch<any>(fetchPersonData(id));
  }
};
