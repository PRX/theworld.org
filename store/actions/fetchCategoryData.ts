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
    const type = 'term--category';
    const category = await fetchGqlCategory(id, idType);

    if (category) {
      const { episodes, ...categoryData } = category;
      const state = getState();

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
        const exclude = category.landingPage?.featuredPosts?.reduce(
          (a, post) => (post ? [...a, post.id] : a),
          []
        );
        const options = {
          ...(exclude && { exclude })
        };
        const posts = await fetchGqlCategoryPosts(category.id, options);

        if (posts) {
          dispatch(
            appendResourceCollection(posts, type, category.id, 'stories')
          );
        }
      }

      // Add first page of episodes to collections state.
      if (episodes) {
        dispatch(
          appendResourceCollection(episodes, type, category.id, 'episodes')
        );
      }

      return categoryData;
    }

    return undefined;
  };
