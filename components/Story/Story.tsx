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
import { ContentContext } from '@contexts/Content.context';
import { RootState } from '@interfaces/state';
import { fetchApiStory, fetchApiCategoryStories } from '@lib/fetch';
import { appendResourceCollection } from '@store/actions';
import { getDataByResource, getCollectionData } from '@store/reducers';
import { layoutComponentMap } from './layouts';

export const Story = () => {
  const { type, id } = useContext(ContentContext);
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
) => {
  const type = 'node--stories';
  const state = getState();
  const data = getDataByResource(state, type, id);
  const related = getCollectionData(state, type, id, 'related');

  // Get missing content data.
  if (!data) {
    dispatch({
      type: 'FETCH_CONTENT_DATA_REQUEST',
      payload: {
        type: 'node--stories',
        id
      }
    });

    const apiData = await fetchApiStory(id, req);

    dispatch({
      type: 'FETCH_CONTENT_DATA_SUCCESS',
      payload: apiData
    });
  }

  // TODO: Get missing related stories data.
  if (!related) {
    const { primaryCategory } = getDataByResource(getState(), type, id);

    if (primaryCategory) {
      dispatch({
        type: 'FETCH_COLLECTION_DATA_REQUEST',
        payload: {
          type,
          id,
          collection: 'related'
        }
      });

      const { data: apiData } = await fetchApiCategoryStories(
        primaryCategory.id,
        1,
        4,
        [id],
        req
      );

      if (apiData) {
        appendResourceCollection(dispatch, getState, null)(
          apiData,
          type,
          id,
          'related'
        );
      }
    }
  }

  // TODO: Get missing CTA message data.
};
