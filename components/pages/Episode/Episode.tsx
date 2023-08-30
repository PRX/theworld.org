/**
 * @file Episode.tsx
 * Component for Episode.
 */

import type {
  Episode as EpisodeType,
  Episode_Episodeaudio as EpisodeEpisodeAudio,
  Episode_Episodedates as EpisodeEpisodeDates,
  Episode_Episodecontributors as EpisodeEpisodeContributors,
  IContentComponentProps,
  MediaItem,
  MediaItem_Audiofields as MediaItemAudioFields,
  Episode_Episodecontent as EpisodeEpisodeContent,
  PostStory,
  RootState
} from '@interfaces';
import { useContext } from 'react';
import { useStore } from 'react-redux';
import {
  Box,
  Container,
  Divider,
  Grid,
  Hidden,
  Typography
} from '@mui/material';
import { EqualizerRounded } from '@mui/icons-material';
import { NoJsPlayer } from '@components/AudioPlayer/NoJsPlayer';
import { CtaRegion } from '@components/CtaRegion';
import { HtmlContent } from '@components/HtmlContent';
import { MetaTags } from '@components/MetaTags';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarList,
  SidebarLatestStories,
  SidebarCta
} from '@components/Sidebar';
import { SpotifyPlayer } from '@components/SpotifyPlayer';
import { StoryCard } from '@components/StoryCard';
// import { CtaRegion } from '@components/CtaRegion';
import { AppContext } from '@contexts/AppContext';
// import { UiAction } from '@interfaces/state';
import { parseDateParts } from '@lib/parse/date';
import { getCtaRegionData } from '@store/reducers';
import { episodeStyles } from './Episode.styles';
import { EpisodeLede } from './components/EpisodeLede';
import { EpisodeHeader } from './components/EpisodeHeader';

export const Episode = ({ data }: IContentComponentProps<EpisodeType>) => {
  const store = useStore<RootState>();
  const state = store.getState();
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const { classes } = episodeStyles();

  const {
    seo: dataMetatags,
    title,
    content,
    date,
    episodeDates,
    episodeAudio,
    episodeContributors,
    episodeContent
  } = data || ({} as typeof data);
  const { broadcastDate } = episodeDates as EpisodeEpisodeDates;
  const metatags = {
    ...dataMetatags,
    ...((broadcastDate || date) && {
      pubdate: broadcastDate || date
    })
  };
  const { audio } = episodeAudio || ({} as EpisodeEpisodeAudio);
  const { audioFields } = (audio || {}) as MediaItem;
  const { segmentsList } = (audioFields || {}) as MediaItemAudioFields;
  const { hosts, producers, guests, reporters } =
    episodeContributors as EpisodeEpisodeContributors;
  const { spotifyPlaylists, relatedStories } =
    episodeContent as EpisodeEpisodeContent;
  const spotifyPlaylist = spotifyPlaylists
    ?.map(
      (fieldGroup) => fieldGroup?.spotifyPlaylist && fieldGroup.spotifyPlaylist
    )
    .filter((v): v is string => !!v);
  const stories = relatedStories?.filter(
    (story): story is PostStory => !!story
  );

  // CTA data.
  const ctaInlineEnd = getCtaRegionData(
    state,
    'tw_cta_region_content_inline_end',
    type,
    id
  );
  const ctaSidebarTop = getCtaRegionData(
    state,
    'tw_cta_region_content_sidebar_01',
    type,
    id
  );
  const ctaSidebarBottom = getCtaRegionData(
    state,
    'tw_cta_region_content_sidebar_02',
    type,
    id
  );

  // Plausible Events.
  const props = {
    Title: title,
    ...(broadcastDate &&
      (() => {
        const dt = parseDateParts(broadcastDate);
        return {
          'Broadcast Year': dt[0],
          'Broadcast Month': dt.slice(0, 2).join('-'),
          'Broadcast Date': dt.join('-')
        };
      })()),
    ...(date &&
      (() => {
        const dt = parseDateParts(date);
        return {
          'Published Year': dt[0],
          'Published Month': dt.slice(0, 2).join('-'),
          'Published Date': dt.join('-')
        };
      })())
  };
  const plausibleEvents: PlausibleEventArgs[] = [['Episode', { props }]];

  [
    ...(hosts || []),
    ...(producers || []),
    ...(guests || []),
    ...(reporters || [])
  ].forEach((person) => {
    if (person?.name) {
      plausibleEvents.push([
        `Person: ${person.name}`,
        {
          props: { 'Page Type': 'Episode' }
        }
      ]);
    }
  });

  // useEffect(() => {
  //   if (shareLinks) {
  //     // Show social hare menu.
  //     store.dispatch<UiAction>({
  //       type: 'UI_SHOW_SOCIAL_SHARE_MENU',
  //       payload: {
  //         ui: {
  //           socialShareMenu: {
  //             links: [
  //               {
  //                 key: 'twitter',
  //                 link: shareLinks.twitter
  //               },
  //               {
  //                 key: 'facebook',
  //                 link: shareLinks.facebook
  //               },
  //               {
  //                 key: 'linkedin',
  //                 link: shareLinks.linkedin
  //               },
  //               {
  //                 key: 'flipboard',
  //                 link: shareLinks.flipboard
  //               },
  //               {
  //                 key: 'whatsapp',
  //                 link: shareLinks.whatsapp
  //               },
  //               {
  //                 key: 'email',
  //                 link: shareLinks.email
  //               }
  //             ]
  //           }
  //         }
  //       }
  //     });
  //   }

  //   return () => {
  //     // Hide social hare menu.
  //     store.dispatch<UiAction>({
  //       type: 'UI_HIDE_SOCIAL_SHARE_MENU'
  //     });
  //   };
  // }, [shareLinks, store]);

  return (
    <>
      <MetaTags data={metatags} />
      <Plausible events={plausibleEvents} subject={{ type, id }} />
      <Container fixed>
        <Grid container>
          <Grid item xs={12}>
            <EpisodeHeader data={data} />
            {audio?.sourceUrl ? <NoJsPlayer url={audio.sourceUrl} /> : null}
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.main}>
              <Box className={classes.content}>
                <EpisodeLede data={data} />
                {content && (
                  <Box className={classes.body} my={2}>
                    <HtmlContent html={content} />
                  </Box>
                )}
                {spotifyPlaylist && !!spotifyPlaylist.length && (
                  <Box my={3}>
                    <Divider classes={{ root: classes.MuiDividerRoot }} />
                    <Typography
                      variant="h4"
                      component="h2"
                      className={classes.heading}
                    >
                      Music heard on air
                    </Typography>
                    <Grid container spacing={2}>
                      {spotifyPlaylist.map((uri) => (
                        <Grid item xs={12} sm={6} lg={4} key={uri}>
                          <SpotifyPlayer uri={uri} size="large" stretch />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
                {stories && (
                  <Box my={3}>
                    <Divider />
                    <Typography
                      variant="h4"
                      component="h2"
                      className={classes.heading}
                    >
                      Stories from this episode
                    </Typography>
                    {stories.map((item) => (
                      <Box mt={2} key={item.id}>
                        <StoryCard
                          data={item}
                          feature={item.presentation?.format !== 'standard'}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
                {ctaInlineEnd && <CtaRegion data={ctaInlineEnd} />}
              </Box>
              <Sidebar container className={classes.sidebar}>
                {segmentsList && (
                  <Sidebar item elevated>
                    <SidebarHeader>
                      <EqualizerRounded />
                      <Typography variant="h2">In this episode:</Typography>
                    </SidebarHeader>
                    <SidebarList
                      disablePadding
                      data={segmentsList.map((segment) => ({
                        data:
                          segment?.segmentContent?.audio?.parent?.node ||
                          segment,
                        audio: segment?.segmentContent?.audio
                      }))}
                    />
                    <SidebarFooter />
                  </Sidebar>
                )}
                {hosts && !!hosts.length && (
                  <Sidebar item elevated>
                    <SidebarList
                      data={hosts.map((item) => ({
                        data: item,
                        avatar: item?.contributorDetails?.image
                      }))}
                      subheaderText="Hosts"
                    />
                  </Sidebar>
                )}
                {producers && !!producers.length && (
                  <Sidebar item elevated>
                    <SidebarList
                      data={producers.map((item) => ({
                        data: item,
                        avatar: item?.contributorDetails?.image
                      }))}
                      subheaderText="Producers"
                    />
                  </Sidebar>
                )}
                {guests && !!guests.length && (
                  <Sidebar item elevated>
                    <SidebarList
                      data={guests.map((item) => ({
                        data: item,
                        avatar: item?.contributorDetails?.image
                      }))}
                      subheaderText="Guests"
                    />
                  </Sidebar>
                )}
                {reporters && !!reporters.length && (
                  <Sidebar item elevated>
                    <SidebarList
                      data={reporters.map((item) => ({
                        data: item,
                        avatar: item?.contributorDetails?.image
                      }))}
                      subheaderText="Reporters"
                    />
                  </Sidebar>
                )}
                {ctaSidebarTop && (
                  <Hidden smDown>
                    <Sidebar item>
                      <SidebarCta data={ctaSidebarTop} />
                    </Sidebar>
                  </Hidden>
                )}
                <SidebarLatestStories />
                {ctaSidebarBottom && (
                  <Hidden smDown>
                    <Sidebar item>
                      <SidebarCta data={ctaSidebarBottom} />
                    </Sidebar>
                  </Hidden>
                )}
              </Sidebar>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
