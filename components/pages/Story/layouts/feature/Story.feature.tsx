/**
 * @file Story.default.tsx
 * Component for default Story layout.
 */

import type React from 'react';
import type { ITagsProps } from '@components/Tags';
import type { IContentComponentProps } from '@interfaces/content';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useStore } from 'react-redux';
import { ThemeProvider } from '@mui/styles';
import { Box, Container } from '@mui/material';
import { NoJsPlayer } from '@components/AudioPlayer/NoJsPlayer';
import { CtaRegion } from '@components/CtaRegion';
import { HtmlContent } from '@components/HtmlContent';
import { enhanceImage } from '@components/HtmlContent/transforms';
import { RootState } from '@interfaces/state';
import { getCollectionData, getCtaRegionData } from '@store/reducers';
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

interface StateProps extends RootState {}

type Props = StateProps & IContentComponentProps;

export const StoryDefault = ({ data }: Props) => {
  const {
    type,
    id,
    audio,
    body,
    categories,
    primaryCategory,
    tags,
    opencalaisCity,
    opencalaisContinent,
    opencalaisCountry,
    opencalaisProvince,
    opencalaisRegion,
    opencalaisPerson
  } = data;
  const store = useStore<RootState>();
  const [state, updateForce] = useState(store.getState());
  const unsub = store.subscribe(() => {
    updateForce(store.getState());
  });
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
    relatedState.items[1].filter((item) => item.id !== id).slice(0, 4);
  const ctaInlineEnd = getCtaRegionData(
    state,
    'tw_cta_region_content_inline_end',
    type,
    id as string
  );
  const { classes } = storyStyles();
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

  useEffect(
    () => () => {
      unsub();
    },
    [unsub]
  );

  return (
    <ThemeProvider theme={storyTheme}>
      <StoryHeader data={data} />
      <Container classes={{ maxWidthLg: classes.MuiContainerMaxWidthLg }} fixed>
        <Box className={classes.body} my={2}>
          {audio ? <NoJsPlayer url={audio.url} /> : null}
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
