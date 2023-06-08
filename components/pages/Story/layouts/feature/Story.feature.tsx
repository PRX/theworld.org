/**
 * @file Story.default.tsx
 * Component for default Story layout.
 */

import type React from 'react';
import type { ITagsProps } from '@components/Tags';
import type {
  Post_Additionalmedia as PostAdditionalMedia,
  PostStory
} from '@interfaces';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@mui/styles';
import { Box, Container } from '@mui/material';
import { NoJsPlayer } from '@components/AudioPlayer/NoJsPlayer';
// import { CtaRegion } from '@components/CtaRegion';
import { HtmlContent } from '@components/HtmlContent';
import { enhanceImage } from '@components/HtmlContent/transforms';
import type { IStoryRelatedLinksProps } from '../default/components/StoryRelatedLinks';
import { storyStyles, storyTheme } from './Story.feature.styles';
import { StoryHeader } from './components';

const StoryRelatedLinks = dynamic(
  () =>
    import('./components/StoryRelatedLinks').then(
      (mod) => mod.StoryRelatedLinks
    ) as any
) as React.FC<IStoryRelatedLinksProps>;

const Tags = dynamic(() =>
  import('@components/Tags').then((mod) => mod.Tags)
) as React.FC<ITagsProps>;

export interface IStoryFeaturedProps {
  data: PostStory;
}

export const StoryFeatured = ({ data }: IStoryFeaturedProps) => {
  const {
    additionalMedia,
    content,
    categories,
    primaryCategory,
    tags,
    cities,
    continents,
    countries,
    provincesOrStates,
    regions,
    people
  } = data;
  const { audio } = additionalMedia as PostAdditionalMedia;
  const related = primaryCategory?.nodes[0].posts?.nodes;
  const { classes } = storyStyles();
  const hasRelated = related && !!related.length;
  const hasCategories = !!categories?.nodes?.length;
  const allTags = [
    ...(tags?.nodes || []),
    ...(cities?.nodes || []),
    ...(continents?.nodes || []),
    ...(countries?.nodes || []),
    ...(provincesOrStates?.nodes || []),
    ...(regions?.nodes || []),
    ...(people?.nodes || [])
  ];
  const hasTags = !!allTags.length;

  const enhanceImages = enhanceImage((node) => {
    switch (true) {
      case /\bfile-on-the-side\b/.test(node.attribs.class):
        return [
          ['max-width: 600px', '100vw'],
          ['max-width: 960px', '560px'],
          ['max-width: 1280px', '400px'],
          [null, '400px']
        ];

      case /\bfile-browser-width\b/.test(node.attribs.class):
        return [[null, '100vw']];

      default:
        return [
          ['max-width: 600px', '100vw'],
          [null, '1200px']
        ];
    }
  });

  return (
    <ThemeProvider theme={storyTheme}>
      <StoryHeader data={data} />
      <Container classes={{ maxWidthLg: classes.MuiContainerMaxWidthLg }} fixed>
        <Box className={classes.body} my={2}>
          {audio?.sourceUrl ? <NoJsPlayer url={audio.sourceUrl} /> : null}
          {content && (
            <HtmlContent html={content} transforms={[enhanceImages]} />
          )}
        </Box>
        {/* {ctaInlineEnd && <CtaRegion data={ctaInlineEnd} />} */}
        {hasRelated && (
          <aside>
            <header>
              <h2>Related Content</h2>
            </header>
            <StoryRelatedLinks data={related} />
          </aside>
        )}
        {hasCategories && <Tags data={categories.nodes} label="Categories" />}
        {hasTags && <Tags data={allTags} label="Tags" />}
      </Container>
    </ThemeProvider>
  );
};
