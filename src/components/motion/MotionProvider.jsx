import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const MotionSettingsContext = createContext(null);

export function MotionProvider({ children }) {
  const [motionEnabled, setMotionEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("funling_motion");
    if (saved === "0" || saved === "1") {
      setMotionEnabled(saved === "1");
      return;
    }

    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setMotionEnabled(mq ? !mq.matches : true);
  }, []);

  useEffect(() => {
    localStorage.setItem("funling_motion", motionEnabled ? "1" : "0");
  }, [motionEnabled]);

  const value = useMemo(
    () => ({
      motionEnabled,
      setMotionEnabled,
      toggleMotion: () => setMotionEnabled((v) => !v),
    }),
    [motionEnabled]
  );

  return <MotionSettingsContext.Provider value={value}>{children}</MotionSettingsContext.Provider>;
}

export function useMotionSettings() {
  const ctx = useContext(MotionSettingsContext);
  if (!ctx) throw new Error("useMotionSettings must be used within <MotionProvider />");
  return ctx;
}
