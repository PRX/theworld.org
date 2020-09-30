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
  Typography,
  ThemeProvider,
  Divider
} from '@material-ui/core';
import { NewsletterForm } from '@components/NewsletterForm';
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
    newsletterOptions
  } = data;
  const hasActions = !!(action || dismiss);

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
          <>
            <Divider />
            <CardActions>
              <NewsletterForm
                label={action && action.name}
                options={newsletterOptions}
                compact
              />
            </CardActions>
          </>
        )}
      </Card>
    </ThemeProvider>
  );
};
