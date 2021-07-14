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
  const ogProps = {
    title: ogTitle,
    description: ogDescription,
    url: pageUrl,
    type: ogType,
    image: {
      src: ogImage,
      width: parseInt(ogImageWidth, 10),
      height: parseInt(ogImageHeight, 10)
    }
  };
  const twProps = {
    title: twTitle,
    description: twDescription,
    url: pageUrl,
    type: twCard,
    image: { src: twImage }
  };
  const keyGen = (k: string, v: string) =>
    // eslint-disable-next-line no-control-regex
    `${k}:${encode(v.replace(/[^\x00-\x7F]/g, ''))}`;
  const renderMetaOther = () =>
    Object.entries(metaOther).map(
      ([k, v]) =>
        [
          'og:site_name',
          'twitter:account_id',
          'og:url',
          'twitter:url',
          'shortlink'
        ].indexOf(k) === -1 &&
        (/^(og|fb):/.test(k) ? (
          <meta property={k} content={v} key={keyGen(k, v)} />
        ) : (
          <meta name={k} content={v} key={keyGen(k, v)} />
        ))
    );

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />
      <OpenGraph {...ogProps} />
      <TwitterCard {...twProps} />
      {renderMetaOther()}
    </Head>
  );
};
