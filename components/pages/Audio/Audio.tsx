/**
 * @file Audio.tsx
 * Component for Episode.
 */

import React, { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { Box, Container, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { CtaRegion } from '@components/CtaRegion';
import { AppContext } from '@contexts/AppContext';
import { HtmlContent } from '@components/HtmlContent';
import { MetaTags } from '@components/MetaTags';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import { parseUtcDate } from '@lib/parse/date';
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
  const data = getDataByResource(state, type, id);

  if (!data) {
    return null;
  }

  const {
    metatags: dataMetatags,
    title,
    audioAuthor,
    audioTitle,
    audioType,
    season,
    broadcastDate,
    description
  } = data;
  const metatags = {
    ...dataMetatags,
    ...(broadcastDate && {
      pubdate: parseUtcDate(broadcastDate * 1000).join('-')
    })
  };

  // CTA data.
  const ctaInlineEnd = getCtaRegionData(
    state,
    'tw_cta_region_content_inline_end',
    type,
    id
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
    return () => {
      unsub();
    };
  }, []);

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
            <AudioHeader data={data} />
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
