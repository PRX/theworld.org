/**
 * @file Homepage.tsx
 * Component for Homepage.
 */
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Hidden } from '@material-ui/core';
import { LandingPage } from '@components/LandingPage';
import { OpenGraph } from '@components/OpenGraph';
import { SidebarLatestStories } from '@components/Sidebar';
import { StoryCard } from '@components/StoryCard';
import { StoryCardGrid } from '@components/StoryCardGrid';
import { SidebarEpisode } from '@components/Sidebar/SidebarEpisode';
import { ICtaRegionProps } from '@interfaces/cta';
import { fetchCtaData, fetchHomepageData } from '@store/actions';
import { getCollectionData, getCtaRegionData } from '@store/reducers';
import { TwitterCard } from '@components/TwitterCard';

const CtaRegion = dynamic(
  () => import('@components/CtaRegion').then(mod => mod.CtaRegion) as any
) as React.FC<ICtaRegionProps>;

const SidebarCta = dynamic(
  () => import('@components/Sidebar').then(mod => mod.SidebarCta) as any
) as React.FC<ICtaRegionProps>;

export const Homepage = () => {
  const store = useStore();
  const [state, setState] = useState(store.getState());
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const featuredStoryState = getCollectionData(
    state,
    'homepage',
    undefined,
    'featured story'
  );
  const featuredStory = featuredStoryState.items[1][0];
  const { items: featuredStories } = getCollectionData(
    state,
    'homepage',
    undefined,
    'featured stories'
  );
  const { items: stories } = getCollectionData(
    state,
    'homepage',
    undefined,
    'stories'
  );
  const { items: latestStories } = getCollectionData(
    state,
    'homepage',
    undefined,
    'latest'
  );
  const episodesState = getCollectionData(
    state,
    'homepage',
    undefined,
    'episodes'
  );
  const latestEpisode =
    episodesState.count > 0 && episodesState.items[1].shift();
  const inlineTop = getCtaRegionData(
    state,
    'homepage',
    undefined,
    'tw_cta_region_landing_inline_01'
  );
  const inlineBottom = getCtaRegionData(
    state,
    'homepage',
    undefined,
    'tw_cta_region_landing_inline_02'
  );
  const sidebarTop = getCtaRegionData(
    state,
    'homepage',
    undefined,
    'tw_cta_region_landing_sidebar_01'
  );
  const sidebarBottom = getCtaRegionData(
    state,
    'homepage',
    undefined,
    'tw_cta_region_landing_sidebar_02'
  );

  const mainElements = [
    {
      key: 'main top',
      children: (
        <Box mt={3}>
          <StoryCard data={featuredStory} feature priority />
          <StoryCardGrid data={featuredStories[1]} mt={2} />
          {inlineTop && (
            <Box mt={3}>
              <Hidden xsDown>
                <CtaRegion data={inlineTop} />
              </Hidden>
              <Hidden smUp>
                <SidebarCta data={inlineTop} />
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
          {stories
            .reduce((a, p) => [...a, ...p], [])
            .map((item: IPriApiResource, index: number) => (
              <Box mt={index ? 2 : 0} key={item.id}>
                <StoryCard
                  data={item}
                  feature={
                    item.displayTemplate && item.displayTemplate !== 'standard'
                  }
                />
              </Box>
            ))}
          {inlineBottom && (
            <Box mt={3}>
              <Hidden xsDown>
                <CtaRegion data={inlineBottom} />
              </Hidden>
              <Hidden smUp>
                <SidebarCta data={inlineBottom} />
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
          <SidebarEpisode data={latestEpisode} label="Latest Edition" />
          {sidebarTop && (
            <Box mt={3}>
              <Hidden only="sm">
                <SidebarCta data={sidebarTop} />
              </Hidden>
              <Hidden xsDown mdUp>
                <CtaRegion data={sidebarTop} />
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
          <SidebarLatestStories data={latestStories[1]} />
          {sidebarBottom && (
            <Box mt={3}>
              <Hidden only="sm">
                <SidebarCta data={sidebarBottom} />
              </Hidden>
              <Hidden xsDown mdUp>
                <CtaRegion data={sidebarBottom} />
              </Hidden>
            </Box>
          )}
        </Box>
      )
    }
  ];

  useEffect(() => {
    // Get CTA message data.
    const context = ['node:3704'];
    (async () => {
      await store.dispatch<any>(
        fetchCtaData('tw_cta_regions_landing', 'homepage', undefined, context)
      );
    })();

    return () => {
      unsub();
    };
  }, []);

  const title = 'The World';
  const description =
    'The World is a public radio program that crosses borders and time zones to bring home the stories that matter. From PRX.';
  const url = 'https://theworld.org/';
  const image = {
    src: 'https://media.pri.org/s3fs-public/images/2020/04/tw-globe-bg-3000.jpg'
  };
  const baseProps = {
    title,
    description,
    url,
    image
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <OpenGraph {...baseProps} type="webiste" />
        <TwitterCard {...baseProps} type="summary" />
      </Head>
      <LandingPage main={mainElements} sidebar={sidebarElements} />
    </>
  );
};

export const fetchData = (): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): Promise<void> => {
  // Fetch App Data
  await dispatch<any>(fetchHomepageData());
};
