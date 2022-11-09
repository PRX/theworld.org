/**
 * @file AddAudioButton.tsx
 * Play button component to toggle playing state of player.
 */

import React, { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import clsx from 'clsx';
import { CircularProgress, NoSsr } from '@material-ui/core';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import { PlaylistAddSharp, PlaylistAddCheckSharp } from '@material-ui/icons';
import { IPriApiResource } from 'pri-api-library/types';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import { IAudioData } from '@components/Player/types';
import { IAudioResource } from '@interfaces';
import { parseAudioData } from '@lib/parse/audio/audioData';
import { fetchAudioData } from '@store/actions/fetchAudioData';
import { fetchStoryData } from '@store/actions/fetchStoryData';
import { getDataByResource } from '@store/reducers';
import { useAddAudioButtonStyles } from './AddAudioButton.styles';

export interface IAddAudioButtonProps extends IconButtonProps {
  id: string;
  fallbackProps?: Partial<IAudioData>;
}

export const AddAudioButton = ({
  className,
  classes,
  id,
  fallbackProps,
  ...other
}: IAddAudioButtonProps) => {
  const store = useStore();
  const [audio, setAudio] = useState<IAudioResource>();
  const [audioData, setAudioData] = useState<IAudioData>();
  const [loading, setLoading] = useState(false);
  const { state: playerState, addTrack, removeTrack } = useContext(
    PlayerContext
  );
  const { tracks } = playerState;
  const [isQueued, setIsQueued] = useState(false);
  const styles = useAddAudioButtonStyles({
    isQueued,
    loading
  });
  const btnClasses = clsx(styles.root, className);
  const iconButtonClasses = {
    root: styles.iconButtonRoot,
    ...classes
  };
  const iconClasses = {
    root: styles.iconRoot
  };
  const progressClasses = {
    colorPrimary: styles.circularProgressPrimary
  };

  const handleAddClick = () => {
    addTrack(audioData);
  };

  const handleRemoveClick = () => {
    removeTrack(audioData);
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
      addTrack(
        parseAudioData(
          ar,
          story
            ? {
                ...fallbackProps,
                title: story.title,
                ...(story.image && { imageUrl: story.image.url }),
                linkResource: story
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
    const track = (tracks || []).find(
      ({ guid }) => guid === `file--audio:${id}`
    );
    if (track) {
      if (!audioData) setAudioData(track);
      setIsQueued(true);
    } else {
      setIsQueued(false);
    }
  }, [tracks?.length, id]);

  return audioData ? (
    <NoSsr>
      {!isQueued ? (
        <IconButton
          className={btnClasses}
          classes={iconButtonClasses}
          disableRipple
          {...other}
          onClick={handleAddClick}
        >
          <PlaylistAddSharp
            titleAccess="Add To Playlist"
            classes={iconClasses}
          />
        </IconButton>
      ) : (
        <IconButton
          className={btnClasses}
          classes={iconButtonClasses}
          disableRipple
          {...other}
          onClick={handleRemoveClick}
          data-queued
        >
          <PlaylistAddCheckSharp
            titleAccess="Remove From Playlist"
            classes={iconClasses}
          />
        </IconButton>
      )}
    </NoSsr>
  ) : (
    <NoSsr>
      <IconButton
        className={btnClasses}
        classes={iconButtonClasses}
        disableRipple
        {...other}
        onClick={handleLoadClick}
        {...(loading && { 'data-loading': true })}
      >
        {!loading ? (
          <PlaylistAddSharp
            titleAccess="Add To Playlist"
            classes={iconClasses}
          />
        ) : (
          <CircularProgress classes={progressClasses} size="1em" />
        )}
      </IconButton>
    </NoSsr>
  );
};
