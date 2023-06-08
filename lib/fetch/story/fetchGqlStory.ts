/**
 * Fetch Story data from WP GraphQL API.
 */

import type { Maybe, Post, PostToCategoryConnection } from '@interfaces';
import { gql } from '@apollo/client';
import { gqlClient } from '@lib/fetch/api';

const GET_POST = gql`
  query getPost($id: ID!) {
    post(id: $id) {
      id
      link
      title
      excerpt
      content
      featuredImage {
        node {
          id
          sourceUrl
          altText
          caption
          mediaDetails {
            width
            height
          }
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
          taxonomy {
            node {
              id
              name
            }
          }
          posts(first: 4, where: { notIn: [$id] }) {
            nodes {
              id
              title
              excerpt
              link
              featuredImage {
                node {
                  id
                  altText
                  sourceUrl
                }
              }
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
        canonical
        metaDesc
        metaKeywords
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphDescription
        opengraphTitle
        opengraphImage {
          sourceUrl
          mediaDetails {
            width
            height
          }
          mimeType
        }
        opengraphUrl
        title
        twitterDescription
        twitterTitle
        twitterImage {
          mediaDetails {
            height
            width
          }
          sourceUrl
          mimeType
        }
        opengraphType
      }
    }
  }
`;

export const fetchGqlStory = async (id: number) => {
  const response = await gqlClient.query<{
    post: Post & {
      primaryCategory?: Maybe<PostToCategoryConnection>;
    };
  }>({
    query: GET_POST,
    variables: {
      id
    }
  });
  const post = response?.data?.post;

  if (!post) return undefined;

  return post;
};

export default fetchGqlStory;
