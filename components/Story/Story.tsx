/**
 * @file Story.tsx
 * Component for Story.
 */
import React, { useContext } from 'react';
import { IncomingMessage } from 'http';
import Head from 'next/head';
import { ContentContext } from '@contexts/ContentContext';
import { fetchApiStory } from '@lib/fetch';
import { layoutComponentMap } from './layouts';
import { IContentContextData } from '../../interfaces/content/content.interface';

export const Story = () => {
  const {
    data: { title, displayTemplate }
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

Story.fetchData = async (
  id: string | number,
  req: IncomingMessage
): Promise<IContentContextData> => fetchApiStory(id, req);
