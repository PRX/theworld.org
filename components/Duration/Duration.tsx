/**
 * @file Duration.tsx
 * Component for displaying formatted time.
 */

import React, { HTMLAttributes } from 'react';
import { formatDuration } from '@lib/parse/time';

export interface IDurationProps extends HTMLAttributes<{}> {
  seconds?: number;
}

export const Duration = ({ seconds, ...other }: IDurationProps) => (
  <time dateTime={`P${Math.round(seconds || 0)}S`} {...other}>
    {formatDuration(seconds || 0)}
  </time>
);
