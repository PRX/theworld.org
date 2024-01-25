/**
 * @file datawrapperEmbed.tsx
 *
 * Converts a Datawrapper iframe embed to a DatawrapperEmbed component.
 */

import type { DomElement } from 'htmlparser2';
import { findDescendant } from '@lib/parse/html';
import { DatawrapperEmbed } from '@components/DatawrapperEmbed';

export const datawrapperEmbed = (
  node: DomElement
) => {
  const dwEmbedIframe = findDescendant(node, (n: DomElement) => {
    if (n.type === 'tag' && n.name === 'iframe' && n.attribs.id?.includes('datawrapper')) {

      return n;
    }
    return false;
  });

  if (
    dwEmbedIframe
  ) {
    // Return DatawrapperEmbed.
    const {
      attribs
    } = dwEmbedIframe;

    return (
      <DatawrapperEmbed {...attribs} />
    );
  }

  return undefined;
};
