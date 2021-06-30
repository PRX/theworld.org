/**
 * @file enhanceImage.ts
 * Converts img tags to Image components.
 */
import React from 'react';
import { DomElement } from 'htmlparser2';
import Image from 'next/image';

export const enhanceImage = (node: DomElement) => {
  if (node.type === 'tag' && node.name === 'img') {
    const { attribs } = node;
    return <Image {...attribs} />;
  }

  return undefined;
};
