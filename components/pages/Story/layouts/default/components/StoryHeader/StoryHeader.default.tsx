/**
 * @file StoryHeader.ts
 * Component for default story header.
 */

import React from 'react';
import dynamic from 'next/dynamic';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Typography } from '@material-ui/core';
import { IContentLinkProps } from '@components/ContentLink';
import { IAudioControlsProps } from '@components/Player/components';
import { IAudioData } from '@components/Player/types';
import { storyHeaderStyles } from './StoryHeader.default.styles';

const Moment = dynamic(() => {
  import('moment-timezone');
  return import('react-moment');
}) as any;

const AudioControls = dynamic(() =>
  import('@components/Player/components').then(mod => mod.AudioControls)
) as React.FC<IAudioControlsProps>;

const ContentLink = dynamic(() =>
  import('@components/ContentLink').then(mod => mod.ContentLink)
) as React.FC<IContentLinkProps>;
interface Props {
  data: IPriApiResource;
}

export const StoryHeader = ({ data }: Props) => {
  const {
    audio,
    image,
    bylines,
    dateBroadcast,
    datePublished,
    dateUpdated,
    primaryCategory,
    program,
    title
  } = data;
  const audioProps = {
    title,
    ...(image && { imageUrl: image.url }),
    linkResource: data
  } as Partial<IAudioData>;
  const classes = storyHeaderStyles({});

  return (
    <Box component="header" className={classes.root} mt={4} mb={2}>
      {primaryCategory && (
        <Box mb={2}>
          <ContentLink
            className={classes.categoryLink}
            data={primaryCategory}
          />
        </Box>
      )}
      <Box mb={3}>
        <Typography className={classes.title} variant="h1">
          {title}
        </Typography>
      </Box>
      <Box className={classes.heading} mb={2}>
        <Box className={classes.info}>
          {program && (
            <ContentLink data={program} className={classes.programLink} />
          )}
          {(dateBroadcast || datePublished) && (
            <Typography
              variant="subtitle1"
              component="div"
              className={classes.date}
            >
              <Moment
                format="MMMM D, YYYY · h:mm A z"
                tz="America/New_York"
                unix
              >
                {dateBroadcast || datePublished}
              </Moment>
            </Typography>
          )}
          {dateUpdated && (
            <Typography
              variant="subtitle1"
              component="div"
              className={classes.date}
            >
              {' '}
              Updated on{' '}
              <Moment
                format="MMM. D, YYYY · h:mm A z"
                tz="America/New_York"
                unix
              >
                {dateUpdated}
              </Moment>
            </Typography>
          )}
          {bylines && (
            <ul className={classes.byline}>
              {bylines.map(([creditTitle, people]) => (
                <li className={classes.bylineItem} key={creditTitle}>
                  {creditTitle}{' '}
                  <Box className={classes.bylinePeople} component="span">
                    {people.map((person: IPriApiResource) => (
                      <Box
                        className={classes.bylinePerson}
                        component="span"
                        key={person.id}
                      >
                        <ContentLink
                          className={classes.bylineLink}
                          data={person}
                        />
                      </Box>
                    ))}
                  </Box>
                </li>
              ))}
            </ul>
          )}
        </Box>
        {audio && (
          <Box className={classes.audio}>
            <AudioControls id={audio.id} fallbackProps={audioProps} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
