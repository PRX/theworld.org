/**
 * @file Term.tsx
 * Component for Term.
 */

import type { Episode, PostStory, RootState, PostTag } from '@interfaces';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from 'react-redux';
import {
  AppBar,
  Box,
  Button,
  Container,
  Hidden,
  Tab,
  Tabs
} from '@mui/material';
import { LandingPage } from '@components/LandingPage';
import { CtaRegion } from '@components/CtaRegion';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import { SidebarCta, SidebarLatestStories } from '@components/Sidebar';
import { StoryCard } from '@components/StoryCard';
import { StoryCardGrid } from '@components/StoryCardGrid';
import { EpisodeCard } from '@components/EpisodeCard';
import { LandingPageHeader } from '@components/LandingPageHeader';
import { MetaTags } from '@components/MetaTags';
import { SidebarEpisode } from '@components/Sidebar/SidebarEpisode';
import { appendResourceCollection } from '@store/actions/appendResourceCollection';
import { getCollectionData, getCtaRegionData } from '@store/reducers';
import { fetchApiTagEpisodes, fetchApiTagStories } from '@lib/fetch';
import { generateContentLinkHref } from '@lib/routing';

type TermProps = {
  data: PostTag;
};

export const Term = ({ data }: TermProps) => {
  const router = useRouter();
  const { query } = router;
  const store = useStore<RootState>();
  const [state, setState] = useState(store.getState());
  const [loadingStories, setLoadingStories] = useState(false);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);
  const [oldScrollY, setOldScrollY] = useState(0);
  const [moreStoriesController, setMoreStoriesController] =
    useState<AbortController>();
  const [moreEpisodesController, setMoreEpisodesController] =
    useState<AbortController>();
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const type = 'term--tag';
  const {
    taxonomy,
    id,
    link,
    seo,
    name,
    description,
    taxonomyImages,
    landingPage
  } = data;
  const taxonomyRestBase = taxonomy?.node.restBase;
  const { imageBanner, logo } = taxonomyImages || {};
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
  const hasStories = !!stories?.length;

  const episodesState = getCollectionData<Episode>(state, type, id, 'episodes');
  const { items: episodes, pageInfo: episodesPageInfo } = episodesState || {};
  const hasEpisodes = !!episodes?.length;
  const isEpisodesView =
    (query.v === 'episodes' && hasEpisodes) || (hasEpisodes && !hasStories);
  const latestEpisode = episodes?.shift();

  // CTA data.
  const ctaInlineTop = getCtaRegionData(
    state,
    'tw_cta_region_landing_inline_01',
    type,
    id
  );
  const ctaInlineBottom = getCtaRegionData(
    state,
    'tw_cta_region_landing_inline_02',
    type,
    id
  );
  const ctaSidebarTop = getCtaRegionData(
    state,
    'tw_cta_region_landing_sidebar_01',
    type,
    id
  );
  const ctaSidebarBottom = getCtaRegionData(
    state,
    'tw_cta_region_landing_sidebar_02',
    type,
    id
  );

  // Plausible Events.
  const props = {
    Title: name
  };
  const plausibleEvents: PlausibleEventArgs[] = [['Term', { props }]];

  useEffect(
    () => () => {
      unsub();
      moreStoriesController?.abort();
      moreEpisodesController?.abort();
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
  }, [oldScrollY, pageInfo.endCursor]);

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
    const moreStories = await fetchApiTagStories(
      id,
      taxonomyRestBase,
      options,
      {
        signal: controller.signal
      }
    );

    if (!moreStories) return;

    setOldScrollY(window.scrollY);
    setLoadingStories(false);

    store.dispatch<any>(
      appendResourceCollection(moreStories, type, id, 'stories', options)
    );
  };

  const loadMoreEpisodes = async () => {
    if (!id || !episodesPageInfo.endCursor) return;

    setLoadingEpisodes(true);

    const controller = new AbortController();
    setMoreEpisodesController(controller);

    const options = {
      cursor: episodesPageInfo.endCursor
    };
    const moreEpisodes = await fetchApiTagEpisodes(
      id,
      taxonomyRestBase,
      options,
      {
        signal: controller.signal
      }
    );

    if (!moreEpisodes) return;

    setOldScrollY(window.scrollY);
    setLoadingEpisodes(false);

    store.dispatch<any>(
      appendResourceCollection(moreEpisodes, type, id, 'episodes', options)
    );
  };

  const handleFilterChange = (e: object, value: any) => {
    let href = generateContentLinkHref(link);

    if (href) {
      if (value === 1) {
        href = `${href}?v=episodes`;
      }
      router.push(href, undefined, { shallow: true });
    }
  };

  const mainElements = [
    {
      key: 'main top',
      children: (
        <>
          {!isEpisodesView && (
            <Box display="grid" gap={1}>
              {featuredStory && (
                <StoryCard data={featuredStory} feature priority />
              )}
              {featuredStories && (
                <StoryCardGrid data={featuredStories} gap={1} />
              )}
            </Box>
          )}
          {isEpisodesView && latestEpisode && (
            <EpisodeCard data={latestEpisode} />
          )}
          {ctaInlineTop && (
            <>
              <Hidden xsDown>
                <CtaRegion data={ctaInlineTop} />
              </Hidden>
              <Hidden smUp>
                <SidebarCta data={ctaInlineTop} />
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
          {!isEpisodesView && (
            <>
              {stories &&
                stories.map((item) => (
                  <StoryCard
                    data={item}
                    feature={
                      !!item.presentation?.format &&
                      item.presentation?.format !== 'standard'
                    }
                    key={item.id}
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
                    disableElevation={loadingStories}
                    onClick={() => {
                      loadMoreStories();
                    }}
                  >
                    {loadingStories ? 'Loading Stories...' : 'More Stories'}
                  </Button>
                </Box>
              )}
            </>
          )}
          {isEpisodesView && (
            <>
              {episodes.map((item) => (
                <EpisodeCard data={item} key={item.id} />
              ))}
              {episodesPageInfo.hasNextPage && (
                <Box my={3}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    fullWidth
                    disabled={loadingEpisodes}
                    disableElevation={loadingEpisodes}
                    onClick={() => {
                      loadMoreEpisodes();
                    }}
                  >
                    {loadingEpisodes ? 'Loading Episodes...' : 'More Episodes'}
                  </Button>
                </Box>
              )}
            </>
          )}
          {ctaInlineBottom && (
            <>
              <Hidden xsDown>
                <CtaRegion data={ctaInlineBottom} />
              </Hidden>
              <Hidden smUp>
                <SidebarCta data={ctaInlineBottom} />
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
          {latestEpisode && !isEpisodesView && (
            <SidebarEpisode
              data={latestEpisode}
              label="Latest Episode"
              {...(link &&
                episodes.length > 1 && {
                  collectionLink: `${link}?v=episodes`,
                  collectionLinkShallow: true
                })}
            />
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
      <LandingPageHeader
        title={name}
        subhead={description}
        image={imageBanner}
        logo={logo}
      />
      {hasStories && hasEpisodes && (
        <AppBar position="static" color="transparent" elevation={0}>
          <Container fixed>
            <Tabs
              indicatorColor="primary"
              centered
              value={!isEpisodesView ? 0 : 1}
              onChange={handleFilterChange}
              aria-label="filter links"
            >
              <Tab label="Stories" />
              <Tab label="Episodes" />
            </Tabs>
          </Container>
        </AppBar>
      )}
      <LandingPage
        main={mainElements}
        sidebar={sidebarElements}
        mt={3}
        gap={1}
      />
    </>
  );
};
