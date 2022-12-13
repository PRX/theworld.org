/**
 * @file BioHeader.tsx
 * Component for bio header elements.
 */

import React from 'react';
import Image from 'next/legacy/image';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Container, Typography, ThemeProvider } from '@mui/material';
import { ContentLink } from '@components/ContentLink';
import { bioHeaderStyles, bioHeaderTheme } from './BioHeader.styles';

export interface IBioHeaderProps {
  image?: IPriApiResource;
  program?: IPriApiResource;
  title: string;
  position?: string;
  subhead?: string;
}

export const BioHeader = ({
  image,
  program,
  title,
  position,
  subhead
}: IBioHeaderProps) => {
  const classes = bioHeaderStyles({});
  const cx = classNames.bind(classes);
  return (
    <ThemeProvider theme={bioHeaderTheme}>
      <Box className={cx('root')}>
        <Box className={cx('content')}>
          <Container fixed className={cx('header')}>
            {image && (
              <Image
                src={image.url}
                layout="fixed"
                width={220}
                height={220}
                className={cx('image')}
                objectFit="cover"
              />
            )}
            <Box className={cx('text')}>
              <Typography variant="h1">{title}</Typography>
              {position && (
                <Typography variant="subtitle1" component="p">
                  {position}
                </Typography>
              )}
              {program && <ContentLink className={cx('link')} data={program} />}
              {subhead && (
                <Typography variant="subtitle1" component="p">
                  {subhead}
                </Typography>
              )}
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
