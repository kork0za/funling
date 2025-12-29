import React from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export default function InfoCard({ title, icon: Icon, children, className, sticker }) {
  return (
    <section
      className={twMerge(
        clsx(
          "relative rounded-[28px] border border-white/70 bg-white/60 p-6 shadow-skeu backdrop-blur-sm",
          "transition hover:translate-y-[-1px] hover:shadow-skeu",
          className
        )
      )}
    >
      {sticker ? <div className="absolute -top-10 right-6">{sticker}</div> : null}

      <div className="mb-4 flex items-center gap-3">
        {Icon ? (
          <div className="rounded-2xl bg-gradient-to-br from-skyink-100 to-mint-100 p-3 shadow-skeuSoft">
            <Icon className="h-5 w-5 text-skyink-800" />
          </div>
        ) : null}
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      </div>

      <div className="text-sm leading-relaxed text-slate-700">{children}</div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 rounded-b-[28px] bg-gradient-to-t from-white/55 to-transparent" />
    </section>
  );
}
