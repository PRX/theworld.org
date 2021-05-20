/**
 * @file SubscribeButton.tsx
 * Component for podcast feed subscription button.
 */

import React, { MutableRefObject, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@material-ui/core';

export interface ISubscribeButton {
  title: string;
  feedUrl: string;
  subtitle?: string;
  description?: string;
  coverImageUrl?: string;
  itunesLinkUrl?: string;
  color?: string;
  size?: 'small' | 'medium' | 'big';
  format?: 'rectangle' | 'square' | 'cover';
  variant?: 'filled' | 'outline' | 'frameless';
}

export const SubscribeButton = ({
  title,
  feedUrl,
  subtitle,
  description,
  coverImageUrl,
  itunesLinkUrl,
  color,
  format,
  variant
}: ISubscribeButton) => {
  const spanRef: MutableRefObject<HTMLSpanElement> = useRef();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const dataKey = `podcastData-${feedUrl}`;
    window[dataKey] = {
      title,
      subtitle,
      description,
      cover: coverImageUrl,
      feeds: [
        {
          type: 'audio',
          format: 'mp3',
          url: feedUrl,
          'directory-url-itunes': itunesLinkUrl
        }
      ]
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://cdn.podlove.org/subscribe-button/javascripts/app.js';

    script.setAttribute('class', 'podlove-subscribe-button');
    script.setAttribute('data-language', 'en');
    script.setAttribute('data-size', 'medium');
    script.setAttribute('data-json-data', dataKey);
    script.setAttribute('data-color', color);
    script.setAttribute('data-format', format || 'rectangle');
    script.setAttribute('data-style', variant || 'filled');

    spanRef.current.appendChild(script);
  }, []);

  return (
    <span ref={spanRef}>
      <noscript>
        <Link href={feedUrl} passHref>
          <Button component="a" variant="contained" color="primary">
            Subscribe to feed
          </Button>
        </Link>
      </noscript>
    </span>
  );
};
