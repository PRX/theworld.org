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
import { storyStyles, storyTheme } from './Story.default.styles';
import { StoryHeader, StoryLede, StoryRelatedLinks } from './components';

export const StoryDefault = () => {
  const {
    data: {
      story,
      story: { body, audio, embeddedPlayerUrl, popoutPlayerUrl },
      related
    }
  } = useContext(ContentContext);
  const { latestStories } = useContext(AppContext);
  const classes = storyStyles({});
  const hasRelated = related && !!related.length;

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
          <Hidden smDown>
            <Grid item xs={12}>
              <Box
                bgcolor="text.hint"
                color="background.paper"
                width={728}
                height={90}
                display="flex"
                justifyContent="center"
                alignItems="center"
                mx="auto"
                mt={2}
              >
                Top Ad
              </Box>
            </Grid>
          </Hidden>
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
                <Box
                  bgcolor="text.hint"
                  color="background.paper"
                  width="100%"
                  height={400}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={3}
                >
                  Newsletter Sign-up
                </Box>
                {hasRelated && (
                  <aside>
                    <header>
                      <h3>Related Content</h3>
                    </header>
                    <StoryRelatedLinks />
                  </aside>
                )}
              </Box>
              <Sidebar container className={classes.sidebar}>
                <Hidden smDown>
                  <Sidebar item>
                    <Box
                      bgcolor="text.hint"
                      color="background.paper"
                      width={300}
                      height={268}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      Sidebar ATF Ad
                    </Box>
                  </Sidebar>
                </Hidden>
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
                  <Sidebar item>
                    <Box
                      bgcolor="text.hint"
                      color="background.paper"
                      width={300}
                      height={268}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      alignSelf="center"
                    >
                      Sidebar BTF Ad
                    </Box>
                  </Sidebar>
                </Hidden>
                <Hidden smDown>
                  <Sidebar item stretch>
                    <Box
                      className="stretch"
                      bgcolor="text.hint"
                      color="background.paper"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height={300}
                    >
                      Donate CTA
                    </Box>
                  </Sidebar>
                  <Sidebar item stretch>
                    <Box
                      className="stretch"
                      bgcolor="text.hint"
                      color="background.paper"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height={300}
                    >
                      Newsletter CTA
                    </Box>
                  </Sidebar>
                </Hidden>
              </Sidebar>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
