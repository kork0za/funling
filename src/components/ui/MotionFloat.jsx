import React from "react";
import { motion } from "framer-motion";
import { useMotionSettings } from "../motion/MotionProvider";

export default function MotionFloat({
  children,
  amount = 3,
  duration = 9,
  className = "",
}) {
  const { motionEnabled } = useMotionSettings();

  if (!motionEnabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amount, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
