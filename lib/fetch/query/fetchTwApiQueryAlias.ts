import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import type { Maybe, Page } from '@interfaces';
import { fetchTwApi, gqlClient } from '@lib/fetch/api';
import { gql } from '@apollo/client';

const GET_PAGE_NODE = gql`
  query getPage($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      id
    }
  }
`;

type RedirectData = {
  type: 'redirect--external';
  attributes: {
    url: string;
  };
};

type ResourceData = {
  id: number;
  type?: string;
  taxonomy?: string;
  link: string;
};

type AliasData = RedirectData | ResourceData;

type AliasResp = {
  id?: string;
  type: string;
  link?: string;
  redirectUrl?: string;
};

/**
 * Method that simplifies GET queries for resource item using URL path alias.
 *
 * @param alias
 *    Alias used by resource item to display data.
 * @param params
 *    Optional. Query string params described in key:value pairs.
 * @param init
 *    Optional. Fetch request init options.
 *
 * @returns
 *    Denormalized resource item.
 */
export const fetchTwApiQueryAlias = async (
  alias: string,
  params?: object,
  init?: RequestInit
) => {
  const restResp = await fetchTwApi<AliasData>(
    `tw/v2/alias`,
    {
      _fields: 'id,type,taxonomy,link,attributes',
      ...params,
      slug: alias
    },
    init
  ).then((resp) => resp && resp.data);

  if (!restResp) return undefined;

  if (restResp.type === 'redirect--external') {
    const redirectData = restResp as RedirectData;
    return {
      type: 'redirect--external',
      redirectUrl: redirectData.attributes.url
    } as AliasResp;
  }

  const resourceData = restResp as ResourceData;

  if (resourceData.type === 'page') {
    const gqlResp = await gqlClient.query<{
      page: Maybe<Page>;
    }>({
      query: GET_PAGE_NODE,
      variables: {
        id: resourceData.id
      }
    });
    const id = gqlResp.data.page?.id;

    if (id) {
      return {
        type: `post--page`,
        id
      } as AliasResp;
    }
  }

  const redirectUrl = new URL(resourceData.link).pathname;
  return {
    type: 'redirect--internal',
    redirectUrl
  };
};

export default fetchTwApiQueryAlias;
