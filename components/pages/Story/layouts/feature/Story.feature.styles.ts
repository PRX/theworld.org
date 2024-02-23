/**
 * @file Story.default.theme.tsx
 * Theme and styles for default Story layout.
 */

import { createTheme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { storyBodyStyles } from './styles/Story.body';

export const storyTheme = () => createTheme({});

export const storyStyles = makeStyles()((theme) => ({
  ...storyBodyStyles(theme)
}));
