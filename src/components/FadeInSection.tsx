'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  as?: keyof typeof motion;
  className?: string;
  delay?: number;
}

const FadeInSection = ({ 
  children, 
  as = 'div', 
  className = '',
  delay = 0 
}: FadeInSectionProps) => {
  const MotionComponent = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;

  return (
    <MotionComponent
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export default FadeInSection; 