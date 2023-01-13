/**
 * @file DrawerSearch.tsx
 * Component for DrawerSearch.
 */

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useStore } from 'react-redux';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { fetchSearchData } from '@store/actions/fetchSearchData';
import { getSearchQuery } from '@store/reducers';
import { appDrawerSearchStyles } from './DrawerSearch.styles';

export const DrawerSearch = () => {
  const queryRef = useRef(null);
  const store = useStore();
  const [state, setState] = useState(store.getState());
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const query = getSearchQuery(state);
  const { classes } = appDrawerSearchStyles();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    store.dispatch({
      type: 'SEARCH_OPEN',
      payload: { query: queryRef.current.value }
    });
    store.dispatch<any>(fetchSearchData(queryRef.current.value, 'all'));
    store.dispatch({ type: 'UI_DRAWER_CLOSE' });
  };

  const handleClearQuery = () => {
    queryRef.current.value = '';
    queryRef.current.focus();
  };

  useEffect(
    () => () => {
      unsub();
    },
    [unsub]
  );

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Box className={classes.root}>
        <TextField
          variant="standard"
          inputRef={queryRef}
          id="standard-basic"
          label="I am looking for&hellip;"
          defaultValue={query}
          size="medium"
          color="secondary"
          fullWidth
          classes={{
            root: classes.inputRoot
          }}
          InputLabelProps={{
            classes: {
              root: classes.labelRoot
            }
          }}
          InputProps={{
            classes: {
              root: classes.inputRoot,
              underline: classes.inputUnderline
            },
            endAdornment: (
              <InputAdornment
                sx={{
                  color: 'inherit'
                }}
                position="end"
              >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClearQuery}
                  color="inherit"
                  size="small"
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>
    </form>
  );
};
