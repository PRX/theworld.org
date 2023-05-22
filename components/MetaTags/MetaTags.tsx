/**
 * @file MetaTags.tsx
 * Component for generating meta tags.
 */

import React from 'react';
import { parse } from 'url';
import Head from 'next/head';
import { OpenGraph } from '@components/OpenGraph';
import { TwitterCard } from '@components/TwitterCard';
import { sanitizeContent } from '@lib/format/content/sanitizeContent';

export interface IMetaTags {
  og_image: {
    width: number;
    height: number;
    url: string;
    type: string;
  }[];
  [k: string]: any;
}

export interface IMetaTagsProps {
  data: IMetaTags;
}

export const MetaTags = ({ data }: IMetaTagsProps) => {
  console.log(data);
  const {
    title,
    description,
    canonical,
    og_title: ogTitle,
    og_description: ogDescription,
    og_type: ogType,
    og_image: ogImage,
    twitter_card: twCard,
    twitter_misc: twImage,
    ...metaOther
  } = data;
  const urlCanonical = parse(canonical);
  const hostname = 'theworld.org';
  const pageUrl = `https://${hostname}${urlCanonical.pathname}`;
  const defaultImage = {
    src: 'https://media.pri.org/s3fs-public/images/2020/04/tw-globe-bg-3000.jpg',
    width: 3000,
    height: 3000
  };
  const ogProps = {
    title: ogTitle,
    description: ogDescription,
    url: pageUrl,
    type: ogType,
    image: ogImage?.[0]
      ? {
          src: ogImage[0].url,
          width: ogImage[0].width,
          height: ogImage[0].height
        }
      : defaultImage
  };
  const twProps = {
    title: ogTitle,
    description: ogDescription,
    url: pageUrl,
    type: twCard,
    image: twImage ? { src: twImage } : defaultImage
  };
  const keyGen = (k: string, v: string) =>
    // eslint-disable-next-line no-control-regex
    `${k}:${v}`;
  const renderMetaOther = () =>
    Object.entries(metaOther).map(
      ([k, v]) =>
        [
          'fb:admins',
          'fb:app_id',
          'og:site_name',
          'og:url',
          'twitter:account_id',
          'twitter:url',
          'shortlink'
        ].indexOf(k) === -1 &&
        (/^(og|fb):/.test(k) ? (
          <meta property={k} content={sanitizeContent(v)} key={keyGen(k, v)} />
        ) : (
          <meta name={k} content={sanitizeContent(v)} key={keyGen(k, v)} />
        ))
    );

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={sanitizeContent(description)} />
      <link rel="canonical" href={pageUrl} />
      <OpenGraph {...ogProps} />
      <TwitterCard {...twProps} />
      {/* {renderMetaOther()} */}
    </Head>
  );
};
