/**
 * @file SidebarCtaMessageDonation.tsx
 * Component for sidebar donation CTA messages.
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
import { sidebarCtaMessageDonationTheme } from './SidebarCtaMessageDonation.styles';

export const SidebarCtaMessageDonation = ({ data }: ICtaMessageProps) => {
  const { heading, message, action, dismiss } = data;
  const hasActions = !!(action || dismiss);
  const actionAttrs: ButtonProps = {
    variant: 'contained',
    color: 'secondary',
    size: 'large',
    fullWidth: true
  };
  const handleActionClick = () => {
    // TODO: Route to in-app donation form.
  };

  return (
    <ThemeProvider theme={sidebarCtaMessageDonationTheme}>
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
              <Button
                {...actionAttrs}
                href={action.url.href}
                onClick={handleActionClick}
              >
                {action.name}
              </Button>
            )}
          </CardActions>
        )}
      </Card>
    </ThemeProvider>
  );
};
