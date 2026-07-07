"use client";

import { useEffect, useState } from "react";
import { Heart, Music2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[260px] shrink-0 rounded-[2.65rem] border-[6px] border-zinc-900 bg-zinc-900 p-2 shadow-2xl">
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-zinc-900" />
      <div className="relative h-[520px] w-full overflow-hidden rounded-[2.15rem]">
        {children}
      </div>
    </div>
  );
}

export function MusicBar({
  title,
  artist,
  playing,
  onToggle,
}: {
  title: string;
  artist: string;
  playing?: boolean;
  onToggle?: () => void;
}) {
  const isInteractive = onToggle !== undefined;
  return (
    <div
      className={cn("w-full rounded-xl bg-white/10 p-2.5 backdrop-blur-md ring-1 ring-white/20", isInteractive && "cursor-pointer")}
      onClick={isInteractive ? onToggle : undefined}
    >
      <div className="flex items-center gap-2">
        <Music2 className="h-3.5 w-3.5 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-medium">{title}</p>
          <p className="text-[9px] text-white/55">{artist}</p>
        </div>
        {isInteractive ? (
          <div className="flex items-center gap-1.5">
            {playing && (
              <span className="flex items-end gap-[2px]">
                {[3, 6, 4, 8, 5].map((h, i) => (
                  <span
                    key={i}
                    className="w-[2px] rounded-full bg-white/80"
                    style={{ height: h, animation: playing ? `musicPulseBar ${0.55 + i * 0.1}s ease-in-out infinite alternate` : "none" }}
                  />
                ))}
              </span>
            )}
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/25">
              {playing ? (
                <svg className="h-2.5 w-2.5 fill-white" viewBox="0 0 16 16"><rect x="3" y="2" width="4" height="12" rx="1"/><rect x="9" y="2" width="4" height="12" rx="1"/></svg>
              ) : (
                <svg className="h-2.5 w-2.5 fill-white" viewBox="0 0 16 16"><path d="M4 2.5l10 5.5-10 5.5V2.5z"/></svg>
              )}
            </span>
          </div>
        ) : (
          <div className="flex items-end gap-0.5">
            {[3, 6, 4, 8, 5].map((h, i) => (
              <span key={i} className="w-[2px] rounded-full bg-white/60" style={{ height: h }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const EVENTO_PHOTOS = ["/demo/evento1.webp", "/demo/evento2.webp", "/demo/evento3.webp", "/demo/evento4.webp"];

export function EventoPreview({ musicPlaying, onMusicToggle }: { musicPlaying?: boolean; onMusicToggle?: () => void } = {}) {
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setHeroIdx((i) => (i + 1) % EVENTO_PHOTOS.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <PhoneFrame>
      {/* Hero photo full-bleed top half */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={EVENTO_PHOTOS[heroIdx]}
          alt=""
          className="h-[55%] w-full object-cover object-top transition-opacity duration-700"
          key={heroIdx}
        />
        <div className="absolute top-0 inset-x-0 h-[55%] bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[45%] to-[#7f1d1d]" />

      <div className="relative z-10 flex h-full flex-col px-4 pt-8 pb-4 text-white">
        {/* Top label */}
        <span className="text-center text-[9px] uppercase tracking-[0.28em] text-white/70">uma história de amor</span>

        {/* Spacer to push content below the photo */}
        <div className="h-[44%]" />

        {/* Names + date */}
        <h3 className="text-center text-xl font-bold leading-tight">Ana &amp; Pedro</h3>
        <p className="mt-0.5 text-center text-[9px] text-white/65">juntos desde 12 de março de 2022</p>

        {/* Counters */}
        <div className="mt-2 flex justify-center gap-2">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[9px] backdrop-blur-sm">2 anos</span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-[9px] backdrop-blur-sm">3 meses</span>
        </div>

        {/* Message */}
        <p className="mt-2.5 line-clamp-2 text-center text-[9px] leading-relaxed text-white/80 px-1">
          &ldquo;Você é a razão do meu sorriso mais bobo e do meu coração mais tranquilo.&rdquo;
        </p>

        {/* Photo grid — 4 thumbs */}
        <div className="mt-3 grid grid-cols-4 gap-1">
          {EVENTO_PHOTOS.map((src, i) => (
            <div key={i} className={cn("aspect-square overflow-hidden rounded-lg ring-1", i === heroIdx ? "ring-white" : "ring-white/20")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        {/* Music */}
        <div className="mt-auto pt-2 w-full">
          <MusicBar title="Cadeira Cativa (Vocês e Deus)" artist="Zé Neto e Cristiano" playing={musicPlaying} onToggle={onMusicToggle} />
        </div>
      </div>
    </PhoneFrame>
  );
}

export function AniversarioPreview() {
  const [opened, setOpened] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(0);

  // Auto-demo: open after 2.5s, reset after 6s
  useEffect(() => {
    const openTimer = setTimeout(() => setOpened(true), 2500);
    const resetTimer = setTimeout(() => { setOpened(false); setPhotoIdx(0); }, 7500);
    return () => { clearTimeout(openTimer); clearTimeout(resetTimer); };
  }, [opened]);

  // Photo slideshow when opened
  useEffect(() => {
    if (!opened) return;
    const id = setInterval(() => setPhotoIdx((i) => (i + 1) % ANIV_PHOTOS.length), 2000);
    return () => clearInterval(id);
  }, [opened]);

  const confettiDots = [
    { top: "6%", left: "12%", color: "#fbbf24" },
    { top: "10%", left: "75%", color: "#34d399" },
    { top: "18%", left: "48%", color: "#f472b6" },
    { top: "5%", left: "58%", color: "#60a5fa" },
    { top: "22%", left: "88%", color: "#fbbf24" },
    { top: "28%", left: "22%", color: "#34d399" },
  ];

  return (
    <PhoneFrame>
      {/* ── SURPRISE SCREEN ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center transition-opacity duration-700"
        style={{
          background: "linear-gradient(160deg, #0f0f0f 0%, #1c1008 60%, #0f0a04 100%)",
          opacity: opened ? 0 : 1,
          pointerEvents: opened ? "none" : "auto",
          zIndex: 2,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)]" />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <span className="text-[9px] uppercase tracking-[0.35em]" style={{ color: "rgba(212,180,140,0.55)" }}>✦</span>
          <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "rgba(212,180,140,0.6)" }}>
            para você
          </p>
          <div>
            <p className="text-[19px] font-light text-white/85">Uma pequena</p>
            <p className="text-[26px] italic text-white" style={{ fontFamily: "var(--font-script, Georgia, serif)" }}>surpresa</p>
            <p className="text-[19px] font-light text-white/85">te espera</p>
          </div>
          <p className="text-[9px] tracking-widest" style={{ color: "rgba(212,180,140,0.5)" }}>com amor e carinho</p>
          <button
            type="button"
            onClick={() => setOpened(true)}
            className="mt-3 flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[10px] font-semibold tracking-wide transition-all active:scale-95"
            style={{ border: "1px solid rgba(212,180,140,0.35)", color: "rgba(212,180,140,0.9)", background: "rgba(212,180,140,0.07)" }}
          >
            🎁 ABRIR PRESENTE
          </button>
        </div>
      </div>

      {/* ── BIRTHDAY PAGE ── */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: opened ? 1 : 0, zIndex: 1 }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #dc2626, #7f1d1d)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.18),transparent_55%)]" />
        {confettiDots.map((d, i) => (
          <div key={i} className="absolute h-2 w-2 rounded-full" style={{ background: d.color, top: d.top, left: d.left, opacity: 0.85 }} />
        ))}
        <div className="relative z-10 flex h-full flex-col items-center px-5 pt-8 pb-4 text-center text-white">
          <h3 className="text-[26px] leading-tight text-white" style={{ fontFamily: "var(--font-script, Georgia, cursive)" }}>
            Feliz Aniversário!
          </h3>
          <span className="mt-1 text-xl">🎂</span>
          {/* Photo slideshow */}
          <div className="relative mt-3 h-32 w-32 overflow-hidden rounded-2xl shadow-xl ring-2 ring-white/30">
            {ANIV_PHOTOS.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt="" className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700"
                style={{ opacity: i === photoIdx ? 1 : 0 }} />
            ))}
          </div>
          <p className="mt-3 line-clamp-3 px-1 text-[10px] leading-relaxed text-white/85">
            &ldquo;Que seu novo ano de vida seja repleto de alegrias, conquistas e muitos motivos para sorrir!&rdquo;
          </p>
          {/* Photo grid */}
          <div className="mt-3 grid w-full grid-cols-3 gap-1">
            {ANIV_PHOTOS.map((src, i) => (
              <div key={i} className={cn("aspect-square overflow-hidden rounded-lg ring-1", i === photoIdx ? "ring-white" : "ring-white/20")}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover object-top" />
              </div>
            ))}
          </div>
          <div className="mt-auto pt-2 w-full">
            <MusicBar title="Parabéns pra Você" artist="Trilha Sonora" />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

const ANIV_PHOTOS = ["/demo/aniv1.webp", "/demo/aniv2.webp", "/demo/aniv3.webp"];
const DELUX_PHOTOS = ["/demo/casal1.jpg", "/demo/casal2.jpg", "/demo/casal3.webp"];
const DELUX_ACCENT = "#b91c1c";
const DELUX_BG = "#faf5ec";
const DELUX_TEXT = "#111827";

export function DeluxPreview({ musicPlaying, onMusicToggle }: { musicPlaying?: boolean; onMusicToggle?: () => void } = {}) {
  const [center, setCenter] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCenter((i) => (i + 1) % 3), 2500);
    return () => clearInterval(id);
  }, []);

  const visible = [(center + 2) % 3, center, (center + 1) % 3];

  return (
    <PhoneFrame>
      <div className="h-full overflow-y-auto" style={{ background: DELUX_BG }}>
        <div className="flex flex-col items-center px-5 pb-5 pt-10 text-center">
          {/* Header label */}
          <p className="text-[9px] uppercase tracking-[0.28em]" style={{ color: `rgba(185,28,28,0.6)` }}>
            uma história de amor
          </p>

          {/* Photo coverflow */}
          <div className="relative mt-3 flex h-[155px] w-full items-center justify-center">
            {visible.map((photoIdx, pos) => {
              const isCenter = pos === 1;
              const isLeft = pos === 0;
              const style: React.CSSProperties = isCenter
                ? { zIndex: 3, transform: "translateX(0) rotate(0deg) scale(1)", opacity: 1, boxShadow: "0 8px 24px rgba(0,0,0,0.22)" }
                : isLeft
                ? { zIndex: 2, transform: "translateX(-52%) rotate(-7deg) scale(0.76)", opacity: 0.65 }
                : { zIndex: 2, transform: "translateX(52%) rotate(7deg) scale(0.76)", opacity: 0.65 };
              return (
                <div
                  key={pos}
                  className="absolute h-36 w-24 overflow-hidden rounded-2xl transition-all duration-500"
                  style={style}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={DELUX_PHOTOS[photoIdx]} alt="" className="h-full w-full object-cover" />
                </div>
              );
            })}
          </div>

          {/* Names */}
          <h3 className="mt-3 text-[22px] leading-tight" style={{ fontFamily: "var(--font-script)", color: DELUX_TEXT }}>
            Ana &amp; Pedro
          </h3>
          <div className="mt-1.5 h-px w-12" style={{ background: `rgba(185,28,28,0.25)` }} />
          <p className="mt-1.5 text-[8px] uppercase tracking-widest" style={{ color: `rgba(185,28,28,0.65)` }}>
            juntos desde 12 de março de 2022
          </p>

          {/* Message */}
          <p className="mt-2.5 line-clamp-2 text-[10px] italic leading-relaxed" style={{ color: `rgba(17,24,39,0.6)` }}>
            &ldquo;Você é a razão do meu sorriso mais bobo e do meu coração mais tranquilo.&rdquo;
          </p>

          {/* Music card */}
          <div
            className={cn("mt-2.5 w-full rounded-xl px-3 py-2", onMusicToggle && "cursor-pointer")}
            style={{ background: `rgba(185,28,28,0.06)`, outline: `1px solid rgba(185,28,28,0.12)` }}
            onClick={onMusicToggle}
          >
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 shrink-0 rounded-lg" style={{ background: `rgba(185,28,28,0.18)` }} />
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-[10px] font-semibold" style={{ color: DELUX_TEXT }}>Cadeira Cativa (Vocês e Deus)</p>
                <p className="text-[9px]" style={{ color: `rgba(17,24,39,0.45)` }}>Zé Neto e Cristiano</p>
              </div>
              <div className="flex items-center gap-1.5">
                {musicPlaying && (
                  <span className="flex items-end gap-[2px]">
                    {[3, 6, 4, 8, 5].map((h, i) => (
                      <span key={i} style={{ display: "inline-block", width: 2, height: h, borderRadius: 2, background: DELUX_ACCENT, animation: `musicPulseBar ${0.55 + i * 0.1}s ease-in-out infinite alternate` }} />
                    ))}
                  </span>
                )}
                {onMusicToggle && (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: `rgba(185,28,28,0.2)` }}>
                    {musicPlaying
                      ? <svg className="h-2.5 w-2.5" viewBox="0 0 16 16" fill={DELUX_ACCENT}><rect x="3" y="2" width="4" height="12" rx="1"/><rect x="9" y="2" width="4" height="12" rx="1"/></svg>
                      : <svg className="h-2.5 w-2.5" viewBox="0 0 16 16" fill={DELUX_ACCENT}><path d="M4 2.5l10 5.5-10 5.5V2.5z"/></svg>
                    }
                  </span>
                )}
                {!onMusicToggle && (
                  <div className="flex items-end gap-0.5">
                    {[3, 6, 4, 8, 5].map((h, i) => (
                      <span key={i} style={{ display: "inline-block", width: 2, height: h, borderRadius: 2, background: DELUX_ACCENT }} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* juntos há */}
          <p className="mt-3 text-[8px] uppercase tracking-[0.2em]" style={{ color: `rgba(185,28,28,0.6)` }}>juntos há</p>
          <div className="mt-1.5 grid w-full grid-cols-3 gap-y-2.5">
            {[["3","anos"],["8","meses"],["15","dias"],["14","horas"],["32","min"],["47","seg"]].map(([v, l], i) => (
              <div key={l} className="pr-1" style={i % 3 !== 2 ? { borderRight: `1px solid rgba(185,28,28,0.12)` } : {}}>
                <p className="text-[18px]" style={{ fontFamily: "serif", color: DELUX_TEXT }}>{v}</p>
                <p className="text-[7px] uppercase tracking-wide" style={{ color: `rgba(185,28,28,0.55)` }}>{l}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-3.5 h-px w-full" style={{ background: `rgba(185,28,28,0.1)` }} />
          <div className="mt-2 flex items-center gap-1.5">
            <Heart className="h-2.5 w-2.5" style={{ color: `rgba(185,28,28,0.6)`, fill: `rgba(185,28,28,0.6)` }} />
            <p className="text-[9px] italic" style={{ fontFamily: "var(--font-script)", color: `rgba(185,28,28,0.6)` }}>feito com muito amor</p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}


export function PosterPreview({ musicPlaying, onMusicToggle }: { musicPlaying?: boolean; onMusicToggle?: () => void } = {}) {
  return (
    <PhoneFrame>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/demo/poster-bg.webp" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-5 text-white">
        <p className="mb-2 text-[8px] uppercase tracking-[0.3em] text-white/35">uma história de amor</p>
        <h3 className="text-3xl font-black uppercase leading-tight tracking-tight drop-shadow-2xl">
          NOSSA<br />HISTÓRIA
        </h3>
        <p className="mt-1.5 text-[10px] italic text-red-400">Uma história que o tempo não apaga.</p>
        <p className="mt-2 line-clamp-2 text-[9px] leading-relaxed text-white/45">
          Uma história de amor que começou por acaso e transformou tudo ao seu redor...
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded border border-white/25 px-1.5 py-0.5 text-[7px] font-bold text-white/40">LOVE</span>
          <span className="text-[8px] text-white/25">★★★★★</span>
          <span className="rounded-full bg-red-700 px-2.5 py-0.5 text-[8px] font-semibold text-white">❤️ Desde 2021</span>
        </div>
        <button
          type="button"
          className="mt-3 flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-[10px] font-bold text-black shadow-lg"
        >
          <svg className="h-2.5 w-2.5 fill-black" viewBox="0 0 16 16">
            <path d="M3 2.5l10 5.5-10 5.5V2.5z" />
          </svg>
          Assistir
        </button>
        <div
          className={cn("mt-3 w-full rounded-lg bg-white/[0.08] p-2 ring-1 ring-white/10", onMusicToggle && "cursor-pointer")}
          onClick={onMusicToggle}
        >
          <div className="flex items-center gap-1.5">
            <Music2 className="h-3 w-3 text-red-400" />
            <p className="flex-1 text-[9px] text-white/70">Cadeira Cativa · Zé Neto e Cristiano</p>
            {onMusicToggle && (
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/15">
                {musicPlaying
                  ? <svg className="h-2 w-2 fill-white" viewBox="0 0 16 16"><rect x="3" y="2" width="4" height="12" rx="1"/><rect x="9" y="2" width="4" height="12" rx="1"/></svg>
                  : <svg className="h-2 w-2 fill-white" viewBox="0 0 16 16"><path d="M4 2.5l10 5.5-10 5.5V2.5z"/></svg>
                }
              </span>
            )}
            {musicPlaying && (
              <span className="flex items-end gap-[2px]">
                {[3, 5, 3, 7, 4].map((h, i) => (
                  <span key={i} className="w-[2px] rounded-full bg-red-400" style={{ height: h, animation: `musicPulseBar ${0.55 + i * 0.1}s ease-in-out infinite alternate` }} />
                ))}
              </span>
            )}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

const PLAN_PREVIEWS = [EventoPreview, AniversarioPreview, DeluxPreview, PosterPreview];
const PLAN_NAMES = ["Página de Amor", "Aniversário", "Delux", "Poster de Filme"];

function getTransform(pos: number): React.CSSProperties {
  switch (pos) {
    case 0:
      return { transform: "translateX(0) scale(1) rotate(0deg)", zIndex: 4, opacity: 1 };
    case 1:
      return { transform: "translateX(52%) scale(0.78) rotate(5deg)", zIndex: 3, opacity: 0.85 };
    case 3:
      return { transform: "translateX(-52%) scale(0.78) rotate(-5deg)", zIndex: 3, opacity: 0.85 };
    default:
      return { transform: "translateX(0) scale(0.6)", zIndex: 1, opacity: 0, pointerEvents: "none" };
  }
}

export function HeroPlansCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % PLAN_PREVIEWS.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[560px] w-full" style={{ maxWidth: 380 }}>
        {PLAN_PREVIEWS.map((PlanComp, i) => {
          const pos = (i - active + PLAN_PREVIEWS.length) % PLAN_PREVIEWS.length;
          return (
            <div
              key={i}
              onClick={() => setActive(i)}
              className="absolute inset-0 flex cursor-pointer items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={getTransform(pos)}
            >
              <PlanComp />
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-2">
        {PLAN_NAMES.map((name, i) => (
          <button
            key={name}
            onClick={() => setActive(i)}
            aria-label={name}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === active ? "w-8 bg-brand" : "w-2 bg-zinc-300"
            )}
          />
        ))}
      </div>
      <p className="mt-3 text-sm font-semibold text-muted">{PLAN_NAMES[active]}</p>
    </div>
  );
}
