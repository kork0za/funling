import React, { useMemo } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useMotionSettings } from "../motion/MotionProvider";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function CloudLayer({
  src,
  top,
  height,
  opacity,
  blurPx,
  baseSpeed, // px/sec
  direction, // 1 or -1
  boost, // MotionValue number
  phase = 0,
  drift = 8,
  z = 0,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    // delta = ms since last frame
    // x рухається завжди, y — мікро-дрейф для “живості”
    const b = boost.get(); // 0..2-ish
    const speed = baseSpeed * (1 + b * 2.2); // прискорення від скролу
    const dx = direction * (speed * (delta / 1000));

    x.set(x.get() + dx);

    // легкий вертикальний дрейф
    const s = t / 1000;
    y.set(Math.sin(s / 3 + phase) * drift);
  });

  const bgPos = useTransform(x, (v) => `${v}px 0px`);

  return (
    <motion.div
      style={{
        top,
        height,
        opacity,
        filter: `blur(${blurPx}px)`,
        backgroundImage: `url(${src})`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
        backgroundPosition: bgPos,
        y,
        zIndex: z,
        willChange: "transform, background-position",
        maskImage:
          "linear-gradient(to right, transparent, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, transparent)",
      }}
      className="pointer-events-none absolute left-[-20vw] w-[140vw]"
    />
  );
}

export default function CloudSides() {
  const { motionEnabled } = useMotionSettings();
  const { scrollY } = useScroll();
  const scrollV = useVelocity(scrollY);

  // Перетворюємо px/s у 0..2 (приблизно), і згладжуємо
  const rawBoost = useTransform(scrollV, (v) => clamp(Math.abs(v) / 900, 0, 2));
  const boost = useSpring(rawBoost, { stiffness: 160, damping: 30 });

  // Якщо motion вимкнено — boost завжди 0, а анімації не буде “ривати”
  const effectiveBoost = useMemo(() => {
    return motionEnabled ? boost : { get: () => 0 };
  }, [motionEnabled, boost]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Небо/вуаль */}
      <div className="absolute inset-0 bg-gradient-to-b from-skyink-50/35 via-white/15 to-skyink-100/30" />

      {/* FAR layer (повільний, м’який) */}
      <CloudLayer
        src="/clouds/clouds_far.png"
        top="6%"
        height={180}
        opacity={0.42}
        blurPx={2.2}
        baseSpeed={10}
        direction={1}
        boost={effectiveBoost}
        phase={0.3}
        drift={7}
        z={1}
      />

      {/* MID layer (зустрічний) */}
      <CloudLayer
        src="/clouds/clouds_mid.png"
        top="22%"
        height={220}
        opacity={0.46}
        blurPx={1.6}
        baseSpeed={16}
        direction={-1}
        boost={effectiveBoost}
        phase={1.4}
        drift={9}
        z={2}
      />

      {/* NEAR layer (швидший, контрастніший) */}
      <CloudLayer
        src="/clouds/clouds_near.png"
        top="45%"
        height={260}
        opacity={0.40}
        blurPx={1.1}
        baseSpeed={22}
        direction={1}
        boost={effectiveBoost}
        phase={2.1}
        drift={11}
        z={3}
      />

      {/* Трохи “туману” внизу для скевоморфного відчуття глибини */}
      <div className="absolute inset-x-0 bottom-0 h-[240px] bg-gradient-to-t from-white/50 via-white/15 to-transparent" />
    </div>
  );
}
