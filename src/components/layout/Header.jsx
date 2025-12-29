import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMotionSettings } from "../motion/MotionProvider";
import { getRandomQuote } from "../../lib/quotes";

const linkBase =
  "shrink-0 rounded-xl px-2.5 py-2 text-xs font-semibold transition hover:bg-white/60 hover:shadow-skeuSoft sm:px-3 sm:text-sm";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  try {
    window.history.replaceState(null, "", `#${id}`);
  } catch {}
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  try {
    window.history.replaceState(null, "", "/");
  } catch {}
}

function MotionSwitch({ enabled, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="group relative inline-flex h-9 w-[62px] items-center rounded-full border border-white/70 bg-white/55 shadow-skeuSoft backdrop-blur-sm"
      aria-pressed={enabled}
      aria-label={enabled ? "Вимкнути анімації" : "Увімкнути анімації"}
      title={enabled ? "Motion: On" : "Motion: Off"}
    >
      <span className="pointer-events-none absolute left-2 text-[11px] font-semibold text-slate-600">
        {enabled ? "ON" : "OFF"}
      </span>
      <span
        className={[
          "absolute top-1 h-7 w-7 rounded-full shadow-skeu transition",
          "bg-gradient-to-br from-skyink-200 to-mint-200",
          enabled ? "left-[30px]" : "left-1",
        ].join(" ")}
      />
    </button>
  );
}

export default function Header() {
  const { motionEnabled, toggleMotion } = useMotionSettings();

  const [quote, setQuote] = useState("");
  const [open, setOpen] = useState(false);

  const timerRef = useRef(null);
  const abortRef = useRef(null);

  async function showQuote() {
    setOpen(true);
    setQuote("…");

    if (abortRef.current) abortRef.current.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const q = await getRandomQuote(ac.signal);
    setQuote(q);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpen(false), 2800);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const onLogoClick = async (e) => {
    e.preventDefault();
    scrollToTop();
    showQuote();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-skyink-100/70 bg-white/35 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-8">
        {/* Logo */}
        <a
          href="/"
          onClick={onLogoClick}
          className="group flex items-center gap-2"
          aria-label="Funling — на верх і показати цитату"
        >
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-skyink-200 to-mint-200 shadow-skeu transition group-hover:translate-y-[-1px]" />
          <div className="leading-tight">
            <div className="text-sm font-semibold">Funling</div>
            <div className="text-xs text-slate-500">Speaking Club</div>
          </div>
        </a>

        {/* Nav */}
        <nav className="no-scrollbar flex items-center gap-1 overflow-x-auto">
          <button type="button" className={linkBase} onClick={() => scrollToId("about")}>
            Про клуб
          </button>
          <button type="button" className={linkBase} onClick={() => scrollToId("organizers")}>
            Організатори
          </button>
          <button type="button" className={linkBase} onClick={() => scrollToId("discord")}>
            Discord
          </button>
        </nav>

        {/* Motion toggle */}
        <div className="flex items-center gap-2">
          <MotionSwitch enabled={motionEnabled} onToggle={toggleMotion} />
        </div>

        {/* Quote bubble (no overflow on mobile) */}
        <AnimatePresence>
          {open ? (
            motionEnabled ? (
              <motion.div
                key="quote"
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-x-0 top-full z-50 mt-2 px-3"
                aria-live="polite"
              >
                <div className="mx-auto w-full max-w-[520px]">
                  <div className="relative rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-center text-sm font-semibold text-slate-700 shadow-skeuSoft backdrop-blur-sm">
                    <div className="absolute left-1/2 top-[-6px] h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-white/70 bg-white/70" />
                    {quote}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="absolute inset-x-0 top-full z-50 mt-2 px-3" aria-live="polite">
                <div className="mx-auto w-full max-w-[520px]">
                  <div className="relative rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-center text-sm font-semibold text-slate-700 shadow-skeuSoft backdrop-blur-sm">
                    <div className="absolute left-1/2 top-[-6px] h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-white/70 bg-white/70" />
                    {quote}
                  </div>
                </div>
              </div>
            )
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
