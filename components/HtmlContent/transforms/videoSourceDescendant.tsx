/**
 * @file videoSourceDescendant.tsx
 *
 * Convert placeholder markup with twitter embed component.
 */
import React from 'react';
import { DomElement } from 'htmlparser2';

// TODO: Move to lib
export const findDescendant = (
  node: DomElement,
  func: (N: DomElement) => boolean
) => {
  const { children } = node;
  let found = func(node) && node;

  if (!found && children?.length) {
    found = children.reduce(
      (acc: boolean | DomElement, n: DomElement) =>
        acc || findDescendant(n, func),
      false
    );
  }

  return found;
};

// YouTube URL Patterns:
// 1. [http://]www.youtube.com/embed/VIDEOID : IFrame embed. Can have querystring options
// 2. [http://]www.youtube.com/v/VIDEOID : AS3 embed. Can have querystring options
// 3. [http://]www.youtube.com/watch?v=VIDEOID : URL in address bar when watching on website
// 4. [http://]youtu.be/VIDEOID : Sharing URL. Can have querystring options

// Extracts the id based on YouTube URL patterns.
function getYoutubeVideoId(videoId: string) {
  const result =
    // eslint-disable-next-line no-nested-ternary
    videoId.indexOf('/') > -1
      ? // This is a url
        videoId.indexOf('/watch') > -1
        ? // URL is pattern 3
          videoId.match(/v=([^&]+)(?:&|$)/i)[1]
        : // All other URL patterns have the video id at the end of the path segment,
          // after the last '/' up to the end of the string (or '?' if pressent)
          videoId.match(/\/([^?/]+)(?:\?|$)/i)[1]
      : // Not URL. Assume original value is the id
        videoId;

  return result;
}

// Generate YouTube embed URL (pattern 1)
function makeYoutubeEmbedUrl(videoId: string) {
  // TODO: embed opts should be configurable
  const opts = `?${[
    'showinfo=0', // Hide video title
    'modestbranding=1', // Hide YouTube logo on controls
    'rel=0', // Don't show related video grid after video has finished
    'feature=oembed'
  ].join('&')}`;

  return `//www.youtube.com/embed/${getYoutubeVideoId(videoId)}${opts}`;
}

// Vimeo URL Patterns:
// 1. [http://]player.vimeo.com/video/VIDEOID : IFrame embed. Can have querystring options
// 2. [http://]vimeo.com/VIDEOID : URL in address bar when watching on website

// Extracts the id based on Vimeo URL patterns.
function getVimeoVideoId(videoId: string) {
  const result =
    videoId.indexOf('/') > -1
      ? // Vimeo's urls all have the video id at the end of the path segment,
        // after the last '/' up to the end of the string (or '?' if pressent)
        videoId.match(/\/([^?/]+)(?:\?|$)/i)[1]
      : // Not URL. Assume original value is the Id
        videoId;

  return result;
}

// Generate Vimeo embed URL (pattern 1)
function makeVimeoEmbedUrl(videoId: string) {
  // TODO: embed opts should be configurable
  const opts = `?${[
    'title=0', // Hide video title
    'portrait=0', // Hide creator portrait
    'byline=0', // Hide creater byline
    'color=dc5555' // Set color to sites primary accent color. I ♥ Vimeo.
  ].join('&')}`;

  return `//player.vimeo.com/video/${getVimeoVideoId(videoId)}${opts}`;
}

export const videoSourceDescendant = (node: DomElement) => {
  const rgxYoutube = /www\.youtube\.com|youtu.be/;
  const rgxVimeo = /vimeo\.com/;
  const videoSource = findDescendant(node, (n: DomElement) => {
    if (
      n.type === 'tag' &&
      n.name === 'div' &&
      'data-oembed-url' in n.attribs &&
      (rgxYoutube.test(n.attribs['data-oembed-url']) ||
        rgxVimeo.test(n.attribs['data-oembed-url']))
    ) {
      return n;
    }
    if (n.type === 'tag' && n.name === 'video' && 'src' in n.attribs) {
      return n;
    }
    if (n.type === 'tag' && n.name === 'source' && 'src' in n.attribs) {
      return n;
    }
    return false;
  });

  if (videoSource) {
    const videoUrl = (
      videoSource.attribs.src ||
      videoSource.attribs['data-oembed-url'] ||
      ''
    ).replace(/^\s+|\s+$/, '');
    let src: string;

    switch (true) {
      case rgxYoutube.test(videoUrl):
        src = makeYoutubeEmbedUrl(videoUrl);
        break;

      case rgxVimeo.test(videoUrl):
        src = makeVimeoEmbedUrl(videoUrl);
        break;

      default:
        src = videoUrl;
        break;
    }

    return (
      <div className="media-youtube-video" key={src}>
        <iframe
          title={src}
          allow="encrypted-media; accelerometer; gyroscope; picture-in-picture"
          allowFullScreen
          scrolling="no"
          src={src}
          tabIndex={-1}
        />
      </div>
    );
  }

  return undefined;
};
