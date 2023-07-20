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
  PostStory
} from '@interfaces';
import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { Box, Button, Hidden, Typography } from '@mui/material';
import { ListAltRounded } from '@mui/icons-material';
import { LandingPage } from '@components/LandingPage';
import { CtaRegion } from '@components/CtaRegion';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import {
  Sidebar,
  SidebarCta,
  SidebarHeader,
  SidebarLatestStories,
  SidebarList
} from '@components/Sidebar';
import { StoryCard } from '@components/StoryCard';
import { StoryCardGrid } from '@components/StoryCardGrid';
import { fetchApiCategoryStories } from '@lib/fetch';
import { HtmlContent } from '@components/HtmlContent';
import { LandingPageHeader } from '@components/LandingPageHeader';
import { MetaTags } from '@components/MetaTags';
import { SidebarContent } from '@components/Sidebar/SidebarContent';
import { getCollectionData, getCtaRegionData } from '@store/reducers';
import { appendResourceCollection } from '@store/actions/appendResourceCollection';

export const Category = ({ data }: IContentComponentProps<CategoryType>) => {
  const store = useStore<RootState>();
  const [state, setState] = useState(store.getState());
  const [loadingStories, setLoadingStories] = useState(false);
  const [oldScrollY, setOldScrollY] = useState(0);
  const [moreStoriesController, setMoreStoriesController] =
    useState<AbortController>();
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const type = 'term--category';
  const {
    id,
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
  const hasStories = !!stories?.length;

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
  const plausibleEvents: PlausibleEventArgs[] = [['Category', { props }]];

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

  const mainElements = [
    {
      key: 'main top',
      children: (
        <>
          <Box display="grid" gap={1}>
            {featuredStory && (
              <StoryCard data={featuredStory} feature priority />
            )}
            {featuredStories && (
              <StoryCardGrid data={featuredStories} gap={1} />
            )}
          </Box>
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
          {hasStories &&
            stories.map((story) => (
              <StoryCard
                data={story}
                feature={story.presentation?.format !== 'standard'}
                key={story.id}
              />
            ))}
          {pageInfo?.hasNextPage && (
            <Box>
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
          <Sidebar item elevated>
            {description && (
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
      {seo && <MetaTags data={seo} />}
      <Plausible events={plausibleEvents} subject={{ type, id }} />
      <LandingPageHeader
        {...{
          ...(name && { title: name }),
          ...(teaser && { subhead: teaser }),
          ...(imageBanner && { image: imageBanner }),
          ...(logo && { logo })
        }}
      />
      <LandingPage
        main={mainElements}
        sidebar={sidebarElements}
        mt={3}
        gap={1}
      />
    </>
  );
};
