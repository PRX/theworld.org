/**
 * @file StoryRelatedLinks.default.ts
 * Component for default story related links.
 */

import React from 'react';
import Image from 'next/legacy/image';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { ContentLink } from '@components/ContentLink';
import {
  storyRelatedLinksStyles,
  storyRelatedLinksTheme
} from './StoryRelatedLinks.feature.styles';

interface Props {
  data: IPriApiResource[];
}

export const StoryRelatedLinks = ({ data: related }: Props) => {
  const { classes } = storyRelatedLinksStyles();
  const imageWidth = [
    ['max-width: 600px', '100vw'],
    [null, '300px']
  ];
  const sizes = imageWidth.map(([q, w]) => (q ? `(${q}) ${w}` : w)).join(', ');

  return (
    <ThemeProvider theme={storyRelatedLinksTheme}>
      <Grid container spacing={2} classes={{ root: classes.root }}>
        {related.map((story) => {
          const { id: storyId, title, image } = story;
          return (
            <Grid item md={3} sm={6} xs={12} key={storyId}>
              <ContentLink data={story}>
                <Card square elevation={1}>
                  <CardActionArea>
                    <CardMedia>
                      <Image
                        src={image.url}
                        alt={image.alt}
                        layout="fill"
                        objectFit="cover"
                        sizes={sizes}
                      />
                    </CardMedia>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </ContentLink>
            </Grid>
          );
        })}
      </Grid>
    </ThemeProvider>
  );
};
