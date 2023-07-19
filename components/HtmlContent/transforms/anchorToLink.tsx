/**
 * @file anchorToLink.tsx
 *
 * Converts an anchor tag with a local URL to Link component.
 */
import { convertNodeToElement, Transform } from 'react-html-parser';
import Link from 'next/link';
import { generateContentLinkHref } from '@lib/routing';
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
    let url: URL | undefined = new URL(href, 'https://theworld.org');

    // Handle links copied from google searches for internal URL's.
    if (/\/\/(www\.)?google\.com\/url/.test(url.href) && url.searchParams) {
      const q = url.searchParams.get('q');
      url = q ? new URL(q) : undefined;
    }

    if (url?.href && isLocalUrl(url.href)) {
      const id = gen.next().value as number;
      const linkHref = generateContentLinkHref(url.href);
      const children = convertNodeToElement(
        { ...node, attribs },
        index,
        transform
      );

      delete attribs.target;

      return linkHref ? (
        <Link href={linkHref} passHref key={id} legacyBehavior>
          {children}
        </Link>
      ) : (
        children
      );
    }
  }

  return undefined;
};
