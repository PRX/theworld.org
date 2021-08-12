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
import { parse } from 'url';
import { SearchFacet, searchFacetLabels } from '@interfaces/state';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { EpisodeCard } from '@components/EpisodeCard';
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

export const AppSearch = () => {
  const queryRef = useRef(null);
  const dialogContentRef = useRef(null);
  const store = useStore();
  const [state, setState] = useState(store.getState());
  const [label, setLabel] = useState('story' as SearchFacet);
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const query = getSearchQuery(state);
  const isOpen = getSearchOpen(state);
  const isLoading = getSearchLoading(state);
  const data = getSearchData(state, query);
  const hasData = !!data;
  const { story, episode } = data || {};
  const storyData = (story || [])
    .reduce((a, { items }) => [...a, ...items], [])
    .map(({ link }) => {
      const { pathname } = parse(link);
      return getContentDataByAlias(state, pathname);
    })
    .filter(item => !!item && item);
  const episodeData = (episode || [])
    .reduce((a, { items }) => [...a, ...items], [])
    .map(({ link }) => {
      const { pathname } = parse(link);
      return getContentDataByAlias(state, pathname);
    })
    .filter(item => !!item && item);
  const classes = appSearchStyles({});

  const formatTabLabel = (l: SearchFacet) =>
    `${l} (${data[l]?.[0].searchInformation.totalResults || 0})`;

  const handleClose = () => {
    store.dispatch({ type: 'SEARCH_CLOSE' });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    store.dispatch<any>(fetchSearchData(queryRef.current.value, 'all'));
  };

  const handleLoadMore = (
    l: SearchFacet
  ): MouseEventHandler<HTMLButtonElement> => (
    e: MouseEvent<HTMLButtonElement>
  ) => {
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
    dialogContentRef.current.scrollTo = 0;
  };

  useEffect(() => {
    console.log('Mounting App Search...', data, state.search);
    return () => {
      console.log('Unmounting App Search...');
      unsub();
    };
  }, []);

  return (
    <ThemeProvider theme={appSearchTheme}>
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
          <form onSubmit={handleSubmit} autoComplete="off">
            <Box className={classes.searchForm}>
              <TextField
                inputRef={queryRef}
                id="standard-basic"
                className={classes.query}
                label="I am looking for&hellip;"
                defaultValue={query}
                size="medium"
                fullWidth
                InputProps={{
                  endAdornment: !isLoading ? (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
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
              <AppBar position="static" color="transparent">
                <Container fixed>
                  <TabList
                    indicatorColor="primary"
                    centered
                    onChange={handleFilterChange}
                    aria-label="filter results"
                  >
                    {searchFacetLabels.map(l => (
                      <Tab label={formatTabLabel(l)} value={l} key={l} />
                    ))}
                  </TabList>
                </Container>
              </AppBar>
            )}
          </form>
          {!!data && (
            <DialogContent ref={dialogContentRef}>
              <TabPanel value="story">
                {!!storyData.length && (
                  <Container fixed>
                    <Grid container spacing={3}>
                      {storyData.map(item => (
                        <Grid item xs={12} md={6} key={item.id}>
                          <StoryCard data={item} feature />
                        </Grid>
                      ))}
                    </Grid>
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
                  </Container>
                )}
              </TabPanel>
              <TabPanel value="episode">
                {!!episodeData.length && (
                  <Container fixed>
                    <Grid container spacing={3}>
                      {episodeData.map(item => (
                        <Grid item xs={12} md={6} key={item.id}>
                          <EpisodeCard data={item} />
                        </Grid>
                      ))}
                    </Grid>
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
                  </Container>
                )}
              </TabPanel>
            </DialogContent>
          )}
        </TabContext>
      </Dialog>
    </ThemeProvider>
  );
};
