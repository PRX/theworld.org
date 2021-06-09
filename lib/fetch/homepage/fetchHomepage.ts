/**
 * Fetch homepage data from CMS API.
 */

import {
  IPriApiCollectionResponse,
  IPriApiResourceResponse,
  PriApiResourceResponse
} from 'pri-api-library/types';
import { fetchPriApiQuery } from '../api/fetchPriApi';
import { basicStoryParams } from '../api/params';
import { fetchProgram } from '../program';

export const fetchHomepage = async (): Promise<PriApiResourceResponse> => {
  const [program, latestStories] = await Promise.all([
    fetchProgram('3704').then(
      (resp: IPriApiResourceResponse) => resp && resp.data
    ),
    fetchPriApiQuery('node--stories', {
      ...basicStoryParams,
      'filter[status]': 1,
      'filter[program][value]': 3704,
      'filter[program][operator]': '<>',
      sort: '-date_published',
      range: 10
    }).then((resp: IPriApiCollectionResponse) => resp)
  ]);

  const resp = {
    data: {
      ...program,
      latestStories
    }
  } as IPriApiResourceResponse;

  return resp;
};