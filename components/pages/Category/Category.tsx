/**
 * @file Category.tsx
 * Component for Category.
 */

import type React from 'react';
import type { SidebarListItem } from '@components/Sidebar';
import type {
  Category as CategoryType,
  IContentComponentProps,
  RootState,
  PostStory,
  Episode
} from '@interfaces';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from 'react-redux';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Hidden,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { ListAltRounded } from '@mui/icons-material';
import { LandingPage } from '@components/LandingPage';
import { CtaRegion } from '@components/CtaRegion';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import {
  Sidebar,
  SidebarCta,
  SidebarEpisode,
  SidebarHeader,
  SidebarLatestStories,
  SidebarList
} from '@components/Sidebar';
import { StoryCard } from '@components/StoryCard';
import { StoryCardGrid } from '@components/StoryCardGrid';
import { fetchApiCategoryStories, fetchApiProgramEpisodes } from '@lib/fetch';
import { HtmlContent } from '@components/HtmlContent';
import { LandingPageHeader } from '@components/LandingPageHeader';
import { MetaTags } from '@components/MetaTags';
import { SidebarContent } from '@components/Sidebar/SidebarContent';
import { getCollectionData, getCtaRegionData } from '@store/reducers';
import { appendResourceCollection } from '@store/actions/appendResourceCollection';
import { generateContentLinkHref } from '@lib/routing';
import { EpisodeCard } from '@components/EpisodeCard';
import { categoryStyles } from './Category.styles';

export const Category = ({ data }: IContentComponentProps<CategoryType>) => {
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
  const type = 'term--category';
  const {
    id,
    link,
    seo,
    name,
    description,
    teaserFields,
    taxonomyImages,
    categoryEditors,
    sponsorship,
    landingPage,
    children
  } = data;
  const { teaser } = teaserFields || {};
  const { imageBanner, logo } = taxonomyImages || {};
  const { editors } = categoryEditors || {};
  const { collectionSponsorLinks } = sponsorship || {};
  const sponsors = collectionSponsorLinks?.reduce(
    (a, sl) => (sl?.sponsorLinks ? [...a, sl.sponsorLinks] : a),
    []
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

  const episodesState = getCollectionData<Episode>(state, type, id, 'episodes');
  const { items: episodes, pageInfo: episodesPageInfo } = episodesState || {};
  const hasEpisodes = !!episodes?.length;
  const isEpisodesView =
    (query.v === 'episodes' && hasEpisodes) || (hasEpisodes && !hasStories);
  const latestEpisode = episodes?.shift();

  const hasContentLinks = hasStories || hasEpisodes;

  const { classes } = categoryStyles();

  // CTA data.
  const ctaInlineTop = getCtaRegionData(state, 'landing-inline-top', type, id);
  const ctaInlineBottom = getCtaRegionData(
    state,
    'landing-inline-bottom',
    type,
    id
  );
  const ctaSidebarTop = getCtaRegionData(state, 'landing-sidebar-1', type, id);
  const ctaSidebarBottom = getCtaRegionData(
    state,
    'landing-sidebar-2',
    type,
    id
  );

  // Plausible Events.
  const props = {
    Title: name
  };
  const plausibleEvents: PlausibleEventArgs[] = [['Category', { props }]];

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
  }, [oldScrollY, pageInfo?.endCursor]);

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
    const moreStories = await fetchApiCategoryStories(id, options, {
      signal: controller.signal
    });

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
    const moreEpisodes = await fetchApiProgramEpisodes(id, options, {
      signal: controller.signal
    });

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
          {description && !hasContentLinks && (
            <Box my={3} display="grid" gap={3}>
              <Box className={classes.body}>
                <HtmlContent html={description} />
              </Box>
              <Divider />
            </Box>
          )}
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
            <EpisodeCard data={latestEpisode} hideProgramLink />
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
                stories.map(
                  (item) =>
                    item && (
                      <StoryCard
                        data={item}
                        feature={
                          !!item.presentation?.format &&
                          item.presentation.format !== 'standard'
                        }
                        key={item.id}
                      />
                    )
                )}
              {pageInfo?.hasNextPage && (
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
              {episodes?.map(
                (item) =>
                  item && (
                    <EpisodeCard data={item} key={item.id} hideProgramLink />
                  )
              )}
              {episodesPageInfo?.hasNextPage && (
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
          <Sidebar item elevated>
            {description && hasContentLinks && (
              <SidebarContent>
                <HtmlContent html={description} />
              </SidebarContent>
            )}
            {editors && !!editors.length && (
              <SidebarList
                data={editors.map((item) => ({
                  data: item,
                  avatar: item?.contributorDetails?.image
                }))}
                subheaderText="Edited by"
              />
            )}
            {!!sponsors?.length && (
              <SidebarList
                data={sponsors}
                subheaderText="Supported by"
                bulleted
              />
            )}
            {children && !!children.nodes.length && (
              <SidebarList
                data={children.nodes.map(
                  (child) =>
                    ({
                      data: child
                    } as SidebarListItem)
                )}
                subheader={
                  <SidebarHeader>
                    <ListAltRounded />
                    <Typography variant="h2">Subcategories</Typography>
                  </SidebarHeader>
                }
                bulleted
              />
            )}
          </Sidebar>
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
      <MetaTags
        data={{
          ...seo,
          title: `${seo?.title || name} | ${
            !isEpisodesView ? 'Stories' : 'Episodes'
          }`
        }}
      />
      <Plausible events={plausibleEvents} subject={{ type, id }} />
      <LandingPageHeader
        {...{
          ...(name && { title: name }),
          ...(teaser && { subhead: teaser }),
          ...(imageBanner && { image: imageBanner }),
          ...(logo && { logo })
        }}
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
