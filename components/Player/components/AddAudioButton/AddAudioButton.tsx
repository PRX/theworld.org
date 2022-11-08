/**
 * @file AddAudioButton.tsx
 * Play button component to toggle playing state of player.
 */

import React, { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import clsx from 'clsx';
import { CircularProgress, NoSsr } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
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

export interface IAddAudioButtonProps {
  className?: string;
  id: string;
  fallbackProps?: Partial<IAudioData>;
}

export const AddAudioButton = ({
  className,
  id,
  fallbackProps
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
  const classes = useAddAudioButtonStyles({
    isInTracks: isQueued
  });
  const btnClasses = clsx(classes.root, className);
  const iconButtonClasses = {
    root: classes.iconButtonRoot
  };
  const iconClasses = {
    root: classes.iconRoot
  };
  const progressClasses = {
    colorPrimary: classes.circularProgressPrimary
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
    const track = (tracks || []).find(
      ({ guid }) => guid === `file--audio:${id}`
    );
    if (track) {
      if (!audioData) setAudioData(track);
      setIsQueued(true);
    } else {
      setIsQueued(false);
    }
  }, [tracks?.length]);

  return audioData ? (
    <NoSsr>
      {!isQueued ? (
        <IconButton
          classes={iconButtonClasses}
          className={btnClasses}
          onClick={handleAddClick}
          disableRipple
        >
          <PlaylistAddSharp
            titleAccess="Add To Playlist"
            classes={iconClasses}
          />
        </IconButton>
      ) : (
        <IconButton
          classes={iconButtonClasses}
          className={btnClasses}
          onClick={handleRemoveClick}
          disableRipple
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
        classes={iconButtonClasses}
        className={btnClasses}
        onClick={handleLoadClick}
        disableRipple
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
