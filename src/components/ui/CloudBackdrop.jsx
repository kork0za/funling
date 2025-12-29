import React, { useEffect, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { createNoise2D } from "simplex-noise";
import { useMotionSettings } from "../motion/MotionProvider";

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function wrapRange(v, range) {
  // keep number bounded to avoid infinite growth
  const r = range;
  return ((v % r) + r) % r;
}

function useGrainDataUrl(size = 96) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = ctx.createImageData(size, size);
    const noise2D = createNoise2D();

    // subtle grain
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        const n = noise2D(x / 18, y / 18); // [-1..1]
        const g = Math.floor(((n + 1) / 2) * 255);

        img.data[i + 0] = g;
        img.data[i + 1] = g;
        img.data[i + 2] = g;
        img.data[i + 3] = 32; // alpha (тонко)
      }
    }

    ctx.putImageData(img, 0, 0);
    setUrl(canvas.toDataURL("image/png"));
  }, [size]);

  return url;
}

// більш “скевоморфна” хмара: купа м’яких плям + легка тінь
function cloudPattern({ a = 0.9 } = {}) {
  const W = `rgba(255,255,255,${a})`;
  const T = "rgba(255,255,255,0)";
  return [
    `radial-gradient(70px 38px at 60px 58px, ${W} 62%, ${T} 64%)`,
    `radial-gradient(90px 46px at 140px 48px, ${W} 62%, ${T} 64%)`,
    `radial-gradient(78px 42px at 220px 60px, ${W} 62%, ${T} 64%)`,
    `radial-gradient(60px 34px at 280px 66px, ${W} 62%, ${T} 64%)`,
    `linear-gradient(to bottom, rgba(255,255,255,.94), rgba(255,255,255,.62))`,
  ].join(", ");
}

function CloudLayer({ top, height, opacity, baseSpeed, direction, blur, scale }) {
  const { motionEnabled } = useMotionSettings();
  const { scrollY } = useScroll();
  const v = useVelocity(scrollY);

  // boost factor from scroll velocity
  const rawBoost = useTransform(v, (val) => clamp(Math.abs(val) / 1200, 0, 3));
  const boost = useSpring(rawBoost, { stiffness: 140, damping: 26 });

  const x = useMotionValue(0);

  // tile width should match background-size x
  const TILE = 360;

  useAnimationFrame((t, delta) => {
    if (!motionEnabled) return;

    const b = boost.get(); // 0..3
    const speed = baseSpeed * (1 + b * 2.4); // px/s
    const next = x.get() + direction * speed * (delta / 1000);
    x.set(wrapRange(next, TILE));
  });

  const bgX = useTransform(x, (val) => `${-val}px`);

  return (
    <motion.div
      className="pointer-events-none absolute left-0 right-0"
      style={{
        top,
        height,
        opacity,
        filter: `blur(${blur}px)`,
        transform: `scale(${scale})`,
        backgroundImage: cloudPattern({ a: 0.92 }),
        backgroundRepeat: "repeat-x",
        backgroundSize: "360px 140px",
        backgroundPositionX: bgX,
        backgroundPositionY: "0px",
      }}
    />
  );
}

export default function CloudBackdrop() {
  const grain = useGrainDataUrl(96);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* багатошарові хмари, що рухаються в різні боки */}
      <CloudLayer top="6vh" height="160px" opacity={0.55} baseSpeed={10} direction={1} blur={0.6} scale={1.05} />
      <CloudLayer top="22vh" height="180px" opacity={0.42} baseSpeed={14} direction={-1} blur={1.2} scale={1.08} />
      <CloudLayer top="40vh" height="200px" opacity={0.30} baseSpeed={8} direction={1} blur={2.0} scale={1.1} />

      {/* легка вуаль/небо */}
      <div className="absolute inset-0 bg-gradient-to-b from-skyink-50/30 via-white/10 to-skyink-100/25" />

      {/* зерно (procedural, без файлів у repo) */}
      {grain ? (
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
          style={{ backgroundImage: `url(${grain})`, backgroundRepeat: "repeat" }}
        />
      ) : null}
    </div>
  );
}
