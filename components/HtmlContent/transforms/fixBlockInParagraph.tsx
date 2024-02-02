/**
 * @file audioDescendant.tsx
 *
 * Unwrap paragraph content that contain a paragraph.
 */
import { convertNodeToElement, Transform } from 'react-html-parser';
import { DomElement, Element } from 'htmlparser2';
import { findDescendant } from '@lib/parse/html';

export const fixBlockInParagraph = (node: DomElement, transform: Transform) => {
  const isParagraph = node.type === 'tag' && node.name === 'p';
  const blockTags = ['blockquote', 'div', 'figure', 'table', 'ul'];
  const blockDescendant = findDescendant(node, (n: DomElement) => {
    if (n.type === 'tag' && blockTags.includes(n.name)) {
      return n;
    }
    return false;
  });

  if (isParagraph && blockDescendant) {
    const children = node.children
      .map((n: DomElement) => {
        if (n.type === 'text') {
          return (n.data as string)?.trim().length
            ? new Element('p', {}, [n])
            : null;
        }
        return n;
      })
      .filter((v: DomElement | null) => !!v)
      .map((n: DomElement, i: number) => convertNodeToElement(n, i, transform));

    return children;
  }

  return undefined;
};
