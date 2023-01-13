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
import { ContentLink } from '@components/ContentLink';
import { storyRelatedLinksStyles } from './StoryRelatedLinks.default.styles';

export interface IStoryRelatedLinksProps {
  data: IPriApiResource[];
}

export const StoryRelatedLinks = ({
  data: related
}: IStoryRelatedLinksProps) => {
  const { classes } = storyRelatedLinksStyles();
  const imageWidth = [
    ['max-width: 600px', '100vw'],
    [null, '300px']
  ];
  const sizes = imageWidth.map(([q, w]) => (q ? `(${q}) ${w}` : w)).join(', ');

  return (
    <Grid
      container
      spacing={2}
      alignItems="stretch"
      classes={{ root: classes.root }}
    >
      {related.map((story) => {
        const { id: storyId, title, image } = story;
        return (
          <Grid item display="grid" lg={3} sm={6} xs={12} key={storyId}>
            <Card square elevation={1}>
              <CardActionArea
                component={ContentLink}
                data={story}
                classes={{ root: classes.MuiCardActionAreaRoot }}
              >
                {image && (
                  <CardMedia classes={{ root: classes.MuiCardMediaRoot }}>
                    <Image
                      src={image.url}
                      alt={image.alt}
                      layout="fill"
                      objectFit="cover"
                      sizes={sizes}
                    />
                  </CardMedia>
                )}
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.title}
                  >
                    {title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
