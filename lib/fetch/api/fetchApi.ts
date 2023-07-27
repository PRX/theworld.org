/**
 * @file fetchApi.js
 * Exports a mechanism that makes GET requests to API easier to manage.
 */

import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import type { ParsedUrlQuery } from 'querystring';
import type {
  IPriApiCollectionResponse,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import type {
  INewsletterOptions,
  INewsletterData,
  ICMApiCustomField,
  ContributorToPostConnection,
  IApp,
  ProgramToPostConnection,
  CollectionQueryOptions,
  CategoryToPostConnection,
  PostConnection,
  Maybe
} from '@interfaces';
import type {
  fetchGqlAudio,
  fetchGqlEpisode,
  fetchGqlProgram,
  fetchGqlStory,
  fetchQuerySearch
} from '@lib/fetch';
import { format } from 'url';

/**
 * Method that simplifies GET requests.
 *
 * @param path
 *    Path to the resource being requested.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 * @param query
 *    Query object.
 * @param body
 *    Data object to send as JSON. Will convert request to POST.
 *
 * @returns
 *    Denormalized response to request, or error object.
 */
export async function fetchApi<T>({
  path,
  query,
  body,
  init
}: {
  path: string;
  query?: ParsedUrlQuery;
  body?: Object;
  init?: RequestInit;
}): Promise<T | undefined> {
  const url = format({
    pathname: `/api/${path}`,
    query: {
      ...(query || {})
    }
  });

  return fetch(
    url,
    body
      ? {
          ...init,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }
      : {
          ...init
        }
  ).then((r) => (r.status === 200 ? (r.json() as T) : undefined));
}

/**
 * Method that simplifies GET queries for resource item using URL path alias.
 *
 * @param alias
 *    Alias used by resource item to display data.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Denormalized resource item.
 */
export const fetchApiQueryAlias = async (alias: string, init?: RequestInit) =>
  fetchApi<any>({
    path: `query/alias/${alias.replace(/^\/+|\/+$/, '')}`,
    init
  });

/**
 * Method that simplifies GET queries for app data.
 *
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    App data object.
 */
export const fetchApiApp = async (init?: RequestInit) =>
  fetchApi<IApp>({ path: 'app', init });

/**
 * Method that simplifies GET queries for homepage data.
 *
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Homepage data object.
 */
export const fetchApiHomepage = async (init?: RequestInit) =>
  fetchApi({ path: 'homepage', init });

/**
 * Method that simplifies GET queries for newsletter data.
 *
 * @param id
 *    API id of newsletter.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Story data object.
 */
export const fetchApiNewsletter = async (id: string, init?: RequestInit) =>
  fetchApi({ path: `newsletter/${id}`, init });

/**
 * Post subscription data to Campaign Monitor.
 *
 * @param newsletter Newsletter data object.
 * @param options Newsletter subscription options.
 */
export const postNewsletterSubscription = async (
  newsletter: INewsletterData,
  options: INewsletterOptions,
  init?: RequestInit
) => {
  const { emailAddress } = newsletter;
  const { listId, customFields: cflds } = {
    listId: '04472db22d3fa6920bb38f18358b0f72',
    ...options
  };
  const customFields =
    cflds &&
    Object.entries(cflds).map(
      ([Key, Value]: [string, string]): ICMApiCustomField => ({
        Key,
        Value
      })
    );
  const payload = {
    listId,
    emailAddress,
    customFields
  };
  return fetch('/api/newsletter/subscribe', {
    ...init,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then((r) => r.json());
};

/**
 * Method that simplifies GET queries for story data.
 *
 * @param id
 *    API id of story.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Story data object.
 */
export const fetchApiStory = async (id: number, init?: RequestInit) =>
  fetchApi<ReturnType<typeof fetchGqlStory>>({ path: `story/${id}`, init });

/**
 * Method that simplifies GET queries for episode data.
 *
 * @param id
 *    API id of episode.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Episode data object.
 */
export const fetchApiEpisode = async (id: string, init?: RequestInit) =>
  fetchApi<ReturnType<typeof fetchGqlEpisode>>({ path: `episode/${id}`, init });

/**
 * Method that simplifies GET queries for audio file data.
 *
 * @param id
 *    API id of audio file.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Audio file data object.
 */
export const fetchApiFileAudio = async (id: string, init?: RequestInit) =>
  fetchApi<ReturnType<typeof fetchGqlAudio>>({
    path: `file/audio/${id}`,
    init
  });

/**
 * Method that simplifies GET queries for video file data.
 *
 * @param id
 *    API id of video file.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Video file data object.
 */
export const fetchApiFileVideo = async (id: string, init?: RequestInit) =>
  fetchApi<IPriApiResourceResponse>({ path: `file/video/${id}`, init });

/**
 * Method that simplifies GET queries for image file data.
 *
 * @param id
 *    API id of image file.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Image file data object.
 */
export const fetchApiFileImage = async (id: string, init?: RequestInit) =>
  fetchApi<IPriApiResourceResponse>({ path: `file/image/${id}`, init });

/**
 * Method that simplifies GET queries for program data.
 *
 * @param id
 *    API id of program.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Story data object.
 */
export const fetchApiProgram = async (id: string, init?: RequestInit) =>
  fetchApi<ReturnType<typeof fetchGqlProgram>>({ path: `program/${id}`, init });

/**
 * Method that simplifies GET queries for program stories data.
 *
 * @param id
 *    API id of program.
 * @param options
 *    Collection query options.
 * @param init
 *    Fetch init options.
 *
 * @returns
 *    Story collection data object.
 */
export const fetchApiProgramStories = async (
  id: string,
  options?: CollectionQueryOptions,
  init?: RequestInit
) => {
  const { cursor, pageSize, exclude } = options || {};
  return fetchApi<ProgramToPostConnection>({
    path: `program/${id}/posts`,
    query: {
      ...(options && { c: cursor }),
      ...(pageSize && { f: `${pageSize}` }),
      ...(exclude && { e: exclude })
    },
    init
  });
};

/**
 * Method that simplifies GET queries for program stories data.
 *
 * @param id
 *    API id of program.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Episode collection data object.
 */
export const fetchApiProgramEpisodes = async (
  id: string,
  options?: CollectionQueryOptions,
  init?: RequestInit
) => {
  const { cursor, pageSize, exclude } = options || {};
  return fetchApi<ProgramToPostConnection>({
    path: `program/${id}/episodes`,
    query: {
      ...(options && { c: cursor }),
      ...(pageSize && { f: `${pageSize}` }),
      ...(exclude && { e: exclude })
    },
    init
  });
};

/**
 * Method that simplifies GET queries for category data.
 *
 * @param id
 *    API id of category.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Category data object.
 */
export const fetchApiCategory = async (id: string, init?: RequestInit) =>
  fetchApi<IPriApiResourceResponse>({ path: `category/${id}`, init });

/**
 * Method that simplifies GET queries for category stories data.
 *
 * @param id
 *    API id of category.
 * @param page
 *    Page number of stories to return.
 * @param range
 *    Number of stories to return for the page.
 * @param field
 *    Name of field prop to look for category reference on stories.
 * @param exclude
 *    Array of story ids to exclude from query.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Promise that returns Collection of Story data objects.
 */
export const fetchApiCategoryStories = async (
  id: string,
  options?: CollectionQueryOptions,
  init?: RequestInit
) => {
  const { cursor, pageSize, exclude } = options || {};
  return fetchApi<CategoryToPostConnection>({
    path: `category/${id}/posts`,
    query: {
      ...(options && { c: cursor }),
      ...(pageSize && { f: `${pageSize}` }),
      ...(exclude && { e: exclude })
    },
    init
  });
};

/**
 * Method that simplifies GET queries for tag stories data.
 *
 * @param id
 *    API id of tag.
 * @param taxonomyRestBase
 *    Rest base of tag's taxonomy.
 * @param options
 *    Collection query options.
 * @param init
 *    Fetch init options.
 *
 * @returns
 *    Story collection data object.
 */
export const fetchApiTagStories = async (
  id: string,
  taxonomyRestBase?: Maybe<string>,
  options?: CollectionQueryOptions,
  init?: RequestInit
) => {
  const { cursor, pageSize, exclude } = options || {};
  return fetchApi<PostConnection>({
    path: `${taxonomyRestBase || 'tags'}/${id}/posts`,
    query: {
      ...(options && { c: cursor }),
      ...(pageSize && { f: `${pageSize}` }),
      ...(exclude && { e: exclude })
    },
    init
  });
};

/**
 * Method that simplifies GET queries for tag stories data.
 *
 * @param id
 *    API id of tag.
 * @param taxonomyRestBase
 *    Name of tag's taxonomy.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Episode collection data object.
 */
export const fetchApiTagEpisodes = async (
  id: string,
  taxonomyRestBase?: Maybe<string>,
  options?: CollectionQueryOptions,
  init?: RequestInit
) => {
  const { cursor, pageSize, exclude } = options || {};
  return fetchApi<PostConnection>({
    path: `${taxonomyRestBase || 'tags'}/${id}/episodes`,
    query: {
      ...(options && { c: cursor }),
      ...(pageSize && { f: `${pageSize}` }),
      ...(exclude && { e: exclude })
    },
    init
  });
};

/**
 * Method that simplifies GET queries for term data.
 *
 * @param id
 *    API id of term.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Term data object.
 */
export const fetchApiTerm = async (id: string, init?: RequestInit) =>
  fetchApi<IPriApiResourceResponse>({ path: `term/${id}`, init });

/**
 * Method that simplifies GET queries for term stories data.
 *
 * @param id
 *    API id of term.
 * @param page
 *    Page number of stories to return.
 * @param range
 *    Number of stories to return for the page.
 * @param exclude
 *    Array of story ids to exclude from query.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Promise that returns Collection of Story data objects.
 */
export const fetchApiTermStories = async (
  id: string,
  endCursor?: string,
  range?: number,
  exclude?: string[],
  init?: RequestInit
) =>
  fetchApi<IPriApiCollectionResponse>({
    path: `term/${id}/stories`,
    query: {
      ...(endCursor && { endCursor }),
      ...(range && { range: `${range}` }),
      ...(exclude && { exclude })
    },
    init
  });

/**
 * Method that simplifies GET queries for term episodes data.
 *
 * @param id
 *    API id of term.
 * @param page
 *    Page number of episodes to return.
 * @param range
 *    Number of episodes to return for the page.
 * @param exclude
 *    Array of story ids to exclude from query.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Promise that returns Collection of episode data objects.
 */
export const fetchApiTermEpisodes = async (
  id: string,
  endCursor?: string,
  range?: number,
  exclude?: string[],
  init?: RequestInit
) =>
  fetchApi<IPriApiCollectionResponse>({
    path: `term/${id}/episodes`,
    query: {
      ...(endCursor && { endCursor }),
      ...(range && { range: `${range}` }),
      ...(exclude && { exclude })
    },
    init
  });

/**
 * Method that simplifies GET queries for page data.
 *
 * @param id
 *    API id of page.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Page data object.
 */
export const fetchApiPage = async (id: string, init?: RequestInit) =>
  fetchApi<IPriApiResourceResponse>({ path: `page/${id}`, init });

/**
 * Method that simplifies GET queries for team data.
 *
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Person data object.
 */
export const fetchApiTeam = async (init?: RequestInit) =>
  fetchApi<IPriApiResourceResponse>({ path: 'team', init });

/**
 * Method that simplifies GET queries for person data.
 *
 * @param id
 *    API id of person.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Person data object.
 */
export const fetchApiPerson = async (id: string, init?: RequestInit) =>
  fetchApi<IPriApiResourceResponse>({ path: `person/${id}`, init });

/**
 * Method that simplifies GET queries for person stories data.
 *
 * @param id
 *    API id of person.
 * @param page
 *    Page number of stories to return.
 * @param range
 *    Number of stories to return for the page.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Promise that returns Collection of Story data objects.
 */
export const fetchApiPersonStories = async (
  id: string,
  endCursor?: string,
  range?: number,
  exclude?: string[],
  init?: RequestInit
) =>
  fetchApi<ContributorToPostConnection>({
    path: `person/${id}/stories`,
    query: {
      ...(endCursor && { endCursor }),
      ...(range && { range: `${range}` }),
      ...(exclude && { exclude })
    },
    init
  });

/**
 * Method that simplifies GET queries for person stories data.
 *
 * @param id
 *    API id of person.
 * @param page
 *    Page number of stories to return.
 * @param range
 *    Number of stories to return for the page.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Promise that returns Collection of Story data objects.
 */
export const fetchApiPersonAudio = async (
  id: string,
  endCursor?: string,
  range?: number,
  exclude?: string[],
  init?: RequestInit
) =>
  fetchApi<IPriApiCollectionResponse>({
    path: `person/${id}/segments`,
    query: {
      ...(endCursor && { endCursor }),
      ...(range && { range: `${range}` }),
      ...(exclude && { exclude })
    },
    init
  });

/**
 * Method that simplifies fetching of CTA Region Group data.
 *
 * @param regionGroup
 *    Machine name of region group's entity queue.
 * @param context
 *    Array of strings that describe the type and id's of targetable traits of
 *    the shown content.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @return
 *    Promise that returns object with region names as keys containing
 *    collection of CTA messages available for the content in that region.
 */
export const fetchApiCtaRegionGroup = async (
  regionGroup: string,
  context?: string[],
  init?: RequestInit
) =>
  fetchApi<IPriApiResourceResponse>({
    path: `cta/${regionGroup}`,
    body: context && {
      context
    },
    init
  });

export const fetchApiSearch = (
  q: string,
  label: string,
  start: string | number,
  init?: RequestInit
) =>
  fetchApi<ReturnType<typeof fetchQuerySearch>>({
    path: `query/search/${label}/${q}`,
    query: {
      start: start as string
    },
    init
  });
