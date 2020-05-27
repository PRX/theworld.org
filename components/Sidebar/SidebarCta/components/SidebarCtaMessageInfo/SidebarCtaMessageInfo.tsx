/**
 * @file SidebarCtaMessageInfo.tsx
 * Component for sidebar info CTA messages.
 */

import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  ButtonProps,
  Typography
} from '@material-ui/core';
import { ICtaMessageProps } from '@interfaces/cta';

export const SidebarCtaMessageInfo = ({ data }: ICtaMessageProps) => {
  const { heading, message, action, dismiss } = data;
  const hasActions = !!(action || dismiss);
  const actionAttrs: ButtonProps = {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    fullWidth: true,
    disableElevation: true
  };

  return (
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
            <Button {...actionAttrs} href={action.url.href}>
              {action.name}
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};
