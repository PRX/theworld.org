/**
 * Fetch Story data from WP GraphQL API.
 */

import type { Maybe, PostStory } from '@interfaces';
import { gql } from '@apollo/client';
import { gqlClient } from '@lib/fetch/api';
import { IMAGE_PROPS, POST_SEO_PROPS } from '@lib/fetch/api/graphql';

export const STORY_CARD_PROPS = gql`
  fragment StoryCardProps on Post {
    id
    title
    excerpt
    link
    featuredImage {
      node {
        ...ImageProps
      }
    }
    primaryCategory: categories(first: 1) {
      nodes {
        id
        name
        link
      }
    }
    additionalMedia {
      audio {
        id
        audioFields {
          audioTitle
        }
      }
    }
  }
  ${IMAGE_PROPS}
`;

const GET_POST = gql`
  query getPost($id: ID!, $idType: PostIdType) {
    post(id: $id, idType: $idType) {
      id
      link
      title
      excerpt
      content
      featuredImage {
        node {
          ...ImageProps
          caption
        }
      }
      additionalDates {
        broadcastDate
        updatedDate
      }
      additionalMedia {
        audio {
          id
          sourceUrl
          mediaItemUrl
        }
      }
      presentation {
        format
      }
      contributors {
        nodes {
          id
          name
          link
        }
      }
      storyFormats {
        nodes {
          name
        }
      }
      resourceDevelopmentTags {
        nodes {
          name
        }
      }
      programs(first: 1) {
        nodes {
          id
          name
          link
        }
      }
      categories {
        nodes {
          id
          name
          link
        }
      }
      primaryCategory: categories(first: 1) {
        nodes {
          id
          name
          link
          posts(first: 4, where: { notIn: [$id] }) {
            nodes {
              ...StoryCardProps
            }
          }
        }
      }
      tags {
        nodes {
          id
          name
          link
        }
      }
      cities {
        nodes {
          id
          name
          link
        }
      }
      provincesOrStates {
        nodes {
          id
          name
          link
        }
      }
      countries {
        nodes {
          id
          name
          link
        }
      }
      regions {
        nodes {
          id
          name
          link
        }
      }
      people {
        nodes {
          id
          name
          link
        }
      }
      socialTags {
        nodes {
          id
          name
          link
        }
      }
      seo {
        ...PostSEOProps
      }
    }
  }
  ${STORY_CARD_PROPS}
  ${POST_SEO_PROPS}
`;

export const fetchGqlStory = async (id?: string, idType?: string) => {
  const response = await gqlClient.query<{
    post: Maybe<PostStory>;
  }>({
    query: GET_POST,
    variables: {
      id,
      idType
    }
  });
  const post = response?.data?.post;

  if (!post) return undefined;

  return post;
};

export default fetchGqlStory;