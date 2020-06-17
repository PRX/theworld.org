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
import { Newsletter, INewsletterOptions } from '@components/Newsletter';
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
    dismiss,
    listId,
    sourceList
  } = data;
  const newsletterOptions: INewsletterOptions = {
    ...(listId && { listId }),
    ...(sourceList && { 'source-list': sourceList }),
    'source-placement': 'load-under'
  };
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
  const handleSubscribe = () => {
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
                <Newsletter
                  onSubscribed={handleSubscribe}
                  label={action && action.name}
                  options={newsletterOptions}
                  buttonProps={actionAttrs}
                />
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
