/**
 * @file HtmlContent.tsx
 * Component for rendering HTML content.
 */

import React, { ReactElement } from 'react';
import { DomElement } from 'htmlparser2';
import ReactHtmlParser, { Transform } from 'react-html-parser';
import {
  anchorToLink,
  audioDescendant,
  facebookPost,
  facebookVideo,
  fbRootRemove,
  instagramEmebed,
  scriptRemove,
  twitterEmebed,
  videoSourceDescendant
} from './transforms';

export interface IHtmlContentProps {
  html: string;
  transforms?: ((
    N: DomElement,
    F: Transform,
    I: number
  ) => ReactElement | void | null)[];
}

export const HtmlContent = ({ html, transforms = [] }: IHtmlContentProps) => {
  const cleanHtml = (dirtyHtml: string) => {
    return [(h: string) => h.replace(/<[^>/]+>\s*<\/[^>]+>/, '')].reduce(
      (acc, func) => func(acc),
      dirtyHtml
    );
  };
  const transform = (node: DomElement, index: number) => {
    return [
      anchorToLink,
      audioDescendant,
      facebookPost,
      facebookVideo,
      fbRootRemove,
      instagramEmebed,
      scriptRemove,
      twitterEmebed,
      videoSourceDescendant,
      ...transforms
    ].reduce(
      (acc, func) => (acc || acc === null ? acc : func(node, transform, index)),
      undefined
    );
  };

  return (
    !!html && (
      <>
        {ReactHtmlParser(cleanHtml(html), {
          transform: transform as Transform
        })}
      </>
    )
  );
};
