/**
 * @file Bio.tsx
 * Component for Bio.
 */

import type React from 'react';
import type {
  Contributor,
  IContentComponentProps,
  PostStory,
  RootState,
  Segment
} from '@interfaces';
import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import Link from 'next/link';
import { capitalize } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faTumblr,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import {
  faBlog,
  faEnvelope,
  faGlobe,
  faPodcast,
  faRss
} from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Button,
  Divider,
  Hidden,
  IconButton,
  SvgIcon,
  Typography
} from '@mui/material';
import { EqualizerRounded, PublicRounded } from '@mui/icons-material';
import Pagination from '@mui/material/Pagination';
import { LandingPage } from '@components/LandingPage';
import { CtaRegion } from '@components/CtaRegion';
import { HtmlContent } from '@components/HtmlContent';
import { MetaTags } from '@components/MetaTags';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import {
  Sidebar,
  SidebarHeader,
  SidebarLatestStories,
  SidebarList,
  SidebarFooter,
  SidebarContent,
  SidebarCta
} from '@components/Sidebar';
import { StoryCard } from '@components/StoryCard';
import { fetchApiContributorStories } from '@lib/fetch';
import { StoryCardGrid } from '@components/StoryCardGrid';
import { getCollectionData, getCtaRegionData } from '@store/reducers';
import { appendResourceCollection } from '@store/actions/appendResourceCollection';
import { BioHeader } from './components/BioHeader';
import { bioStyles } from './Bio.styles';

const followIconMap = new Map();
followIconMap.set('blog', faBlog);
followIconMap.set('email', faEnvelope);
followIconMap.set('facebook', faFacebook);
followIconMap.set('instagram', faInstagram);
followIconMap.set('podcast', faPodcast);
followIconMap.set('rss', faRss);
followIconMap.set('tiktok', faTiktok);
followIconMap.set('tumblr', faTumblr);
followIconMap.set('twitter', faTwitter);
followIconMap.set('website', faGlobe);

export const Bio = ({ data }: IContentComponentProps<Contributor>) => {
  const store = useStore<RootState>();
  const [state, setState] = useState(store.getState());
  const [loadingStories, setLoadingStories] = useState(false);
  const [oldScrollY, setOldScrollY] = useState(0);
  const [moreStoriesController, setMoreStoriesController] =
    useState<AbortController>();
  const [segmentsPage, setSegmentsPage] = useState(1);
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const type = 'term--contributor';
  const {
    id,
    seo,
    name,
    contributorDetails,
    description,
    landingPage,
    contributorSocialLinks
  } = data;
  const { image, teaser, program, position } = contributorDetails || {};
  const followLinks =
    contributorSocialLinks &&
    Object.entries(contributorSocialLinks)
      .filter(([k, v]) => !!v && followIconMap.has(k))
      .map(
        ([k, v]) =>
          v && (
            <IconButton
              href={v}
              target="_blank"
              LinkComponent={Link}
              color="primary"
              title={capitalize(k)}
            >
              <SvgIcon>
                <FontAwesomeIcon icon={followIconMap.get(k)} />
              </SvgIcon>
            </IconButton>
          )
      );
  const featuredPosts =
    landingPage?.featuredPosts &&
    (landingPage.featuredPosts || []).reduce(
      (a, post) => (post ? [...a, post] : a),
      []
    );

  const storiesState = getCollectionData<PostStory>(state, type, id, 'stories');
  const featuredStories = [
    ...(featuredPosts || []),
    ...(storiesState?.items || []).splice(0, 5 - (featuredPosts?.length || 0))
  ];
  const featuredStory = featuredStories.shift();
  const { items: stories, pageInfo } = storiesState || {};
  const hasStories = !!(
    featuredStory ||
    featuredStories?.length ||
    stories?.length
  );

  const segmentsState = getCollectionData<Segment>(state, type, id, 'segments');
  const { items: allSegments, options: segmentsOptions } = segmentsState || {};
  const segmentsPageSize = segmentsOptions?.pageSize || 10;
  const segmentsCount = allSegments?.length || 0;
  const segmentsPageCount = Math.ceil(segmentsCount / segmentsPageSize);
  const segmentsStartIndex = (segmentsPage - 1) * segmentsPageSize;
  const segmentsEndIndex = segmentsStartIndex + segmentsPageSize;
  const segments = allSegments?.slice(segmentsStartIndex, segmentsEndIndex);
  const hasSegments = !!allSegments?.length;

  const { classes } = bioStyles();

  // CTA data.
  const ctaSidebarTop = getCtaRegionData(state, 'landing-sidebar-1', type, id);
  const ctaSidebarBottom = getCtaRegionData(
    state,
    'landing-sidebar-2',
    type,
    id
  );

  // Plausible Events.
  const props = {
    Name: name
  };
  const plausibleEvents: PlausibleEventArgs[] = [['Person', { props }]];

  useEffect(
    () => () => {
      unsub();
      moreStoriesController?.abort();
    },
    [unsub]
  );

  useEffect(() => {
    // Something wants to keep the last interacted element in view.
    // When we have loaded a new page, we want to counter this scroll change.
    window.scrollBy({
      top: oldScrollY - window.scrollY
    });
    setOldScrollY(window.scrollY);
  }, [pageInfo?.endCursor, oldScrollY]);

  const loadMoreStories = async () => {
    if (!id || !pageInfo.endCursor) return;

    setLoadingStories(true);

    const controller = new AbortController();
    setMoreStoriesController(controller);

    const options = {
      cursor: pageInfo.endCursor,
      exclude: featuredPosts?.reduce(
        (a, post) => (post?.id ? [...a, post.id] : a),
        []
      )
    };
    const moreStories = await fetchApiContributorStories(id, options, {
      signal: controller.signal
    });

    if (!moreStories) return;

    setOldScrollY(window.scrollY);
    setLoadingStories(false);

    store.dispatch<any>(
      appendResourceCollection(moreStories, type, id, 'stories', options)
    );
  };

  const handleSegmentsPageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setSegmentsPage(value);
  };

  const mainElements = [
    {
      key: 'main top',
      children: (
        <>
          {description && (
            <Box my={3} display="grid" gap={3}>
              <Box className={classes.body}>
                <HtmlContent html={description} />
              </Box>
              <Divider />
            </Box>
          )}
          <Box display="grid" gap={1}>
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
      children: hasStories && (
        <>
          {stories.map((story) => (
            <StoryCard
              data={story}
              feature={story.presentation?.format !== 'standard'}
              key={story.id}
            />
          ))}
          {pageInfo.hasNextPage && (
            <Box my={3}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                fullWidth
                disabled={loadingStories}
                onClick={() => {
                  loadMoreStories();
                }}
              >
                {loadingStories ? 'Loading Stories...' : 'More Stories'}
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
          {hasSegments && (
            <Sidebar item elevated>
              <SidebarHeader>
                <EqualizerRounded />
                <Typography variant="h2">
                  Latest segments from {name}
                </Typography>
              </SidebarHeader>
              <SidebarList
                disablePadding
                data={segments.map((segment) => ({
                  data: segment,
                  audio: segment.segmentContent?.audio
                }))}
              />
              <SidebarFooter>
                {segmentsPageCount > 1 && (
                  <Pagination
                    size="small"
                    count={segmentsPageCount}
                    page={segmentsPage}
                    color="primary"
                    size="small"
                    onChange={handleSegmentsPageChange}
                  />
                )}
              </SidebarFooter>
            </Sidebar>
          )}
          {!!followLinks?.length && (
            <Sidebar item elevated>
              <SidebarHeader>
                <PublicRounded />
                <Typography variant="h2">Follow {name}</Typography>
              </SidebarHeader>
              <SidebarContent>
                <Box component="nav" display="flex" gap={1} flexWrap="wrap">
                  {followLinks}
                </Box>
              </SidebarContent>
            </Sidebar>
          )}
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
