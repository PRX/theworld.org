/**
 * @file Homepage.tsx
 * Component for Homepage.
 */
import React, { useContext } from 'react';
import { IncomingMessage } from 'http';
import Head from 'next/head';
import { Box, Hidden } from '@material-ui/core';
import { LandingPage } from '@components/LandingPage';
import { CtaRegion } from '@components/CtaRegion';
import { SidebarCta } from '@components/Sidebar';
import { StoryCard } from '@components/StoryCard';
import { StoryCardGrid } from '@components/StoryCardGrid';
import { ContentContext } from '@contexts/ContentContext';
import { fetchApiHomepage } from '@lib/fetch';
import { IPriApiResource } from 'pri-api-library/types';

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
    latestTwStories,
    latestStories
  } = data;

  console.log(latestTwStories);

  return (
    <>
      <Head>
        <title>The World</title>
      </Head>
      <LandingPage container>
        <LandingPage main mt={2}>
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
        </LandingPage>
        <LandingPage sidebar mt={2}>
          <Box
            display="flex"
            width="100%"
            height="650px"
            alignItems="center"
            justifyContent="center"
            bgcolor="#999"
          >
            Latest Episode
          </Box>
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
        </LandingPage>
        <LandingPage main>
          {latestTwStories.map((item: IPriApiResource, index: number) => (
            <Box mt={index ? 2 : 0} key={item.id}>
              <StoryCard
                data={item}
                feature={item.displayTemplate === 'feature'}
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
        </LandingPage>
        <LandingPage sidebar mt={2}>
          <Box
            display="flex"
            width="100%"
            height="650px"
            alignItems="center"
            justifyContent="center"
            bgcolor="#999"
          >
            Latest Stories
          </Box>
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
        </LandingPage>
      </LandingPage>
    </>
  );
};

Homepage.fetchData = async (id: string | number, req: IncomingMessage) =>
  fetchApiHomepage(req);
