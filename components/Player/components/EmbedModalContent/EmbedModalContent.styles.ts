/**
 * @file EmbedModalContent.style.ts
 * Styles and theme for EmbedModalContent.
 */

import {
  createStyles,
  alpha,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const useEmbedModalContentStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      alignContent: 'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      translate: '-50% -50%',
      width: '80vw',
      minWidth: '300px',
      maxHeight: '80vh',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column'
      }
    },
    preview: {
      padding: theme.typography.pxToRem(theme.spacing(1))
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.default
    },
    header: {
      display: 'flex',
      alignItems: 'center'
    },
    title: {
      flexGrow: 1,
      paddingInline: theme.typography.pxToRem(theme.spacing(1.5)),
      fontWeight: theme.typography.fontWeightBold
    },
    content: {
      flexGrow: 1,
      display: 'grid',
      borderBlock: `1px solid ${theme.palette.divider}`
    },
    code: {
      display: 'block',
      boxSizing: 'border-box',
      border: 'none',
      borderRadius: 0,
      padding: theme.typography.pxToRem(theme.spacing(1.5)),
      backgroundColor: 'transparent',
      overflow: 'hidden',
      overflowY: 'auto',
      width: '100%',
      minHeight: '4rem',
      wordBreak: 'break-word',
      '&:focus': {
        outline: 'none',
        backgroundColor: alpha(theme.palette.primary.main, 0.1)
      }
    },
    actions: {
      display: 'flex',
      justifyContent: 'end',
      fontWeight: theme.typography.fontWeightBold
    },
    iconRoot: {
      fontSize: 'inherit'
    }
  })
);
