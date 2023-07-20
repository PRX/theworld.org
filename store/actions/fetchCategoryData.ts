/**
 * @file fetchCategoryData.ts
 *
 * Actions to fetch data for category page.
 */
import type { AnyAction } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import type { Category, RootState } from '@interfaces';
import { fetchGqlCategory, fetchGqlCategoryPosts } from '@lib/fetch';
import { getCollectionData } from '@store/reducers';
import { appendResourceCollection } from './appendResourceCollection';

export const fetchCategoryData =
  (
    id: string,
    idType?: string
  ): ThunkAction<Promise<Category | undefined>, {}, {}, AnyAction> =>
  async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => RootState
  ) => {
    const state = getState();
    const type = 'term--category';
    const category = await fetchGqlCategory(id, idType);

    if (category) {
      // const ctaDataPromise = dispatch<any>(
      //   fetchCtaRegionGroupData('tw_cta_regions_landing')
      // );

      // // Set CTA filter props.
      // dispatch({
      //   type: 'SET_RESOURCE_CTA_FILTER_PROPS',
      //   payload: {
      //     filterProps: {
      //       type,
      //       id,
      //       props: {
      //         category: id
      //       }
      //     }
      //   } as ICtaFilterProps
      // });

      // Get first page of stories.
      const storiesCollection = getCollectionData(
        state,
        type,
        category.id,
        'stories'
      );

      if (!storiesCollection) {
        const posts = await fetchGqlCategoryPosts(category.id);

        if (posts) {
          dispatch(
            appendResourceCollection(posts, type, category.id, 'stories')
          );
        }
      }

      return category;
    }

    return undefined;
  };
