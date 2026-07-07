"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play } from "lucide-react";
import type { YTPlayer } from "@/lib/use-youtube-player";

const VIDEO_ID = "lBDDMrUCz1A";

let apiLoaded: Promise<void> | null = null;

function loadYtApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (apiLoaded) return apiLoaded;
  apiLoaded = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { prev?.(); resolve(); };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    }
  });
  return apiLoaded;
}

export function LandingMusicPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fade in after 1.5s
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let cancelled = false;

    loadYtApi().then(() => {
      if (cancelled || !containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          controls: 0,
          disablekb: 1,
          autoplay: 0,
          loop: 1,
          playlist: VIDEO_ID,
          mute: 0,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.setVolume(40);
            setReady(true);
            // Auto-play after first user interaction
            const start = () => {
              if (!playing) {
                playerRef.current?.playVideo();
                setPlaying(true);
              }
              document.removeEventListener("click", start, true);
              document.removeEventListener("scroll", start, true);
            };
            document.addEventListener("click", start, { once: true, capture: true });
            document.addEventListener("scroll", start, { once: true, capture: true });
          },
          onStateChange: (e: { data: number }) => {
            setPlaying(e.data === 1);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    if (!playerRef.current) return;
    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <>
      {/* Hidden YouTube container */}
      <div className="pointer-events-none fixed left-[-9999px] top-0 h-1 w-1 opacity-0" aria-hidden>
        <div ref={containerRef} />
      </div>

      {/* Floating pill */}
      <div
        className="fixed bottom-6 right-6 z-50 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
      >
        <button
          type="button"
          onClick={toggle}
          disabled={!ready}
          className="flex items-center gap-2.5 rounded-full border border-white/15 bg-ink/90 px-4 py-2.5 shadow-2xl backdrop-blur-md transition-all hover:bg-ink/80 disabled:opacity-40"
        >
          {/* Animated bars when playing */}
          {playing ? (
            <span className="flex items-end gap-[3px]">
              {[4, 8, 5, 10, 6].map((h, i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full bg-brand-light"
                  style={{
                    height: h,
                    animation: `musicPulse ${0.6 + i * 0.12}s ease-in-out infinite alternate`,
                  }}
                />
              ))}
            </span>
          ) : (
            <Music2 className="h-3.5 w-3.5 text-white/60" />
          )}

          <span className="text-[11px] font-medium text-white/70 max-w-[100px] truncate">
            {playing ? "Tocando..." : "Música"}
          </span>

          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white">
            {playing
              ? <Pause className="h-2.5 w-2.5 fill-white" />
              : <Play className="h-2.5 w-2.5 fill-white" />
            }
          </span>
        </button>
      </div>

      <style>{`
        @keyframes musicPulse {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1.4); }
        }
      `}</style>
    </>
  );
}
