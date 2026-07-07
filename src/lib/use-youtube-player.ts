"use client";

import { useEffect, useRef, useState } from "react";

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

export function useYoutubePlayer(videoId: string, startSeconds = 0) {
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
          autoplay: 1,
          loop: 1,
          playlist: videoId,
          start: Math.max(0, Math.floor(startSeconds)),
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.playVideo();
            poll = setInterval(() => {
              const p = playerRef.current;
              if (!p) return;
              const duration = p.getDuration();
              if (duration > 0) {
                setProgress((p.getCurrentTime() / duration) * 100);
              }
            }, 400);
          },
          onStateChange: (e: { data: number; target: YTPlayer }) => {
            setPlaying(e.data === 1);
            if (e.data === 0) {
              e.target.seekTo(Math.max(0, Math.floor(startSeconds)), true);
              e.target.playVideo();
            }
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

  return { containerRef, playing, progress, togglePlay, seek };
}
