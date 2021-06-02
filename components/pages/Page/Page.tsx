/**
 * @file Page.tsx
 * Component for Pages.
 */

import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Box, Container, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppContext } from '@contexts/AppContext';
import { HtmlContent } from '@components/HtmlContent';
import { RootState } from '@interfaces/state';
import { fetchPageData } from '@store/actions';
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

  const { title, body } = data;

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
      <Head>
        <title>{title}</title>
        {/* TODO: WIRE UP ANALYTICS */}
      </Head>
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

Page.fetchData = (id: string): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const type = 'node--pages';
  const data = getDataByResource(getState(), type, id);

  if (!data) {
    await dispatch<any>(fetchPageData(id));
  }
};
