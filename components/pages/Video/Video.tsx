/**
 * @file Video.tsx
 * Component for Episode.
 */

import React, { useContext, useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import pad from 'lodash/pad';
import { Box, Container, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { LedeVideo } from '@components/LedeVideo';
import { CtaRegion } from '@components/CtaRegion';
import { AppContext } from '@contexts/AppContext';
import { HtmlContent } from '@components/HtmlContent';
import { MetaTags } from '@components/MetaTags';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import { RootState } from '@interfaces/state';
import { fetchCtaData } from '@store/actions/fetchCtaData';
import { fetchVideoData } from '@store/actions/fetchVideoData';
import { getDataByResource, getCtaRegionData } from '@store/reducers';
import { videoStyles, videoTheme } from './Video.styles';
import { VideoHeader } from './components/VideoHeader';

export const Video = () => {
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const store = useStore();
  const [state, setState] = useState(store.getState());
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const classes = videoStyles({});
  let data = getDataByResource(state, type, id);

  console.log('Video', type, id, data);

  if (!data) {
    return null;
  }

  const { metatags, title, date, description } = data;

  const ctaInlineEnd = getCtaRegionData(
    state,
    type,
    id as string,
    'tw_cta_region_content_inline_end'
  );

  // Plausible Events.
  const props = {
    Title: title,
    ...(date &&
      (() => {
        const dt = new Date(date * 1000);
        const dtYear = dt.getFullYear();
        const dtMonth = pad(`${dt.getMonth() + 1}`, 2, '0');
        const dtDate = pad(`${dt.getDate()}`, 2, '0');
        return {
          'Broadcast Year': `${dtYear}`,
          'Broadcast Month': `${dtYear}-${dtMonth}`,
          'Broadcast Date': `${dtYear}-${dtMonth}-${dtDate}`
        };
      })())
  };
  const plausibleEvents: PlausibleEventArgs[] = [['Audio', { props }]];

  useEffect(() => {
    if (!data.complete) {
      (async () => {
        // Get content data.
        await store.dispatch<any>(fetchVideoData(id));
        data = getDataByResource(state, type, id);
      })();
    }

    // Get CTA message data.
    const context = [`file:${data.id}`];
    (async () => {
      await store.dispatch<any>(
        fetchCtaData(type, id, 'tw_cta_regions_content', context)
      );
    })();

    return () => {
      unsub();
    };
  }, [id]);

  return (
    <ThemeProvider theme={videoTheme}>
      <MetaTags
        data={{
          ...metatags,
          description: metatags.description || description
        }}
      />
      <Plausible events={plausibleEvents} subject={{ type, id }} />
      <Container fixed>
        <Grid container>
          <Grid item xs={12}>
            <VideoHeader data={data} />
            <LedeVideo data={data} />
            <Box className={classes.body} my={2}>
              <HtmlContent html={description} />
            </Box>
            {ctaInlineEnd && <CtaRegion data={ctaInlineEnd} />}
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
  const type = 'file--videos';
  const data = getDataByResource(getState(), type, id);

  if (!data) {
    await dispatch<any>(fetchVideoData(id));
  }
};
