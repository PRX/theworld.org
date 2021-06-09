/**
 * @file EmbedCode.tsx
 * Component for headers in sidebar items.
 */

import React, { HTMLAttributes, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Box, IconButton } from '@material-ui/core';
import { CheckSharp, SelectAllSharp, WarningSharp } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';
import classNames from 'classnames/bind';
import { embedCodeTheme, embedCodeStyles } from './EmbedCode.styles';

export interface IEmbedCodeProps extends HTMLAttributes<{}> {
  src: string;
}

export interface IEmbedCodeState {
  copied: boolean;
  failed: boolean;
}

const EmbedCode = ({ src, className }: IEmbedCodeProps) => {
  const classes = embedCodeStyles({});
  const cx = classNames.bind(classes);
  const elmRef = useRef<HTMLElement>(null);
  const [{ copied, failed }, setState] = useState<IEmbedCodeState>({
    copied: false,
    failed: false
  });
  const EmbedCodeCopyIcon =
    (copied && CheckSharp) || (failed && WarningSharp) || SelectAllSharp;
  const EmbedCodeCopyIconTitle =
    (copied && 'Copied to clipboard!') ||
    (failed && 'Could not copy to clipboard.') ||
    'Copy code to clipboard.';
  const embedCode = `<iframe frameborder="0"  src="${src}" height="50" width="100%"></iframe>`;

  const handleCopy = (text: string, result: boolean) =>
    setState({
      copied: result,
      failed: !result
    });

  return (
    <ThemeProvider theme={embedCodeTheme}>
      <Box className={cx(className, { root: true })}>
        <code ref={elmRef} className={classes.code}>
          {embedCode}
        </code>
        <CopyToClipboard text={embedCode} onCopy={handleCopy}>
          <IconButton disableRipple>
            <EmbedCodeCopyIcon titleAccess={EmbedCodeCopyIconTitle} />
          </IconButton>
        </CopyToClipboard>
      </Box>
    </ThemeProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default EmbedCode;
