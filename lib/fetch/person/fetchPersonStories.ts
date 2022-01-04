/**
 * Fetch stories for a person from CMS API.
 *
 * @param id Person data or identifier.
 * @param page Page number to fetch.
 * @param range Number of items per page.
 * @param exclude Array of id strings to not exclude from query.
 */

import _uniq from 'lodash/uniq';
import _orderBy from 'lodash/orderBy';
import {
  PriApiResourceResponse,
  IPriApiResource,
  IPriApiResourceResponse,
  IPriApiCollectionResponse
} from 'pri-api-library/types';
import { fetchPriApiItem, fetchPriApiQuery } from '../api/fetchPriApi';
import { basicStoryParams } from '../api/params';

export const fetchPersonStories = async (
  id: string | IPriApiResource,
  page: number = 1,
  range: number = 15,
  exclude: string[] | string = null
): Promise<PriApiResourceResponse> => {
  let person: IPriApiResource;

  if (typeof id === 'string') {
    person = await fetchPriApiItem('node--people', id).then(
      (resp: IPriApiResourceResponse) => resp && resp.data
    );
  } else {
    person = id;
  }

  if (person) {
    const { featuredStories } = person;
    const excluded =
      (exclude || featuredStories) &&
      [
        ...(exclude && Array.isArray(exclude) ? exclude : [exclude]),
        ...(featuredStories && featuredStories.map(({ id: i }) => i))
      ]
        .filter((v: string) => !!v)
        .reduce((a, v, i) => ({ ...a, [`filter[id][value][${i}]`]: v }), {});

    const fcForPerson = await fetchPriApiQuery(
      'field_collection--story_creators',
      {
        'filter[person][value]': person.id,
        'filter[person][operator]': '"CONTAINS"',
        fields: 'id',
        sort: '-id',
        range: range || 15,
        page
      }
    ).then((resp: IPriApiCollectionResponse) => resp);
    const { data: fcData, ...other } = fcForPerson;
    const fcIds = _uniq(fcData.map(fc => fc.id as string));

    // Fetch list of stories. Paginated.
    const stories = (await Promise.all(
      fcIds.map(fcId =>
        fetchPriApiQuery('node--stories', {
          ...basicStoryParams,
          'filter[status]': 1,
          'filter[byline][value]': fcId,
          'filter[byline][operator]': '"CONTAINS"',
          ...(excluded && {
            ...excluded,
            'filter[id][operator]': 'NOT IN'
          }),
          sort: '-id'
        }).then((resp: IPriApiCollectionResponse) => resp.data[0])
      )
    )) as IPriApiResource[];

    const data = _orderBy(stories, story => story.datePublished, 'desc');

    // Build response object.
    const apiResp = {
      data,
      ...other
    };

    return apiResp;
  }

  return false;
};
