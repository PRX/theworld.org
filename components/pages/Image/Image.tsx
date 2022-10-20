/**
 * @file Image.tsx
 * Component for Image.
 */

import React, { useContext, useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Box, Container, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { CtaRegion } from '@components/CtaRegion';
import { AppContext } from '@contexts/AppContext';
import { HtmlContent } from '@components/HtmlContent';
import { LedeImage } from '@components/LedeImage';
import { MetaTags } from '@components/MetaTags';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import { RootState } from '@interfaces/state';
import { fetchAudioData } from '@store/actions/fetchAudioData';
import { getDataByResource, getCtaRegionData } from '@store/reducers';
import { imageStyles, imageTheme } from './Image.styles';
import { ImageHeader } from './components/AudioHeader';

export const Image = () => {
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
  const classes = imageStyles({});
  let data = getDataByResource(state, type, id);
  // const context = [`file:${data.id}`];

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
  const plausibleEvents: PlausibleEventArgs[] = [['Image', { props }]];

  useEffect(() => {
    if (!data.complete) {
      (async () => {
        // Get content data.
        await store.dispatch<any>(fetchAudioData(id));
        data = getDataByResource(state, type, id);
      })();
    }

    return () => {
      unsub();
    };
  }, [id]);

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
  const type = 'file--images';
  const data = getDataByResource(getState(), type, id);

  if (!data) {
    await dispatch<any>(fetchAudioData(id));
  }
};
