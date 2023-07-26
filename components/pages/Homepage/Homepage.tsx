/**
 * @file Homepage.tsx
 * Component for Homepage.
 */

import type {
  Episode,
  Homepage as HomepageType,
  IContentComponentProps,
  Post,
  RootState
} from '@interfaces';
// import type { ICtaRegionProps } from '@interfaces/cta';
import { useContext, useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';
import { useStore } from 'react-redux';
import { Box, Hidden, Typography } from '@mui/material';
import StyleRounded from '@mui/icons-material/StyleRounded';
import { LandingPage } from '@components/LandingPage';
import { MetaTags } from '@components/MetaTags';
import { Plausible } from '@components/Plausible';
import {
  Sidebar,
  SidebarHeader,
  SidebarLatestStories,
  SidebarList,
  SidebarListItem
  // SidebarList
} from '@components/Sidebar';
import { QuickLinks } from '@components/QuickLinks';
import { StoryCard } from '@components/StoryCard';
import { StoryCardGrid } from '@components/StoryCardGrid';
import { SidebarEpisode } from '@components/Sidebar/SidebarEpisode';
import {
  getCollectionData
  // getCtaRegionData
} from '@store/reducers';
import { AppContext } from '@contexts/AppContext';

// const CtaRegion = dynamic(
//   () => import('@components/CtaRegion').then((mod) => mod.CtaRegion) as any
// ) as React.FC<ICtaRegionProps>;

// const SidebarCta = dynamic(
//   () => import('@components/Sidebar').then((mod) => mod.SidebarCta) as any
// ) as React.FC<ICtaRegionProps>;

export const Homepage = ({ data }: IContentComponentProps<HomepageType>) => {
  const { data: appData } = useContext(AppContext);
  const { menus: appMenus } = appData || {};
  const { drawerMainNav } = appMenus || {};
  const store = useStore<RootState>();
  const [state, setState] = useState(store.getState());
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const { landingPage, menus, latestStories } = data;
  const featuredPosts =
    landingPage?.featuredPosts &&
    (landingPage.featuredPosts || []).reduce(
      (a, post) => (post ? [...a, post] : a),
      []
    );
  const { quickLinks } = menus || {};

  const storiesState = getCollectionData<Post>(
    state,
    'homepage',
    undefined,
    'stories'
  );
  const featuredStories = [
    ...(featuredPosts || []),
    ...(storiesState?.items || []).splice(0, 5 - (featuredPosts?.length || 0))
  ];
  const featuredStory = featuredStories.shift();
  const hasFeaturedStories = !!featuredStories.length;
  const { items: stories } = storiesState || {};

  const episodesState = getCollectionData<Episode>(
    state,
    'homepage',
    undefined,
    'episodes'
  );
  const { items: episodes } = episodesState || {};
  const latestEpisode = episodes?.shift();

  const categoriesMenu = drawerMainNav
    ?.filter((item) => item.name === 'Categories')?.[0]
    ?.children?.map(
      (item) =>
        ({
          title: item.name,
          url: item.url
        } as SidebarListItem)
    );

  // // CTA data.
  // const inlineTop = getCtaRegionData(
  //   state,
  //   'tw_cta_region_landing_inline_01',
  //   type,
  //   id
  // );
  // const inlineBottom = getCtaRegionData(
  //   state,
  //   'tw_cta_region_landing_inline_02',
  //   type,
  //   id
  // );
  // const sidebarTop = getCtaRegionData(
  //   state,
  //   'tw_cta_region_landing_sidebar_01',
  //   type,
  //   id
  // );
  // const sidebarBottom = getCtaRegionData(
  //   state,
  //   'tw_cta_region_landing_sidebar_02',
  //   type,
  //   id
  // );

  const mainElements = [
    {
      key: 'main top',
      children: (
        <>
          <Box display="grid" gridTemplateColumns="1fr" gap={1}>
            {featuredStory && (
              <StoryCard data={featuredStory} feature priority />
            )}
            {hasFeaturedStories && (
              <StoryCardGrid data={featuredStories} gap={1} />
            )}
          </Box>
          {/* {inlineTop && (
            <>
              <Hidden xsDown>
                <CtaRegion data={inlineTop} />
              </Hidden>
              <Hidden smUp>
                <SidebarCta data={inlineTop} />
              </Hidden>
            </>
          )} */}
        </>
      )
    },
    {
      key: 'main bottom',
      children: (
        <>
          {stories.map((item) => (
            <StoryCard
              data={item}
              feature={
                !!item.presentation?.format &&
                item.presentation?.format !== 'standard'
              }
              key={item.id}
            />
          ))}
          {/* {inlineBottom && (
            <>
              <Hidden xsDown>
                <CtaRegion data={inlineBottom} />
              </Hidden>
              <Hidden smUp>
                <SidebarCta data={inlineBottom} />
              </Hidden>
            </>
          )} */}
        </>
      )
    }
  ];

  const sidebarElements = [
    {
      key: 'sidebar top',
      children: (
        <>
          {latestEpisode && (
            <SidebarEpisode data={latestEpisode} label="Latest Episode" />
          )}
          <Hidden only="sm">
            {/* {sidebarTop && <SidebarCta data={sidebarTop} />} */}
            <SidebarLatestStories
              data={latestStories}
              label="Latest from our partners"
            />
          </Hidden>
          <Hidden xsDown mdUp>
            {/* {sidebarTop && <CtaRegion data={sidebarTop} />} */}
          </Hidden>
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
                <StyleRounded />
                <Typography variant="h2">Categories</Typography>
              </SidebarHeader>
              <SidebarList data={categoriesMenu} />
            </Sidebar>
          )}
          {/* {sidebarBottom && (
            <>
              <Hidden only="sm">
                <SidebarCta data={sidebarBottom} />
              </Hidden>
              <Hidden xsDown mdUp>
                <CtaRegion data={sidebarBottom} />
              </Hidden>
            </>
          )} */}
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
      <Plausible subject={{ type: 'homepage' }} />
      {quickLinks && <QuickLinks data={quickLinks} />}
      <LandingPage
        main={mainElements}
        sidebar={sidebarElements}
        mt={3}
        gap={1}
      />
    </>
  );
};
