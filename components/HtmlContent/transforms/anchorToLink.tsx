/**
 * @file anchorToLink.tsx
 *
 * Converts an anchor tag with a local URL to Link component.
 */
import React from 'react';
import { convertNodeToElement, Transform } from 'react-html-parser';
import Link from 'next/link';
import { DomElement } from 'htmlparser2';
import { parse } from 'url';
import { generateLinkPropsForContent } from '@lib/routing';

function* genId() {
  let id = 0;
  while (true) {
    id += 1;
    yield id;
  }
}
const gen = genId();

export const anchorToLink = (
  node: DomElement,
  transform: Transform,
  index: number
) => {
  if (
    node.type === 'tag' &&
    node.name === 'a' &&
    node.attribs.href &&
    !/^mailto:/.test(node.attribs.href)
  ) {
    // Return an app link.
    const {
      attribs,
      attribs: { href }
    } = node;
    const isLocal = (url: string) =>
      /^\/|(www\.)?(pri|theworld)\.org/.test(url);
    let url = parse(href, true);

    // Handle links copied from google searches for internal URL's.
    if (/\/\/(www\.)?google\.com\/url/.test(href)) {
      url = parse(url.query.q as string, true);
    }

    if (isLocal(url.href)) {
      const id = gen.next().value as number;
      const { href: linkHref, as: linkAs } = generateLinkPropsForContent({
        id: '',
        type: '',
        self: '',
        metatags: { canonical: url.href }
      });

      delete attribs.target;

      return (
        <Link href={linkHref} as={linkAs} passHref key={id}>
          {convertNodeToElement({ ...node, attribs }, index, transform)}
        </Link>
      );
    }
  }

  return undefined;
};
