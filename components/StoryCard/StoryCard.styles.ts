/**
 * @file StoryCard.style.tsx
 * Styles for story card.
 */

import { alpha, createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStoryCardStyles = makeStyles<
  { isLoading: boolean },
  'feature'
>()((theme: Theme, { isLoading }, classes) => ({
  root: {
    '& > * + *': {
      display: 'grid',
      marginTop: 0
    }
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    gap: theme.typography.pxToRem(24)
  },
  title: {
    marginTop: 0,
    fontSize: theme.typography.pxToRem(20),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18)
    },
    lineHeight: '1.3'
  },
  imageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    paddingTop: 'unset'
  },
  link: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    textIndent: '-2000vw'
  },
  loadingBar: {
    transition: 'transform 400ms ease-out',
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    transform: `translateY(${!isLoading ? 0 : '-100%'})`
  },
  audio: {
    position: 'relative',
    zIndex: 1
  },
  audioPlayBtn: {
    position: 'relative',
    zIndex: 1,
    fontSize: '5rem',
    padding: 0,
    borderRadius: 0,
    backgroundColor: 'transparent',
    color: alpha(theme.palette.primary.contrastText, 0.7),
    '&:hover': {
      backgroundColor: 'transparent',
      color: alpha(theme.palette.primary.contrastText, 1)
    },
    [`.${classes.feature} &`]: {
      fontSize: '8rem'
    }
  },
  MuiCardActionAreaRoot: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    gridGap: `${16}px`,
    alignItems: 'center',
    padding: `${16}px`,
    [`.${classes.feature} &`]: {
      gridTemplateColumns: '1fr'
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 2fr'
    }
  },
  MuiCardContentRoot: {
    padding: 0
  },
  MuiCardMediaRoot: {
    alignSelf: 'start',
    aspectRatio: '1',
    [`.${classes.feature} &`]: {
      aspectRatio: '16 / 9'
    }
  },
  feature: {},
  short: {},
  isLoading: {},
  noImage: {}
}));

export const storyCardTheme = (theme: Theme) =>
  createTheme(theme, {
    typography: {
      h5: {
        lineHeight: 1.1
      },
      overline: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        zIndex: 1,
        fontFamily:
          '"Open Sans","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif',
        letterSpacing: 'unset',
        textTransform: 'unset'
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
          color: theme.palette.primary.main,
          marginTop: 0,
          borderTop: `1px solid ${theme.palette.grey[200]}`
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
          overflow: 'hidden',
          display: 'grid',
          backgroundColor: theme.palette.primary.main,
          '& > *': {
            gridRow: '1 / -1',
            gridColumn: '1 / -1'
          }
        }
      },
      MuiList: {
        root: {
          width: '100%'
        },
        padding: {
          paddingTop: 0,
          paddingBottom: theme.typography.pxToRem(16)
        }
      },
      MuiListItem: {
        root: {},
        button: {
          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: alpha(
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
          marginLeft: 16,
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
          marginBottom: theme.typography.pxToRem(4)
        }
      }
    }
  });
