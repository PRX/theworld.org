/**
 * @file NoJsPlayer.tsx
 *
 * Component to render audio elements to be shown when javascript is disabled.
 */

import React from 'react';
import { useNoJsPlayerStyles } from './NoJsPlayer.styles';

export interface INoJsPlayerProps {
  url: string;
}

export const NoJsPlayer = ({ url }: INoJsPlayerProps) => {
  const { classes: styles } = useNoJsPlayerStyles();

  return <audio className={styles.root} src={url} controls preload="none" />;
};
