import React from 'react';
import { motion } from 'framer-motion';

interface BlurFadeProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
  className?: string;
  inView?: boolean;
}

export const BlurFade: React.FC<BlurFadeProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 16,
  blur = '4px',
  className = '',
  inView = false,
}) => {
  const motionProps = inView
    ? {
        initial: { opacity: 0, y: yOffset, filter: `blur(${blur})` },
        whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
        viewport: { once: true, margin: '-50px' },
      }
    : {
        initial: { opacity: 0, y: yOffset, filter: `blur(${blur})` },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      };

  return (
    <motion.div
      {...motionProps}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

