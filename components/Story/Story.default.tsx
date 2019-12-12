/**
 * @file Story.default.tsx
 * Component for default Story layout.
 */

import { useContext } from 'react';
import ContentContext from '@contexts/ContentContext';
import { createMuiTheme, createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import {
  Box,
  Container,
  Divider,
  Grid,
  Hidden,
  Typography
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const headingStyles = {
  fontFamily:
    '"Raleway","Source Sans Pro","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif',
  fontWeight: 700
};

let theme = (theme: Theme) =>
  createMuiTheme({
    ...theme,
    typography: {
      ...theme.typography,
      h1: {
        ...headingStyles,
        fontSize: theme.typography.pxToRem(46)
      },
      h2: {
        ...headingStyles
      },
      h3: {
        ...headingStyles
      },
      h4: {
        ...headingStyles
      },
      h5: {
        ...headingStyles
      },
      h6: {
        ...headingStyles
      }
    }
  });

const useStyles = makeStyles((theme: Theme) => createStyles({
  main: {
    display: 'grid',
    gridGap: `${theme.spacing(2)}px`,
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: `auto 300px`
    },
  },
  content: {
    '& img': {
      maxWidth: '100%',
      height: 'auto'
    },
    '& .media': {
      width: '100%'
    },
    '& .media-youtube-video': {
      position: 'relative',
      height: 0,
      paddingTop: `${9 / 16 * 100}%`,
      '& iframe': {
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }
    },
    '& p': {
      fontSize: '1.1rem'
    }
  }
}));

const StoryDefault = () => {
  const {
    data: { body, title }
  } = useContext(ContentContext);
  const classes = useStyles({});

  return (
    <ThemeProvider theme={theme}>
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
                <Grid container xs={12}>
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
                <Box my={2} dangerouslySetInnerHTML={{__html: body }}/>
                <Box
                  bgcolor="text.hint"
                  color="background.paper"
                  width="100%"
                  height={400}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  my={3}
                >
                  Newsletter Sign-up
                </Box>
              </Box>
              <Box>
                <Hidden smDown>
                  <Box
                    bgcolor="text.hint"
                    color="background.paper"
                    width={300}
                    height={268}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb={2}
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
                  my={2}
                >
                  Related Links
                </Box>
                <Box
                  bgcolor="text.hint"
                  color="background.paper"
                  width={300}
                  height={268}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={2}
                  mx="auto"
                >
                  Sidebar BTF Ad
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default StoryDefault;
