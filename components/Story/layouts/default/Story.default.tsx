/**
 * @file Story.default.tsx
 * Component for default Story layout.
 */

import { useContext } from 'react';
import ContentContext from '@contexts/ContentContext';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  Box,
  Container,
  Divider,
  Grid,
  Hidden,
  Typography
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { storyStyles, storyTheme } from './Story.default.theme';

const StoryDefault = () => {
  const {
    data: { body, title }
  } = useContext(ContentContext);
  const classes = storyStyles({});

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
            {/* START Story Header */}
            <Box my={3}>
              <Typography variant="h1">
                {title}
              </Typography>
              <Box my={2}>
                <Grid container>
                  <Grid item xs={12} md={10} style={{ lineHeight: '2rem' }}>
                    <Skeleton variant="text" width={150}/>
                    <Skeleton variant="text" width={300}/>
                    <Skeleton variant="text" width={225}/>
                  </Grid>
                  <Hidden smDown>
                    <Grid item md={2}>
                      <Box ml="auto" mr={0} width={85} height={85} bgcolor="text.hint"/>
                    </Grid>
                  </Hidden>
                </Grid>
              </Box>
              <Box
                bgcolor="text.hint"
                color="background.paper"
                width="100%"
                height={50}
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={3}
              >
                Audio Player
              </Box>
            </Box>
            {/* END Story Header */}
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.main}>
              <Box className={classes.content}>
                <Box
                  bgcolor="text.hint"
                  width="100%"
                  pb={`${(9 / 16) * 100}%`}
                />
                <Box className={classes.body} my={2} dangerouslySetInnerHTML={{__html: body }}/>
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
                <Hidden smDown>
                  <Box
                    bgcolor="text.hint"
                    color="background.paper"
                    width="100%"
                    height={300}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={3}
                  >
                    Related Story Links
                  </Box>
                </Hidden>
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

export default StoryDefault;
