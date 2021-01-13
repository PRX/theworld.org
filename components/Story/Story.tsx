/**
 * @file Story.tsx
 * Component for Story.
 */
import React, { useContext } from 'react';
import { IncomingMessage } from 'http';
import Head from 'next/head';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppContext } from '@contexts/AppContext';
import { RootState } from '@interfaces/state';
import { fetchApiStory, fetchApiCategoryStories } from '@lib/fetch';
import { appendResourceCollection, fetchCtaData } from '@store/actions';
import { getDataByResource, getCollectionData } from '@store/reducers';
import { layoutComponentMap } from './layouts';

export const Story = () => {
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const store = useStore();
  const state = store.getState();
  const data = getDataByResource(state, type, id);

  if (!data) {
    return null;
  }

  const { title, displayTemplate } = data;
  const LayoutComponent =
    layoutComponentMap[displayTemplate] || layoutComponentMap.standard;

  return (
    <>
      <Head>
        <title>{title}</title>
        {/* TODO: WIRE UP ANALYTICS */}
      </Head>
      <LayoutComponent data={data} />
    </>
  );
};

Story.fetchData = (
  id: string,
  req: IncomingMessage
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const type = 'node--stories';
  const state = getState();
  let data = getDataByResource(state, type, id);

  // Get missing content data.
  if (!data) {
    dispatch({
      type: 'FETCH_CONTENT_DATA_REQUEST',
      payload: {
        type,
        id
      }
    });

    data = await fetchApiStory(id, req);

    dispatch({
      type: 'FETCH_CONTENT_DATA_SUCCESS',
      payload: data
    });
  }

  // TODO: Get missing related stories data.
  const collection = 'related';
  const { primaryCategory } = getDataByResource(getState(), type, id);
  const related =
    primaryCategory &&
    getCollectionData(
      state,
      primaryCategory.type,
      primaryCategory.id,
      collection
    );

  if (!related) {
    if (primaryCategory) {
      dispatch({
        type: 'FETCH_COLLECTION_DATA_REQUEST',
        payload: {
          type: primaryCategory.type,
          id: primaryCategory.id,
          collection
        }
      });

      const { data: apiData } = await fetchApiCategoryStories(
        primaryCategory.id,
        1,
        5,
        undefined,
        req
      );

      if (apiData) {
        appendResourceCollection(dispatch, getState, null)(
          apiData,
          primaryCategory.type,
          primaryCategory.id,
          collection
        );
      }
    }
  }

  // Get CTA message data.
  const context = [
    `node:${data.id}`,
    `node:${data.program?.id}`,
    `term:${data.primaryCategory?.id}`,
    ...((data.categories &&
      data.categories.length &&
      data.categories.map(({ id: tid }) => `term:${tid}`)) ||
      []),
    ...((data.vertical &&
      data.vertical.length &&
      data.vertical.map(({ tid }) => `term:${tid}`)) ||
      [])
  ];
  await dispatch<any>(
    fetchCtaData('tw_cta_regions_content', type, id, context, req)
  );
};
