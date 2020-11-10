/**
 * @file Homepage.tsx
 * Component for Homepage.
 */
import React, { useContext } from 'react';
import { IncomingMessage } from 'http';
import Head from 'next/head';
import Link from 'next/link';
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
import { ContentContext } from '@contexts/ContentContext';
import { fetchApiHomepage } from '@lib/fetch';
import { IPriApiResource } from 'pri-api-library/types';
import { SidebarEpisode } from '@components/Sidebar/SidebarEpisode';

export const Homepage = () => {
  const {
    data,
    ctaRegions: {
      tw_cta_region_landing_inline_01: inlineTop,
      tw_cta_region_landing_inline_02: inlineBottom,
      tw_cta_region_landing_sidebar_01: sidebarTop,
      tw_cta_region_landing_sidebar_02: sidebarBottom
    }
  } = useContext(ContentContext);
  const {
    featuredStory,
    featuredStories,
    latestTwEpisode,
    latestTwStories,
    latestStories
  } = data;

  const mainElements = [
    {
      key: 'main top',
      children: (
        <Box mt={3}>
          <StoryCard data={featuredStory} feature />
          <StoryCardGrid data={featuredStories} mt={2} />
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
          {latestTwStories.map((item: IPriApiResource, index: number) => (
            <Box mt={index ? 2 : 0} key={item.id}>
              <StoryCard
                data={item}
                feature={item.displayTemplate === 'full'}
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
          <SidebarEpisode data={latestTwEpisode} label="Latest Edition" />
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
          <Sidebar item elevated>
            <SidebarHeader>
              <Typography variant="h2">
                <MenuBookRounded /> Latest world news headlines
              </Typography>
            </SidebarHeader>
            <SidebarList disablePadding data={latestStories} />
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

  return (
    <>
      <Head>
        <title>The World</title>
      </Head>
      <LandingPage main={mainElements} sidebar={sidebarElements} />
    </>
  );
};

Homepage.fetchData = async (id: string | number, req: IncomingMessage) =>
  fetchApiHomepage(req);
