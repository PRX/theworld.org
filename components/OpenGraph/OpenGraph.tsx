/**
 * @file Duration.tsx
 * Component for displaying formatted time.
 */

import React from 'react';
import { IImageStyle } from '@interfaces/content';

export interface IOpenGraphProps {
  type: string;
  title: string;
  url: string;
  description?: string;
  image?: IImageStyle | IImageStyle[];
  children?: React.ReactNode;
}

export const OpenGraph = ({
  type,
  title,
  url,
  description,
  image,
  children
}: IOpenGraphProps) => (
  <>
    <meta property="fb:admins" content={process.env.FB_ADMINS} />
    <meta property="fb:app_id" content={process.env.FB_APP_ID} />
    <meta property="og:site_name" content="The World from PRX" />
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:url" content={url} />
    {description && <meta property="og:description" content={description} />}
    {image &&
      (Array.isArray(image) ? image : [image]).map(
        ({ src, type: imageType, width, height }) => (
          <React.Fragment key={`i:${src}`}>
            <meta property="og:image" content={src} />
            {imageType && <meta property="og:image:type" content={imageType} />}
            {width && <meta property="og:image:width" content={`${width}`} />}
            {height && (
              <meta property="og:image:height" content={`${height}`} />
            )}
          </React.Fragment>
        )
      )}
    {children}
  </>
);
