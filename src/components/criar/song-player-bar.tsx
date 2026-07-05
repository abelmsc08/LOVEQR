"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Rewind, FastForward } from "lucide-react";

type YTPlayer = {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  destroy(): void;
};

declare global {
  interface Window {
    YT: {
      Player: new (el: HTMLElement, options: Record<string, unknown>) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;

function loadYoutubeApi(): Promise<void> {
  if (window.YT) return Promise.resolve();
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => resolve();
  });
  return apiPromise;
}

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
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let poll: ReturnType<typeof setInterval> | null = null;

    loadYoutubeApi().then(() => {
      if (cancelled || !containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          controls: 0,
          disablekb: 1,
          start: Math.max(0, Math.floor(startSeconds)),
        },
        events: {
          onReady: () => {
            poll = setInterval(() => {
              const p = playerRef.current;
              if (!p) return;
              const duration = p.getDuration();
              if (duration > 0) {
                setProgress((p.getCurrentTime() / duration) * 100);
              }
            }, 400);
          },
          onStateChange: (e: { data: number }) => {
            setPlaying(e.data === 1);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (poll) clearInterval(poll);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  useEffect(() => {
    playerRef.current?.seekTo(Math.max(0, Math.floor(startSeconds)), true);
  }, [startSeconds]);

  const togglePlay = () => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) p.pauseVideo();
    else p.playVideo();
  };

  const seek = (deltaSeconds: number) => {
    const p = playerRef.current;
    if (!p) return;
    p.seekTo(Math.max(0, p.getCurrentTime() + deltaSeconds), true);
  };

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
