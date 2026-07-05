"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { getElapsed } from "@/lib/relationship-time";
import { DeluxPhotoCoverflow } from "@/components/criar/delux-photo-coverflow";
import { DeluxMusicCard } from "@/components/criar/delux-music-card";
import type { Photo } from "@/components/criar/photo-uploader";
import { getTheme, hexToRgba } from "@/lib/themes";

export function DeluxPreviewPhone({
  names,
  message,
  since,
  songTitle,
  songThumbnail,
  songVideoId,
  songStartSeconds,
  photos,
  themeId,
}: {
  names: string;
  message: string;
  since: string;
  songTitle: string;
  songArtist: string;
  songThumbnail?: string;
  songVideoId?: string;
  songStartSeconds?: number;
  photos: Photo[];
  themeId?: string;
}) {
  const theme = getTheme(themeId);
  const accent = theme.deluxAccent;
  const textColor = theme.deluxText;
  const mutedText = hexToRgba(textColor, 0.7);

  const [elapsed, setElapsed] = useState(() => getElapsed(since || new Date().toISOString()));

  useEffect(() => {
    const tick = () => setElapsed(getElapsed(since || new Date().toISOString()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [since]);

  const units = [
    { label: "anos", value: elapsed.years },
    { label: "meses", value: elapsed.months },
    { label: "dias", value: elapsed.days },
    { label: "horas", value: elapsed.hours },
    { label: "minutos", value: elapsed.minutes },
    { label: "segundos", value: elapsed.seconds },
  ];

  const sinceLabel = since
    ? new Date(`${since}T00:00:00`).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="relative w-[280px] shrink-0 rounded-[2.75rem] border-[6px] border-ink bg-ink p-2 shadow-2xl sm:w-[320px]">
      <div className="absolute left-1/2 top-2 z-10 h-5 w-28 -translate-x-1/2 rounded-full bg-ink" />
      <div
        className="delux-scroll relative h-[560px] w-full overflow-y-auto overscroll-contain rounded-[2.25rem]"
        style={{
          backgroundColor: theme.deluxBackground,
          scrollbarColor: `${accent} transparent`,
        }}
      >
        <div className="flex flex-col items-center px-6 pb-10 pt-12 text-center">
          <p
            className="text-[11px] uppercase tracking-[0.3em]"
            style={{ color: hexToRgba(accent, 0.6) }}
          >
            uma história de amor
          </p>

          <DeluxPhotoCoverflow photos={photos} />

          <h3
            className="mt-5 text-3xl leading-tight"
            style={{ fontFamily: "var(--font-script)", color: textColor }}
          >
            {names || "Nome do casal"}
          </h3>

          <span className="mt-2 h-px w-16" style={{ backgroundColor: hexToRgba(accent, 0.3) }} />

          <p
            className="mt-2 text-[11px] uppercase tracking-widest"
            style={{ color: hexToRgba(accent, 0.7) }}
          >
            {sinceLabel ? `juntos desde ${sinceLabel}` : "juntos desde sempre"}
          </p>

          <p className="mt-5 text-sm italic leading-relaxed" style={{ color: mutedText }}>
            {message ? `"${message}"` : "Sua mensagem especial vai aparecer aqui."}
          </p>

          {songVideoId && songTitle && (
            <DeluxMusicCard
              videoId={songVideoId}
              title={songTitle}
              thumbnail={songThumbnail ?? ""}
              startSeconds={songStartSeconds ?? 0}
              accent={accent}
            />
          )}

          <p
            className="mt-8 text-[11px] uppercase tracking-[0.25em]"
            style={{ color: hexToRgba(accent, 0.6) }}
          >
            juntos há
          </p>

          <div className="mt-3 grid w-full grid-cols-3 gap-x-2 gap-y-4">
            {units.map((unit, i) => (
              <div
                key={unit.label}
                style={
                  i % 3 !== 2
                    ? { borderRight: `1px solid ${hexToRgba(accent, 0.15)}` }
                    : undefined
                }
                className="pr-2"
              >
                <p className="font-serif text-2xl" style={{ color: textColor }}>
                  {unit.value}
                </p>
                <p
                  className="text-[10px] uppercase tracking-wide"
                  style={{ color: hexToRgba(accent, 0.6) }}
                >
                  {unit.label}
                </p>
              </div>
            ))}
          </div>

          <span className="mt-6 h-px w-full" style={{ backgroundColor: hexToRgba(accent, 0.15) }} />

          <div className="mt-4 flex items-center gap-2" style={{ color: hexToRgba(accent, 0.6) }}>
            <Heart className="h-3.5 w-3.5" style={{ fill: hexToRgba(accent, 0.6) }} />
            <p className="text-xs italic" style={{ fontFamily: "var(--font-script)" }}>
              feito com muito amor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
