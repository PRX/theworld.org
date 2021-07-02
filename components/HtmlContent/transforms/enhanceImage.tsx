/**
 * @file enhanceImage.ts
 * Converts img tags to Image components.
 */
import React from 'react';
import { DomElement } from 'htmlparser2';
import Image from 'next/image';

export type ImageWidth = [string, string];

export interface IImageWidthsFunc {
  (node: DomElement): ImageWidth[];
}

export const enhanceImage = (getImageWidths: IImageWidthsFunc) => (
  node: DomElement
) => {
  if (node.type === 'tag' && node.name === 'img') {
    const imageWidths = getImageWidths(node);
    const sizes = imageWidths
      .map(([q, w]) => (q ? `(${q}) ${w}` : w))
      .join(', ');
    const { attribs } = node;
    const { class: className } = attribs;
    let wrapperClass: string;

    switch (true) {
      case /\bfile-full-width\b/.test(className):
        wrapperClass = 'file-full-width-wrapper';
        break;

      case /\bfile-browser-width\b/.test(className):
        wrapperClass = 'file-browser-width-wrapper';
        break;

      default:
        break;
    }

    return wrapperClass ? (
      <div className={wrapperClass}>
        <Image {...attribs} layout="responsive" sizes={sizes} />
      </div>
    ) : (
      <Image {...attribs} layout="responsive" sizes={sizes} />
    );
  }

  return undefined;
};
