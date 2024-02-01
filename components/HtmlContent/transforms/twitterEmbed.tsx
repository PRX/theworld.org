/**
 * @file twitterEmebed.tsx
 *
 * Convert placeholder markup with twitter embed component.
 */
import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { DomElement } from 'htmlparser2';
import { parse } from 'url';
import { findDescendant } from '@lib/parse/html';

export const twitterEmbed = (node: DomElement) => {
  let embedUrl: string | null;

  switch (true) {
    case node.type === 'tag' &&
      node.name === 'div' &&
      'data-oembed-url' in node.attribs &&
      /\/\/twitter\.com\//.test(node.attribs['data-oembed-url']):
      embedUrl = node.attribs['data-oembed-url'];
      break;

    case node.type === 'tag' &&
      node.name === 'blockquote' &&
      'class' in node.attribs &&
      /twitter-tweet/.test(node.attribs.class): {
      const link = findDescendant(node, (n: DomElement) => {
        if (
          n.type === 'tag' &&
          n.name === 'a' &&
          'href' in n.attribs &&
          n.parent?.name === 'blockquote'
        ) {
          return n;
        }
        return false;
      });

      embedUrl = link && link.attribs.href;
      break;
    }

    default:
      embedUrl = null;
      break;
  }

  if (embedUrl && embedUrl.match(/twitter.com/)) {
    const { pathname } = parse(embedUrl);
    const [, id] = (pathname || '').match(/\/(\w+)\W*$/) || [];

    return <TwitterTweetEmbed tweetId={id} key={node.attribs.key} />;
  }

  return undefined;
};
