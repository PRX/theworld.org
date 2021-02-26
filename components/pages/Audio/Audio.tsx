/**
 * @file Audio.tsx
 * Component for Episode.
 */
import React, { useContext, useEffect } from 'react';
import { IncomingMessage } from 'http';
import Head from 'next/head';
import Link from 'next/link';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Hidden,
  ListSubheader,
  Typography
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  EqualizerRounded,
  MenuBookRounded,
  NavigateNext
} from '@material-ui/icons';
import { AudioPlayer } from '@components/AudioPlayer';
import {
  Sidebar,
  SidebarAudioList,
  SidebarCta,
  SidebarHeader,
  SidebarFooter,
  SidebarList
} from '@components/Sidebar';
import { CtaRegion } from '@components/CtaRegion';
import { AppContext } from '@contexts/AppContext';
import { RootState } from '@interfaces/state';
import {
  appendResourceCollection,
  fetchCtaData,
  fetchAudioData
} from '@store/actions';
import {
  getDataByResource,
  getCollectionData,
  getCtaRegionData
} from '@store/reducers';
import { audioStyles, audioTheme } from './Audio.styles';
import { AudioHeader } from './components/AudioHeader';

export const Audio = () => {
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const store = useStore();
  const state = store.getState();
  const classes = audioStyles({});
  let data = getDataByResource(state, type, id);

  if (!data) {
    return null;
  }

  const {
    audioAuthor,
    audioTitle,
    broadcastDate,
    description,
    credit,
    transcript,
    program
  } = data;

  const ctaInlineEnd = getCtaRegionData(
    state,
    type,
    id as string,
    'tw_cta_region_content_inline_end'
  );
  const ctaSidebarTop = getCtaRegionData(
    state,
    type,
    id as string,
    'tw_cta_region_content_sidebar_01'
  );
  const ctaSidebarBottom = getCtaRegionData(
    state,
    type,
    id as string,
    'tw_cta_region_content_sidebar_02'
  );
  const { items: latestStories } = getCollectionData(
    state,
    'app',
    null,
    'latest'
  );

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
  }, [id]);

  return (
    <ThemeProvider theme={audioTheme}>
      <Head>
        <title>{audioTitle}</title>
        {/* TODO: WIRE UP ANALYTICS */}
      </Head>
      <Container fixed>
        <Grid container>
          <Grid item xs={12}>
            <AudioHeader data={data} />
            <AudioPlayer data={data} />
            <Box className={classes.main}>
              <Box className={classes.content}>
                <Box
                  className={classes.body}
                  my={2}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
                {ctaInlineEnd && <CtaRegion data={ctaInlineEnd} />}
              </Box>
              <Sidebar container className={classes.sidebar}>
                {ctaSidebarTop && (
                  <Hidden smDown>
                    <Sidebar item>
                      <SidebarCta data={ctaSidebarTop} />
                    </Sidebar>
                  </Hidden>
                )}
                {latestStories && (
                  <Sidebar item elevated>
                    <SidebarHeader>
                      <Typography variant="h2">
                        <MenuBookRounded /> Latest world news headlines
                      </Typography>
                    </SidebarHeader>
                    <SidebarList disablePadding data={latestStories[1]} />
                    <SidebarFooter>
                      <Link href="/latest/stories" passHref>
                        <Button
                          component="a"
                          color="primary"
                          variant="contained"
                          fullWidth
                          disableElevation
                        >
                          More stories <NavigateNext />
                        </Button>
                      </Link>
                    </SidebarFooter>
                  </Sidebar>
                )}
                {ctaSidebarBottom && (
                  <Hidden smDown>
                    <Sidebar item>
                      <SidebarCta data={ctaSidebarBottom} />
                    </Sidebar>
                  </Hidden>
                )}
              </Sidebar>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

Audio.fetchData = (
  id: string,
  req: IncomingMessage
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const type = 'file--audio';
  const data = getDataByResource(getState(), type, id);

  if (!data) {
    await dispatch<any>(fetchAudioData(id, req));
  }
};
