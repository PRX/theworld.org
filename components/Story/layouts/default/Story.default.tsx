/**
 * @file Story.default.tsx
 * Component for default Story layout.
 */

import React, { useContext } from 'react';
import { ContentContext } from '@contexts/ContentContext';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box, Container, Grid, Hidden } from '@material-ui/core';
import { storyStyles, storyTheme } from './Story.default.styles';
import { StoryHeader, StoryLede, StoryRelatedLinks } from './components';

export const StoryDefault = () => {
  const {
    data: {
      story: { body },
      related
    }
  } = useContext(ContentContext);
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
            <Box
              bgcolor="text.hint"
              color="background.paper"
              width="100%"
              height={50}
              display="flex"
              justifyContent="center"
              alignItems="center"
              my={3}
            >
              Audio Player
            </Box>
          </Grid>
          <Grid item xs={12}>
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
                  <Hidden smDown>
                    <aside>
                      <header>
                        <h3>Related Content</h3>
                      </header>
                      <StoryRelatedLinks/>
                    </aside>
                  </Hidden>
                )}
              </Box>
              <Box className={classes.sidebar}>
                <Hidden smDown>
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
                </Hidden>
                <Box
                  bgcolor="text.hint"
                  color="background.paper"
                  height={545}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  Latest Content
                </Box>
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
                <Hidden smDown>
                  <Box
                    className="stretch"
                    bgcolor="text.hint"
                    color="background.paper"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    Donate CTA
                  </Box>
                  <Box
                    className="stretch"
                    bgcolor="text.hint"
                    color="background.paper"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    Newsletter CTA
                  </Box>
                </Hidden>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
