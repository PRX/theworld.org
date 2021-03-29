/**
 * @file scriptRemove.ts
 * Remove script tags.
 */
import { DomElement } from 'htmlparser2';

export const scriptRemove = (node: DomElement) => {
  if (node.type === 'tag' && node.name === 'script') {
    return null;
  }

  return undefined;
};
