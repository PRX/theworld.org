/**
 * @file Story.tsx
 * Component for Story.
 */
import React, { useContext } from 'react';
import Head from 'next/head';
import { IPriApiResource } from 'pri-api-library/types';
import { ContentContext } from '@contexts/ContentContext';
import { fetchPriApiItem, fetchPriApiQuery } from '@lib/fetch';
import { layoutComponentMap } from './layouts';

export const Story = () => {
  const {
    data: {
      story: { title, displayTemplate }
    }
  } = useContext(ContentContext);
  const LayoutComponent = layoutComponentMap[displayTemplate] || layoutComponentMap.standard;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <LayoutComponent />
    </>
  );
};

Story.fetchData = async (id: string | number) => {
  const story = (await fetchPriApiItem('node--stories', id, {
    include: [
      'audio',
      'byline.credit_type',
      'byline.person',
      'format',
      'image',
      'categories',
      'opencalais_city',
      'opencalais_continent',
      'opencalais_country',
      'opencalais_province',
      'opencalais_region',
      'opencalais_person',
      'primary_category',
      'program',
      'tags',
      'verticals',
      'video'
    ]
  })) as IPriApiResource;
  const { type, primaryCategory } = story;
  const related = primaryCategory && (await fetchPriApiQuery('node--stories', {
    'filter[primary_category]': primaryCategory.id,
    'filter[status]': 1,
    range: 4,
    sort: '-date_published',
    include: [
      'image'
    ],
    fields: [
      'image',
      'metatags',
      'title'
    ]
  })) as IPriApiResource[];

  return {
    type,
    story,
    ...(related && { related })
  };
};
