/**
 * @file fetchStoryData.ts
 *
 * Actions to fetch data for a story resource.
 */

import { fetchGqlStory } from '@lib/fetch';
import { IPriApiResource } from 'pri-api-library/types';
import _uniqBy from 'lodash/uniqBy';
// import { fetchCtaRegionGroupData } from './fetchCtaRegionGroupData';

export const decorateWithBylines = (story: IPriApiResource) => {
  const { byline: b, bylines: bs, ...other } = story;
  const bylinesMap: { [k: string]: IPriApiResource[] } = [
    ...(b?.reduce(
      (a: any, item: IPriApiResource) => [
        ...a,
        {
          creditType: item.creditType || { title: 'By' },
          person: item.person || item
        }
      ],
      []
    ) || []),
    ...(bs?.filter(({ person }) => !!person) || [])
  ].reduce((a, { creditType, person }) => {
    const key = creditType?.title || 'By';
    return {
      ...a,
      [key]: [...(a[key] || []), person]
    };
  }, {});
  const bylines: [string, IPriApiResource[]][] = Object.entries(bylinesMap).map(
    ([title, people]) => [title, _uniqBy(people, 'id')]
  );

  return {
    bylines: bylines?.length ? bylines : null,
    ...other
  };
};

export const fetchStoryData = async (id: string) => {
  const dataPromise = fetchGqlStory(id);

  // const ctaDataPromise = dispatch<any>(
  //   fetchCtaRegionGroupData('tw_cta_regions_content')
  // );

  const story = await dataPromise;
  // await ctaDataPromise;

  if (story) {
    // Set CTA filter props.
    // dispatch({
    //   type: 'SET_RESOURCE_CTA_FILTER_PROPS',
    //   payload: {
    //     filterProps: {
    //       type,
    //       id,
    //       props: {
    //         id,
    //         categories: [
    //           ...(story.categories?.nodes || []).map(({ id: tid }) => tid)
    //         ].filter((v: any) => !!v),
    //         program: story.programs?.nodes[0].id || null
    //       }
    //     }
    //   } as ICtaFilterProps
    // });
  }

  return story;
};
