/**
 * @file Page.tsx
 * Component for Pages.
 */

import { useContext, useEffect, useRef } from 'react';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Box, Container, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppContext } from '@contexts/AppContext';
import { HtmlContent } from '@components/HtmlContent';
import { MetaTags } from '@components/MetaTags';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import { RootState } from '@interfaces/state';
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
  let data = useRef(getDataByResource(state, type, id));

  const { complete, metatags, title, body } = data.current;

  // Plausible Events.
  const props = {
    Title: title
  };
  const plausibleEvents: PlausibleEventArgs[] = [['Page', { props }]];

  useEffect(() => {
    if (!complete) {
      (async () => {
        // Get content data.
        await store.dispatch<any>(fetchPageData(id));
        data.current = getDataByResource(state, type, id);
      })();
    }
  }, [complete, id, state, store, type]);

  return (
    <ThemeProvider theme={pageTheme}>
      <MetaTags data={metatags} />
      <Plausible events={plausibleEvents} subject={{ type, id }} />
      <Container fixed>
        <Grid container>
          <Grid item xs={12}>
            <PageHeader data={data.current} />
            <Box className={classes.body} my={2}>
              <HtmlContent html={body} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export const fetchData = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const type = 'node--pages';
  const data = getDataByResource(getState(), type, id);

  if (!data) {
    await dispatch<any>(fetchPageData(id));
  }
};
