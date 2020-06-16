/**
 * @file AppCtaMessageNewsletter.tsx
 * Component for app banner newsletter CTA messages.
 */

import React from 'react';
import {
  Box,
  Button,
  Toolbar,
  Typography,
  ButtonProps
} from '@material-ui/core';
import { Newsletter, INewsletterOptions } from '@components/Newsletter';
import { IAppCtaMessageProps } from '../AppCtaMessage.interface';

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
    listId,
    ...(sourceList && { 'source-list': sourceList }),
    'source-placement': 'banner'
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
    <Box textAlign="center">
      {heading && <Typography variant="h3">{heading}</Typography>}
      {message && (
        <Typography
          component="div"
          variant="body1"
          /* eslint-disable-next-line */
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
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
    </Box>
  );
};
