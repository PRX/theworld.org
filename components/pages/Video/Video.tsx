/**
 * @file Video.tsx
 * Component for Episode.
 */

import React, { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { Box, Container, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { LedeVideo } from '@components/LedeVideo';
import { CtaRegion } from '@components/CtaRegion';
import { AppContext } from '@contexts/AppContext';
import { HtmlContent } from '@components/HtmlContent';
import { MetaTags } from '@components/MetaTags';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
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

  if (!data) {
    return null;
  }

  const { metatags, title, description } = data;

  // CTA data.
  const ctaInlineEnd = getCtaRegionData(
    state,
    'tw_cta_region_content_inline_end',
    type,
    id
  );

  // Plausible Events.
  const props = {
    Title: title
  };
  const plausibleEvents: PlausibleEventArgs[] = [['Video', { props }]];

  useEffect(() => {
    if (!data.complete) {
      (async () => {
        // Get content data.
        await store.dispatch<any>(fetchVideoData(id));
        data = getDataByResource(state, type, id);
      })();
    }

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
