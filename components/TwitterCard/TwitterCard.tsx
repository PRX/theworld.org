/**
 * @file TwitterCard.tsx
 * Component for displaying formatted time.
 */

import React from 'react';
import { IImageStyle } from '@interfaces/content';

export interface ITwitterCardProps {
  type: 'summary' | 'summary_large_image' | 'app' | 'player';
  title: string;
  url: string;
  description?: string;
  image?: IImageStyle;
  children?: React.ReactNode;
}

export const TwitterCard = ({
  type,
  title,
  url,
  description,
  image,
  children
}: ITwitterCardProps) => (
  <>
    <meta property="twitter:card" content={type} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:url" content={url} />
    {description && (
      <meta property="twitter:description" content={description} />
    )}
    {image && <meta property="twitter:image" content={image.src} />}
    {children}
  </>
);
