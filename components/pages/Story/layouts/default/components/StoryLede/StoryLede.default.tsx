/**
 * @file StoryLede.ts
 * Component for default story lede.
 */

import type React from 'react';
import type {
  PostStory,
  Post_Additionalmedia as PostAdditionalMedia
} from '@interfaces';
import type { ILedeImageProps } from '@components/LedeImage';
import type { ILedeVideoProps } from '@components/LedeVideo';
import dynamic from 'next/dynamic';

const LedeImage = dynamic(
  () => import('@components/LedeImage').then((mod) => mod.LedeImage) as any
) as React.FC<ILedeImageProps>;

const LedeVideo = dynamic(
  () => import('@components/LedeVideo').then((mod) => mod.LedeVideo) as any
) as React.FC<ILedeVideoProps>;

interface Props {
  data: PostStory;
}

export const StoryLede = ({ data }: Props) => {
  const { featuredImage, additionalMedia } = data;
  const image = featuredImage?.node;
  const { video } = additionalMedia as PostAdditionalMedia;

  if (video) return <LedeVideo data={{ url: video }} />;

  if (image) return <LedeImage data={image} />;

  return null;
};
