"use client";

import { Pause, Play } from "lucide-react";
import { useYoutubePlayer } from "@/lib/use-youtube-player";

export function DeluxMusicCard({
  videoId,
  title,
  thumbnail,
  startSeconds = 0,
}: {
  videoId: string;
  title: string;
  thumbnail: string;
  startSeconds?: number;
}) {
  const { containerRef, playing, togglePlay } = useYoutubePlayer(videoId, startSeconds);

  return (
    <div className="mt-6 w-full">
      <p className="text-[11px] uppercase tracking-[0.25em] text-amber-700/70">
        Nossa música
      </p>
      <div className="mt-3 flex items-center gap-3 rounded-xl border border-amber-900/10 bg-white p-3 shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={title}
          className="h-11 w-11 shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-sm font-medium text-ink/80">{title}</p>
          <p className="text-xs text-amber-700/60">
            {playing ? "Tocando agora" : "Toque para tocar"}
          </p>
        </div>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pausar" : "Tocar"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 transition-transform hover:scale-105"
        >
          {playing ? (
            <Pause className="h-4 w-4 fill-amber-800" />
          ) : (
            <Play className="ml-0.5 h-4 w-4 fill-amber-800" />
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
