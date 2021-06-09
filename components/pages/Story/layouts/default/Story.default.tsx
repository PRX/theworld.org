/**
 * @file Story.default.tsx
 * Component for default Story layout.
 */

import React from 'react';
import dynamic from 'next/dynamic';
import { convertNodeToElement, Transform } from 'react-html-parser';
import { DomElement } from 'htmlparser2';
import { useStore } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box, Container, Grid, Hidden } from '@material-ui/core';
import { Sidebar, SidebarLatestStories } from '@components/Sidebar';
import { HtmlContent } from '@components/HtmlContent';
import { IContentComponentProps } from '@interfaces/content';
import { RootState } from '@interfaces/state';
import { getCollectionData, getCtaRegionData } from '@store/reducers';
import { storyStyles, storyTheme } from './Story.default.styles';
import { StoryHeader, StoryLede } from './components';

const AudioPlayer = dynamic(() =>
  import('@components/AudioPlayer').then(mod => mod.AudioPlayer)
) as any;

const CtaRegion = dynamic(
  () => import('@components/CtaRegion').then(mod => mod.CtaRegion) as any
) as any;

const SidebarCta = dynamic(
  () =>
    import('@components/Sidebar/SidebarCta').then(mod => mod.SidebarCta) as any
) as any;

const StoryRelatedLinks = dynamic(
  () =>
    import('./components/StoryRelatedLinks').then(
      mod => mod.StoryRelatedLinks
    ) as any
) as any;

const Tags = dynamic(() =>
  import('@components/Tags').then(mod => mod.Tags)
) as any;

interface StateProps extends RootState {}

type Props = StateProps & IContentComponentProps;

export const StoryDefault = ({ data }: Props) => {
  const {
    type,
    id,
    body,
    audio,
    embeddedPlayerUrl,
    popoutPlayerUrl,
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
  const store = useStore();
  const state = store.getState();
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
    relatedState.items[1].filter(item => item.id !== id).slice(0, 4);
  const ctaInlineMobile01 = getCtaRegionData(
    state,
    type,
    id as string,
    'tw_cta_region_content_inline_mobile_01'
  );
  const ctaInlineMobile02 = getCtaRegionData(
    state,
    type,
    id as string,
    'tw_cta_region_content_inline_mobile_02'
  );
  const ctaInlineEnd = getCtaRegionData(
    state,
    type,
    id as string,
    'tw_cta_region_content_inline_end'
  );
  const ctaSidebarTop = getCtaRegionData(
    state,
    type,
    id as string,
    'tw_cta_region_content_sidebar_01'
  );
  const ctaSidebarBottom = getCtaRegionData(
    state,
    type,
    id as string,
    'tw_cta_region_content_sidebar_02'
  );
  const classes = storyStyles({});
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

  return (
    <ThemeProvider theme={storyTheme}>
      <Container fixed>
        <Grid container>
          <Grid item xs={12}>
            <StoryHeader data={data} />
          </Grid>
          <Grid item xs={12}>
            {audio && (
              <AudioPlayer
                data={audio}
                message="Listen to the story."
                embeddedPlayerUrl={embeddedPlayerUrl}
                popoutPlayerUrl={popoutPlayerUrl}
              />
            )}
            <Box className={classes.main}>
              <Box className={classes.content}>
                <StoryLede data={data} />
                <Box className={classes.body} my={2}>
                  <HtmlContent
                    html={body}
                    transforms={[insertCtaMobile01, insertCtaMobile02]}
                  />
                </Box>
                {ctaInlineEnd && <CtaRegion data={ctaInlineEnd} />}
                {hasRelated && (
                  <aside>
                    <header>
                      <h3>Related Content</h3>
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
