/**
 * @file Homepage.tsx
 * Component for Homepage.
 */
import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useStore } from 'react-redux';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Hidden, Typography } from '@mui/material';
import StyleRounded from '@mui/icons-material/StyleRounded';
import { LandingPage } from '@components/LandingPage';
import { MetaTags } from '@components/MetaTags';
import { Plausible } from '@components/Plausible';
import {
  Sidebar,
  SidebarHeader,
  SidebarLatestStories,
  SidebarList
} from '@components/Sidebar';
import { QuickLinks } from '@components/QuickLinks';
import { StoryCard } from '@components/StoryCard';
import { StoryCardGrid } from '@components/StoryCardGrid';
import { SidebarEpisode } from '@components/Sidebar/SidebarEpisode';
import { ICtaRegionProps } from '@interfaces/cta';
import {
  getCollectionData,
  getCtaRegionData,
  getMenusData
} from '@store/reducers';
import { IButton } from '@interfaces';
import { AppContext } from '@contexts/AppContext';

const CtaRegion = dynamic(
  () => import('@components/CtaRegion').then((mod) => mod.CtaRegion) as any
) as React.FC<ICtaRegionProps>;

const SidebarCta = dynamic(
  () => import('@components/Sidebar').then((mod) => mod.SidebarCta) as any
) as React.FC<ICtaRegionProps>;

export const Homepage = () => {
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
  const featuredStoryState = getCollectionData(
    state,
    'homepage',
    undefined,
    'featured story'
  );
  const featuredStory = featuredStoryState?.items[1][0];
  const { items: featuredStories } =
    getCollectionData(state, 'homepage', undefined, 'featured stories') || {};
  const { items: stories } =
    getCollectionData(state, 'homepage', undefined, 'stories') || {};
  const { items: latestStories } =
    getCollectionData(state, 'homepage', undefined, 'latest') || {};
  const episodesState = getCollectionData(
    state,
    'homepage',
    undefined,
    'episodes'
  );
  const latestEpisode =
    episodesState?.count > 0 && episodesState.items[1].shift();
  const drawerMainNav = getMenusData(state, 'drawerMainNav');
  const categoriesMenu = drawerMainNav
    ?.filter((item: IButton) => item.name === 'Categories')?.[0]
    ?.children.map(
      (item) =>
        ({
          id: item.key,
          type: 'link',
          title: item.name,
          metatags: {
            canonical: item.url
          }
        } as IPriApiResource)
    );

  // CTA data.
  const inlineTop = getCtaRegionData(
    state,
    'tw_cta_region_landing_inline_01',
    type,
    id
  );
  const inlineBottom = getCtaRegionData(
    state,
    'tw_cta_region_landing_inline_02',
    type,
    id
  );
  const sidebarTop = getCtaRegionData(
    state,
    'tw_cta_region_landing_sidebar_01',
    type,
    id
  );
  const sidebarBottom = getCtaRegionData(
    state,
    'tw_cta_region_landing_sidebar_02',
    type,
    id
  );

  const mainElements = [
    {
      key: 'main top',
      children: (
        <>
          <Box display="grid" gridTemplateColumns="1fr" gap={8}>
            <StoryCard data={featuredStory} feature priority />
            <StoryCardGrid data={featuredStories[1]} gap={8} />
          </Box>
          {inlineTop && (
            <>
              <Hidden xsDown>
                <CtaRegion data={inlineTop} />
              </Hidden>
              <Hidden smUp>
                <SidebarCta data={inlineTop} />
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
          {inlineBottom && (
            <>
              <Hidden xsDown>
                <CtaRegion data={inlineBottom} />
              </Hidden>
              <Hidden smUp>
                <SidebarCta data={inlineBottom} />
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
          <SidebarEpisode data={latestEpisode} label="Latest Episode" />
          {sidebarTop && (
            <>
              <Hidden only="sm">
                <SidebarCta data={sidebarTop} />
                <SidebarLatestStories
                  data={latestStories[1]}
                  label="Latest from our partners"
                />
              </Hidden>
              <Hidden xsDown mdUp>
                <CtaRegion data={sidebarTop} />
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
          {categoriesMenu && (
            <Sidebar item elevated>
              <SidebarHeader>
                <Typography variant="h2">
                  <StyleRounded /> Categories
                </Typography>
              </SidebarHeader>
              <SidebarList data={categoriesMenu} />
            </Sidebar>
          )}
          {sidebarBottom && (
            <>
              <Hidden only="sm">
                <SidebarCta data={sidebarBottom} />
              </Hidden>
              <Hidden xsDown mdUp>
                <CtaRegion data={sidebarBottom} />
              </Hidden>
            </>
          )}
        </>
      )
    }
  ];

  useEffect(
    () => () => {
      unsub();
    },
    [unsub]
  );

  const title = 'The World from PRX';
  const description =
    'The World is a public radio program that crosses borders and time zones to bring home the stories that matter. From PRX.';
  const url = '/';
  const image =
    'https://media.pri.org/s3fs-public/images/2020/04/tw-globe-bg-3000.jpg';
  const metatags = {
    title,
    description,
    canonical: url,
    'og:type': 'website',
    'og:title': title,
    'og:description': description,
    'og:url': url,
    'og:image': image,
    'og:image:width': '3000',
    'og:image:height': '3000',
    'og:local': 'en_US',
    'twitter:card': 'summary',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:url': url,
    'twitter:image': image
  };

  return (
    <>
      <MetaTags data={metatags} />
      <Plausible subject={{ type: 'homepage', id: null }} />
      <QuickLinks />
      <LandingPage
        main={mainElements}
        sidebar={sidebarElements}
        mt={3}
        gap={8}
      />
    </>
  );
};
