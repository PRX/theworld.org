/**
 * @file Team.tsx
 * Component for Team.
 */

import type { IContentComponentProps, Program, TaxonomySeo } from '@interfaces';
import React, { useEffect, useState } from 'react';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  LinearProgress,
  Typography
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { ThemeProvider } from '@mui/styles';
import { ContentLink } from '@components/ContentLink';
import { MetaTags } from '@components/MetaTags';
import { Plausible } from '@components/Plausible';
import { teamStyles, teamTheme } from './Team.styles';
import { TeamHeader } from './components/TeamHeader';

export const Team = ({ data }: IContentComponentProps<Program>) => {
  const router = useRouter();
  const [loadingUrl, setLoadingUrl] = useState<string>();
  const { link, name, programContributors, slug, seo } = data;
  const { team } = programContributors || {};
  const { classes, cx } = teamStyles();
  const imageWidth = [
    ['max-width: 600px', '100wv'],
    [null, '300px']
  ];
  const sizes = imageWidth.map(([q, w]) => (q ? `(${q}) ${w}` : w)).join(', ');

  const title = `${name}'s Team`;
  const description = `Meet the team who brings you ${name}.`;
  const metaUrl = `${link}/team`;
  const metatags = {
    ...seo,
    title,
    description,
    canonical: metaUrl,
    opengraphTitle: title,
    opengraphDescription: description,
    opengraphUrl: metaUrl,
    twitterTitle: title,
    twitterDescription: description
  } as TaxonomySeo;

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      setLoadingUrl(url);
    };
    const handleRouteChangeEnd = () => {
      setLoadingUrl(undefined);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('routeChangeError', handleRouteChangeEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('routeChangeError', handleRouteChangeEnd);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={teamTheme}>
      <MetaTags data={metatags} />
      <Plausible subject={{ type: 'team', id: slug?.replace('-', '_') }} />
      <Container fixed>
        <TeamHeader title={title} />
        <Grid container spacing={3} mb={6}>
          {team?.map((item, index) => {
            if (!item) return null;

            const pathname = item.link && new URL(item.link).pathname;
            const isLoading = loadingUrl === pathname;

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card
                  className={cx({
                    [classes.isLoading]: isLoading
                  })}
                  classes={{
                    root: classes.MuiCardRoot
                  }}
                >
                  <CardActionArea
                    classes={{
                      root: classes.MuiCardActionAreaRoot
                    }}
                  >
                    <CardMedia
                      classes={{
                        root: classes.MuiCardMediaRoot
                      }}
                    >
                      {item.contributorDetails?.image?.sourceUrl ? (
                        <Image
                          alt={item.contributorDetails.image.altText || ''}
                          src={item.contributorDetails.image.sourceUrl}
                          layout="fill"
                          objectFit="cover"
                          sizes={sizes}
                          priority={index <= 1}
                        />
                      ) : (
                        <Box className={classes.placeholder}>
                          <Person />
                        </Box>
                      )}
                    </CardMedia>
                    <CardContent
                      classes={{
                        root: classes.MuiCardContentRoot
                      }}
                    >
                      <LinearProgress
                        className={classes.loadingBar}
                        color="secondary"
                        aria-label="Progress Bar"
                      />
                      <Typography variant="h4" className={classes.title}>
                        {item.name}
                      </Typography>
                      {item.contributorDetails?.position && (
                        <Typography variant="subtitle1">
                          {item.contributorDetails.position}
                        </Typography>
                      )}
                    </CardContent>
                    <ContentLink url={item.link} className={classes.link} />
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
