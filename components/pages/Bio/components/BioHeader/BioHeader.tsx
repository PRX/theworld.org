/**
 * @file BioHeader.tsx
 * Component for bio header elements.
 */

import type { Maybe, MediaItem, Program } from '@interfaces';
import Image from 'next/legacy/image';
import { Box, Container, Typography } from '@mui/material';
import { ContentLink } from '@components/ContentLink';
import { bioHeaderStyles } from './BioHeader.styles';

export interface IBioHeaderProps {
  image?: Maybe<MediaItem>;
  programs?: Maybe<Program>[];
  title?: string;
  position?: string;
  subhead?: string;
}

export const BioHeader = ({
  image,
  programs,
  title,
  position,
  subhead
}: IBioHeaderProps) => {
  const { classes } = bioHeaderStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Container fixed className={classes.header}>
          {image?.sourceUrl && (
            <Image
              src={image.sourceUrl}
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
            {programs?.length &&
              programs.map(
                (program) =>
                  program?.link && (
                    <ContentLink className={classes.link} url={program.link}>
                      {program.name}
                    </ContentLink>
                  )
              )}
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
