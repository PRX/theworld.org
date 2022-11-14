/**
 * @file embed/audio[id].tsx
 * Exports the audio embed page component.
 */

import React from 'react';
import { GetServerSidePropsResult } from 'next';
import {
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { fetchAudio, fetchEpisode, fetchStory } from '@lib/fetch';
import { AudioPlayer } from '@components/AudioPlayer';
import { IAudioPlayerProps } from '@components/AudioPlayer/AudioPlayer.interfaces';

interface Props {
  data: IPriApiResource;
}

const ContentProxy = ({ data }: Props) => {
  let props: IAudioPlayerProps = {
    data,
    message: [
      data.audioTitle || data.title,
      ...(data.program ? [data.program.title] : [])
    ]
      .filter(v => !!v)
      .join(' - ')
  };

  const { type } = data;
  if (['node--stories', 'node--episodes'].includes(type)) {
    const { audio, title, program, metatags } = data;
    const { audioTitle, program: audioProgram } = audio || {};
    const { canonical } = metatags || {};
    const message = [
      audioTitle || title,
      ...(audioProgram ? [audioProgram.title] : [program.title])
    ]
      .filter(v => !!v)
      .join(' - ');

    props = {
      message,
      data: audio,
      popoutPlayerUrl: canonical
    };
  }

  return <AudioPlayer {...props} style={{ margin: 0 }} />;
};

export const getServerSideProps = async ({
  params: { id }
}): Promise<GetServerSidePropsResult<any>> => {
  const resourceId = Array.isArray(id) ? id[0] : id;
  let data: IPriApiResource;

  // Attempt to fetch story data.
  data = await fetchStory(resourceId).then(
    (resp: IPriApiResourceResponse) => resp && resp.data
  );

  if (data) {
    return {
      props: {
        contentOnly: true,
        data
      }
    };
  }

  // Attempt to fetch story data.
  data = await fetchEpisode(resourceId).then(
    (resp: IPriApiResourceResponse) => resp && resp.data
  );

  if (data) {
    return {
      props: {
        contentOnly: true,
        data
      }
    };
  }

  // Attempt to get audio data.
  data = await fetchAudio(resourceId).then(
    (resp: IPriApiResourceResponse) => resp && resp.data
  );

  if (data) {
    return {
      props: {
        contentOnly: true,
        data
      }
    };
  }

  return { notFound: true };
};

export default ContentProxy;
