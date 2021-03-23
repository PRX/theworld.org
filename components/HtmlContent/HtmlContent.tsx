/**
 * @file HtmlContent.tsx
 * Component for rendering HTML content.
 */

import React, { ReactElement } from 'react';
import { DomElement } from 'htmlparser2';
import ReactHtmlParser, { Transform } from 'react-html-parser';
import {
  anchorToLink,
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
  const transform = (node: DomElement, index: number) => {
    return [
      anchorToLink,
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

  return <>{ReactHtmlParser(html, { transform: transform as Transform })}</>;
};
