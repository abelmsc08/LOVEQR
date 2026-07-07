"use client";

import { useEffect, useState } from "react";
import { SongPlayerBar } from "@/components/criar/song-player-bar";
import type { Photo } from "@/components/criar/photo-uploader";

export function PosterPreviewPhone({
  movieTitle,
  tagline,
  synopsis,
  since,
  showDate = true,
  photos = [],
  songTitle,
  songThumbnail,
  songVideoId,
  songStartSeconds,
  onAssistir,
}: {
  movieTitle: string;
  tagline?: string;
  synopsis?: string;
  since?: string;
  showDate?: boolean;
  photos?: Photo[];
  songTitle: string;
  songArtist: string;
  songThumbnail?: string;
  songVideoId?: string;
  songStartSeconds?: number;
  onAssistir?: () => void;
}) {
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const id = setInterval(() => setPhotoIdx((i) => (i + 1) % photos.length), 4000);
    return () => clearInterval(id);
  }, [photos.length]);

  const bg = photos[photoIdx]?.url ?? null;

  const hasMusic = !!(songVideoId && songTitle);
  const bottomPad = (hasMusic ? 60 : 0) + 12;

  const sinceLabel =
    since && showDate
      ? new Date(`${since}T00:00:00`).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : null;

  return (
    <div className="relative w-[280px] shrink-0 rounded-[2.75rem] border-[6px] border-ink bg-ink p-2 shadow-2xl sm:w-[320px]">
      {/* Notch */}
      <div className="absolute left-1/2 top-2 z-10 h-5 w-28 -translate-x-1/2 rounded-full bg-ink" />

      <div className="relative flex h-[560px] w-full flex-col overflow-hidden rounded-[2.25rem] bg-zinc-900">
        {/* Fundo: foto ou gradiente escuro */}
        {bg ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bg}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900/90 to-zinc-800" />
        )}

        {/* Conteúdo do poster — pb deixa espaço para cenas + player */}
        <div
          className="relative mt-auto flex flex-col px-6 pt-[42%]"
          style={{ paddingBottom: `${bottomPad}px` }}
        >
          <p className="mb-1 text-[9px] uppercase tracking-[0.25em] text-white/40">
            Uma história de amor
          </p>

          <h2 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-white drop-shadow-lg">
            {movieTitle || "Nossa História de Amor"}
          </h2>

          {tagline && (
            <p className="mt-1.5 text-[11px] italic leading-snug text-brand-light">{tagline}</p>
          )}

          {synopsis && (
            <p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-white/60">
              {synopsis}
            </p>
          )}

          <div className="mt-2 flex items-center gap-2 border-t border-white/10 pt-2">
            <span className="rounded border border-white/30 px-1.5 py-0.5 text-[8px] font-bold text-white/50">
              LOVE
            </span>
            <span className="text-[9px] text-white/30">★★★★★</span>
          </div>

          {/* Linha com Desde + Assistir */}
          {(sinceLabel || bg) && (
            <div className="mt-2.5 flex items-center justify-between gap-2">
              {sinceLabel ? (
                <span className="flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-[9px] font-semibold text-white shadow">
                  ❤️ Desde {sinceLabel}
                </span>
              ) : (
                <span />
              )}
              {bg && (
                <button
                  type="button"
                  onClick={onAssistir}
                  className="flex shrink-0 items-center gap-1 rounded-full bg-white px-4 py-1.5 text-[10px] font-bold text-black shadow-lg transition-transform active:scale-95"
                >
                  <svg className="h-2.5 w-2.5 fill-black" viewBox="0 0 16 16">
                    <path d="M3 2.5l10 5.5-10 5.5V2.5z" />
                  </svg>
                  Assistir
                </button>
              )}
            </div>
          )}
        </div>

        {/* Cenas + player — absolutos na base */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          {hasMusic && (
            <SongPlayerBar
              videoId={songVideoId!}
              title={songTitle}
              thumbnail={songThumbnail ?? ""}
              startSeconds={songStartSeconds ?? 0}
            />
          )}
        </div>
      </div>
    </div>
  );
}
