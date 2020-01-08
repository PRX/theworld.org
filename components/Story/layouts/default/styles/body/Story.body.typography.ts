/**
 * @file Story.body.typography.ts
 * Body typography styles as JSS object.
 */

import { Theme } from '@material-ui/core/styles';
import { CreateCSSProperties } from '@material-ui/styles';

export default (theme: Theme) => ({
  fontSize: '1.2rem',
  lineHeight: '1.7rem',

  '& a, & a:visited': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.main
    }
  },

  '& > p:first-of-type': {
    fontSize: '1.35rem',
    fontWeight: 300,
    lineHeight: '2.15rem',
    marginBottom: '1.5rem'
  }
} as CreateCSSProperties<{}>);
