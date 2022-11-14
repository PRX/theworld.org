/**
 * @file embed/audio[id].tsx
 * Exports the audio embed page component.
 */

import React from 'react';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import {
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { fetchAudio, fetchEpisode, fetchStory } from '@lib/fetch';
import { AudioPlayer } from '@components/AudioPlayer';
import { IAudioPlayerProps } from '@components/AudioPlayer/AudioPlayer.interfaces';

export interface IEmbedAudioPageProps {
  data: IPriApiResource;
  embeddedPlayerUrl?: string;
}

const ContentProxy = ({ data, embeddedPlayerUrl }: IEmbedAudioPageProps) => {
  let props: IAudioPlayerProps = {
    data,
    embeddedPlayerUrl,
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
      embeddedPlayerUrl,
      popoutPlayerUrl: canonical
    };
  }

  return <AudioPlayer {...props} style={{ margin: 0, boxShadow: 'none' }} />;
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params: { id }
}): Promise<GetServerSidePropsResult<any>> => {
  const resourceId = Array.isArray(id) ? id[0] : id;
  const embeddedPlayerUrl = `https://theworld.org${req.url}`;
  let data: IPriApiResource;

  console.log(req);

  // Attempt to fetch story data.
  data = await fetchStory(resourceId).then(
    (resp: IPriApiResourceResponse) => resp && resp.data
  );

  if (data) {
    return {
      props: {
        contentOnly: true,
        embeddedPlayerUrl,
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
        embeddedPlayerUrl,
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
        embeddedPlayerUrl,
        data
      }
    };
  }

  return { notFound: true };
};

export default ContentProxy;
