"use client";

import { Pause, Play } from "lucide-react";
import { useYoutubePlayer } from "@/lib/use-youtube-player";
import { hexToRgba } from "@/lib/themes";

export function DeluxMusicCard({
  videoId,
  title,
  thumbnail,
  startSeconds = 0,
  accent = "#b45309",
}: {
  videoId: string;
  title: string;
  thumbnail: string;
  startSeconds?: number;
  accent?: string;
}) {
  const { containerRef, playing, togglePlay } = useYoutubePlayer(videoId, startSeconds);

  return (
    <div className="mt-6 w-full">
      <p
        className="text-[11px] uppercase tracking-[0.25em]"
        style={{ color: hexToRgba(accent, 0.7) }}
      >
        Nossa música
      </p>
      <div
        className="mt-3 flex items-center gap-3 rounded-xl border bg-white p-3 shadow-sm"
        style={{ borderColor: hexToRgba(accent, 0.1) }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={title}
          className="h-11 w-11 shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-sm font-medium text-ink/80">{title}</p>
          <p className="text-xs" style={{ color: hexToRgba(accent, 0.6) }}>
            {playing ? "Tocando agora" : "Toque para tocar"}
          </p>
        </div>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pausar" : "Tocar"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105"
          style={{ backgroundColor: hexToRgba(accent, 0.15), color: accent }}
        >
          {playing ? (
            <Pause className="h-4 w-4" style={{ fill: accent }} />
          ) : (
            <Play className="ml-0.5 h-4 w-4" style={{ fill: accent }} />
          )}
        </button>

        <div
          ref={containerRef}
          className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
        />
      </div>
    </div>
  );
}
