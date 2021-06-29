/**
 * @file BioHeader.tsx
 * Component for bio header elements.
 */

import React from 'react';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Container, Typography, ThemeProvider } from '@material-ui/core';
import { ContentLink } from '@components/ContentLink';
import { Image } from '@components/Image';
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
                data={image}
                width={220}
                height={220}
                className={cx('image')}
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
