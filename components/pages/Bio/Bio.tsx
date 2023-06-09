/**
 * @file Bio.tsx
 * Component for Bio.
 */

import type React from 'react';
import type {
  Contributor,
  Contributor_Contributordetails as ContributorDetails,
  Contributor_Landingpage as ContributorLandingPage,
  IContentComponentProps,
  PostStory
} from '@interfaces';
import { useContext, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { EqualizerRounded } from '@mui/icons-material';
// import Pagination from '@mui/material/Pagination';
import { LandingPage } from '@components/LandingPage';
// import { CtaRegion } from '@components/CtaRegion';
import { HtmlContent } from '@components/HtmlContent';
import { MetaTags } from '@components/MetaTags';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import {
  Sidebar,
  SidebarHeader,
  SidebarLatestStories
  // SidebarAudioList,
  // SidebarCta,
  // SidebarFooter,
  // SidebarList
} from '@components/Sidebar';
import { StoryCard } from '@components/StoryCard';
import { fetchApiPersonStories } from '@lib/fetch';
import { AppContext } from '@contexts/AppContext';
import { StoryCardGrid } from '@components/StoryCardGrid';
import { BioHeader } from './components/BioHeader';
import { bioStyles } from './Bio.styles';

export const Bio = ({ data }: IContentComponentProps<Contributor>) => {
  const { page: pageData } = useContext(AppContext);
  const { resource } = pageData;
  const { type = 'term--contributor', id = '' } = resource;

  // // CTA data.
  // const ctaSidebarTop = getCtaRegionData(
  //   state,
  //   'tw_cta_region_landing_sidebar_01',
  //   type,
  //   id
  // );
  // const ctaSidebarBottom = getCtaRegionData(
  //   state,
  //   'tw_cta_region_landing_sidebar_02',
  //   type,
  //   id
  // );

  const {
    seo,
    name,
    contributorDetails,
    description,
    posts,
    landingPage,
    segments
  } = data;
  const { image, teaser, program, position } =
    contributorDetails as ContributorDetails;
  const { featuredStories: allFeaturedStories } =
    landingPage as ContributorLandingPage;
  const [featuredStory, ...stories] = [
    ...(allFeaturedStories || []),
    ...(posts?.edges?.map(({ node }) => node) || [])
  ] as PostStory[];
  const featuredStories = stories.splice(0, 4);
  // const { twitter, tumblr, podcast, blog, website, rss, contact } =
  //   socialLinks || {};
  // const followLinks = [
  //   twitter,
  //   tumblr,
  //   podcast,
  //   blog,
  //   website,
  //   rss,
  //   contact
  // ].filter((v) => !!v);

  const [loading, setLoading] = useState(false);
  const [oldScrollY, setOldScrollY] = useState(0);
  // const [segmentsPage, setSegmentsPage] = useState(1);
  const { classes } = bioStyles();

  // Plausible Events.
  const props = {
    Name: name
  };
  const plausibleEvents: PlausibleEventArgs[] = [['Person', { props }]];

  useEffect(() => {
    // Something wants to keep the last interacted element in view.
    // When we have loaded a new page, we want to counter this scroll change.
    window.scrollBy({
      top: oldScrollY - window.scrollY
    });
    setOldScrollY(window.scrollY);
  }, [oldScrollY, posts?.pageInfo?.endCursor]);

  const loadMoreStories = async () => {
    if (!posts?.pageInfo?.endCursor) return;

    setLoading(true);

    const moreStories = await fetchApiPersonStories(
      id,
      posts?.pageInfo?.endCursor
    );

    if (moreStories) {
      setOldScrollY(window.scrollY);
      setLoading(false);

      // Add stories to state.
    }
  };

  // const handleSegmentsPageChange = async (
  //   event: React.ChangeEvent<unknown>,
  //   value: number
  // ) => {
  //   setSegmentsPage(value);
  // };

  const mainElements = [
    {
      key: 'main top',
      children: (
        <>
          {description && (
            <Box mt={3}>
              <Box className={classes.body}>
                <HtmlContent html={description} />
              </Box>
            </Box>
          )}
          <Box mt={description ? 6 : 3} mb={3} display="grid" gap={1}>
            {featuredStory && (
              <StoryCard data={featuredStory} feature priority />
            )}
            {featuredStories && (
              <StoryCardGrid data={featuredStories} gap={1} />
            )}
          </Box>
        </>
      )
    },
    {
      key: 'main bottom',
      children: stories && (
        <>
          {stories.map((story) => (
            <StoryCard
              data={story}
              feature={story.presentation?.format !== 'standard'}
              key={story.id}
            />
          ))}
          {posts?.pageInfo.hasNextPage && (
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
          {segments && (
            <Sidebar item elevated>
              <SidebarHeader>
                <EqualizerRounded />
                <Typography variant="h2">
                  Latest segments from {name}
                </Typography>
              </SidebarHeader>
              {/* <SidebarAudioList disablePadding data={segments[segmentsPage]} /> */}
              {/* <SidebarFooter>
                {segmentsPageCount > 1 && (
                  <Pagination
                    count={segmentsPageCount}
                    page={segmentsPage}
                    color="primary"
                    onChange={handleSegmentsPageChange}
                  />
                )}
              </SidebarFooter> */}
            </Sidebar>
          )}
          {/* {!!followLinks.length && (
            <Sidebar item elevated>
              <SidebarHeader>
                <PublicRounded />
                <Typography variant="h2">Follow {title}</Typography>
              </SidebarHeader>
              <SidebarList disablePadding data={followLinks} />
              <SidebarFooter />
            </Sidebar>
          )} */}
          {/* {ctaSidebarTop && (
            <>
              <Hidden only="sm">
                <SidebarCta data={ctaSidebarTop} />
              </Hidden>
              <Hidden xsDown mdUp>
                <CtaRegion data={ctaSidebarTop} />
              </Hidden>
            </>
          )} */}
        </>
      )
    },
    {
      key: 'sidebar bottom',
      children: (
        <>
          <SidebarLatestStories />
          {/* {ctaSidebarBottom && (
            <>
              <Hidden only="sm">
                <SidebarCta data={ctaSidebarBottom} />
              </Hidden>
              <Hidden xsDown mdUp>
                <CtaRegion data={ctaSidebarBottom} />
              </Hidden>
            </>
          )} */}
        </>
      )
    }
  ];

  return (
    <>
      {seo && <MetaTags data={seo} />}
      <Plausible events={plausibleEvents} subject={{ type, id }} />
      <BioHeader
        {...{
          ...(name && { title: name }),
          ...(position && { position }),
          ...(teaser && { subhead: teaser }),
          ...(image && { image }),
          ...(program && { programs: program })
        }}
      />
      <LandingPage main={mainElements} sidebar={sidebarElements} gap={1} />
    </>
  );
};
