/**
 * @file Category.tsx
 * Component for Category.
 */

import React, { useContext, useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Box,
  Button,
  Hidden,
  ListSubheader,
  Typography
} from '@material-ui/core';
import { ListAltRounded } from '@material-ui/icons';
import { LandingPage } from '@components/LandingPage';
import { CtaRegion } from '@components/CtaRegion';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import {
  Sidebar,
  SidebarCta,
  SidebarHeader,
  SidebarLatestStories,
  SidebarList
} from '@components/Sidebar';
import { StoryCard } from '@components/StoryCard';
import { StoryCardGrid } from '@components/StoryCardGrid';
import { fetchApiCategoryStories } from '@lib/fetch';
import { HtmlContent } from '@components/HtmlContent';
import { LandingPageHeader } from '@components/LandingPageHeader';
import { MetaTags } from '@components/MetaTags';
import { SidebarContent } from '@components/Sidebar/SidebarContent';
import { AppContext } from '@contexts/AppContext';
import { RootState } from '@interfaces/state';
import { appendResourceCollection } from '@store/actions/appendResourceCollection';
import { fetchCategoryData } from '@store/actions/fetchCategoryData';
import {
  getCollectionData,
  getCtaRegionData,
  getDataByResource
} from '@store/reducers';

export const Category = () => {
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
  // const context = [`term:${id}`];
  const ctaInlineTop = getCtaRegionData(
    state,
    'tw_cta_region_landing_inline_01'
  );
  const ctaInlineBottom = getCtaRegionData(
    state,
    'tw_cta_region_landing_inline_02'
  );
  const ctaSidebarTop = getCtaRegionData(
    state,
    'tw_cta_region_landing_sidebar_01'
  );
  const ctaSidebarBottom = getCtaRegionData(
    state,
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
  const { items: stories, page, next } = storiesState;
  const {
    metatags,
    title,
    teaser,
    bannerImage,
    logo,
    hosts,
    sponsors,
    body,
    children
  } = data;
  const [loading, setLoading] = useState(false);
  const [oldScrollY, setOldScrollY] = useState(0);

  // Plausible Events.
  const props = {
    Title: title
  };
  const plausibleEvents: PlausibleEventArgs[] = [['Category', { props }]];

  useEffect(() => {
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    // Something wants to keep the last interacted element in view.
    // When we have loaded a new page, we want to counter this scroll change.
    window.scrollBy({
      top: oldScrollY - window.scrollY
    });
    setOldScrollY(window.scrollY);
  }, [page]);

  const loadMoreStories = async () => {
    setLoading(true);

    const moreStories = await fetchApiCategoryStories(id, page + 1);

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
        <>
          <Box display="grid" gridGap={8}>
            {featuredStory && (
              <StoryCard data={featuredStory} feature priority />
            )}
            {featuredStories && (
              <StoryCardGrid data={featuredStories[1]} gridGap={8} />
            )}
          </Box>
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
          {stories &&
            stories
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
            <Box>
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
          <Sidebar item elevated>
            {body && (
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
            {children && !!children.length && (
              <SidebarList
                data={children}
                subheader={
                  <SidebarHeader>
                    <Typography variant="h2">
                      <ListAltRounded /> Subcategories
                    </Typography>
                  </SidebarHeader>
                }
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
    <>
      <MetaTags data={metatags} />
      <Plausible events={plausibleEvents} subject={{ type, id }} />
      <LandingPageHeader
        title={title}
        subhead={teaser}
        image={bannerImage}
        logo={logo}
      />
      <LandingPage
        main={mainElements}
        sidebar={sidebarElements}
        mt={3}
        gridGap={8}
      />
    </>
  );
};

export const fetchData = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const type = 'taxonomy_term--categories';
  const state = getState();
  const data = getDataByResource(state, type, id);

  // Get missing content data.
  if (!data) {
    // Get content data.
    await dispatch<any>(fetchCategoryData(id));
  }
};
