/**
 * @file SidebarCtaMessageNewsletter.tsx
 * Component for sidebar newsletter CTA messages.
 */

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Typography,
  ThemeProvider
} from '@material-ui/core';
import { CheckCircleOutlineSharp } from '@material-ui/icons';
import { NewsletterForm } from '@components/NewsletterForm';
import { ICtaMessageProps } from '@interfaces/cta';
import { sidebarCtaMessageNewsletterTheme } from './SidebarCtaMessageNewsletter.styles';

export const SidebarCtaMessageNewsletter = ({ data }: ICtaMessageProps) => {
  const [subscribed, setSubscribed] = useState(false);
  const {
    heading,
    message,
    action = {
      name: 'Subscribe'
    },
    newsletterOptions
  } = data;

  const handleSubscibed = () => {
    setSubscribed(true);
  };

  console.log(data);

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
        <CardActions>
          {!subscribed && (
            <NewsletterForm
              label={action && action.name}
              options={newsletterOptions}
              onSubscribed={handleSubscibed}
              compact
            />
          )}
          {subscribed && (
            <Grid container spacing={4} justify="center" alignContent="center">
              <Grid item xs={12}>
                <Box
                  display="grid"
                  gridTemplateColumns="min-content 1fr"
                  gridGap={16}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    <CheckCircleOutlineSharp
                      color="primary"
                      style={{ fontSize: '3rem' }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="overline">
                      You&apos;re Subscribed
                    </Typography>
                    <Typography>
                      <strong>Thank you!</strong> You mean the world to us.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};
