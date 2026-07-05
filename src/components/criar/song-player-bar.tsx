"use client";

import { Pause, Play, Rewind, FastForward } from "lucide-react";
import { useYoutubePlayer } from "@/lib/use-youtube-player";

export function SongPlayerBar({
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
  const { containerRef, playing, progress, togglePlay, seek } = useYoutubePlayer(
    videoId,
    startSeconds
  );

  return (
    <div className="absolute inset-x-0 bottom-0 z-10">
      <div className="h-[3px] w-full bg-white/20">
        <div
          className="h-full bg-white transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex items-center gap-3 bg-black/70 px-4 py-3 backdrop-blur-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={title}
          className="h-9 w-9 shrink-0 rounded-md object-cover"
        />
        <p className="min-w-0 flex-1 truncate text-xs font-medium text-white">{title}</p>

        <button
          type="button"
          onClick={() => seek(-10)}
          aria-label="Voltar 10 segundos"
          className="flex h-7 w-7 shrink-0 items-center justify-center text-white/70 transition-colors hover:text-white"
        >
          <Rewind className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pausar" : "Tocar"}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform hover:scale-105"
        >
          {playing ? (
            <Pause className="h-4 w-4 fill-ink" />
          ) : (
            <Play className="ml-0.5 h-4 w-4 fill-ink" />
          )}
        </button>
        <button
          type="button"
          onClick={() => seek(10)}
          aria-label="Avançar 10 segundos"
          className="flex h-7 w-7 shrink-0 items-center justify-center text-white/70 transition-colors hover:text-white"
        >
          <FastForward className="h-4 w-4" />
        </button>

        <div
          ref={containerRef}
          className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
        />
      </div>
    </div>
  );
}
