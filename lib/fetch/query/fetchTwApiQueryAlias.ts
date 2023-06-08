import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { ContentNode, TwApiResource } from '@interfaces';
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
  id: number | string;
  type: string;
  taxonomy?: string;
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
  const restResp = await fetchTwApi<TwApiResource<AliasData>>(
    `tw/v2/alias`,
    {
      _fields: 'id,type,taxonomy',
      ...params,
      slug: alias
    },
    init
  ).then((resp) => resp && resp.data);

  console.log(restResp);

  if (!restResp?.type) return undefined;

  if (restResp.type === 'redirect--external') return restResp;

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
  } as AliasData;
};

export default fetchTwApiQueryAlias;
