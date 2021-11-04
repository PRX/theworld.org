/**
 * @file enhanceImage.ts
 * Converts img tags to Image components.
 */
import { DomElement } from 'htmlparser2';
import Image from 'next/image';

export type ImageWidth = [string, string];

export interface IImageWidthsFunc {
  (node: DomElement): ImageWidth[];
}

export const enhanceImage = (getImageWidths: IImageWidthsFunc) => (
  node: DomElement
) => {
  const { type, name, attribs } = node;

  if (
    type === 'tag' &&
    name === 'img' &&
    !(attribs.width === '1' && attribs.height === '1')
  ) {
    const imageWidths = getImageWidths(node);
    const sizes = imageWidths
      .map(([q, w]) => (q ? `(${q}) ${w}` : w))
      .join(', ');
    const { alt, class: className, width, height, ...otherAttribs } = attribs;
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
          alt={alt}
          width={width || 16}
          height={height || 9}
          layout="responsive"
          sizes={sizes}
        />
      </div>
    ) : (
      <Image
        {...otherAttribs}
        alt={alt}
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

enhanceImage.displayName = 'EnhancedImage';
