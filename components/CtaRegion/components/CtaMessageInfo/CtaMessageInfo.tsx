/**
 * @file CtaMessageInfo.tsx
 * Component for info CTA messages.
 */

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  ButtonProps,
  Typography
} from '@material-ui/core';
import { HtmlContent } from '@components/HtmlContent';
import { ICtaMessageProps } from '@interfaces/cta';

export const CtaMessageInfo = ({ data }: ICtaMessageProps) => {
  const { heading, message, action, dismiss } = data;
  const hasActions = !!(action || dismiss);
  const actionAttrs: ButtonProps = {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    disableElevation: true
  };

  return (
    <Card elevation={0}>
      {heading && <CardHeader title={heading} />}
      {message && (
        <CardContent>
          <Typography component="div" variant="body1">
            <HtmlContent html={message} />
          </Typography>
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
