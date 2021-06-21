/**
 * @file Story.default.tsx
 * Component for default Story layout.
 */

import React from 'react';
import dynamic from 'next/dynamic';
import { useStore } from 'react-redux';
import { convertNodeToElement } from 'react-html-parser';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box, Container, Grid } from '@material-ui/core';
import { IAudioPlayerProps } from '@components/AudioPlayer/AudioPlayer.interfaces';
import { CtaRegion } from '@components/CtaRegion';
import { HtmlContent } from '@components/HtmlContent';
import { ITagsProps } from '@components/Tags';
import { IContentComponentProps } from '@interfaces/content';
import { RootState } from '@interfaces/state';
import { getCollectionData, getCtaRegionData } from '@store/reducers';
import { IStoryRelatedLinksProps } from '../default/components/StoryRelatedLinks';
import { storyStyles, storyTheme } from './Story.feature.styles';
import { StoryHeader } from './components';

const AudioPlayer = dynamic(() =>
  import('@components/AudioPlayer').then(mod => mod.AudioPlayer)
) as React.FC<IAudioPlayerProps>;

const StoryRelatedLinks = dynamic(
  () =>
    import('./components/StoryRelatedLinks').then(
      mod => mod.StoryRelatedLinks
    ) as any
) as React.FC<IStoryRelatedLinksProps>;

const Tags = dynamic(() =>
  import('@components/Tags').then(mod => mod.Tags)
) as React.FC<ITagsProps>;

interface StateProps extends RootState {}

type Props = StateProps & IContentComponentProps;

export const StoryDefault = ({ data }: Props) => {
  const {
    type,
    id,
    body,
    categories,
    primaryCategory,
    tags,
    opencalaisCity,
    opencalaisContinent,
    opencalaisCountry,
    opencalaisProvince,
    opencalaisRegion,
    opencalaisPerson,
    audio,
    embeddedPlayerUrl,
    popoutPlayerUrl
  } = data;
  const store = useStore();
  const state = store.getState();
  const relatedState =
    primaryCategory &&
    getCollectionData(
      state,
      primaryCategory.type,
      primaryCategory.id as string,
      'related'
    );
  const related =
    relatedState &&
    relatedState.items[1].filter(item => item.id !== id).slice(0, 4);
  const ctaInlineEnd = getCtaRegionData(
    state,
    type,
    id as string,
    'tw_cta_region_content_inline_end'
  );
  const classes = storyStyles({});
  const hasRelated = related && !!related.length;
  const hasCategories = categories && !!categories.length;
  const allTags = [
    ...(tags || []),
    ...(opencalaisCity || []),
    ...(opencalaisContinent || []),
    ...(opencalaisCountry || []),
    ...(opencalaisProvince || []),
    ...(opencalaisRegion || []),
    ...(opencalaisPerson || [])
  ];
  const hasTags = !!allTags.length;

  const wrapBrowserWidthImg = (node, transform, index: number) => {
    if (
      node.type === 'tag' &&
      node.name === 'img' &&
      'class' in node.attribs &&
      /file-browser-width/.test(node.attribs.class)
    ) {
      return (
        <div className="file-browser-width-wrapper">
          {convertNodeToElement(node, index, transform)}
        </div>
      );
    }
    return undefined;
  };

  const wrapFullWidthImg = (node, transform, index: number) => {
    if (
      node.type === 'tag' &&
      node.name === 'img' &&
      'class' in node.attribs &&
      /file-full-width/.test(node.attribs.class)
    ) {
      return (
        <div className="file-full-width-wrapper">
          {convertNodeToElement(node, index, transform)}
        </div>
      );
    }
    return undefined;
  };

  return (
    <ThemeProvider theme={storyTheme}>
      <StoryHeader data={data} />
      <Container fixed>
        <Grid container>
          <Grid item xs={12}>
            {audio && (
              <AudioPlayer
                data={audio}
                message="Listen to the story."
                embeddedPlayerUrl={embeddedPlayerUrl}
                popoutPlayerUrl={popoutPlayerUrl}
              />
            )}
            <Box className={classes.body} my={2}>
              <HtmlContent
                html={body}
                transforms={[wrapBrowserWidthImg, wrapFullWidthImg]}
              />
            </Box>
            {ctaInlineEnd && <CtaRegion data={ctaInlineEnd} />}
            {hasRelated && (
              <aside>
                <header>
                  <h2>Related Content</h2>
                </header>
                <StoryRelatedLinks data={related} />
              </aside>
            )}
            {hasCategories && <Tags data={categories} label="Categories" />}
            {hasTags && <Tags data={allTags} label="Tags" />}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
