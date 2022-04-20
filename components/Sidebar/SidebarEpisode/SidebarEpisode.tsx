/**
 * @file SidebarEpisode.tsx
 * Component for story card links.
 */

import React from 'react';
import 'moment-timezone';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { ContentButton } from '@components/ContentButton';
import { ContentLink } from '@components/ContentLink';
import {
  sidebarEpisodeStyles,
  sidebarEpisodeTheme
} from './SidebarEpisode.styles';
import { SidebarAudioList } from '../SidebarAudioList';
import { SidebarFooter } from '../SidebarFooter';

const Moment = dynamic(() => import('react-moment')) as any;

export interface SidebarEpisodeProps {
  data: IPriApiResource;
  label?: string;
}

export const SidebarEpisode = ({ data, label }: SidebarEpisodeProps) => {
  const { image, audio, program, dateBroadcast, datePublished } = data;
  const { segments } = audio || {};
  const classes = sidebarEpisodeStyles({});
  const cx = classNames.bind(classes);
  const imageWidth = [
    ['max-width: 600px', '100vw'],
    ['max-width: 960px', '552px'],
    ['max-width: 1280px', '300px'],
    [null, '400px']
  ];
  const sizes = imageWidth.map(([q, w]) => (q ? `(${q}) ${w}` : w)).join(', ');

  return (
    <ThemeProvider theme={sidebarEpisodeTheme}>
      <Card square elevation={1} className={cx('root')}>
        <CardActionArea>
          {image && (
            <CardMedia>
              <Image
                src={image.url}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                sizes={sizes}
                priority
              />
            </CardMedia>
          )}
          <CardContent>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs="auto" zeroMinWidth>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  className={cx('title')}
                >
                  <Moment format="MMMM D, YYYY" tz="America/New_York" unix>
                    {dateBroadcast || datePublished}
                  </Moment>
                </Typography>
              </Grid>
              {label && (
                <Grid item xs="auto" zeroMinWidth>
                  <Typography variant="overline" noWrap>
                    {label}
                  </Typography>
                </Grid>
              )}
            </Grid>
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
