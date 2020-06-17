/**
 * @file SidebarCtaMessageNewsletter.tsx
 * Component for sidebar newsletter CTA messages.
 */

import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  ButtonProps,
  Typography,
  ThemeProvider
} from '@material-ui/core';
import { Newsletter, INewsletterOptions } from '@components/Newsletter';
import { ICtaMessageProps } from '@interfaces/cta';
import { sidebarCtaMessageNewsletterTheme } from './SidebarCtaMessageNewsletter.styles';

export const SidebarCtaMessageNewsletter = ({ data }: ICtaMessageProps) => {
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
    'source-placement': 'sidebar'
  };
  const hasActions = !!(action || dismiss);
  const actionAttrs: ButtonProps = {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    fullWidth: true,
    disableElevation: true
  };

  return (
    <ThemeProvider theme={sidebarCtaMessageNewsletterTheme}>
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
            <Newsletter
              label={action && action.name}
              options={newsletterOptions}
              buttonProps={actionAttrs}
            />
          </CardActions>
        )}
      </Card>
    </ThemeProvider>
  );
};
