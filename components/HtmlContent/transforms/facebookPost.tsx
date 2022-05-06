/**
 * @file facebookPost.ts
 *
 * Transform for rendering facebook post embeds.
 */
import { FacebookProvider, EmbeddedPost } from 'react-facebook';
import { DomElement } from 'htmlparser2';

export const facebookPost = (node: DomElement) => {
  let embedUrl: string;

  switch (true) {
    case node.type === 'tag' &&
      node.name === 'div' &&
      'data-oembed-url' in node.attribs &&
      /\/\/facebook\.com\/[^/]+\/posts\//.test(node.attribs['data-oembed-url']):
      [embedUrl] = node.attribs['data-oembed-url'].split('?');
      break;

    case node.type === 'tag' &&
      node.name === 'div' &&
      'class' in node.attribs &&
      /fb-post/.test(node.attribs.class):
      embedUrl = node.attribs['data-href'];
      break;

    default:
      break;
  }

  if (embedUrl) {
    return (
      <FacebookProvider appId={process.env.FB_APP_ID}>
        <EmbeddedPost href={embedUrl} />
      </FacebookProvider>
    );
  }

  return undefined;
};
