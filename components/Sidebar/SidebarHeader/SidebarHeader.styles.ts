/**
 * @file SidebarHeader.style.ts
 * Styles for SidebarHeader.
 */

import {
  createTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const sidebarHeaderTheme = (theme: Theme) => {
  const headingProps = {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 400
  };

  return createTheme(theme, {
    overrides: {
      MuiSvgIcon: {
        root: {
          marginRight: '0.25rem',
          fill: theme.palette.secondary.main,
          verticalAlign: 'text-bottom'
        }
      }
    },
    typography: {
      h1: {
        ...headingProps
      },
      h2: {
        ...headingProps
      },
      h3: {
        ...headingProps
      },
      h4: {
        ...headingProps
      },
      h5: {
        ...headingProps
      },
      h6: {
        ...headingProps
      }
    }
  });
};

export const sidebarHeaderStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '1rem 1rem 0.5rem'
    }
  })
);
