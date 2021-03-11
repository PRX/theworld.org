/**
 * @file EpisodeLede.ts
 * Component for episode lede.
 */

import React from 'react';
import { LedeImage } from '@components/LedeImage';
import { LedeVideo } from '@components/LedeVideo';
import { IPriApiResource } from 'pri-api-library/types';

interface Props {
  data: IPriApiResource;
}

export const EpisodeLede = ({ data }: Props) => {
  const { image, video } = data;

  return image || video ? (
    <>
      {(video && <LedeVideo data={video[0]} />) || (
        <LedeImage
          data={image}
          widths={{
            xs: '90vw',
            sm: 552,
            md: 580,
            lg: 900,
            xl: 900
          }}
        />
      )}
    </>
  ) : null;
};
