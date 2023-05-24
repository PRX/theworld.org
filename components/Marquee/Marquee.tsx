/**
 * @file Marquee.tsx
 * Component to display text, animating the text side-to-side when it overflows.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMarqueeStyles } from './Marquee.styles';

export interface IMarqueeProps extends React.PropsWithChildren<{}> {}

export const Marquee = ({ children }: IMarqueeProps) => {
  const [marqueeOffset, setMarqueeOffset] = useState(0);
  const [marqueeSpeed, setMarqueeSpeed] = useState(0);
  const contentRef = useRef(null);
  const rootRef = useRef(null);
  const timeoutRef = useRef(null);
  const { classes } = useMarqueeStyles();

  const updateMarqueeOffset = useCallback(() => {
    const rootRec = rootRef.current?.getBoundingClientRect();
    const contentRec = contentRef.current?.getBoundingClientRect();
    const offset = Math.min(Math.ceil(rootRec.width - contentRec.width), 0);
    const speed = Math.abs(offset / 200) * 5;

    setMarqueeOffset(offset);
    setMarqueeSpeed(speed);
  }, []);

  const handleResize = useCallback(() => {
    updateMarqueeOffset();
  }, [updateMarqueeOffset]);

  useEffect(() => {
    updateMarqueeOffset();

    timeoutRef.current = setTimeout(() => {
      updateMarqueeOffset();
    }, 1000);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutRef.current);
    };
  }, [handleResize, updateMarqueeOffset, children]);

  return (
    <div className={classes.root} ref={rootRef}>
      <motion.div
        ref={contentRef}
        className={classes.content}
        animate={{ x: [0, marqueeOffset] }}
        initial={{ x: 0 }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.5,
          delay: 1,
          duration: marqueeSpeed
          // ease: 'linear'
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
