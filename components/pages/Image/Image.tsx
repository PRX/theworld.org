/**
 * @file Image.tsx
 * Component for Image.
 */

import type { RootState } from '@interfaces';
import React, { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { Box, Container, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { CtaRegion } from '@components/CtaRegion';
import { AppContext } from '@contexts/AppContext';
import { HtmlContent } from '@components/HtmlContent';
import { LedeImage } from '@components/LedeImage';
import { MetaTags } from '@components/MetaTags';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import { getDataByResource, getCtaRegionData } from '@store/reducers';
import { imageStyles, imageTheme } from './Image.styles';
import { ImageHeader } from './components/AudioHeader';

export const Image = () => {
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
  const { cx } = imageStyles();
  const data = getDataByResource<any>(state, type, id);
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
  const plausibleEvents: PlausibleEventArgs[] = [['Image', { props }]];

  useEffect(
    () => () => {
      unsub();
    },
    [unsub]
  );

  return (
    <ThemeProvider theme={imageTheme}>
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
            <ImageHeader data={data} />
            <LedeImage data={data} />
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
