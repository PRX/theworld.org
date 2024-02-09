/**
 * @file sidebarCta.style.ts
 * Styles for sidebarCta.
 */

import { makeStyles } from 'tss-react/mui';
import { blue, grey } from '@theme/colors';

export const useSidebarCtaStyles = makeStyles()((theme) => ({
  root: {
    '& :where(.MuiCard-root)': {
      borderLeft: `4px solid var(--cta-accent-color, ${theme.palette.primary.main})`
    },
    '& :is(.MuiCard-root)': {
      display: 'grid',
      gridGap: theme.spacing(2),
      padding: theme.spacing(2),
      background: 'transparent',
      color: 'inherit'
    },
    '& :is(.MuiCardHeader-root)': {
      padding: 0,
      color: blue[900]
    },
    '& :is(.MuiCardHeader-title)': {
      fontSize: '1.1rem'
    },
    '& :is(.MuiCardContent-root)': {
      padding: 0,
      '&:last-child': {
        paddingBlockEnd: 0
      },
      '& p': {
        margin: 0
      },
      '& p + p': {
        marginTop: '1rem'
      },
      '& a:link, & a:visited': {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        textDecoration: 'none'
      },
      '& ul': {
        margin: '1em 0 0 16px',
        padding: 0
      },
      '& li': {
        padding: 0,
        margin: 0,
        color: grey[500]
      },
      '& li a:link, & li a:visited': {
        padding: '3px 0',
        width: '100%'
      },
      '& li a:hover': {
        color: theme.palette.primary.dark,
        textDecoration: 'underline'
      }
    },
    '& :where(.MuiCardActions-root)': {
      padding: 0
    },
    '& :where(.MuiCheckbox-root)': {
      color: 'inherit'
    },
    '& :where(.MuiFormControlLabel-root)': {
      paddingLeft: theme.spacing(2),
      color: theme.palette.grey[700]
    },
    '& :where(.MuiFormControlLabel-label)': {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.grey[700]
    },
    '& :where(.MuiIconButton-root)': {
      '&:hover': {
        backgroundColor: theme.palette.action.focus
      }
    },
    '& :where(.MuiToolbar-root)': {
      justifyContent: 'center',
      marginTop: theme.spacing(3),
      '& > * + *': {
        marginLeft: theme.spacing(2)
      }
    }
  }
}));
