"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  EventoPreview,
  DeluxPreview,
  PosterPreview,
} from "@/components/ui/hero-plans-carousel";

const MUSIC_VIDEO_ID = "lBDDMrUCz1A";

const tabs = [
  { id: "evento", label: "Evento", price: "R$ 4,90",  href: "/criar?plano=evento" },
  { id: "delux",  label: "Delux",  price: "R$ 19,90", href: "/criar?plano=delux" },
  { id: "filme",  label: "Filme",  price: "R$ 27,90", href: "/criar?plano=poster" },
];

/* ── YouTube ambient player ── */
type GalleryYTPlayer = {
  playVideo(): void;
  pauseVideo(): void;
  setVolume(v: number): void;
  destroy(): void;
};

let ytApiReady: Promise<void> | null = null;
function loadYtApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (ytApiReady) return ytApiReady;
  ytApiReady = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { prev?.(); resolve(); };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    }
  });
  return ytApiReady;
}

function useGalleryMusic(sectionRef: React.RefObject<HTMLElement | null>) {
  const ytContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<GalleryYTPlayer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    loadYtApi().then(() => {
      if (cancelled || !ytContainerRef.current) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      playerRef.current = new (window.YT.Player as any)(ytContainerRef.current, {
        videoId: MUSIC_VIDEO_ID,
        playerVars: { controls: 0, disablekb: 1, autoplay: 0, loop: 1, playlist: MUSIC_VIDEO_ID },
        events: {
          onReady: (e: { target: GalleryYTPlayer }) => {
            e.target.setVolume(40);
            setReady(true);
          },
          onStateChange: (e: { data: number }) => setPlaying(e.data === 1),
        },
      });
    });
    return () => { cancelled = true; playerRef.current?.destroy(); playerRef.current = null; };
  }, []);

  // Auto-start when section enters viewport
  useEffect(() => {
    if (!ready) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          playerRef.current?.playVideo();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [ready, sectionRef]);

  const toggle = () => {
    if (!playerRef.current) return;
    if (playing) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  };

  const play = () => {
    if (!playerRef.current || playing) return;
    playerRef.current.playVideo();
  };

  return { ytContainerRef, playing, ready, toggle, play };
}

export function Gallery() {
  const [active, setActive] = useState("evento");
  const sectionRef = useRef<HTMLElement>(null);
  const { ytContainerRef, playing, toggle, play } = useGalleryMusic(sectionRef);

  const handleTabChange = (id: string) => {
    setActive(id);
    play();
  };

  return (
    <section ref={sectionRef} id="galeria" className="overflow-hidden bg-white py-28 sm:py-32">
      {/* Hidden YT container */}
      <div className="pointer-events-none fixed left-[-9999px] top-0 h-1 w-1 opacity-0" aria-hidden>
        <div ref={ytContainerRef} />
      </div>

      <div className="mx-auto max-w-2xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-widest text-brand"
        >
          Inspire-se
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl"
        >
          Exemplos de páginas
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-muted"
        >
          Veja diferentes estilos de páginas que você pode criar.
        </motion.p>
      </div>

      {/* Tab pills */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="mt-10 flex justify-center"
      >
        <div className="inline-flex gap-1 rounded-full border border-black/5 bg-black/[0.03] p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300",
                active === tab.id ? "bg-ink text-white shadow-md" : "text-muted hover:text-ink"
              )}
            >
              {tab.label}
              <span className={cn("text-[11px] font-medium", active === tab.id ? "text-white/60" : "text-muted/70")}>
                {tab.price}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Phone preview */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-14 flex justify-center"
      >
        <div className="absolute inset-x-10 top-10 h-72 rounded-[3rem] bg-brand/15 blur-3xl" />

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {active === "evento" && <EventoPreview musicPlaying={playing} onMusicToggle={toggle} />}
            {active === "delux"  && <DeluxPreview  musicPlaying={playing} onMusicToggle={toggle} />}
            {active === "filme"  && <PosterPreview musicPlaying={playing} onMusicToggle={toggle} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-10 flex justify-center"
      >
        <Button size="lg" variant="primary" onClick={() => {
          const href = tabs.find(t => t.id === active)?.href ?? "/criar";
          window.location.href = href;
        }}>
          Quero esse modelo
        </Button>
      </motion.div>

      <style>{`
        @keyframes musicPulseBar {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1.6); }
        }
      `}</style>
    </section>
  );
}
