/**
 * @file Story.tsx
 * Component for Story.
 */
import React, { useContext } from 'react';
import Head from 'next/head';
import { IPriApiResource } from 'pri-api-library/types';
import { ContentContext } from '@contexts/ContentContext';
import {
  fetchPriApiItem,
  fetchPriApiQuery,
  postJsonPriApiCtaRegion
} from '@lib/fetch';
import { layoutComponentMap } from './layouts';

export const Story = () => {
  const {
    data: {
      story: { title, displayTemplate }
    }
  } = useContext(ContentContext);
  const LayoutComponent =
    layoutComponentMap[displayTemplate] || layoutComponentMap.standard;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <LayoutComponent />
    </>
  );
};

Story.getContext = (story: IPriApiResource) => [
  `node:${story.id}`,
  `node:${story.program?.id}`,
  `term:${story.primaryCategory?.id}`,
  ...((story.categories &&
    story.categories.length &&
    story.categories.map(({ id: tid }) => `term:${tid}`)) ||
    []),
  ...(story.verticals &&
    story.verticals.length &&
    story.verticals.map(({ tid }) => `term:${tid}`))
];

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
  const related =
    primaryCategory &&
    ((await fetchPriApiQuery('node--stories', {
      'filter[primary_category]': primaryCategory.id,
      'filter[status]': 1,
      range: 4,
      sort: '-date_published',
      include: ['image'],
      fields: ['image', 'metatags', 'title']
    })) as IPriApiResource[]);
  const context = Story.getContext(story);
  const { subqueues: ctaRegions } = (await postJsonPriApiCtaRegion(
    'tw_cta_regions_content',
    {
      context
    }
  )) as IPriApiResource;

  console.log(story.verticals, ctaRegions);

  return {
    type,
    story,
    context,
    ...(related && { related }),
    ...(ctaRegions && { ctaRegions })
  };
};
