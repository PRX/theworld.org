/**
 * @file Story.tsx
 * Component for Story.
 */
import React, { useContext, useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { usePlausible } from 'next-plausible';
import pad from 'lodash/pad';
import { AppContext } from '@contexts/AppContext';
import { MetaTags } from '@components/MetaTags';
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
  const plausible = usePlausible();
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
  const {
    metatags,
    title,
    byline,
    dateBroadcast,
    datePublished,
    displayTemplate,
    resourceDevelopment
  } = data;
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

    // Plausible Events.
    const props = {
      Title: title,
      ...(displayTemplate && { 'Story Format': displayTemplate }),
      ...(resourceDevelopment && {
        'Resource Development': resourceDevelopment
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
        })()),
      ...(datePublished &&
        (() => {
          const dt = new Date(datePublished * 1000);
          const dtYear = dt.getFullYear();
          const dtMonth = pad(`${dt.getMonth() + 1}`, 2, '0');
          const dtDate = pad(`${dt.getDate()}`, 2, '0');
          return {
            'Published Year': `${dtYear}`,
            'Published Month': `${dtYear}-${dtMonth}`,
            'Published Date': `${dtYear}-${dtMonth}-${dtDate}`
          };
        })())
    };
    plausible('Story', { props });

    if (byline) {
      byline.forEach(({ person }) => {
        plausible(`Person: ${person.title}`, {
          props: { 'Page Type': 'Story' }
        });
      });
    }

    return () => {
      unsub();
    };
  }, [id]);

  return (
    <>
      <MetaTags data={metatags} />
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
