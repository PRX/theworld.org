/**
 * @file StoryRelatedLinks.default.ts
 * Component for default story related links.
 */

import type { PostStory } from '@interfaces';
import Image from 'next/legacy/image';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';
import { ContentLink } from '@components/ContentLink';
import { storyRelatedLinksStyles } from './StoryRelatedLinks.feature.styles';

export interface IStoryRelatedLinksProps {
  data: PostStory[];
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
        const { id: storyId, title, featuredImage, link } = story;
        const image = featuredImage?.node;
        return (
          link && (
            <Grid item display="grid" md={3} sm={6} xs={12} key={storyId}>
              <Card square elevation={1}>
                <CardActionArea
                  LinkComponent={ContentLink}
                  classes={{ root: classes.MuiCardActionAreaRoot }}
                >
                  {image?.sourceUrl && (
                    <CardMedia classes={{ root: classes.MuiCardMediaRoot }}>
                      <Image
                        src={image.sourceUrl}
                        alt={image.altText || ''}
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
                    <ContentLink url={link || ''} className={classes.link} />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        );
      })}
    </Grid>
  );
};
