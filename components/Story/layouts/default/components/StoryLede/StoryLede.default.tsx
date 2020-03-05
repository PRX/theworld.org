/**
 * @file StoryLede.ts
 * Component for default story lede.
 */

import React, { useContext } from 'react';
import { ContentContext } from '@contexts/ContentContext';
import { LedeImage } from '@components/LedeImage';
import { LedeVideo } from '@components/LedeVideo';

export const StoryLede = () => {
  const {
    data: {
      story: { image, video }
    }
  } = useContext(ContentContext);

  return (
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
  );
};
