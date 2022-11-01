/**
 * @file PlayAudioButton.tsx
 * Play button component to toggle playing state of player.
 */

import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames/bind';
import { PlayArrowSharp } from '@material-ui/icons';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import IconButton from '@material-ui/core/IconButton';
import { IAudioData } from '../../types';
import { playAudioButtonStyles } from './PlayAudioButton.styles';

const PauseSharp = dynamic(() => import('@material-ui/icons/PauseSharp'), {
  loading: () => <PlayArrowSharp />
});

export interface IPlayAudioButtonProps {
  className?: string;
  audio: IAudioData;
}

export const PlayAudioButton = ({
  className,
  audio
}: IPlayAudioButtonProps) => {
  const { state, playAudio, togglePlayPause } = useContext(PlayerContext);
  const { playing, currentTrackIndex, tracks } = state;
  const currentTrack = tracks?.[currentTrackIndex];
  const audioIsPlaying = playing && currentTrack?.guid === audio.guid;
  const classes = playAudioButtonStyles({
    playing
  });
  const cx = classNames.bind(classes);
  const playBtnClasses = cx(className, {
    playBtn: true
  });

  const handleClick = () => {
    if (audio && audio.guid !== currentTrack?.guid) {
      playAudio(audio);
    } else {
      togglePlayPause();
    }
  };

  return (
    <IconButton
      className={playBtnClasses}
      aria-label={audioIsPlaying ? 'Pause' : 'Play'}
      onClick={handleClick}
      disableRipple
    >
      {!audioIsPlaying && <PlayArrowSharp titleAccess="Play" />}
      {audioIsPlaying && <PauseSharp titleAccess="Pause" />}
    </IconButton>
  );
};
