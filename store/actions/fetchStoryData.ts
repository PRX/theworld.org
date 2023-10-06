/**
 * @file fetchStoryData.ts
 *
 * Actions to fetch data for a story resource.
 */

import { fetchGqlStory } from '@lib/fetch';
import { IPriApiResource } from 'pri-api-library/types';
import _uniqBy from 'lodash/uniqBy';
import { PostIdType } from '@interfaces';

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

export const fetchStoryData = async (id: string, idType?: PostIdType) => {
  const story = await fetchGqlStory(id, idType);

  return story;
};
