/**
 * @file CtaMessageNewsletter.tsx
 * Component for newsletter CTA messages.
 */

import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  ButtonProps,
  Typography,
  ThemeProvider
} from '@material-ui/core';
import { ICtaMessageProps } from '@interfaces/cta';
import { ctaMessageNewsletterTheme } from './CtaMessageNewsletter.styles';

export const CtaMessageNewsletter = ({ data }: ICtaMessageProps) => {
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
    size: 'large',
    disableElevation: true
  };
  const handleActionClick = () => {
    // TODO: Open subscribtion modal/dioalog/UI.
  };

  return (
    <ThemeProvider theme={ctaMessageNewsletterTheme}>
      <Card elevation={0}>
        {heading && <CardHeader title={heading} />}
        {message && (
          <CardContent>
            <Typography
              component="div"
              variant="body1"
              /* eslint-disable-next-line */
              dangerouslySetInnerHTML={{ __html: message }}
            />
          </CardContent>
        )}
        {hasActions && (
          <CardActions>
            {action && (
              <Button {...actionAttrs} onClick={handleActionClick}>
                {action.name}
              </Button>
            )}
          </CardActions>
        )}
      </Card>
    </ThemeProvider>
  );
};
