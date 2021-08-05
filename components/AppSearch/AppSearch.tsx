/**
 * @file AppSearch.tsx
 * Component for Category.
 */

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useStore } from 'react-redux';
import { parse } from 'url';
import { SearchFacet, searchFacetLabels } from '@interfaces/state';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { ThemeProvider } from '@material-ui/core/styles';
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
  const { story } = data || {};
  const stories = (story || [])
    .reduce((a, { items }) => [...a, ...items], [])
    .map(({ link }) => {
      const { pathname } = parse(link);
      console.log(pathname);
      return getContentDataByAlias(state, pathname);
    })
    .filter(s => !!s && s);
  const queryRef = useRef(null);
  const classes = appSearchStyles({});

  console.log(query, data, story, stories);

  const handleClose = () => {
    store.dispatch({ type: 'SEARCH_CLOSE' });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    store.dispatch<any>(fetchSearchData(queryRef.current.value, label));
  };

  const handleClearQuery = () => {
    store.dispatch({ type: 'SEARCH_CLEAR_QUERY' });
    queryRef.current.value = '';
    queryRef.current.focus();
  };

  useEffect(() => {
    return () => {
      unsub();
    };
  }, []);

  return (
    <ThemeProvider theme={appSearchTheme}>
      <Dialog fullScreen open={isOpen}>
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
        </form>
        <DialogContent>
          {!!stories.length &&
            stories.map(s => <h2 key={s.id}>{s?.title || 'Not Loaded'}</h2>)}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};
