/**
 * @file AppCtaMessageInfo.tsx
 * Component for app banner info CTA messages.
 */

import React from 'react';
import {
  Box,
  Button,
  Grid,
  Toolbar,
  Typography,
  ButtonProps
} from '@material-ui/core';
import { IAppCtaMessageProps } from '../AppCtaMessage.interface';

export const AppCtaMessageInfo = ({ data, onClose }: IAppCtaMessageProps) => {
  const { heading, message, action, dismiss } = data;
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
    onClose();
  };
  const handleDismissClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    onClose();
  };

  return (
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
                  href={action.url.href}
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
  );
};
