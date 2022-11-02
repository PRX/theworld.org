/**
 * @file Story.default.tsx
 * Component for default Story layout.
 */

import React from 'react';
import dynamic from 'next/dynamic';
import { useStore } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';
import { CtaRegion } from '@components/CtaRegion';
import { HtmlContent } from '@components/HtmlContent';
import { enhanceImage } from '@components/HtmlContent/transforms';
import { IPlayAudioButtonProps } from '@components/Player/components';
import { ITagsProps } from '@components/Tags';
import { IContentComponentProps } from '@interfaces/content';
import { RootState } from '@interfaces/state';
import { parseAudioData } from '@lib/parse/audio/audioData';
import { getCollectionData, getCtaRegionData } from '@store/reducers';
import { IStoryRelatedLinksProps } from '../default/components/StoryRelatedLinks';
import { storyStyles, storyTheme } from './Story.feature.styles';
import { StoryHeader } from './components';

const PlayAudioButton = dynamic(() =>
  import('@components/Player/components').then(mod => mod.PlayAudioButton)
) as React.FC<IPlayAudioButtonProps>;

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
    title,
    image,
    body,
    bylines,
    program,
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
  const audioData =
    audio &&
    parseAudioData(audio, {
      title,
      info: [
        ...(program ? [program.title] : []),
        ...(bylines
          ? bylines.reduce(
              (acc, [, people]) => [...acc, people.map(person => person.title)],
              []
            )
          : [])
      ],
      ...(image && { imageUrl: image.url })
    });
  const related =
    relatedState &&
    relatedState.items[1].filter(item => item.id !== id).slice(0, 4);
  const ctaInlineEnd = getCtaRegionData(
    state,
    'tw_cta_region_content_inline_end',
    type,
    id as string
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

  const enhanceImages = enhanceImage(node => {
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
      <Container fixed>
        {audio && (
          <PlayAudioButton audio={audioData} />
          // <AudioPlayer
          //   data={audio}
          //   message="Listen to the story."
          //   embeddedPlayerUrl={embeddedPlayerUrl}
          //   popoutPlayerUrl={popoutPlayerUrl}
          // />
        )}
        <Box className={classes.body} my={2}>
          <HtmlContent html={body} transforms={[enhanceImages]} />
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
      </Container>
    </ThemeProvider>
  );
};
