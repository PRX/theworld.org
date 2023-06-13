/**
 * @file Story.default.tsx
 * Component for default Story layout.
 */

import type { IPriApiResource } from 'pri-api-library/types';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { convertNodeToElement, Transform } from 'react-html-parser';
import { DomElement } from 'htmlparser2';
import { useStore } from 'react-redux';
import { ThemeProvider } from '@mui/styles';
import { Box, Container, Grid, Hidden } from '@mui/material';
import { NoJsPlayer } from '@components/AudioPlayer/NoJsPlayer';
import { Sidebar, SidebarLatestStories } from '@components/Sidebar';
import { HtmlContent } from '@components/HtmlContent';
import { enhanceImage } from '@components/HtmlContent/transforms';
import { ITagsProps } from '@components/Tags';
import { IContentComponentProps } from '@interfaces/content';
import { ICtaRegionProps } from '@interfaces/cta';
import { RootState } from '@interfaces/state';
import { getCollectionData, getCtaRegionData } from '@store/reducers';
import { useStoryStyles, storyTheme } from './Story.default.styles';
import { IStoryRelatedLinksProps, StoryHeader, StoryLede } from './components';

const CtaRegion = dynamic(
  () => import('@components/CtaRegion').then((mod) => mod.CtaRegion) as any
) as React.FC<ICtaRegionProps>;

const SidebarCta = dynamic(
  () =>
    import('@components/Sidebar/SidebarCta').then(
      (mod) => mod.SidebarCta
    ) as any
) as React.FC<ICtaRegionProps>;

const StoryRelatedLinks = dynamic(
  () =>
    import('./components/StoryRelatedLinks').then(
      (mod) => mod.StoryRelatedLinks
    ) as any
) as React.FC<IStoryRelatedLinksProps>;

const Tags = dynamic(() =>
  import('@components/Tags').then((mod) => mod.Tags)
) as React.FC<ITagsProps>;

interface StateProps extends RootState {}

type Props = StateProps & IContentComponentProps<IPriApiResource>;

export const StoryDefault = ({ data }: Props) => {
  const {
    type,
    id,
    audio,
    body,
    categories,
    primaryCategory,
    tags,
    opencalaisCity,
    opencalaisContinent,
    opencalaisCountry,
    opencalaisProvince,
    opencalaisRegion,
    opencalaisPerson
  } = data;
  const store = useStore<RootState>();
  const [state, updateForce] = useState(store.getState());
  const unsub = store.subscribe(() => {
    updateForce(store.getState());
  });
  const relatedState =
    primaryCategory &&
    getCollectionData(
      state,
      primaryCategory.type,
      primaryCategory.id as string,
      'related'
    );
  const related =
    relatedState &&
    relatedState.items[1].filter((item) => item.id !== id).slice(0, 4);

  // CTA data.
  const ctaInlineMobile01 = getCtaRegionData(
    state,
    'tw_cta_region_content_inline_mobile_01',
    type,
    id as string
  );
  const ctaInlineMobile02 = getCtaRegionData(
    state,
    'tw_cta_region_content_inline_mobile_02',
    type,
    id as string
  );
  const ctaInlineEnd = getCtaRegionData(
    state,
    'tw_cta_region_content_inline_end',
    type,
    id as string
  );
  const ctaSidebarTop = getCtaRegionData(
    state,
    'tw_cta_region_content_sidebar_01',
    type,
    id as string
  );
  const ctaSidebarBottom = getCtaRegionData(
    state,
    'tw_cta_region_content_sidebar_02',
    type,
    id as string
  );

  const { classes } = useStoryStyles();
  const hasRelated = related && !!related.length;
  const hasCategories = categories && !!categories.length;
  const allTags = [
    ...(tags || []),
    ...(opencalaisCity || []),
    ...(opencalaisContinent || []),
    ...(opencalaisCountry || []),
    ...(opencalaisProvince || []),
    ...(opencalaisRegion || []),
    ...(opencalaisPerson || [])
  ];
  const hasTags = !!allTags.length;
  let ctaMobile01Position: number;
  let ctaMobile02Position: number;

  const insertCtaMobile01 = (
    node: DomElement,
    transform: Transform,
    index: number
  ) => {
    if (
      !node.parent &&
      node.type === 'tag' &&
      node.name === 'p' &&
      node?.next?.name === 'p' &&
      !ctaMobile01Position &&
      index >= 5
    ) {
      ctaMobile01Position = index;
      return (
        <>
          {convertNodeToElement(node, index, transform)}
          {ctaInlineMobile01 && (
            <Hidden mdUp>
              <CtaRegion data={ctaInlineMobile01} />
            </Hidden>
          )}
        </>
      );
    }

    return undefined;
  };

  const insertCtaMobile02 = (
    node: DomElement,
    transform: Transform,
    index: number
  ) => {
    if (
      !node.parent &&
      node.type === 'tag' &&
      node.name === 'p' &&
      node?.next?.name === 'p' &&
      !node?.next?.next?.next?.next?.next?.next?.next &&
      !ctaMobile02Position &&
      index >= ctaMobile01Position + 6
    ) {
      ctaMobile02Position = index;
      return (
        <>
          {convertNodeToElement(node, index, transform)}
          {ctaInlineMobile02 && (
            <Hidden mdUp>
              <CtaRegion data={ctaInlineMobile02} />
            </Hidden>
          )}
        </>
      );
    }

    return undefined;
  };

  const enhanceImages = enhanceImage((node) => {
    switch (true) {
      case /\bfile-on-the-side\b/.test(node.attribs.class):
        return [
          ['max-width: 600px', '100vw'],
          ['max-width: 960px', '560px'],
          ['max-width: 1280px', '300px'],
          [null, '400px']
        ];

      default:
        return [
          ['max-width: 600px', '100vw'],
          ['max-width: 960px', '560px'],
          ['max-width: 1280px', '600px'],
          [null, '920px']
        ];
    }
  });

  useEffect(
    () => () => {
      unsub();
    },
    [unsub]
  );

  return (
    <ThemeProvider theme={storyTheme}>
      <Container fixed>
        <Grid container>
          <Grid item xs={12}>
            <StoryHeader data={data} />
            {audio ? <NoJsPlayer url={audio.url} /> : null}
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.main}>
              <Box className={classes.content}>
                <StoryLede data={data} />
                <Box className={classes.body} my={2}>
                  <HtmlContent
                    html={body}
                    transforms={[
                      insertCtaMobile01,
                      insertCtaMobile02,
                      enhanceImages
                    ]}
                  />
                </Box>
                {ctaInlineEnd && <CtaRegion data={ctaInlineEnd} />}
                {hasRelated && (
                  <aside>
                    <header>
                      <h2>Related Content</h2>
                    </header>
                    <StoryRelatedLinks data={related} />
                  </aside>
                )}
                {hasCategories && <Tags data={categories} label="Categories" />}
                {hasTags && <Tags data={allTags} label="Tags" />}
              </Box>
              <Sidebar container className={classes.sidebar}>
                <SidebarLatestStories />
                <Hidden smDown>
                  {ctaSidebarTop && (
                    <Sidebar item stretch>
                      <SidebarCta data={ctaSidebarTop} />
                    </Sidebar>
                  )}
                  {ctaSidebarBottom && (
                    <Sidebar item stretch>
                      <SidebarCta data={ctaSidebarBottom} />
                    </Sidebar>
                  )}
                </Hidden>
              </Sidebar>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
