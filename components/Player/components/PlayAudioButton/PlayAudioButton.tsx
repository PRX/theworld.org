/**
 * @file PlayAudioButton.tsx
 * Play button component to toggle playing state of player.
 */

import React, { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import clsx from 'clsx';
import { CircularProgress, NoSsr } from '@material-ui/core';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import { PlayArrowSharp, PauseSharp } from '@material-ui/icons';
import { IPriApiResource } from 'pri-api-library/types';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import { IAudioData } from '@components/Player/types';
import { IAudioResource } from '@interfaces';
import { parseAudioData } from '@lib/parse/audio/audioData';
import { fetchAudioData } from '@store/actions/fetchAudioData';
import { fetchStoryData } from '@store/actions/fetchStoryData';
import { getDataByResource } from '@store/reducers';
import { playAudioButtonStyles } from './PlayAudioButton.styles';

export interface IPlayAudioButtonProps extends IconButtonProps {
  className?: string;
  id: string;
  fallbackProps?: Partial<IAudioData>;
}

export const PlayAudioButton = ({
  className,
  id,
  fallbackProps,
  ...other
}: IPlayAudioButtonProps) => {
  const store = useStore();
  const [audio, setAudio] = useState<IAudioResource>();
  const [audioData, setAudioData] = useState<IAudioData>();
  const [loading, setLoading] = useState(false);

  const { state: playerState, playAudio, togglePlayPause } = useContext(
    PlayerContext
  );
  const { playing, currentTrackIndex, tracks } = playerState;
  const currentTrack = tracks?.[currentTrackIndex];
  const [audioIsPlaying, setAudioIsPlaying] = useState(
    playing && audioData && currentTrack?.guid === audioData.guid
  );
  const classes = playAudioButtonStyles({
    audioIsPlaying
  });
  const playBtnClasses = clsx(classes.root, className);
  const iconButtonClasses = {
    root: classes.iconButtonRoot
  };
  const iconClasses = {
    root: classes.iconRoot
  };
  const progressClasses = {
    colorPrimary: classes.circularProgressPrimary
  };

  const handlePlayClick = () => {
    if (audioData && audioData.guid !== currentTrack?.guid) {
      playAudio(audioData);
    } else {
      togglePlayPause();
    }
  };

  const handleLoadClick = () => {
    (async () => {
      setLoading(true);
      const ar = await store.dispatch<any>(fetchAudioData(id));
      let story: IPriApiResource;

      if (ar.usage?.story) {
        story = await store.dispatch<any>(fetchStoryData(ar.usage.story[0].id));
      }

      setLoading(false);
      setAudio(ar);
      playAudio(
        parseAudioData(
          ar,
          story
            ? {
                title: story.title,
                ...(story.image && { imageUrl: story.image.url })
              }
            : fallbackProps
        )
      );
    })();
  };

  useEffect(() => {
    setAudio(
      getDataByResource(store.getState(), 'file--audio', id) as IAudioResource
    );
  }, [id]);

  useEffect(() => {
    setAudioData(audio && parseAudioData(audio, fallbackProps));
  }, [audio?.id]);

  useEffect(() => {
    if (currentTrack?.guid === `file--audio:${id}`) {
      if (!audioData) setAudioData(currentTrack);
      setAudioIsPlaying(playing);
    } else {
      setAudioIsPlaying(false);
    }
  }, [currentTrack?.guid, playing]);

  return audioData ? (
    <NoSsr>
      <IconButton
        className={playBtnClasses}
        classes={iconButtonClasses}
        onClick={handlePlayClick}
        disableRipple
        {...other}
      >
        {!audioIsPlaying && (
          <PlayArrowSharp titleAccess="Play" classes={iconClasses} />
        )}
        {audioIsPlaying && (
          <PauseSharp titleAccess="Pause" classes={iconClasses} />
        )}
      </IconButton>
    </NoSsr>
  ) : (
    <NoSsr>
      <IconButton
        className={playBtnClasses}
        classes={iconButtonClasses}
        onClick={handleLoadClick}
        disableRipple
        {...other}
      >
        {!loading ? (
          <PlayArrowSharp titleAccess="Play" classes={iconClasses} />
        ) : (
          <CircularProgress classes={progressClasses} size="1em" />
        )}
      </IconButton>
    </NoSsr>
  );
};
