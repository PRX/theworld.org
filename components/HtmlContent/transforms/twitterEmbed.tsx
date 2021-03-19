/**
 * @file twitterEmebed.tsx
 *
 * Convert placeholder markup with twitter embed component.
 */
import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { DomElement } from 'htmlparser2';
import { parse } from 'url';

export const twitterEmebed = (node: DomElement) => {
  if (
    node.type === 'tag' &&
    node.name === 'div' &&
    'data-oembed-url' in node.attribs &&
    /\/\/twitter\.com\//.test(node.attribs['data-oembed-url'])
  ) {
    const { pathname } = parse(node.attribs['data-oembed-url']);
    const [, id] = pathname.match(/\/(\w+)$/);

    return <TwitterTweetEmbed tweetId={id} />;
  }

  return undefined;
};
