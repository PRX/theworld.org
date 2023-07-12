/**
 * @file Video.tsx
 * Component for Episode.
 */

import type { RootState } from '@interfaces';
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
import { getDataByResource, getCtaRegionData } from '@store/reducers';
import { videoStyles, videoTheme } from './Video.styles';
import { VideoHeader } from './components/VideoHeader';

export const Video = () => {
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
  const data = getDataByResource<any>(state, type, id);
  const { metatags, title, description } = data;
  const { cx } = videoStyles();

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

  useEffect(
    () => () => {
      unsub();
    },
    [unsub]
  );

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
            <Box className={cx('body')} my={2}>
              <HtmlContent html={description} />
            </Box>
            {ctaInlineEnd && <CtaRegion data={ctaInlineEnd} />}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
