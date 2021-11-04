/**
 * @file Homepage.tsx
 * Component for Homepage.
 */
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Hidden, Typography } from '@material-ui/core';
import StyleRounded from '@material-ui/icons/StyleRounded';
import { LandingPage } from '@components/LandingPage';
import { MetaTags } from '@components/MetaTags';
import { Plausible } from '@components/Plausible';
import {
  Sidebar,
  SidebarHeader,
  SidebarLatestStories,
  SidebarList
} from '@components/Sidebar';
import { StoryCard } from '@components/StoryCard';
import { StoryCardGrid } from '@components/StoryCardGrid';
import { SidebarEpisode } from '@components/Sidebar/SidebarEpisode';
import { ICtaRegionProps } from '@interfaces/cta';
import { fetchCtaData } from '@store/actions/fetchCtaData';
import { fetchHomepageData } from '@store/actions/fetchHomepageData';
import {
  getCollectionData,
  getCtaRegionData,
  getMenusData
} from '@store/reducers';
import { IButton } from '@interfaces';

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
  const drawerMainNav = getMenusData(store.getState(), 'drawerMainNav');
  const categoriesMenu = drawerMainNav
    ?.filter((item: IButton) => item.name === 'Categories')?.[0]
    .children.map(
      item =>
        ({
          id: item.key,
          type: 'link',
          title: item.name,
          metatags: {
            canonical: item.url.href
          }
        } as IPriApiResource)
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
          <Box mt={3}>
            <Sidebar item elevated>
              <SidebarHeader>
                <Typography variant="h2">
                  <StyleRounded /> Categories
                </Typography>
              </SidebarHeader>
              <SidebarList data={categoriesMenu} />
            </Sidebar>
          </Box>
        </Box>
      )
    },
    {
      key: 'sidebar bottom',
      children: (
        <Box mt={3}>
          <SidebarLatestStories
            data={latestStories[1]}
            label="Latest from our partners"
          />
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
        fetchCtaData('homepage', undefined, 'tw_cta_regions_landing', context)
      );
    })();

    return () => {
      unsub();
    };
  }, [store, unsub]);

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
