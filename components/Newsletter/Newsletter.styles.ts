/**
 * @file Newsletter.style.ts
 * Styles for Newsletter.
 */

import {
  createMuiTheme,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core/styles';

export const newsletterTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    overrides: {
      MuiOutlinedInput: {
        input: {
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }
      }
    }
  });

export const newsletterStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    header: {
      '&$withImage': {
        display: 'grid',
        gridTemplateColumns:
          'minmax(2rem, 1fr) minmax(75vw, 1fr) minmax(2rem, 1fr)',
        gridTemplateRows: '2fr max-content 2rem',
        gridGap: '1rem',
        maxHeight: '75vh',
        overflow: 'hidden',
        '& > *': {
          position: 'relative',
          zIndex: 2,
          margin: 0
        },
        '& $imageWrapper': {
          zIndex: 0
        },
        '&::before, &::after': {
          content: '""',
          display: 'block',
          gridColumn: '1 / -1',
          gridRow: '2 / -1',
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          transformOrigin: 'center top'
        },
        '&::before': {
          transform: 'scale(2) rotate(10deg)'
        },
        '&::after': {
          transform: 'scale(2) rotate(6deg) translateY(10%)'
        }
      }
    },
    withImage: {},
    imageWrapper: {
      gridColumn: '1 / -1',
      gridRow: '1 / -1',
      maxHeight: '75vh'
    },
    content: {
      '$withImage &': {
        gridColumn: '2 / -2',
        gridRow: '2 / -2',
        '&::before': {
          content: '""',
          display: 'block',
          float: 'right',
          width: '55%',
          height: '7.4vw',
          shapeOutside: 'polygon(0 0, 100% 0, 100% 100%)'
        }
      }
    },
    title: {
      color: theme.palette.primary.dark,
      fontSize: '3rem',
      lineHeight: '1.1',
      '$withImage &': {
        marginTop: 0
      }
    },
    summary: {
      fontSize: '1.5rem'
    },
    form: {},
    body: {
      fontSize: '1.2rem',
      lineHeight: '1.7rem',
      marginTop: `${theme.spacing(4)}px`,
      paddingTop: `${theme.spacing(4)}px`,
      borderTop: `1px solid ${theme.palette.divider}`
    }
  })
);
