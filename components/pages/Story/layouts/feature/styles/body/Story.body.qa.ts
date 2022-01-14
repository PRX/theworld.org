/**
 * @file Story.body.qa.ts
 * Body Q&A styles as JSS object.
 */

import { Theme } from '@material-ui/core/styles';
import { CreateCSSProperties } from '@material-ui/styles';

const accentBorderWidth = 3;

export const storyBodyQAStyles = (theme: Theme) =>
  ({
    '& .qa-wrap': {
      clear: 'both',
      padding: '0 2rem 0',
      marginBlockStart: theme.typography.pxToRem(theme.spacing(4)),
      marginBlockEnd: theme.typography.pxToRem(theme.spacing(4)),
      paddingBlockStart: theme.typography.pxToRem(theme.spacing(2)),
      paddingBlockEnd: theme.typography.pxToRem(theme.spacing(2)),
      borderLeftWidth: theme.typography.pxToRem(accentBorderWidth),
      borderLeftStyle: 'solid',
      borderLeftColor: theme.palette.primary.main,

      '& .qa-question': {
        marginBlockEnd: theme.typography.pxToRem(theme.spacing(2)),
        fontWeight: 'bold',
        paddingBottom: theme.typography.pxToRem(theme.spacing(2)),
        borderBottom: `${theme.typography.pxToRem(2)} solid ${
          theme.palette.grey[200]
        }`
      },

      '& p': {
        fontSize: '1.2rem'
      },

      '&--border-around': {
        border: `${theme.typography.pxToRem(1)} solid ${
          theme.palette.grey[200]
        }`,
        borderLeft: 'none'
      }
    }
  } as CreateCSSProperties<{}>);
