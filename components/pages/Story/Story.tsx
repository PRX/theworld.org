/**
 * @file Story.tsx
 * Component for Story.
 */
import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppContext } from '@contexts/AppContext';
import { RootState } from '@interfaces/state';
import { fetchApiCategoryStories } from '@lib/fetch';
import {
  appendResourceCollection,
  fetchCtaData,
  fetchStoryData
} from '@store/actions';
import { getDataByResource, getCollectionData } from '@store/reducers';
import { layoutComponentMap } from './layouts';

export const Story = () => {
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const store = useStore();
  const [state, updateForce] = useState(store.getState());
  const unsub = store.subscribe(() => {
    updateForce(store.getState());
  });
  let data = getDataByResource(state, type, id);
  const { title, displayTemplate } = data;
  const LayoutComponent =
    layoutComponentMap[displayTemplate] || layoutComponentMap.standard;

  useEffect(() => {
    if (!data.complete) {
      (async () => {
        // Get content data.
        await store.dispatch<any>(fetchStoryData(id));
        data = getDataByResource(state, type, id);
      })();
    }

    // Get missing related stories data.
    const collection = 'related';
    const { primaryCategory } = data;
    const related =
      primaryCategory &&
      getCollectionData(
        state,
        primaryCategory.type,
        primaryCategory.id,
        collection
      );

    if (!related && primaryCategory) {
      (async () => {
        const apiData = await fetchApiCategoryStories(
          primaryCategory.id,
          1,
          5,
          'primary_category'
        );

        if (apiData) {
          store.dispatch<any>(
            appendResourceCollection(
              apiData,
              primaryCategory.type,
              primaryCategory.id,
              collection
            )
          );
        }
      })();
    }

    // Get CTA message data.
    const context = [
      `node:${data.id}`,
      `node:${data.program?.id}`,
      `term:${data.primaryCategory?.id}`,
      ...((data.categories &&
        !!data.categories.length &&
        data.categories.filter(v => !!v).map(({ id: tid }) => `term:${tid}`)) ||
        []),
      ...((data.vertical &&
        !!data.vertical.length &&
        data.vertical.filter(v => !!v).map(({ tid }) => `term:${tid}`)) ||
        [])
    ];
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
    <>
      <Head>
        <title>{title}</title>
        {/* TODO: WIRE UP ANALYTICS */}
      </Head>
      <LayoutComponent data={data} />
    </>
  );
};

export const fetchData = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const type = 'node--stories';
  const data = getDataByResource(getState(), type, id);

  if (!data) {
    // Get content data.
    await dispatch<any>(fetchStoryData(id));
  }
};
