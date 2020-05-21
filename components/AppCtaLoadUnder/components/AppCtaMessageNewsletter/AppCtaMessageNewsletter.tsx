/**
 * @file AppCtaMessageNewsletter.tsx
 * Component for app banner newsletter CTA messages.
 */

import React from 'react';
import {
  Box,
  Button,
  ButtonProps,
  Grid,
  Toolbar,
  Typography,
  ThemeProvider
} from '@material-ui/core';
import { IAppCtaMessageProps } from '../AppCtaMessage.interface';
import { appCtaMessageNewsletterTheme } from './AppCtaMessageNewsletter.styles';

export const AppCtaMessageNewsletter = ({
  data,
  onClose
}: IAppCtaMessageProps) => {
  const {
    heading,
    message,
    action = {
      name: 'Subscribe'
    },
    dismiss
  } = data;
  const hasActions = !!(action || dismiss);
  const actionAttrs: ButtonProps = {
    variant: 'contained',
    color: 'primary',
    size: 'large'
  };
  const dismissAttrs: ButtonProps = !action
    ? actionAttrs
    : {
        variant: 'outlined',
        color: 'primary'
      };
  const handleActionClick = () => {
    // TODO: Open subscribtion modal/dioalog/UI.

    onClose();
  };
  const handleDismissClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    onClose();
  };

  return (
    <ThemeProvider theme={appCtaMessageNewsletterTheme}>
      <Box textAlign="center">
        <Grid container justify="center" alignItems="center">
          <Grid item sm={12} md={8}>
            {heading && <Typography variant="h3">{heading}</Typography>}
            {message && (
              <Typography
                component="div"
                variant="body1"
                /* eslint-disable-next-line */
                dangerouslySetInnerHTML={{ __html: message }}
              />
            )}
          </Grid>
          <Grid item sm={12} md={4}>
            {hasActions && (
              <Toolbar>
                {action && (
                  <Button
                    {...actionAttrs}
                    href={action.url && action.url.href}
                    onClick={handleActionClick}
                  >
                    {action.name}
                  </Button>
                )}
                {dismiss && (
                  <Button {...dismissAttrs} onClick={handleDismissClick}>
                    {dismiss.name}
                  </Button>
                )}
              </Toolbar>
            )}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
