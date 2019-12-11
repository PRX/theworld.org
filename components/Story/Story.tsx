/**
 * @file Story.tsx
 * Component for Story.
 */
import React, { useContext } from 'react';
import Head from 'next/head';
import ContentContext from '@contexts/ContentContext';
import { fetchPriApiItem } from '@lib/fetch';
import dynamic from 'next/dynamic';

const DynamicDefault = dynamic(() => import('./Story.default'));

const layoutComponentMap = {
  standard: DynamicDefault
}

const Story = () => {
  const { data: { title, displayTemplate } } = useContext(ContentContext);
  const LayoutComponent = layoutComponentMap[displayTemplate || 'standard'];

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <LayoutComponent />
    </>
  );
}

Story.fetchData = async (id: string|number) => {
  return await fetchPriApiItem('node--stories', id, {
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
      'program.logo',
      'program.podcast_logo',
      'tags',
      'verticals'
    ]
  });
}

export default Story;
