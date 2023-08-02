/**
 * @file fetchTagData.ts
 *
 * Actions to fetch data for tag page.
 */
import type { AnyAction } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import type { RootState, Maybe, PostTag } from '@interfaces';
import { fetchGqlTag, fetchGqlTagPosts } from '@lib/fetch';
import { getCollectionData } from '@store/reducers';
import { appendResourceCollection } from './appendResourceCollection';

export const fetchTagData =
  (
    id: string,
    idType?: string,
    taxonomySingleName?: Maybe<string>
  ): ThunkAction<Promise<PostTag | undefined>, {}, {}, AnyAction> =>
  async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => RootState
  ) => {
    const type = 'term--tag';
    const tag = await fetchGqlTag(id, idType, taxonomySingleName);

    if (tag) {
      const { episodes, ...tagData } = tag;
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
      //         tag: id
      //       }
      //     }
      //   } as ICtaFilterProps
      // });

      // Get first page of stories.
      // Has to be synchronous so we known what featured posts to exclude.
      const storiesCollection = getCollectionData(
        state,
        type,
        tag.id,
        'stories'
      );

      if (!storiesCollection) {
        const exclude = tag.landingPage?.featuredPosts?.reduce(
          (a, post) => (post ? [...a, post.id] : a),
          []
        );
        const options = {
          ...(exclude && { exclude })
        };
        const posts = await fetchGqlTagPosts(
          tag.id,
          options,
          taxonomySingleName
        );

        if (posts) {
          dispatch(
            appendResourceCollection(posts, type, tag.id, 'stories', options)
          );
        }
      }

      // Add first page of episodes to collections state.
      if (episodes) {
        dispatch(appendResourceCollection(episodes, type, tag.id, 'episodes'));
      }

      return tagData;
    }

    return undefined;
  };
