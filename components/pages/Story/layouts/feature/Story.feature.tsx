/**
 * @file Story.default.tsx
 * Component for default Story layout.
 */

import React from 'react';
import { useStore } from 'react-redux';
import { convertNodeToElement, Transform } from 'react-html-parser';
import { DomElement } from 'htmlparser2';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box, Container, Grid } from '@material-ui/core';
import { AudioPlayer } from '@components/AudioPlayer';
import { CtaRegion } from '@components/CtaRegion';
import { HtmlContent } from '@components/HtmlContent';
import { Tags } from '@components/Tags';
import { IContentComponentProps } from '@interfaces/content';
import { RootState } from '@interfaces/state';
import { getCollectionData, getCtaRegionData } from '@store/reducers';
import { storyStyles, storyTheme } from './Story.feature.styles';
import { StoryHeader, StoryRelatedLinks } from './components';

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

  const wrapBrowserWidthImg = (
    node: DomElement,
    transform: Transform,
    index: number
  ) => {
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

  const wrapFullWidthImg = (
    node: DomElement,
    transform: Transform,
    index: number
  ) => {
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
