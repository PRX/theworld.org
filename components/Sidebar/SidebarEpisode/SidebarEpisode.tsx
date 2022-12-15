/**
 * @file SidebarEpisode.tsx
 * Component for story card links.
 */

import React from 'react';
import 'moment-timezone';
import dynamic from 'next/dynamic';
import { IPriApiResource } from 'pri-api-library/types';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Headset } from '@mui/icons-material';
import { ThemeProvider } from '@mui/styles';
import { ContentButton } from '@components/ContentButton';
import { ContentLink } from '@components/ContentLink';
import { AudioControls } from '@components/Player/components';
import {
  sidebarEpisodeStyles,
  sidebarEpisodeTheme
} from './SidebarEpisode.styles';
import { SidebarAudioList } from '../SidebarAudioList';
import { SidebarHeader } from '../SidebarHeader';
import { SidebarFooter } from '../SidebarFooter';

const Moment = dynamic(() => import('react-moment')) as any;

export interface SidebarEpisodeProps {
  data: IPriApiResource;
  label?: string;
}

export const SidebarEpisode = ({ data, label }: SidebarEpisodeProps) => {
  const { audio, program, dateBroadcast, datePublished, title, image } = data;
  const { id: audioId, segments } = audio || {};
  const { classes, cx } = sidebarEpisodeStyles();

  return (
    <ThemeProvider theme={sidebarEpisodeTheme}>
      <Card square elevation={1} className={cx('root')}>
        <CardActionArea component="div">
          <SidebarHeader className={classes.header}>
            <Headset />
            <Typography variant="h2"> {label}</Typography>
            <AudioControls
              className={classes.audio}
              id={audioId}
              fallbackProps={{
                title,
                queuedFrom: 'Sidebar Episode Controls',
                ...(image && { imageUrl: image.url })
              }}
            />
          </SidebarHeader>
          <CardContent>
            <Typography
              variant="h5"
              component="p"
              gutterBottom
              className={cx('title')}
            >
              <Moment format="dddd, MMMM D, YYYY" tz="America/New_York" unix>
                {dateBroadcast || datePublished}
              </Moment>
            </Typography>
            <ContentLink data={data} className={cx('link')} />
          </CardContent>
        </CardActionArea>
        {segments && (
          <>
            <SidebarAudioList disablePadding data={segments} />
          </>
        )}
        {program?.metatags && (
          <SidebarFooter>
            <ContentButton
              data={program}
              query={{ v: 'episodes' }}
              variant="contained"
              color="primary"
              fullWidth
            >
              More Episodes
            </ContentButton>
          </SidebarFooter>
        )}
      </Card>
    </ThemeProvider>
  );
};
