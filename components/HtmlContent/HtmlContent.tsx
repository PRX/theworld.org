/**
 * @file HtmlContent.tsx
 * Component for rendering HTML content.
 */

import { type ReactElement } from 'react';
import { type DomElement } from 'htmlparser2';
import type { Maybe } from '@interfaces';
import ReactHtmlParser, { type Transform } from 'react-html-parser';
import {
  anchorToLink,
  audioDescendant,
  facebookPost,
  facebookVideo,
  fbRootRemove,
  instagramEmbed,
  scriptRemove,
  twitterEmbed,
  videoSourceDescendant
} from './transforms';

export interface IHtmlContentProps {
  html?: Maybe<string>;
  transforms?: ((
    // eslint-disable-next-line no-unused-vars
    N: DomElement,
    // eslint-disable-next-line no-unused-vars
    F: Transform,
    // eslint-disable-next-line no-unused-vars
    I: number
  ) => ReactElement | void | null)[];
}

export const HtmlContent = ({ html, transforms = [] }: IHtmlContentProps) => {
  if (!html) return null;

  const cleanHtml = (dirtyHtml: string) =>
    [(h: string) => h.replace(/<[^>/]+>(\s|&nbsp;)*<\/[^>]+>/g, '')].reduce(
      (acc, func) => func(acc),
      dirtyHtml
    );
  const transform = (node: DomElement, index: number) =>
    [
      anchorToLink,
      audioDescendant,
      facebookPost,
      facebookVideo,
      fbRootRemove,
      instagramEmbed,
      scriptRemove,
      twitterEmbed,
      videoSourceDescendant,
      ...transforms
    ].reduce(
      (acc, func) => (acc || acc === null ? acc : func(node, transform, index)),
      undefined
    );

  return (
    <>
      {ReactHtmlParser(cleanHtml(html), {
        transform: transform as Transform
      })}
    </>
  );
};
