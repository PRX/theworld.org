/**
 * @file AppSearch.tsx
 * Component for Category.
 */

import type {
  Episode,
  PostStory,
  Segment,
  RootState,
  SearchFacet,
  ContentNodeConnection
} from '@interfaces';
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
import { SegmentCard } from '@components/SegmentCard';
import { StoryCard } from '@components/StoryCard';
import { searchFacetKeys } from '@interfaces';
import { fetchSearchData } from '@store/actions/fetchSearchData';
import {
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

function getContentData<T>(results?: ContentNodeConnection) {
  if (!results) return undefined;
  return results.edges.map((edge) => edge.node as T);
}

export const AppSearch = ({ static: staticPage, q = '' }: AppSearchProps) => {
  const router = useRouter();
  const queryRef = useRef<HTMLInputElement>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const store = useStore<RootState>();
  const [state, setState] = useState(store.getState());
  const [label, setLabel] = useState('posts' as SearchFacet);
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const query = getSearchQuery(state) || q;
  const isOpen = staticPage || getSearchOpen(state) || false;
  const isLoading = getSearchLoading(state) || false;
  const data = getSearchData(state, query);
  const hasData = !!data;
  const { posts, episodes, segments } = data || {};
  const postsHasNextPage = !!posts?.pageInfo?.hasNextPage;
  const episodesHasNextPage = !!episodes?.pageInfo?.hasNextPage;
  const segmentsHasNextPage = !!segments?.pageInfo?.hasNextPage;
  const storyData = getContentData<PostStory>(posts);
  const episodeData = getContentData<Episode>(episodes);
  const segmentsData = getContentData<Segment>(segments);
  const { classes } = appSearchStyles();

  const formatTabLabel = (l: SearchFacet) => `${l === 'posts' ? 'stories' : l}`;

  const handleClose = () => {
    store.dispatch({ type: 'SEARCH_CLOSE' });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (queryRef?.current) {
      store.dispatch<any>(fetchSearchData(queryRef.current.value));
    }
  };

  const handleLoadMore =
    (l: SearchFacet): MouseEventHandler<HTMLButtonElement> =>
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      store.dispatch<any>(fetchSearchData(query, l));
    };

  const handleClearQuery = () => {
    store.dispatch({ type: 'SEARCH_CLEAR_QUERY' });

    if (queryRef?.current) {
      queryRef.current.value = '';
      queryRef.current.focus();
    }
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
              {[...searchFacetKeys]
                .filter((l) => !!data[l]?.edges.length)
                .map((l) => (
                  <Tab label={formatTabLabel(l)} value={l} key={l} />
                ))}
            </TabList>
          </Container>
        </AppBar>
      )}
    </form>
  );

  const renderSearchResults = () =>
    hasData && (
      <>
        <TabPanel value="posts">
          {!!storyData?.length && (
            <Container fixed>
              <Grid container spacing={3}>
                {storyData.map(
                  (item) =>
                    item && (
                      <Grid item xs={12} key={item.id}>
                        <StoryCard data={item} short />
                      </Grid>
                    )
                )}
              </Grid>
              {postsHasNextPage && (
                <Box mt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleLoadMore('posts')}
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
        <TabPanel value="episodes">
          {!!episodeData?.length && (
            <Container fixed>
              <Grid container spacing={3}>
                {episodeData.map(
                  (item: Episode) =>
                    item && (
                      <Grid item xs={12} md={6} key={item.id}>
                        <EpisodeCard data={item} />
                      </Grid>
                    )
                )}
              </Grid>
              {episodesHasNextPage && (
                <Box mt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleLoadMore('episodes')}
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
        <TabPanel value="segments">
          {!!segmentsData?.length && (
            <Container fixed>
              <Grid container spacing={3}>
                {segmentsData.map(
                  (item) =>
                    item && (
                      <Grid item xs={12} md={6} key={item.id}>
                        <SegmentCard data={item} />
                      </Grid>
                    )
                )}
              </Grid>
              {segmentsHasNextPage && (
                <Box mt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleLoadMore('segments')}
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
