/**
 * @file EpisodeCard.style.tsx
 * Styles for episode card.
 */
import { addCssColorAlpha } from '@lib/parse/color';

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const episodeCardStyles = makeStyles((theme: Theme) => {
  const headingProps = {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 400
  };

  return createStyles({
    root: {},
    header: {
      padding: '1rem 1rem 0.5rem',
      '& h1': {
        ...headingProps
      },
      '& h2': {
        ...headingProps
      },
      '& h3': {
        ...headingProps
      },
      '& h4': {
        ...headingProps
      },
      '& h5': {
        ...headingProps
      },
      '& h6': {
        ...headingProps
      },
      '& svg': {
        marginRight: '0.25rem',
        fill: theme.palette.secondary.main,
        verticalAlign: 'text-bottom'
      }
    },
    imageWrapper: {
      paddingTop: 'unset'
    },
    link: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      textIndent: '-2000vw'
    },
    title: {
      marginTop: theme.typography.pxToRem(theme.spacing(1))
    }
  });
});

export const episodeCardTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    typography: {
      body1: {
        fontSize: theme.typography.pxToRem(16)
      },
      h2: {
        color: theme.palette.text.primary
      },
      h5: {
        fontSize: theme.typography.pxToRem(18)
      },
      overline: {
        display: 'inline-block',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        background: theme.palette.grey[200],
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: '12px',
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
        lineHeight: 1
      }
    },
    overrides: {
      MuiButtonBase: {
        root: {
          fontSize: 'inherit',
          lineHeight: 'inherit'
        }
      },
      MuiCard: {
        root: {
          color: theme.palette.primary.main
        }
      },
      MuiCardActions: {
        root: {
          margin: 0,
          padding: 0
        }
      },
      MuiCardContent: {
        root: {
          color: theme.palette.text.primary,
          fontWeight: theme.typography.fontWeightBold
        }
      },
      MuiCardMedia: {
        root: {
          position: 'relative',
          width: '100%',
          height: 0,
          paddingTop: `${(9 / 16) * 100}%`,
          [theme.breakpoints.up('sm')]: {
            paddingTop: `${(1 / 3) * 100}%`
          },
          '& > :only-child': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }
        }
      },
      MuiList: {
        root: {
          width: '100%'
        },
        padding: {
          paddingTop: 0,
          paddingBottom: theme.typography.pxToRem(theme.spacing(2))
        }
      },
      MuiListItem: {
        root: {},
        button: {
          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: addCssColorAlpha(
              theme.palette.primary.main,
              theme.palette.action.hoverOpacity
            )
          }
        }
      },
      MuiListItemText: {
        root: {
          display: 'list-item',
          listStyle: 'disc',
          marginTop: 0,
          marginBottom: 0,
          marginLeft: theme.spacing(2),
          color: theme.palette.grey[500]
        },
        primary: {
          color: theme.palette.primary.main,
          fontWeight: theme.typography.fontWeightBold,
          lineHeight: 1
        }
      },
      MuiTypography: {
        gutterBottom: {
          marginBottom: theme.typography.pxToRem(theme.spacing(1.5))
        }
      }
    }
  });
