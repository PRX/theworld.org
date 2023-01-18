/**
 * @file BioHeader.tsx
 * Component for bio header elements.
 */

import React from 'react';
import Image from 'next/legacy/image';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Container, Typography } from '@mui/material';
import { ContentLink } from '@components/ContentLink';
import { bioHeaderStyles } from './BioHeader.styles';

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
  const { classes } = bioHeaderStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Container fixed className={classes.header}>
          {image && (
            <Image
              src={image.url}
              layout="fixed"
              width={220}
              height={220}
              className={classes.image}
              objectFit="cover"
            />
          )}
          <Box className={classes.text}>
            <Typography variant="h1" className={classes.title}>
              {title}
            </Typography>
            {position && (
              <Typography
                variant="subtitle1"
                component="p"
                className={classes.position}
              >
                {position}
              </Typography>
            )}
            {program && <ContentLink className={classes.link} data={program} />}
            {subhead && (
              <Typography
                variant="subtitle1"
                component="p"
                className={classes.subhead}
              >
                {subhead}
              </Typography>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
