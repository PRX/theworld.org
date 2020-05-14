/**
 * @file Story.default.tsx
 * Component for default Story layout.
 */

import React, { useContext } from 'react';
import Link from 'next/link';
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
import { AppContext } from '@contexts/AppContext';
import { ContentContext } from '@contexts/ContentContext';
import { AudioPlayer } from '@components/AudioPlayer';
import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarList
} from '@components/Sidebar';
import { CtaRegion } from '@components/CtaRegion';
import { Tags } from '@components/Tags';
import { storyStyles, storyTheme } from './Story.default.styles';
import { StoryHeader, StoryLede, StoryRelatedLinks } from './components';

export const StoryDefault = () => {
  const {
    data: {
      story: {
        body,
        audio,
        embeddedPlayerUrl,
        popoutPlayerUrl,
        categories,
        tags
      },
      related,
      ctaRegions
    }
  } = useContext(ContentContext);
  const { latestStories } = useContext(AppContext);
  const classes = storyStyles({});
  const hasRelated = related && !!related.length;
  const hasCategories = categories && !!categories.length;
  const hasTags = tags && !!tags.length;
  const hasMessages = (list: any[]) => list && list.length;

  // TODO: Parse body...
  //    - Insert mobile ad positions
  //    - Insert mobile newsletter signup
  //    - Insert mobile donation CTA
  //    - Remove empty <p> tags (API?)
  //    - Convert local links to ContentLinks
  //    - Replace GP video embeds with player that works (API?)
  //    - Replace older GP image embeds with image in attribute with Image (API?)
  //    - Replace GP pullquotes with symantic markup (API?)

  console.log('StoryDefault > ctaRegions', ctaRegions);

  return (
    <ThemeProvider theme={storyTheme}>
      <Container fixed>
        <Grid container>
          <Grid item xs={12}>
            <StoryHeader />
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
                <StoryLede />
                <Box
                  className={classes.body}
                  my={2}
                  dangerouslySetInnerHTML={{ __html: body }}
                />
                {hasMessages(ctaRegions.tw_cta_region_content_inline_end) && (
                  <Sidebar item stretch>
                    <CtaRegion
                      data={ctaRegions.tw_cta_region_content_inline_end}
                    />
                  </Sidebar>
                )}
                {hasRelated && (
                  <aside>
                    <header>
                      <h3>Related Content</h3>
                    </header>
                    <StoryRelatedLinks />
                  </aside>
                )}
                {hasCategories && <Tags data={categories} label="Categories" />}
                {hasTags && <Tags data={tags} label="Tags" />}
              </Box>
              <Sidebar container className={classes.sidebar}>
                {latestStories && (
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
                  {hasMessages(ctaRegions.tw_cta_region_content_sidebar_01) && (
                    <Sidebar item stretch>
                      <CtaRegion
                        data={ctaRegions.tw_cta_region_content_sidebar_01}
                      />
                    </Sidebar>
                  )}
                  {hasMessages(ctaRegions.tw_cta_region_content_sidebar_02) && (
                    <Sidebar item stretch>
                      <CtaRegion
                        data={ctaRegions.tw_cta_region_content_sidebar_02}
                      />
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
