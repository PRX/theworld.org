/**
 * @file enhanceImage.ts
 * Converts img tags to Image components.
 */
import React from 'react';
import { DomElement } from 'htmlparser2';
import Image from 'next/legacy/image';

export type ImageWidth = [string, string];

export interface IImageWidthsFunc {
  // eslint-disable-next-line no-unused-vars
  (node: DomElement): ImageWidth[];
}

export const enhanceImage = (getImageWidths: IImageWidthsFunc) => (
  node: DomElement
) => {
  if (
    node.type === 'tag' &&
    node.name === 'img' &&
    !(node.attribs.width === '1' && node.attribs.height === '1')
  ) {
    const imageWidths = getImageWidths(node);
    const sizes = imageWidths
      .map(([q, w]) => (q ? `(${q}) ${w}` : w))
      .join(', ');
    const { attribs } = node;
    const { class: className, width, height, src, ...otherAttribs } = attribs;
    const absoluteSrc = /^\/[^/]/.test(src)
      ? `https://theworld.org${src}`
      : src;
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
      <div className={wrapperClass} key={attribs.src}>
        <Image
          {...otherAttribs}
          src={absoluteSrc}
          width={width || 16}
          height={height || 9}
          layout="responsive"
          sizes={sizes}
        />
      </div>
    ) : (
      <Image
        {...otherAttribs}
        src={absoluteSrc}
        width={width || 16}
        height={height || 9}
        layout="responsive"
        sizes={sizes}
        key={attribs.src}
      />
    );
  }

  return undefined;
};
