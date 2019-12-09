/**
 * @file Story.tsx
 * Component for Story.
 */
import React, { useContext } from 'react';
import { useAmp } from 'next/amp';
import Head from 'next/head';
import Link from 'next/link';
import ContentContext from '@contexts/ContentContext';
import { PriApiResourceResponse } from 'pri-api-library/types';
import { fetchPriApiItem } from '@lib/fetch';

const Story = () => {
  const { data: { title, id, teaser, byline } } = useContext(ContentContext);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Link href="/">
        <a href="/">Home</a>
      </Link>
      <h1>{title}</h1>
      <dl>
        <dt>Story Id</dt>
        <dd>{id}</dd>

        <dt>Teaser</dt>
        <dd>{teaser}</dd>
      </dl>
    </>
  );
}

Story.fetchData = async (id: string|number) => {
  return await fetchPriApiItem('node--stories', id, {
    include: [
      'audio',
      'byline.credit_type',
      'byline.person',
      'image',
      'categories',
      'opencalais_city',
      'opencalais_continent',
      'opencalais_country',
      'opencalais_province',
      'opencalais_region',
      'opencalais_person',
      'primary_category',
      'program.logo',
      'program.podcast_logo',
      'tags',
      'verticals'
    ]
  });
}

export default Story;
