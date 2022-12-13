/**
 * @file Page.tsx
 * Component for Pages.
 */

import React, { useContext, useEffect } from 'react';
import { useStore } from 'react-redux';
import { Box, Container, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { AppContext } from '@contexts/AppContext';
import { HtmlContent } from '@components/HtmlContent';
import { MetaTags } from '@components/MetaTags';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import { fetchPageData } from '@store/actions/fetchPageData';
import { getDataByResource } from '@store/reducers';
import { pageStyles, pageTheme } from './Page.styles';
import { PageHeader } from './components/PageHeader';

export const Page = () => {
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const store = useStore();
  const state = store.getState();
  const classes = pageStyles({});
  let data = getDataByResource(state, type, id);

  if (!data) {
    return null;
  }

  const { metatags, title, body } = data;

  // Plausible Events.
  const props = {
    Title: title
  };
  const plausibleEvents: PlausibleEventArgs[] = [['Page', { props }]];

  useEffect(() => {
    if (!data.complete) {
      (async () => {
        // Get content data.
        await store.dispatch<any>(fetchPageData(id));
        data = getDataByResource(state, type, id);
      })();
    }
  }, [id]);

  return (
    <ThemeProvider theme={pageTheme}>
      <MetaTags data={metatags} />
      <Plausible events={plausibleEvents} subject={{ type, id }} />
      <Container fixed>
        <Grid container>
          <Grid item xs={12}>
            <PageHeader data={data} />
            <Box className={classes.body} my={2}>
              <HtmlContent html={body} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
