"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { getElapsed } from "@/lib/relationship-time";
import { SongPlayerBar } from "@/components/criar/song-player-bar";
import type { Photo } from "@/components/criar/photo-uploader";

export function PreviewPhone({
  names,
  message,
  since,
  songTitle,
  songThumbnail,
  songVideoId,
  songStartSeconds,
  photos,
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
}) {
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
  ];

  return (
    <div className="relative w-[280px] shrink-0 rounded-[2.75rem] border-[6px] border-ink bg-ink p-2 shadow-2xl sm:w-[320px]">
      <div className="absolute left-1/2 top-2 z-10 h-5 w-28 -translate-x-1/2 rounded-full bg-ink" />
      <div className="relative min-h-[560px] w-full overflow-hidden rounded-[2.25rem] bg-gradient-to-b from-brand to-brand-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.18),transparent_55%)]" />

        <div
          className={`relative flex flex-col items-center px-6 pt-14 text-center text-white ${
            songVideoId ? "pb-16" : "pb-8"
          }`}
        >
          <h3
            className={
              "text-3xl leading-tight " + (names ? "text-white" : "text-white/40")
            }
            style={{ fontFamily: "var(--font-script)" }}
          >
            {names || "Nome do casal"}
          </h3>

          <p
            className={
              "mt-4 text-sm leading-relaxed " + (message ? "text-white/85" : "text-white/35 italic")
            }
          >
            {message || "Sua mensagem especial vai aparecer aqui."}
          </p>

          <p
            className="mt-6 text-2xl text-white/95"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Juntos há
          </p>

          <div className="mt-4 grid w-full grid-cols-2 gap-2.5">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="rounded-2xl bg-white/15 py-3 backdrop-blur-md ring-1 ring-white/25"
              >
                <p className="font-display text-2xl font-extrabold tabular-nums">
                  {unit.value}
                </p>
                <p className="text-[11px] uppercase tracking-wide text-white/70">
                  {unit.label}
                </p>
              </div>
            ))}
          </div>

          {photos.length > 0 && (
            <div className="mt-3 grid w-full grid-cols-3 gap-2">
              {photos.slice(0, 6).map((photo) => (
                <div
                  key={photo.id}
                  className="aspect-square overflow-hidden rounded-xl ring-1 ring-white/20"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.url} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <span className="mt-6 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
            <Heart className="h-4 w-4 fill-white" />
          </span>
        </div>

        {songVideoId && songTitle && (
          <SongPlayerBar
            videoId={songVideoId}
            title={songTitle}
            thumbnail={songThumbnail ?? ""}
            startSeconds={songStartSeconds ?? 0}
          />
        )}
      </div>
    </div>
  );
}
