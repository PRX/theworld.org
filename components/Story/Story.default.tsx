/**
 * @file Story.default.tsx
 * Component for default Story layout.
 */

import { useContext } from 'react';
import ContentContext from '@contexts/ContentContext';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Box, Container, Grid, Hidden, Typography } from '@material-ui/core';

const headingStyles = {
  fontFamily:
    '"Raleway","Source Sans Pro","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif',
  fontWeight: 700
};

let theme = createMuiTheme({
  typography: {
    fontFamily:
      '"Source Sans Pro","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif',
    h1: {
      ...headingStyles,
      fontSize: `${46 / 16}rem`
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

const StoryDefault = () => {
  const {
    data: { title, id, teaser }
  } = useContext(ContentContext);

  return (
    <ThemeProvider theme={theme}>
      <Container fixed>
        <Grid container spacing={1}>
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
                my={2}
              >
                Top Ad
              </Box>
            </Grid>
          </Hidden>
          <Grid item xs={12}>
            <Typography variant="h1" gutterBottom>
              {title}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default StoryDefault;
