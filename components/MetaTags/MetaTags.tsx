/**
 * @file MetaTags.tsx
 * Component for generating meta tags.
 */

import type { MediaItem, MetaTags as MetaTagsType } from '@interfaces';
import { parse } from 'url';
import Head from 'next/head';
import { OpenGraph } from '@components/OpenGraph';
import { TwitterCard } from '@components/TwitterCard';
import { sanitizeContent } from '@lib/format/content/sanitizeContent';

export interface IMetaTagsProps {
  data: MetaTagsType;
}

export const MetaTags = ({ data }: IMetaTagsProps) => {
  const { canonical, title, metaDesc, opengraphDescription, opengraphImage } =
    data;
  const urlCanonical = canonical && parse(canonical);
  const hostname = 'theworld.org';
  const pageUrl = urlCanonical && `https://${hostname}${urlCanonical.pathname}`;
  const description = metaDesc || opengraphDescription;
  const defaultImage = {
    sourceUrl:
      'https://media.pri.org/s3fs-public/images/2020/04/tw-globe-bg-3000.jpg',
    mediaDetails: {
      width: 3000,
      height: 3000
    }
  } as MediaItem;
  const ogProps = {
    ...data,
    opengraphImage: opengraphImage || defaultImage
  } as MetaTagsType;

  return (
    <Head>
      <title>{title}</title>
      {description && (
        <meta name="description" content={sanitizeContent(description)} />
      )}
      {pageUrl && <link rel="canonical" href={pageUrl} />}
      <OpenGraph data={ogProps} />
      <TwitterCard data={data} />
    </Head>
  );
};
