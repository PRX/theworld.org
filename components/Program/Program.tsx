/**
 * @file Program.tsx
 * Component for Program.
 */
import React, { useEffect, useState } from 'react';
import { IncomingMessage } from 'http';
import Head from 'next/head';
import Link from 'next/link';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Box,
  Button,
  Hidden,
  ListSubheader,
  Typography
} from '@material-ui/core';
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
import { fetchApiProgram, fetchApiProgramStories } from '@lib/fetch';
import { LandingPageHeader } from '@components/LandingPageHeader';
import { SidebarEpisode } from '@components/Sidebar/SidebarEpisode';
import { SidebarContent } from '@components/Sidebar/SidebarContent';
import { RootState } from '@interfaces/state';
import { IContentComponentProps } from '@interfaces/content';
import { getContentData } from '../../store/reducers/contentData';

interface StateProps extends RootState {}

type Props = StateProps & IContentComponentProps;

export const Program = ({ id, contentData }: Props) => {
  const latestStories = [];
  const data = getContentData(contentData, 'node--programs', id);
  const {
    tw_cta_region_landing_inline_01: ctaInlineTop,
    tw_cta_region_landing_inline_02: ctaInlineBottom,
    tw_cta_region_landing_sidebar_01: ctaSidebarTop,
    tw_cta_region_landing_sidebar_02: ctaSidebarBottom
  } = {
    tw_cta_region_landing_inline_01: [],
    tw_cta_region_landing_inline_02: [],
    tw_cta_region_landing_sidebar_01: [],
    tw_cta_region_landing_sidebar_02: []
  };
  const {
    featuredStory,
    featuredStories,
    latestEpisode,
    stories,
    title,
    teaser,
    bannerImage,
    podcastLogo,
    hosts,
    sponsors,
    body,
    page,
    nextPageUrl,
    nextPageAs
  } = data;
  const [loadedState, setLoadedState] = useState({
    loading: false,
    loadedStories: stories,
    loadedPage: page,
    loadMoreUrl: nextPageUrl,
    loadMoreAs: nextPageAs
  });
  const [oldscrollY, setOldScrollY] = useState(0);
  const {
    loading,
    loadedStories,
    loadedPage,
    loadMoreUrl,
    loadMoreAs
  } = loadedState;

  useEffect(() => {
    // Something wants to keep the last interacted element in view.
    // When we have loaded a new page, we want to counter this scoll change.
    window.scrollBy({ top: oldscrollY - window.scrollY });
    setOldScrollY(window.scrollY);
  }, [loadedPage]);

  const loadMoreStories = async () => {
    setLoadedState({
      ...loadedState,
      loading: true
    });
    const loadPage = loadedPage + 1;
    const nextPage = loadPage + 1;
    const { data: moreStories } = await fetchApiProgramStories(id, loadPage);
    setOldScrollY(window.scrollY);
    setLoadedState({
      ...loadedState,
      loading: false,
      loadedStories: [...loadedStories, ...moreStories],
      loadedPage: loadPage,
      loadMoreUrl: {
        ...nextPageUrl,
        query: {
          ...nextPageUrl.query,
          p: nextPage
        }
      },
      loadMoreAs: `${nextPageUrl.query.alias ||
        window.location.pathname}?p=${nextPage}`
    });
  };

  console.log('Program >> ', nextPageUrl, loadMoreUrl, loadMoreAs, loadedPage);

  const mainElements = [
    {
      key: 'main top',
      children: (
        <Box mt={3}>
          {featuredStory && <StoryCard data={featuredStory} feature />}
          {featuredStories && <StoryCardGrid data={featuredStories} mt={2} />}
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
          {loadedStories &&
            loadedStories.map((item: IPriApiResource, index: number) => (
              <Box mt={index ? 2 : 0} key={item.id}>
                <StoryCard
                  data={item}
                  feature={item.displayTemplate !== 'standard'}
                />
              </Box>
            ))}
          <Box mt={3}>
            <Link
              href={loadMoreUrl}
              as={loadMoreAs}
              passHref
              replace
              shallow
              scroll={false}
            >
              <Button
                component="a"
                variant="contained"
                size="large"
                color="primary"
                fullWidth
                disabled={loading}
                onClick={(
                  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                ) => {
                  e.preventDefault();
                  loadMoreStories();
                }}
              >
                {loading ? 'Loading Stories...' : 'More Stories'}
              </Button>
            </Link>
          </Box>
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
          <Box mt={2}>
            <Sidebar item elevated>
              {body && (
                <SidebarContent dangerouslySetInnerHTML={{ __html: body }} />
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
            </Sidebar>
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
        <title>
          {title}
          {page > 1 ? ` - Page ${page}` : ''}
        </title>
      </Head>
      <LandingPageHeader
        title={title}
        subhead={teaser}
        image={bannerImage}
        logo={podcastLogo}
      />
      <LandingPage main={mainElements} sidebar={sidebarElements} />
    </>
  );
};

Program.fetchData = async (id: string | number, req: IncomingMessage) =>
  fetchApiProgram(id, req);
