import React from "react";
import Seo from "../components/seo/Seo";
import InfoCard from "../components/ui/InfoCard";
import Airhead from "../components/ui/Airhead";
import { site } from "../content/site";
import { CalendarDays, MessageCircle, Blocks, Sparkles } from "lucide-react";
import MotionFloat from "../components/ui/MotionFloat";


function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  try {
    window.history.replaceState(null, "", `#${id}`);
  } catch {}
}

export default function Home() {
  return (
    <>
      <Seo title="Funling" path="/" />

      {/* HERO */}
      <section className="relative z-10 mb-10">
        <div className="rounded-[34px] border border-white/70 bg-white/55 p-6 shadow-skeu backdrop-blur-sm sm:p-8">
        <MotionFloat amount={2} duration={8} className="inline-flex">
  <div className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-skyink-100 to-mint-100 px-4 py-2 text-sm font-semibold shadow-skeuSoft">
    <Sparkles className="h-4 w-4" />
    Повітряний speaking club
  </div>
</MotionFloat>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Funling — спільнота про англійську, лінгвістику і практику
          </h1>

          <p className="mt-3 max-w-3xl text-slate-700">
            Щотижневі зустрічі у форматі speaking club англійською мовою, тепла спільнота,
            події та вправи для прогресу. Є також Minecraft сервер.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={site.discordInvite}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-gradient-to-r from-skyink-200 to-mint-200 px-5 py-3 text-sm font-semibold shadow-skeu transition hover:translate-y-[-1px]"
            >
              Зайти в Discord
            </a>

            <button
              type="button"
              onClick={() => scrollToId("about")}
              className="rounded-2xl bg-white/70 px-5 py-3 text-sm font-semibold shadow-skeuSoft transition hover:translate-y-[-1px]"
            >
              Дізнатись більше
            </button>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="relative z-10 grid gap-6 md:grid-cols-2">
        <InfoCard
          title="Про speaking club"
          icon={MessageCircle}
          sticker={<Airhead className="h-20 w-20 drop-shadow" />}
        >
          Спікінг клуби — невід'ємна частина спільноти. Це не мовна школа, а доступна спільнота
          для обговорення всього пов’язаного з мовами.
        </InfoCard>

        <InfoCard title="Розклад" icon={CalendarDays}>
          Зустрічі проходять <b>1 раз на тиждень</b> (інколи 2) на вихідних. Організатори готують теми,
          івенти й вправи для розвитку навичок.
        </InfoCard>

        <InfoCard title="Minecraft сервер" icon={Blocks}>
          У клубу є власний Minecraft сервер — як додатковий простір для спілкування і “відпочинку мозку”.
        </InfoCard>

        <InfoCard title="Основний майданчик" icon={MessageCircle}>
          Discord — головне місце проєкту. Заходь і знайомся:
          <div className="mt-3">
            <a
              className="font-semibold text-skyink-700 underline decoration-skyink-300"
              href={site.discordInvite}
              target="_blank"
              rel="noreferrer"
            >
              {site.discordInvite}
            </a>
          </div>
        </InfoCard>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-10 mt-10 scroll-mt-28">
        <article className="rounded-[28px] border border-white/70 bg-white/60 p-6 shadow-skeu backdrop-blur-sm sm:p-7">
          <h2 className="text-2xl font-semibold tracking-tight">Про speaking club</h2>

          <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700">
            <p>
              Спікінг клуби є невід'ємною частиною спільноти. Вони проводяться 1 раз на тиждень
              (зрідка 2) на вихідних. Також клуб має свій Minecraft сервер.
            </p>
            <p>
              Попри деякі спільні ознаки, це не мовна школа. Це лишень доступна спільнота для обговорення
              всього пов’язаного з мовами.
            </p>
            <p>
              <b>Funling</b> — українська спільнота для обговорення англійської мови та лінгвістики у будь-яких її проявах.
              Ціллю спільноти є допомога новачкам вглибитись у тему мовознавства та вивчення різноманітних мов (переважно англійської).
            </p>
          </div>
        </article>
      </section>

      {/* ORGANIZERS */}
      <section id="organizers" className="relative z-10 mt-10 scroll-mt-28">
        <div className="rounded-[28px] border border-white/70 bg-white/60 p-6 shadow-skeu backdrop-blur-sm sm:p-7">
          <h2 className="text-2xl font-semibold tracking-tight">Організатори проєкту</h2>

          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {site.organizers.map((o) => (
              <li
                key={o.name}
                className="rounded-[22px] border border-white/70 bg-gradient-to-br from-white/65 to-skyink-50/40 p-5 shadow-skeuSoft"
              >
                <div className="text-sm font-semibold">{o.name}</div>
                <div className="mt-1 text-xs text-slate-600">{o.role}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DISCORD */}
      <section id="discord" className="relative z-10 mt-10 scroll-mt-28">
        <div className="rounded-[28px] border border-white/70 bg-white/60 p-6 shadow-skeu backdrop-blur-sm sm:p-7">
          <h2 className="text-2xl font-semibold tracking-tight">Discord-сервер</h2>
          <p className="mt-3 text-sm text-slate-700">
            Discord — основне місце проєкту. Там анонси зустрічей, події, голосові та спілкування.
          </p>

          <a
            href={site.discordInvite}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-skyink-200 to-mint-200 px-6 py-3 text-sm font-semibold shadow-skeu transition hover:translate-y-[-1px]"
          >
            Приєднатись: {site.discordInvite}
          </a>
        </div>
      </section>
    </>
  );
}
