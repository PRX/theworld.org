/**
 * @file MetaTags.tsx
 * Component for generating meta tags.
 */

import React from 'react';
import { parse } from 'url';
import Head from 'next/head';
import { encode } from 'base-64';
import { OpenGraph } from '@components/OpenGraph';
import { TwitterCard } from '@components/TwitterCard';

export interface IMetaTags {
  [k: string]: string;
}

export interface IMetaTagsProps {
  data: IMetaTags;
}

const sanitizeContent = (content: string) => content.replace(/<[^>]+>/g, '');

export const MetaTags = ({ data }: IMetaTagsProps) => {
  const {
    title,
    description,
    canonical,
    'og:title': ogTitle,
    'og:description': ogDescription,
    'og:type': ogType,
    'og:image': ogImage,
    'og:image:width': ogImageWidth,
    'og:image:height': ogImageHeight,
    'twitter:title': twTitle,
    'twitter:description': twDescription,
    'twitter:card': twCard,
    'twitter:image': twImage,
    ...metaOther
  } = data;
  const urlCanonical = parse(canonical);
  const hostname = process.env.NEXT_PUBLIC_VERCEL_URL || 'theworld.org';
  const pageUrl = `https://${hostname}${urlCanonical.pathname}`;
  const defaultImage = {
    src:
      'https://media.pri.org/s3fs-public/images/2020/04/tw-globe-bg-3000.jpg',
    width: 3000,
    height: 3000
  };
  const ogProps = {
    title: ogTitle,
    description: sanitizeContent(ogDescription),
    url: pageUrl,
    type: ogType,
    image: ogImage
      ? {
          src: ogImage,
          ...(ogImageWidth && { width: parseInt(ogImageWidth, 10) }),
          ...(ogImageHeight && { height: parseInt(ogImageHeight, 10) })
        }
      : defaultImage
  };
  const twProps = {
    title: twTitle,
    description: sanitizeContent(twDescription),
    url: pageUrl,
    type: twCard,
    image: twImage ? { src: twImage } : defaultImage
  };
  const keyGen = (k: string, v: string) =>
    // eslint-disable-next-line no-control-regex
    `${k}:${encode(v.replace(/[^\x00-\x7F]/g, ''))}`;
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
      {renderMetaOther()}
    </Head>
  );
};
