import { gql } from '@apollo/client';

export const POST_SEO_PROPS = gql`
  fragment PostSEOProps on PostTypeSEO {
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
`;
