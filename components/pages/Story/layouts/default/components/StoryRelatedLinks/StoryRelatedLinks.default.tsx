/**
 * @file StoryRelatedLinks.default.ts
 * Component for default story related links.
 */

import React from 'react';
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
import { ContentLink } from '@components/ContentLink';
import {
  storyRelatedLinksStyles,
  storyRelatedLinksTheme
} from './StoryRelatedLinks.default.styles';

export interface IStoryRelatedLinksProps {
  data: IPriApiResource[];
}

export const StoryRelatedLinks = ({
  data: related
}: IStoryRelatedLinksProps) => {
  const classes = storyRelatedLinksStyles({});

  return (
    <ThemeProvider theme={storyRelatedLinksTheme}>
      <Grid container spacing={2} classes={{ root: classes.root }}>
        {related.map(story => {
          const {
            id: storyId,
            title,
            image: {
              title: imageTitle,
              styles: {
                card_small: { src }
              }
            }
          } = story;
          return (
            <Grid item lg={3} xs={6} key={storyId}>
              <ContentLink data={story}>
                <Card square elevation={1}>
                  <CardActionArea>
                    <CardMedia image={src} title={imageTitle} />
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
