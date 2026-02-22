'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInOnMountProps {
  children: ReactNode;
  as?: keyof typeof motion;
  className?: string;
  delay?: number;
}

const FadeInOnMount = ({
  children,
  as = 'div',
  className = '',
  delay = 0,
}: FadeInOnMountProps) => {
  const MotionComponent = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;
  return (
    <MotionComponent
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export default FadeInOnMount; 