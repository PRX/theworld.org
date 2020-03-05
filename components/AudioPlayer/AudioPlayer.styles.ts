/**
 * @file AudioPlayer.style.ts
 * Styles and theme for AudioPlayer.
 */

import {  createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const audioPlayerTheme = (theme: Theme) => createMuiTheme(theme, {
  overrides: {}
});

export const audioPlayerStyles = makeStyles(() => (
  createStyles({
    root: {}
  })
));
