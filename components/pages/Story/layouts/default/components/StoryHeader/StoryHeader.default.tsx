/**
 * @file StoryHeader.ts
 * Component for default story header.
 */

import React from 'react';
import dynamic from 'next/dynamic';
import 'moment-timezone';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Typography } from '@material-ui/core';
import { IContentLinkProps } from '@components/ContentLink';
import { storyHeaderStyles } from './StoryHeader.default.styles';

const Moment = dynamic(() => import('react-moment')) as any;

const ContentLink = dynamic(() =>
  import('@components/ContentLink').then(mod => mod.ContentLink)
) as React.FC<IContentLinkProps>;
interface Props {
  data: IPriApiResource;
}

export const StoryHeader = ({ data }: Props) => {
  const {
    byline,
    dateBroadcast,
    datePublished,
    dateUpdated,
    primaryCategory,
    program,
    title
  } = data;
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
        <Typography variant="h1">{title}</Typography>
      </Box>
      <Box className={classes.meta} mb={2}>
        <Box className={classes.info}>
          {program && (
            <ContentLink data={program} className={classes.programLink} />
          )}
          <Typography
            variant="subtitle1"
            component="div"
            className={classes.date}
          >
            <Moment format="MMMM D, YYYY · h:mm A z" tz="America/New_York" unix>
              {dateBroadcast || datePublished}
            </Moment>
          </Typography>
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
          {byline && (
            <ul className={classes.byline}>
              {byline
                .filter(({ person }) => !!person)
                .map(({ id, creditType, person }) => (
                  <li className={classes.bylineItem} key={id}>
                    {creditType ? creditType.title : 'By'}{' '}
                    <ContentLink className={classes.bylineLink} data={person} />
                  </li>
                ))}
            </ul>
          )}
        </Box>
      </Box>
    </Box>
  );
};
