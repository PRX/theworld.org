/**
 * @file anchorToLink.tsx
 *
 * Converts an anchor tag with a local URL to Link component.
 */
import { convertNodeToElement, Transform } from 'react-html-parser';
import Link from 'next/link';
import { parse } from 'url';
import { generateLinkPropsForContent } from '@lib/routing';
import { isLocalUrl } from '@lib/parse/url';
import { DomElement } from 'htmlparser2';

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
    let url = parse(href, true);

    // Handle links copied from google searches for internal URL's.
    if (/\/\/(www\.)?google\.com\/url/.test(href)) {
      url = parse(url.query.q as string, true);
    }

    if (isLocalUrl(url.href)) {
      const id = gen.next().value as number;
      const { href: linkHref, as: linkAs } = generateLinkPropsForContent(
        url.href
      );
      const children = convertNodeToElement(
        { ...node, attribs },
        index,
        transform
      );

      delete attribs.target;

      return linkHref && linkAs ? (
        <Link href={linkHref} as={linkAs} passHref key={id} legacyBehavior>
          {children}
        </Link>
      ) : (
        children
      );
    }
  }

  return undefined;
};
