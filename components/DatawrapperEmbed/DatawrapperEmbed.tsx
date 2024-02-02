/**
 * @file DatawrapperEmbed.tsx
 * Component for datawrapperEmbed elements.
 */

import type { DetailedHTMLProps, IframeHTMLAttributes } from 'react';
import { useEffect, useState } from 'react';

export interface IDatawrapperEmbedProps
  extends DetailedHTMLProps<
    IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  > {
  frameborder?: string;
}

export const DatawrapperEmbed = ({
  title,
  height,
  frameborder,
  style,
  ...iframeAttribs
}: IDatawrapperEmbedProps) => {
  const chartId = iframeAttribs.id?.split('-').pop();
  const [iframeHeight, setIframeHeight] = useState(height);

  function handleMessage(a: MessageEvent) {
    if (a.origin !== 'https://datawrapper.dwcdn.net') return;

    const newHeight = chartId && a.data['datawrapper-height']?.[chartId];
    if (newHeight && newHeight !== height) {
      setIframeHeight(newHeight);
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // if(!chartId) return null;

  return (
    <iframe
      title={title}
      style={{
        height: `${iframeHeight}px`,
        width: 0,
        minWidth: '100%',
        border: 'none'
      }}
      {...iframeAttribs}
    />
  );
};
