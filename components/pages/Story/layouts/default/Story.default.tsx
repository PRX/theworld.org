/**
 * @file Story.default.tsx
 * Component for default Story layout.
 */

import React from 'react';
import Link from 'next/link';
import { useStore } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Container,
  Grid,
  Hidden,
  Typography
} from '@material-ui/core';
import { MenuBookRounded, NavigateNext } from '@material-ui/icons';
import { AudioPlayer } from '@components/AudioPlayer';
import {
  Sidebar,
  SidebarCta,
  SidebarHeader,
  SidebarFooter,
  SidebarList
} from '@components/Sidebar';
import { CtaRegion } from '@components/CtaRegion';
import { Tags } from '@components/Tags';
import { IContentComponentProps } from '@interfaces/content';
import { RootState } from '@interfaces/state';
import { getCollectionData, getCtaRegionData } from '@store/reducers';
import { storyStyles, storyTheme } from './Story.default.styles';
import { StoryHeader, StoryLede, StoryRelatedLinks } from './components';

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
  const { items: latestStories } = getCollectionData(
    state,
    'app',
    null,
    'latest'
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

  // TODO: Parse body...
  //    - Insert mobile ad positions
  //    - Insert mobile newsletter signup
  //    - Insert mobile donation CTA
  //    - Remove empty <p> tags (API?)
  //    - Convert local links to ContentLinks
  //    - Replace GP video embeds with player that works (API?)
  //    - Replace older GP image embeds with image in attribute with Image (API?)
  //    - Replace GP pullquotes with symantic markup (API?)

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
                <Box
                  className={classes.body}
                  my={2}
                  dangerouslySetInnerHTML={{ __html: body }}
                />
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
                {latestStories && (
                  <Sidebar item elevated>
                    <SidebarHeader>
                      <Typography variant="h2">
                        <MenuBookRounded /> Latest world news headlines
                      </Typography>
                    </SidebarHeader>
                    <SidebarList disablePadding data={latestStories[1]} />
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
                )}
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
