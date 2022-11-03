/**
 * @file PlayAudioButton.tsx
 * Play button component to toggle playing state of player.
 */

import React, { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import clsx from 'clsx';
import { CircularProgress, NoSsr } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { PlayArrowSharp, PauseSharp } from '@material-ui/icons';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import { IAudioData } from '@components/Player/types';
import { IAudioResource } from '@interfaces';
import { parseAudioData } from '@lib/parse/audio/audioData';
import { fetchAudioData } from '@store/actions/fetchAudioData';
import { getDataByResource } from '@store/reducers';
import { playAudioButtonStyles } from './PlayAudioButton.styles';

export interface IPlayAudioButtonProps {
  className?: string;
  id: string;
  fallbackProps?: Partial<IAudioData>;
}

export const PlayAudioButton = ({
  className,
  id,
  fallbackProps
}: IPlayAudioButtonProps) => {
  const store = useStore();
  const [state, updateForce] = useState(store.getState());
  const unsub = store.subscribe(() => {
    updateForce(store.getState());
  });
  const audio = getDataByResource(state, 'file--audio', id) as IAudioResource;
  const audioData = audio && parseAudioData(audio, fallbackProps);
  const [loading, setLoading] = useState(false);

  const { state: playerState, playAudio, togglePlayPause } = useContext(
    PlayerContext
  );
  const { playing, currentTrackIndex, tracks } = playerState;
  const currentTrack = tracks?.[currentTrackIndex];
  const audioIsPlaying =
    playing && audioData && currentTrack?.guid === audioData.guid;
  const classes = playAudioButtonStyles({
    audioIsPlaying
  });
  const playBtnClasses = clsx(className, classes.root);
  const iconClasses = {
    root: classes.iconRoot
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
      await store.dispatch<any>(fetchAudioData(id));
    })();
  };

  useEffect(() => {
    if (loading && audioData) {
      setLoading(false);
      playAudio(audioData);
    }
  }, [loading, audioData?.guid]);

  useEffect(() => {
    return () => {
      unsub();
    };
  }, []);

  return audioData ? (
    <NoSsr>
      <IconButton
        className={playBtnClasses}
        onClick={handlePlayClick}
        disableRipple
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
        onClick={handleLoadClick}
        disableRipple
      >
        {!loading ? (
          <PlayArrowSharp titleAccess="Play" classes={iconClasses} />
        ) : (
          <CircularProgress classes={iconClasses} size="1em" />
        )}
      </IconButton>
    </NoSsr>
  );
};
