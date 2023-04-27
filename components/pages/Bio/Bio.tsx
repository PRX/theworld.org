/**
 * @file Bio.tsx
 * Component for Bio.
 */

import type React from 'react';
import type { IPriApiResource } from 'pri-api-library/types';
import type { RootState } from '@interfaces';
import { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { Box, Button, Hidden, Typography } from '@mui/material';
import { EqualizerRounded, PublicRounded } from '@mui/icons-material';
import Pagination from '@mui/material/Pagination';
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
import { appendResourceCollection } from '@store/actions/appendResourceCollection';
import {
  getCollectionData,
  getCtaRegionData,
  getDataByResource
} from '@store/reducers';
import { StoryCardGrid } from '@components/StoryCardGrid';
import { BioHeader } from './components/BioHeader';
import { bioStyles } from './Bio.styles';

export const Bio = () => {
  const { page: pageData } = useContext(AppContext);
  const { resource } = pageData;
  const { type, id = '' } = resource;
  const store = useStore<RootState>();
  const [state, setState] = useState(store.getState());
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const data = getDataByResource(state, type, id);

  // CTA data.
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

  const featuredStory = featuredStoryState.items[1][0];
  const { items: featuredStories } =
    getCollectionData(state, type, id, 'featured stories') || {};
  const storiesState = getCollectionData(state, type, id, 'stories');
  const { items: stories, page, next } = storiesState || {};
  const segmentsState = getCollectionData(state, type, id, 'segments');
  const {
    items: segments,
    count: segmentsCount,
    size: segmentsSize
  } = segmentsState || {};
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
  ].filter((v) => !!v);

  const [loading, setLoading] = useState(false);
  const [oldScrollY, setOldScrollY] = useState(0);
  const [segmentsPage, setSegmentsPage] = useState(1);
  const { classes } = bioStyles();

  // Plausible Events.
  const props = {
    Name: title
  };
  const plausibleEvents: PlausibleEventArgs[] = [['Person', { props }]];

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
      children: (
        <>
          {bio && (
            <Box mt={3}>
              <Box className={classes.body}>
                <HtmlContent html={bio} />
              </Box>
            </Box>
          )}
          <Box mt={bio ? 6 : 3} mb={3} display="grid" gap={1}>
            {featuredStory && (
              <StoryCard data={featuredStory} feature priority />
            )}
            {featuredStories && (
              <StoryCardGrid data={featuredStories[1]} gap={1} />
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
            .map((item: IPriApiResource) => (
              <StoryCard
                data={item}
                feature={
                  item.displayTemplate && item.displayTemplate !== 'standard'
                }
                key={item.id}
              />
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
        <>
          {segments && !!segments[1].length && (
            <Sidebar item elevated>
              <SidebarHeader>
                <EqualizerRounded />
                <Typography variant="h2">
                  Latest segments from {title}
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
                <PublicRounded />
                <Typography variant="h2">Follow {title}</Typography>
              </SidebarHeader>
              <SidebarList disablePadding data={followLinks} />
              <SidebarFooter />
            </Sidebar>
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
      <BioHeader
        title={title}
        position={position}
        subhead={teaser}
        image={image}
        program={program}
      />
      <LandingPage main={mainElements} sidebar={sidebarElements} gap={1} />
    </>
  );
};
