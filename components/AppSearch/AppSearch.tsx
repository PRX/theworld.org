/**
 * @file AppSearch.tsx
 * Component for Category.
 */

import React, {
  FormEvent,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';
import { useStore } from 'react-redux';
import { useRouter } from 'next/router';
import { parse } from 'url';
import { customsearch_v1 as customSearch } from 'googleapis';
import { SearchFacet, searchFacetLabels } from '@interfaces/state';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/styles';
import { EpisodeCard } from '@components/EpisodeCard';
import { MediaCard } from '@components/MediaCard';
import { StoryCard } from '@components/StoryCard';
import { fetchSearchData } from '@store/actions/fetchSearchData';
import {
  getContentDataByAlias,
  getSearchData,
  getSearchLoading,
  getSearchOpen,
  getSearchQuery
} from '@store/reducers';
import { appSearchStyles, appSearchTheme } from './AppSearch.styles';

export interface AppSearchProps {
  static?: boolean;
  q?: string;
}

export const AppSearch = ({ static: staticPage, q = null }: AppSearchProps) => {
  const router = useRouter();
  const queryRef = useRef(null);
  const dialogContentRef = useRef(null);
  const store = useStore();
  const [state, setState] = useState(store.getState());
  const [label, setLabel] = useState('story' as SearchFacet);
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const query = getSearchQuery(state) || q;
  const isOpen = staticPage || getSearchOpen(state) || false;
  const isLoading = getSearchLoading(state) || false;
  const data = getSearchData(state, query);
  const hasData = !!data;
  const { story, episode, media } = data || {};
  const { nextPage: nextPageStory } = story?.[story.length - 1].queries || {};
  const { nextPage: nextPageEpisode } =
    episode?.[episode.length - 1].queries || {};
  const { nextPage: nextPageMedia } = media?.[media.length - 1].queries || {};
  const getContentData = (results: customSearch.Schema$Search[]) =>
    (results || [])
      .reduce((a, { items }) => (!items ? a : [...a, ...items]), [])
      .map(({ link }) => {
        const { pathname } = parse(link);
        return getContentDataByAlias(state, pathname);
      })
      .filter((item) => !!item && item);
  const storyData = getContentData(story);
  const episodeData = getContentData(episode);
  const mediaData = getContentData(media);
  const { classes } = appSearchStyles();

  const formatTabLabel = (l: SearchFacet) =>
    `${l} (${data[l]?.[0].searchInformation?.totalResults || 0})`;

  const handleClose = () => {
    store.dispatch({ type: 'SEARCH_CLOSE' });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    store.dispatch<any>(fetchSearchData(queryRef.current.value, 'all'));
  };

  const handleLoadMore =
    (l: SearchFacet): MouseEventHandler<HTMLButtonElement> =>
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      store.dispatch<any>(fetchSearchData(query, l));
    };

  const handleClearQuery = () => {
    store.dispatch({ type: 'SEARCH_CLEAR_QUERY' });
    queryRef.current.value = '';
    queryRef.current.focus();
  };

  const handleFilterChange = (e: object, value: any) => {
    setLabel(value);

    if (staticPage || !dialogContentRef.current) return;

    dialogContentRef.current.scroll({ top: 0 });
  };

  useEffect(() => {
    const handleRouteChangeEnd = () => {
      store.dispatch({ type: 'SEARCH_CLOSE' });
    };

    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('routeChangeError', handleRouteChangeEnd);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('routeChangeError', handleRouteChangeEnd);
      unsub();
    };
  }, [router.events, store, unsub]);

  useEffect(() => {
    if (staticPage && !hasData) {
      if (queryRef.current) {
        queryRef.current.focus();
        queryRef.current.value = query;
      }
      store.dispatch<any>(fetchSearchData(query, 'all'));
    }
  }, [hasData, query, staticPage, store]);

  const renderSearchForm = () => (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Box className={classes.searchForm}>
        <TextField
          inputRef={queryRef}
          id="standard-basic"
          className={classes.query}
          label="I am looking for&hellip;"
          size="medium"
          variant="standard"
          fullWidth
          defaultValue={query}
          {...(staticPage && {
            InputLabelProps: {
              shrink: !!query?.length || !!queryRef.current?.value?.length
            }
          })}
          InputLabelProps={{
            classes: {
              root: classes.MuiInputLabelRoot,
              formControl: classes.MuiInputLabelFormControl,
              shrink: classes.MuiInputLabelShrink
            }
          }}
          InputProps={{
            classes: { root: classes.MuiInputRoot },
            endAdornment: !isLoading ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear search query"
                  onClick={handleClearQuery}
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ) : (
              <CircularProgress size="2rem" />
            )
          }}
        />
      </Box>
      {hasData && (
        <AppBar
          classes={{ root: classes.facetAppBarRoot }}
          position="static"
          color="transparent"
        >
          <Container fixed>
            <TabList
              indicatorColor="primary"
              centered
              onChange={handleFilterChange}
              aria-label="filter results"
            >
              {searchFacetLabels.map((l) => (
                <Tab label={formatTabLabel(l)} value={l} key={l} />
              ))}
            </TabList>
          </Container>
        </AppBar>
      )}
    </form>
  );

  const renderSearchResults = () =>
    !!data && (
      <>
        <TabPanel value="story">
          {!!storyData.length && (
            <Container fixed>
              <Grid container spacing={3}>
                {storyData.map((item) => (
                  <Grid item xs={12} key={item.id}>
                    <StoryCard data={item} short />
                  </Grid>
                ))}
              </Grid>
              {nextPageStory && (
                <Box mt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleLoadMore('story')}
                    fullWidth
                    disabled={isLoading}
                    disableElevation={isLoading}
                  >
                    Load More Stories
                  </Button>
                </Box>
              )}
            </Container>
          )}
        </TabPanel>
        <TabPanel value="episode">
          {!!episodeData.length && (
            <Container fixed>
              <Grid container spacing={3}>
                {episodeData.map((item) => (
                  <Grid item xs={12} md={6} key={item.id}>
                    <EpisodeCard data={item} />
                  </Grid>
                ))}
              </Grid>
              {nextPageEpisode && (
                <Box mt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleLoadMore('episode')}
                    fullWidth
                    disabled={isLoading}
                    disableElevation={isLoading}
                  >
                    Load More Episodes
                  </Button>
                </Box>
              )}
            </Container>
          )}
        </TabPanel>
        <TabPanel value="media">
          {!!mediaData.length && (
            <Container fixed>
              <Grid container spacing={3}>
                {mediaData.map((item) => (
                  <Grid item xs={12} md={6} key={item.id}>
                    <MediaCard data={item} />
                  </Grid>
                ))}
              </Grid>
              {nextPageMedia && (
                <Box mt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleLoadMore('media')}
                    fullWidth
                    disabled={isLoading}
                    disableElevation={isLoading}
                  >
                    Load More Media
                  </Button>
                </Box>
              )}
            </Container>
          )}
        </TabPanel>
      </>
    );

  return (
    <ThemeProvider theme={appSearchTheme}>
      {staticPage ? (
        <TabContext value={label}>
          {renderSearchForm()}
          {renderSearchResults()}
        </TabContext>
      ) : (
        <Dialog fullScreen open={isOpen}>
          <TabContext value={label}>
            <AppBar position="sticky">
              <Toolbar>
                <Typography variant="h2" className={classes.title}>
                  Search
                </Typography>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            {renderSearchForm()}
            <DialogContent
              ref={dialogContentRef}
              classes={{ root: classes.MuiDialogContentRoot }}
            >
              {renderSearchResults()}
            </DialogContent>
          </TabContext>
        </Dialog>
      )}
    </ThemeProvider>
  );
};
