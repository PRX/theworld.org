import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import type { ContentNode } from '@interfaces';
import { fetchTwApi, gqlClient } from '@lib/fetch/api';
import { gql } from '@apollo/client';

const GET_CONTENT_NODE = gql`
  query getContentNode($id: ID!) {
    contentNode(id: $id, idType: DATABASE_ID) {
      id
    }
  }
`;

type AliasData = {
  id: number;
  type: string;
  taxonomy?: string;
  url?: string;
};

type AliasResp = {
  id: string;
  type: string;
  url?: string;
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
      _fields: 'id,type,taxonomy',
      ...params,
      slug: alias
    },
    init
  ).then((resp) => resp && resp.data);

  if (!restResp?.type) return undefined;

  if (restResp.type === 'redirect--external')
    return {
      type: restResp.type,
      id: `${restResp.id}`,
      url: restResp.url
    } as AliasResp;

  const gqlResp = await gqlClient.query<{
    contentNode: ContentNode;
  }>({
    query: GET_CONTENT_NODE,
    variables: {
      id: restResp.id
    }
  });

  const contentNode = gqlResp?.data?.contentNode;

  if (!contentNode) return undefined;

  return {
    type: restResp.taxonomy
      ? `term--${restResp.taxonomy}`
      : `post--${restResp.type === 'post' ? 'story' : restResp.type}`,
    id: contentNode.id
  } as AliasResp;
};

export default fetchTwApiQueryAlias;
