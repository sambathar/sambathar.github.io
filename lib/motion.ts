import type { Variants } from "framer-motion";

export const motionDurations = {
  // TODO(design-system): Finalize timing values in ANIMATION_SYSTEM.md.
  fast: 0.18,
  base: 0.24,
  slow: 0.4,
} as const;

export const motionEasing = {
  // TODO(design-system): Finalize easing curves in ANIMATION_SYSTEM.md.
  productive: [0.2, 0, 0, 1],
  expressive: [0.16, 1, 0.3, 1],
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDurations.base,
      ease: motionEasing.productive,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: motionDurations.base,
      ease: motionEasing.productive,
    },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: motionDurations.slow,
      ease: motionEasing.expressive,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: motionDurations.fast,
      ease: motionEasing.productive,
    },
  },
};
