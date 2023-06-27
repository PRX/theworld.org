/**
 * @file Page.tsx
 * Component for Pages.
 */

import type { RootState } from '@interfaces';
import React, { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { Box, Container, Grid } from '@mui/material';
import { AppContext } from '@contexts/AppContext';
import { HtmlContent } from '@components/HtmlContent';
import { MetaTags } from '@components/MetaTags';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import { getDataByResource } from '@store/reducers';
import { pageStyles } from './Page.styles';
import { PageHeader } from './components/PageHeader';

export const Page = () => {
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const store = useStore<RootState>();
  const [state, setState] = useState(store.getState());
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const data = getDataByResource(state, type, id);
  const { metatags, title, body } = data || ({} as typeof data);
  const { classes } = pageStyles();

  // Plausible Events.
  const props = {
    Title: title
  };
  const plausibleEvents: PlausibleEventArgs[] = [['Page', { props }]];

  useEffect(
    () => () => {
      unsub();
    },
    [unsub]
  );

  return (
    <>
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
    </>
  );
};
