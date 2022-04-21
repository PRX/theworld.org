/**
 * @file SidebarEpisode.tsx
 * Component for story card links.
 */

import React from 'react';
import 'moment-timezone';
import dynamic from 'next/dynamic';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { Headset } from '@material-ui/icons';
import { ContentButton } from '@components/ContentButton';
import { ContentLink } from '@components/ContentLink';
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
  const { audio, program, dateBroadcast, datePublished } = data;
  const { segments } = audio || {};
  const classes = sidebarEpisodeStyles({});
  const cx = classNames.bind(classes);

  return (
    <ThemeProvider theme={sidebarEpisodeTheme}>
      <Card square elevation={1} className={cx('root')}>
        <CardActionArea>
          <SidebarHeader>
            <Typography variant="h2">
              <Headset /> {label}
            </Typography>
          </SidebarHeader>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
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
