/**
 * @file Audio.tsx
 * Component for Episode.
 */

import { useContext, useEffect, useRef, useState } from 'react';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Box, Container, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { AudioPlayer } from '@components/AudioPlayer';
import { CtaRegion } from '@components/CtaRegion';
import { AppContext } from '@contexts/AppContext';
import { HtmlContent } from '@components/HtmlContent';
import { MetaTags } from '@components/MetaTags';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import { RootState } from '@interfaces/state';
import { parseUtcDate } from '@lib/parse/date';
import { fetchCtaData } from '@store/actions/fetchCtaData';
import { fetchAudioData } from '@store/actions/fetchAudioData';
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
  const data = useRef(getDataByResource(state, type, id));

  const {
    complete,
    metatags: dataMetatags,
    title,
    audioAuthor,
    audioTitle,
    audioType,
    season,
    description,
    program,
    broadcastDate,
    description
  } = data;
  const metatags = {
    ...dataMetatags,
    ...(broadcastDate && {
      pubdate: parseUtcDate(broadcastDate * 1000).join('-')
    })
  };

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
    ...(broadcastDate &&
      (() => {
        const dt = parseUtcDate(broadcastDate * 1000);
        return {
          'Broadcast Year': dt[0],
          'Broadcast Month': dt.slice(0, 1).join('-'),
          'Broadcast Date': dt.join('-')
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
    if (!complete) {
      (async () => {
        // Get content data.
        await store.dispatch<any>(fetchAudioData(id));
        data.current = getDataByResource(state, type, id);
      })();
    }

    // Get CTA message data.
    const context = [
      `file:${data.id}`,
      ...(program ? [`node:${program.id}`] : [])
    ];
    (async () => {
      await store.dispatch<any>(
        fetchCtaData(type, id, 'tw_cta_regions_content', context)
      );
    })();

    return () => {
      unsub();
    };
  }, [complete, id, program?.id, state, store, type, unsub]);

  return (
    <ThemeProvider theme={audioTheme}>
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
            <AudioHeader data={data.current} />
            <AudioPlayer data={data.current} />
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
