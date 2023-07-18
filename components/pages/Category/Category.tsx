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
  AcfLink
} from '@interfaces';
import { useContext, useEffect, useState } from 'react';
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
import { AppContext } from '@contexts/AppContext';
import { getCtaRegionData } from '@store/reducers';

export const Category = ({ data }: IContentComponentProps<CategoryType>) => {
  const {
    page: {
      resource: { type = 'term--category', id = '' }
    }
  } = useContext(AppContext);
  const store = useStore<RootState>();
  const [state, setState] = useState(store.getState());
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });

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
  const {
    seo,
    name,
    teaserFields,
    taxonomyImages,
    landingPage,
    posts,
    sponsorship,
    description,
    children
  } = data;
  const { teaser } = teaserFields || {};
  const { imageBanner, logo } = taxonomyImages || {};
  const { featuredPosts: allFeaturedStories } = landingPage || {};
  const [featuredStory, ...stories] = [
    ...(allFeaturedStories || []),
    ...(posts?.edges?.map(({ node }) => node) || [])
  ] as PostStory[];
  const featuredStories = stories.splice(0, 4);
  const { collectionSponsorLinks } = sponsorship || {};
  const sponsors = collectionSponsorLinks
    ?.map((collection) => collection?.sponsorLinks)
    .filter((v) => !!(v?.title && v.url))
    .map(
      ({ title, url }: AcfLink) =>
        ({
          title,
          url
        } as SidebarListItem)
    );
  const [loading, setLoading] = useState(false);
  const [oldScrollY, setOldScrollY] = useState(0);

  // Plausible Events.
  const props = {
    Title: name
  };
  const plausibleEvents: PlausibleEventArgs[] = [['Category', { props }]];

  useEffect(
    () => () => {
      unsub();
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
  }, [oldScrollY, posts?.pageInfo?.endCursor]);

  const loadMoreStories = async () => {
    if (!posts?.pageInfo?.endCursor) return;

    setLoading(true);

    const moreStories = await fetchApiCategoryStories(
      id,
      posts?.pageInfo?.endCursor
    );

    if (moreStories) {
      setOldScrollY(window.scrollY);
      setLoading(false);

      // Add stories to state.
    }
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
          {stories.map((story) => (
            <StoryCard
              data={story}
              feature={story.presentation?.format !== 'standard'}
              key={story.id}
            />
          ))}
          {posts?.pageInfo.hasNextPage && (
            <Box>
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
            {/* {hosts && !!hosts.length && (
              <SidebarList
                data={hosts.map((item: IPriApiResource) => ({
                  ...item,
                  avatar: item.image
                }))}
                subheaderText="Hosted by"
              />
            )} */}
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
                      title: child.name,
                      url: child.link
                    } as SidebarListItem)
                )}
                subheader={
                  <SidebarHeader>
                    <Typography variant="h2">
                      <ListAltRounded /> Subcategories
                    </Typography>
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
