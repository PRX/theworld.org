/**
 * @file Category.tsx
 * Component for Category.
 */
import React, { useContext, useEffect, useState } from 'react';
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
  Hidden,
  ListSubheader,
  Typography
} from '@material-ui/core';
import { MenuBookRounded, NavigateNext } from '@material-ui/icons';
import { LandingPage } from '@components/LandingPage';
import { CtaRegion } from '@components/CtaRegion';
import {
  Sidebar,
  SidebarCta,
  SidebarFooter,
  SidebarHeader,
  SidebarList
} from '@components/Sidebar';
import { StoryCard } from '@components/StoryCard';
import { fetchApiPerson, fetchApiPersonStories } from '@lib/fetch';
import { SidebarContent } from '@components/Sidebar/SidebarContent';
import { AppContext } from '@contexts/AppContext';
import { RootState } from '@interfaces/state';
import { appendResourceCollection, fetchCtaData } from '@store/actions';
import {
  getCollectionData,
  getCtaRegionData,
  getDataByResource
} from '@store/reducers';
import { BioHeader } from '@components/BioHeader';

export const Bio = () => {
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const store = useStore();
  const state = store.getState();
  const data = getDataByResource(state, type, id);
  const ctaSidebarTop = getCtaRegionData(
    state,
    type,
    id,
    'tw_cta_region_landing_sidebar_01'
  );
  const ctaSidebarBottom = getCtaRegionData(
    state,
    type,
    id,
    'tw_cta_region_landing_sidebar_02'
  );
  const storiesState = getCollectionData(state, type, id, 'stories');
  const { items: stories, page } = storiesState;
  const { items: latestStories } = getCollectionData(
    state,
    'app',
    undefined,
    'latest'
  );
  const { title, teaser, image, bio, program, position } = data;
  const [loading, setLoading] = useState(false);
  const [oldscrollY, setOldScrollY] = useState(0);

  useEffect(() => {
    // Something wants to keep the last interacted element in view.
    // When we have loaded a new page, we want to counter this scoll change.
    window.scrollBy({ top: oldscrollY - window.scrollY });
    setOldScrollY(window.scrollY);
  }, [page]);

  const loadMoreStories = async () => {
    setLoading(true);

    const { data: moreStories } = await fetchApiPersonStories(id, page + 1);

    setOldScrollY(window.scrollY);
    setLoading(false);

    store.dispatch<any>(
      appendResourceCollection([...moreStories], type, id, 'stories')
    );
  };

  const mainElements = [
    {
      key: 'main top',
      children: (
        <Box mt={3}>
          {bio && (
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: bio }}
            />
          )}
        </Box>
      )
    },
    {
      key: 'main bottom',
      children: stories && (
        <Box mt={6}>
          <Typography component="h2" variant="h4">
            Recent Stories
          </Typography>
          {stories.map((item: IPriApiResource, index: number) => (
            <Box mt={index ? 2 : 3} key={item.id}>
              <StoryCard
                data={item}
                feature={item.displayTemplate !== 'standard'}
              />
            </Box>
          ))}
          <Box mt={3}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              fullWidth
              disabled={loading}
              onClick={() => {
                loadMoreStories();
              }}
            >
              {loading ? 'Loading Stories...' : 'More Stories'}
            </Button>
          </Box>
        </Box>
      )
    }
  ];

  const sidebarElements = [
    {
      key: 'sidebar top',
      children: (
        <Box mt={3}>
          <Box mt={2}>
            <Sidebar item elevated>
              {/* SEGMENTS */}
            </Sidebar>
          </Box>
          {ctaSidebarTop && (
            <Box mt={3}>
              <Hidden only="sm">
                <SidebarCta data={ctaSidebarTop} />
              </Hidden>
              <Hidden xsDown mdUp>
                <CtaRegion data={ctaSidebarTop} />
              </Hidden>
            </Box>
          )}
        </Box>
      )
    },
    {
      key: 'sidebar bottom',
      children: (
        <Box mt={3}>
          <Sidebar item elevated>
            <SidebarHeader>
              <Typography variant="h2">
                <MenuBookRounded /> Latest world news headlines
              </Typography>
            </SidebarHeader>
            <SidebarList disablePadding data={latestStories} />
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
          {ctaSidebarBottom && (
            <Box mt={3}>
              <Hidden only="sm">
                <SidebarCta data={ctaSidebarBottom} />
              </Hidden>
              <Hidden xsDown mdUp>
                <CtaRegion data={ctaSidebarBottom} />
              </Hidden>
            </Box>
          )}
        </Box>
      )
    }
  ];

  return (
    <>
      <Head>
        <title>
          {title}
          {page > 1 ? ` - Page ${page}` : ''}
        </title>
      </Head>
      <BioHeader
        title={title}
        position={position}
        subhead={teaser}
        image={image}
        program={program}
      />
      <LandingPage main={mainElements} sidebar={sidebarElements} />
    </>
  );
};

Bio.fetchData = (
  id: string,
  req: IncomingMessage
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const type = 'node--people';
  const state = getState();
  const data = getDataByResource(state, type, id);

  // Get missing content data.
  if (!data) {
    dispatch({
      type: 'FETCH_CONTENT_DATA_REQUEST',
      payload: {
        type,
        id
      }
    });

    const { stories, segments, ...payload } = await fetchApiPerson(id, req);

    dispatch({
      type: 'FETCH_CONTENT_DATA_SUCCESS',
      payload
    });

    if (stories) {
      dispatch(appendResourceCollection([...stories], type, id, 'stories'));
    }

    if (segments) {
      dispatch(appendResourceCollection([...segments], type, id, 'segments'));
    }
  }

  // Get CTA message data.
  const context = [`node:${id}`];
  await dispatch<any>(
    fetchCtaData('tw_cta_regions_landing', type, id, context, req)
  );
};
