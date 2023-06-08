/**
 * @file Duration.tsx
 * Component for displaying formatted time.
 */

import React from 'react';
import { MetaTags } from '@interfaces';

export interface IOpenGraphProps {
  data: MetaTags;
}

export const OpenGraph = ({ data }: IOpenGraphProps) => {
  const {
    opengraphType,
    opengraphTitle,
    opengraphUrl,
    opengraphDescription,
    opengraphImage
  } = data;
  return (
    <>
      <meta property="fb:admins" content={process.env.FB_ADMINS} />
      <meta property="fb:app_id" content={process.env.FB_APP_ID} />
      <meta property="og:site_name" content="The World from PRX" />
      {opengraphType && <meta property="og:type" content={opengraphType} />}
      {opengraphTitle && <meta property="og:title" content={opengraphTitle} />}
      {opengraphUrl && <meta property="og:url" content={opengraphUrl} />}
      {opengraphDescription && (
        <meta property="og:description" content={opengraphDescription} />
      )}
      {opengraphImage?.sourceUrl && (
        <>
          <meta property="og:image" content={opengraphImage.sourceUrl} />
          {opengraphImage.mediaDetails?.width && (
            <meta
              property="og:image:width"
              content={`${opengraphImage.mediaDetails.width}`}
            />
          )}
          {opengraphImage.mediaDetails?.height && (
            <meta
              property="og:image:height"
              content={`${opengraphImage.mediaDetails.height}`}
            />
          )}
        </>
      )}
    </>
  );
};
