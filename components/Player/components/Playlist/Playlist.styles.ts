/**
 * @file Playlist.style.ts
 * Styles and theme for Playlist.
 */

import { createStyles, makeStyles } from '@material-ui/core/styles';

export const usePlaylistStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'grid',
      justifyContent: 'center',
      alignContent: 'stretch',
      height: '100%',
      overflow: 'hidden',
      overflowY: 'auto'
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'end',
      marginInline: 'auto',
      '& > *': {
        display: 'grid',
        justifyContent: 'stretch'
      }
    }
  })
);
