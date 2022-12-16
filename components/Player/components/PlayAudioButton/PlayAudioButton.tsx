/**
 * @file PlayAudioButton.tsx
 * Play button component to toggle playing state of player.
 */

import React, { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { CircularProgress, NoSsr, Tooltip } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { PauseSharp, PlayArrowSharp, VolumeUpSharp } from '@mui/icons-material';
import { IPriApiResource } from 'pri-api-library/types';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import { IAudioData } from '@components/Player/types';
import { IAudioResource } from '@interfaces';
import { parseAudioData } from '@lib/parse/audio/audioData';
import { fetchAudioData } from '@store/actions/fetchAudioData';
import { fetchEpisodeData } from '@store/actions/fetchEpisodeData';
import { fetchStoryData } from '@store/actions/fetchStoryData';
import { getDataByResource } from '@store/reducers';
import { playAudioButtonStyles } from './PlayAudioButton.styles';

export interface IPlayAudioButtonProps extends IconButtonProps {
  className?: string;
  id?: string;
  audio?: IAudioData;
  fallbackProps?: Partial<IAudioData>;
}

export const PlayAudioButton = ({
  className,
  classes,
  id,
  audio,
  fallbackProps,
  ...other
}: IPlayAudioButtonProps) => {
  const store = useStore();
  const [audioResource, setAudio] = useState<IAudioResource>();
  const [audioData, setAudioData] = useState<IAudioData>(audio);
  const [loading, setLoading] = useState(false);

  const { state: playerState, playAudio, togglePlayPause } = useContext(
    PlayerContext
  );
  const { playing, currentTrackIndex, tracks } = playerState;
  const currentTrack = tracks?.[currentTrackIndex];
  const [audioIsPlaying, setAudioIsPlaying] = useState(
    playing &&
      (audio || audioData) &&
      currentTrack?.guid === (audio || audioData).guid
  );
  const tooltipTitle = audioIsPlaying ? 'Pause' : 'Play';
  const { classes: styles, cx } = playAudioButtonStyles({
    audioIsPlaying
  });
  const rootClassNames = cx('root', className);
  const iconButtonClasses = {
    root: styles.iconButtonRoot,
    label: styles.iconButtonLabel,
    ...classes
  };
  const iconClasses = {
    root: styles.iconRoot
  };
  const progressClasses = {
    colorPrimary: styles.circularProgressPrimary
  };

  const handlePlayClick = () => {
    const usedAudioData = audio || audioData;
    if (usedAudioData && usedAudioData.guid !== currentTrack?.guid) {
      playAudio(usedAudioData);
    } else {
      togglePlayPause();
    }
  };

  const handleLoadClick = () => {
    (async () => {
      setLoading(true);
      const ar = await store.dispatch<any>(fetchAudioData(id));
      let linkResource: IPriApiResource;

      if (ar.usage?.story) {
        linkResource = await store.dispatch<any>(
          fetchStoryData(ar.usage.story[0].id)
        );
      }

      if (ar.usage?.episode) {
        linkResource = await store.dispatch<any>(
          fetchEpisodeData(ar.usage.episode[0].id)
        );
      }

      setLoading(false);
      setAudio(ar);
      playAudio(
        parseAudioData(
          ar,
          linkResource
            ? {
                ...fallbackProps,
                title: linkResource.title,
                ...(linkResource.image && { imageUrl: linkResource.image.url }),
                linkResource
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
    setAudioData(() => audio);
  }, [audio?.guid]);

  useEffect(() => {
    setAudioData(audioResource && parseAudioData(audioResource, fallbackProps));
  }, [audioResource?.id]);

  useEffect(() => {
    const usedAudioData = audio || audioData;

    if (currentTrack?.guid === (usedAudioData?.guid || `file--audio:${id}`)) {
      if (!audioData && currentTrack) setAudioData(currentTrack);
      if (!audioData && audio) setAudioData(audio);
      setAudioIsPlaying(playing);
    } else {
      setAudioIsPlaying(false);
    }
  }, [currentTrack?.guid, audio?.guid, audioData?.guid, id, playing]);

  useEffect(() => {
    const track = (tracks || []).find(
      ({ guid }) => guid === `file--audio:${id}`
    );
    if (track && !audioData) setAudioData(track);
  }, [tracks?.length, id]);

  return (
    <NoSsr>
      <Tooltip title={tooltipTitle} placement="top" arrow>
        {audio || audioData ? (
          <IconButton
            className={rootClassNames}
            classes={iconButtonClasses}
            disableRipple
            {...other}
            onClick={handlePlayClick}
            {...(audioIsPlaying && { 'data-playing': true })}
          >
            {!audioIsPlaying && <PlayArrowSharp classes={iconClasses} />}
            {audioIsPlaying && (
              <>
                <VolumeUpSharp
                  classes={iconClasses}
                  className={styles.hideOnHover}
                />
                <PauseSharp
                  classes={iconClasses}
                  className={styles.showOnHover}
                />
              </>
            )}
          </IconButton>
        ) : (
          <IconButton
            className={rootClassNames}
            classes={iconButtonClasses}
            disableRipple
            {...other}
            onClick={handleLoadClick}
            {...(loading && { 'data-loading': true })}
          >
            {!loading ? (
              <PlayArrowSharp classes={iconClasses} />
            ) : (
              <CircularProgress classes={progressClasses} size="1em" />
            )}
          </IconButton>
        )}
      </Tooltip>
    </NoSsr>
  );
};
