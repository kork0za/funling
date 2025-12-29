import React from "react";
import { site } from "../../content/site";
import MotionFloat from "../ui/MotionFloat";

export default function Footer() {
  return (
    <footer className="border-t border-skyink-100/70 bg-white/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="text-sm text-slate-600">
          © {new Date().getFullYear()} Funling • Speaking Club
        </div>

        <MotionFloat amount={2} duration={9}>
          <a
            href={site.discordInvite}
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-skyink-200 to-mint-200 px-4 py-2 text-sm font-semibold shadow-skeu transition hover:translate-y-[-1px]"
            target="_blank"
            rel="noreferrer"
          >
            Приєднатись у Discord
          </a>
        </MotionFloat>
      </div>
    </footer>
  );
}
