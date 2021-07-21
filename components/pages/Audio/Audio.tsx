/**
 * @file Audio.tsx
 * Component for Episode.
 */

import React, { useContext, useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import pad from 'lodash/pad';
import { Box, Container, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { AudioPlayer } from '@components/AudioPlayer';
import { CtaRegion } from '@components/CtaRegion';
import { AppContext } from '@contexts/AppContext';
import { HtmlContent } from '@components/HtmlContent';
import { MetaTags } from '@components/MetaTags';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import { RootState } from '@interfaces/state';
import { fetchCtaData, fetchAudioData } from '@store/actions';
import { getDataByResource, getCtaRegionData } from '@store/reducers';
import { audioStyles, audioTheme } from './Audio.styles';
import { AudioHeader } from './components/AudioHeader';

export const Audio = () => {
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
  const classes = audioStyles({});
  let data = getDataByResource(state, type, id);

  if (!data) {
    return null;
  }

  const {
    metatags,
    title,
    audioAuthor,
    audioTitle,
    audioType,
    season,
    dateBroadcast,
    description
  } = data;

  const ctaInlineEnd = getCtaRegionData(
    state,
    type,
    id as string,
    'tw_cta_region_content_inline_end'
  );

  // Plausible Events.
  const props = {
    Title: audioTitle,
    'Audio Type': audioType,
    'File Name': title,
    ...(season && {
      Season: season
    }),
    ...(dateBroadcast &&
      (() => {
        const dt = new Date(dateBroadcast * 1000);
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

  [...(audioAuthor || [])].forEach(person => {
    plausibleEvents.push([
      `Person: ${person.title}`,
      {
        props: { 'Page Type': 'Audio' }
      }
    ]);
  });

  useEffect(() => {
    if (!data.complete) {
      (async () => {
        // Get content data.
        await store.dispatch<any>(fetchAudioData(id));
        data = getDataByResource(state, type, id);
      })();
    }

    // Get CTA message data.
    const context = [`file:${data.id}`, `node:${data.program.id}`];
    (async () => {
      await store.dispatch<any>(
        fetchCtaData('tw_cta_regions_content', type, id, context)
      );
    })();

    return () => {
      unsub();
    };
  }, [id]);

  return (
    <ThemeProvider theme={audioTheme}>
      <MetaTags
        data={{
          ...metatags,
          description: metatags.description || description
        }}
      />
      <Plausible events={plausibleEvents} keys={[type, id]} />
      <Container fixed>
        <Grid container>
          <Grid item xs={12}>
            <AudioHeader data={data} />
            <AudioPlayer data={data} />
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
  const type = 'file--audio';
  const data = getDataByResource(getState(), type, id);

  if (!data) {
    await dispatch<any>(fetchAudioData(id));
  }
};
