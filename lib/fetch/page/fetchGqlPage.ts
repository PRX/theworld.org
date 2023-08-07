/**
 * Fetch Page data from CMS API.
 *
 * @param id Page identifier.
 */

import type { Maybe, Page } from '@interfaces';
import { gql } from '@apollo/client';
import { gqlClient } from '@lib/fetch/api';
import { IMAGE_PROPS, POST_SEO_PROPS } from '@lib/fetch/api/graphql';

const GET_PAGE = gql`
  query getPage($id: ID!) {
    page(id: $id) {
      id
      title
      content
      seo {
        ...PostSEOProps
      }
    }
  }
  ${POST_SEO_PROPS}
  ${IMAGE_PROPS}
`;

export async function fetchGqlPage(id: string) {
  const response = await gqlClient.query<{
    page: Maybe<Page>;
  }>({
    query: GET_PAGE,
    variables: {
      id
    }
  });
  const page = response?.data?.page;

  if (!page) return undefined;

  return page;
}

export default fetchGqlPage;
