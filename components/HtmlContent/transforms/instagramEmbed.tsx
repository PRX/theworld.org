/**
 * @file instagramEmebed.tsx
 *
 * Convert placeholder markup with instagram embed component.
 */
import React from 'react';
import InstagramEmbed from 'react-instagram-embed';
import { DomElement } from 'htmlparser2';

export const clientAccessToken =
  '142079625983010|987e1f53e945ba53f8fbd95d8c82c93e';

export const instagramEmebed = (node: DomElement) => {
  if (
    node.type === 'tag' &&
    node.name === 'blockquote' &&
    'class' in node.attribs &&
    /instagram-media/.test(node.attribs.class)
  ) {
    return (
      <InstagramEmbed
        url={node.attribs['data-instgrm-permalink']}
        clientAccessToken={clientAccessToken}
      />
    );
  }

  return undefined;
};
