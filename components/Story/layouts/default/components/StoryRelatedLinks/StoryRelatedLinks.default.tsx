/**
 * @file StoryRelatedLinks.default.ts
 * Component for default story related links.
 */

import React, { useContext } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { ContentContext } from '@contexts/ContentContext';
import { ContentLink } from '@components/ContentLink';
import {
  storyRelatedLinksStyles,
  storyRelatedLinksTheme
} from './StoryRelatedLinks.default.styles';

export const StoryRelatedLinks = () => {
  const {
    data: { related }
  } = useContext(ContentContext);
  const classes = storyRelatedLinksStyles({});

  return (
    <ThemeProvider theme={storyRelatedLinksTheme}>
      <Grid container spacing={2} classes={{ root: classes.root }}>
        {related.map(story => {
          const {
            id,
            title,
            image: {
              title: imageTitle,
              styles: {
                card_small: { src }
              }
            }
          } = story;
          return (
            <Grid item lg={3} xs={6} key={id}>
              <ContentLink data={story}>
                <Card square elevation={1}>
                  <CardActionArea>
                    <CardMedia image={src} title={imageTitle} />
                    <CardContent>{title}</CardContent>
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
