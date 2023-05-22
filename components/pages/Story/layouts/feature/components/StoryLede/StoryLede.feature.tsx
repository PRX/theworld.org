/**
 * @file StoryLede.ts
 * Component for default story lede.
 */

import React from 'react';
import dynamic from 'next/dynamic';
import { IPriApiResource } from 'pri-api-library/types';
import { ILedeImageProps } from '@components/LedeImage';
import { ILedeVideoProps } from '@components/LedeVideo';

const LedeImage = dynamic(
  () => import('@components/LedeImage').then((mod) => mod.LedeImage) as any
) as React.FC<ILedeImageProps>;

const LedeVideo = dynamic(
  () => import('@components/LedeVideo').then((mod) => mod.LedeVideo) as any
) as React.FC<ILedeVideoProps>;

export interface IStoryLedeProps {
  data: IPriApiResource;
}

export const StoryLede = ({ data }: IStoryLedeProps) => {
  const { image, video } = data;

  if (video) return <LedeVideo data={video[0]} />;

  if (image) return <LedeImage data={image} />;

  return null;
};
