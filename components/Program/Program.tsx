/**
 * @file Program.tsx
 * Component for Program.
 */
import React, { useContext } from 'react';
import { IncomingMessage } from 'http';
import Head from 'next/head';
import Link from 'next/link';
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
import { ContentContext } from '@contexts/ContentContext';
import { fetchApiProgram } from '@lib/fetch';
import { LandingPageHeader } from '@components/LandingPageHeader';
import { SidebarEpisode } from '@components/Sidebar/SidebarEpisode';
import { AppContext } from '@contexts/AppContext';

export const Program = () => {
  const { latestStories } = useContext(AppContext);
  const {
    data,
    ctaRegions: {
      tw_cta_region_landing_inline_01: ctaInlineTop,
      tw_cta_region_landing_inline_02: ctaInlineBottom,
      tw_cta_region_landing_sidebar_01: ctaSidebarTop,
      tw_cta_region_landing_sidebar_02: ctaSidebarBottom
    }
  } = useContext(ContentContext);
  const {
    featuredStory,
    featuredStories,
    latestEpisode,
    stories,
    title,
    bannerImage
  } = data;

  console.log('Program >> ', data);

  const mainElements = [
    {
      key: 'main top',
      children: (
        <Box mt={3}>
          <StoryCard data={featuredStory} feature />
          <StoryCardGrid data={featuredStories} mt={2} />
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
          {stories.map((item: IPriApiResource, index: number) => (
            <Box mt={index ? 2 : 0} key={item.id}>
              <StoryCard
                data={item}
                feature={item.displayTemplate !== 'standard'}
              />
            </Box>
          ))}
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
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
            bgcolor="#fff"
            height="600px"
          >
            Program Info Card
          </Box>
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
        <title>The World</title>
      </Head>
      <LandingPageHeader title={title} image={bannerImage} />
      <LandingPage main={mainElements} sidebar={sidebarElements} />
    </>
  );
};

Program.fetchData = async (id: string | number, req: IncomingMessage) =>
  fetchApiProgram(id, req);
