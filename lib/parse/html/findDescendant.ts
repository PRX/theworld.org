/**
 * @file findDescendant.ts
 * Search a dom tree for a node that matches some criteria.
 */
import { DomElement } from 'htmlparser2';

/**
 * Crawl node's descendant tree, passing each node to the matching function.
 *
 * @param node
 *      DomElement node to start search.
 * @param func
 *      Function to determine if node is a match, and return it.
 *      Return `false` otherwise.
 */
export const findDescendant = (
  node: DomElement,
  func: (N: DomElement) => boolean
) => {
  const { children } = node;
  let found = func(node) && node;

  if (!found && children?.length) {
    found = children.reduce(
      (acc: boolean | DomElement, n: DomElement) =>
        acc || findDescendant(n, func),
      false
    );
  }

  return found;
};
