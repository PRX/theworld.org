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
  class?: string;
}

export const DatawrapperEmbed = ({
  title,
  height,
  frameborder,
  style,
  class: className,
  ...iframeAttribs
}: IDatawrapperEmbedProps) => {
  const [iframeHeight, setIframeHeight] = useState(height);

  function handleMessage(a: MessageEvent) {
    if (typeof a.data['datawrapper-height'] !== 'undefined') {
      Object.entries(a.data['datawrapper-height']).forEach(
        ([chartId, newHeight]) => {
          if (iframeAttribs.src?.includes(`/${chartId}/`)) {
            setIframeHeight(newHeight as number);
          }
        }
      );
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <iframe
      title={title}
      style={{
        height: `${iframeHeight}px`,
        width: 0,
        minWidth: '100%',
        border: 'none'
      }}
      className={className}
      {...iframeAttribs}
    />
  );
};
