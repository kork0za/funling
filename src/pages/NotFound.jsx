import React from "react";
import Seo from "../components/seo/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="404" path="/404" />
      <div className="relative z-10 rounded-[28px] border border-white/70 bg-white/60 p-7 shadow-skeu backdrop-blur-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Сторінку не знайдено</h1>
        <p className="mt-3 text-sm text-slate-700">Схоже, ця хмаринка попливла не туди ☁️</p>
        <a className="mt-4 inline-block font-semibold text-skyink-700 underline decoration-skyink-300" href="/">
          Повернутись на головну
        </a>
      </div>
    </>
  );
}
