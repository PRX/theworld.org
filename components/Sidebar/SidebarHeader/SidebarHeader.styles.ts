/**
 * @file SidebarHeader.style.ts
 * Styles for SidebarHeader.
 */

import { makeStyles } from 'tss-react/mui';

export const sidebarHeaderStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.typography.pxToRem(8),
    padding: '1rem 1rem 0.5rem',
    '& :is(h1, h2, h3, h4, h5, h6)': {
      flexGrow: 1,
      fontSize: theme.typography.pxToRem(15),
      fontWeight: 400
    },
    '& > :is(.MuiSvgIcon-root)': {
      marginRight: '0.25rem',
      fill: theme.palette.secondary.main,
      verticalAlign: 'text-bottom'
    }
  }
}));
