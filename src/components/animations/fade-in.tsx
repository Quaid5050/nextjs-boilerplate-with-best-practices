'use client';

import { motion, type Variants } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const FadeIn = ({ children, delay = 0, duration = 0.5, className }: FadeInProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

