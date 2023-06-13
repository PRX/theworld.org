/**
 * @file EpisodeLede.ts
 * Component for episode lede.
 */

import type { Episode } from '@interfaces';
import { LedeImage } from '@components/LedeImage';

interface Props {
  data: Episode;
}

export const EpisodeLede = ({ data }: Props) => {
  const { featuredImage } = data;
  const image = featuredImage?.node;

  if (image) return <LedeImage data={image} />;

  return null;
};
