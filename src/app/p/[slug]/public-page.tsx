"use client";

import { useEffect, useRef, useState } from "react";
import { getElapsed } from "@/lib/relationship-time";
import { SongPlayerBar } from "@/components/criar/song-player-bar";
import { themes } from "@/lib/themes";

type Props = {
  planId: string;
  names: string;
  message: string;
  since: string;
  themeId: string;
  title: string;
  openDate: string;
  openImmediately: boolean;
  confettiEffect: boolean;
  songTitle: string;
  songArtist: string;
  songThumbnail: string;
  songVideoId: string;
  songStartSeconds: number;
  photos: string[];
  // Poster de Filme
  movieTitle?: string;
  tagline?: string;
  synopsis?: string;
  showDateOnPoster?: boolean;
  cinemaMessage?: string;
  cinemaPhotos?: string[];
};

function Counter({ since }: { since: string }) {
  const [elapsed, setElapsed] = useState(() => getElapsed(since));

  useEffect(() => {
    const id = setInterval(() => setElapsed(getElapsed(since)), 1000);
    return () => clearInterval(id);
  }, [since]);

  const parts = [
    { label: "anos", value: elapsed.years },
    { label: "meses", value: elapsed.months },
    { label: "dias", value: elapsed.days },
    { label: "horas", value: elapsed.hours },
    { label: "min", value: elapsed.minutes },
    { label: "seg", value: elapsed.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {parts.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <span className="font-display text-3xl font-extrabold text-white">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-white/50">{label}</span>
        </div>
      ))}
    </div>
  );
}

function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"];
    const pieces = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: 8 + Math.random() * 8,
      h: 4 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.1,
      vy: 2 + Math.random() * 3,
      vx: (Math.random() - 0.5) * 1.5,
    }));

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        ctx.save();
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotSpeed;
        if (p.y > canvas.height) {
          p.y = -p.h;
          p.x = Math.random() * canvas.width;
        }
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}

export function PublicPage(props: Props) {
  const {
    planId,
    names,
    message,
    since,
    themeId,
    title,
    openDate,
    openImmediately,
    confettiEffect,
    songTitle,
    songArtist: _songArtist,
    songThumbnail,
    songVideoId,
    songStartSeconds,
    photos,
    movieTitle,
    tagline,
    synopsis,
    showDateOnPoster = true,
    cinemaMessage,
    cinemaPhotos = [],
  } = props;

  const theme = themes.find((t) => t.id === themeId) ?? themes[0];
  const isAniversario = planId === "aniversario";
  const isPoster = planId === "poster";

  // Verificar se o presente pode ser aberto
  const [canOpen, setCanOpen] = useState(() => {
    if (isAniversario && !openImmediately && openDate) {
      return new Date() >= new Date(`${openDate}T00:00:00`);
    }
    return true;
  });

  const [photoIdx, setPhotoIdx] = useState(0);
  const [cinemaMode, setCinemaMode] = useState(false);
  const [cinemaIdx, setCinemaIdx] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const id = setInterval(() => {
      setPhotoIdx((i) => (i + 1) % photos.length);
    }, 4000);
    return () => clearInterval(id);
  }, [photos.length]);

  useEffect(() => {
    if (!cinemaMode || cinemaPhotos.length <= 1) return;
    const id = setInterval(() => {
      setCinemaIdx((i) => (i + 1) % cinemaPhotos.length);
    }, 2000);
    return () => clearInterval(id);
  }, [cinemaMode, cinemaPhotos.length]);

  if (isAniversario && !canOpen) {
    const openAt = new Date(`${openDate}T00:00:00`);
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
        <p className="text-6xl">🎁</p>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-white">
          Você tem um presente esperando!
        </h1>
        <p className="mt-3 text-white/60">
          Este presente poderá ser aberto em{" "}
          <span className="font-semibold text-white">
            {openAt.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
          .
        </p>
        <button
          onClick={() => setCanOpen(true)}
          className="mt-8 rounded-full bg-white/10 px-6 py-2.5 text-sm text-white/50 transition-colors hover:bg-white/15"
        >
          Já chegou a data? Abrir mesmo assim
        </button>
      </main>
    );
  }

  if (isAniversario) {
    return (
      <main
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16"
        style={{ background: "linear-gradient(to bottom, #dc2626, #7f1d1d)" }}
      >
        {confettiEffect && <Confetti />}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.18),transparent_55%)]" />

        <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
          <h1
            className="text-5xl leading-tight text-white sm:text-6xl"
            style={{ fontFamily: "var(--font-script)" }}
          >
            {title || "Feliz Aniversário!"}
          </h1>

          {photos.length > 0 && (
            <div className="mt-8 aspect-square w-64 overflow-hidden rounded-2xl shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[photoIdx]}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {message && (
            <p className="mt-8 text-lg leading-relaxed text-white/90">{message}</p>
          )}
        </div>

        {songVideoId && songTitle && (
          <div className="fixed bottom-0 left-0 right-0 z-20">
            <SongPlayerBar
              videoId={songVideoId}
              title={songTitle}
              thumbnail={songThumbnail}
              startSeconds={songStartSeconds}
            />
          </div>
        )}
      </main>
    );
  }

  // ── Poster de Filme ──────────────────────────────────────────
  if (isPoster) {
    const sinceLabel =
      since && showDateOnPoster
        ? new Date(`${since}T00:00:00`).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : null;

    const bgPhoto = photos[photoIdx] ?? null;
    const cinemaBg = cinemaPhotos[cinemaIdx] ?? null;

    return (
      <main className="relative min-h-screen overflow-hidden bg-black">
        {/* Fundo full-screen */}
        {bgPhoto ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bgPhoto}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900 to-zinc-800" />
        )}

        {/* Conteúdo do poster */}
        <div className="relative flex min-h-screen flex-col justify-end px-6 pb-6 pt-20"
             style={{ paddingBottom: songVideoId && songTitle ? "88px" : "24px" }}>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/40">
            Uma história de amor
          </p>

          <h1 className="font-display text-5xl font-black uppercase leading-none tracking-tight text-white drop-shadow-2xl sm:text-6xl">
            {movieTitle || "Nossa História"}
          </h1>

          {tagline && (
            <p className="mt-3 text-base italic text-brand-light sm:text-lg">{tagline}</p>
          )}

          {synopsis && (
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
              {synopsis}
            </p>
          )}

          <div className="mt-5 flex items-center gap-3">
            <span className="rounded border border-white/30 px-2 py-0.5 text-xs font-bold text-white/50">
              LOVE
            </span>
            <span className="text-sm text-white/30">★★★★★</span>
            {sinceLabel && (
              <span className="flex items-center gap-1.5 rounded-full bg-brand px-4 py-1 text-xs font-semibold text-white shadow">
                ❤️ Desde {sinceLabel}
              </span>
            )}
          </div>

          {/* Botão Assistir */}
          {cinemaPhotos.length > 0 && (
            <button
              onClick={() => { setCinemaMode(true); setCinemaIdx(0); }}
              className="mt-6 flex w-fit items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-black shadow-2xl transition-transform hover:scale-105 active:scale-95"
            >
              <svg className="h-4 w-4 fill-black" viewBox="0 0 16 16">
                <path d="M3 2.5l10 5.5-10 5.5V2.5z" />
              </svg>
              Assistir
            </button>
          )}

        </div>

        {/* Player de música fixo */}
        {songVideoId && songTitle && (
          <div className="fixed bottom-0 left-0 right-0 z-20">
            <SongPlayerBar
              videoId={songVideoId}
              title={songTitle}
              thumbnail={songThumbnail}
              startSeconds={songStartSeconds}
            />
          </div>
        )}

        {/* ── MODO CINEMA ────────────────────────────────── */}
        {cinemaMode && (
          <div className="fixed inset-0 z-50 flex flex-col bg-black">
            {/* Slideshow com Ken Burns */}
            {cinemaBg && (
              <div className="absolute inset-0 overflow-hidden">
                {cinemaPhotos.map((url, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={url}
                    alt=""
                    style={{
                      opacity: i === cinemaIdx ? 1 : 0,
                      transform: i === cinemaIdx ? "scale(1.08)" : "scale(1)",
                      transition: "opacity 1.2s ease, transform 6s ease",
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />
              </div>
            )}

            {/* Fechar */}
            <button
              onClick={() => setCinemaMode(false)}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white/70 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white"
            >
              ✕
            </button>

            {/* Texto */}
            <div className="relative z-10 mt-auto px-8 pb-24">
              <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-white/40">
                Em exibição
              </p>
              <h2 className="font-display text-4xl font-black uppercase leading-tight text-white drop-shadow-2xl sm:text-5xl">
                {movieTitle || "Nossa História"}
              </h2>
              {cinemaMessage && (
                <p className="mt-4 max-w-sm text-base leading-relaxed text-white/75 sm:text-lg">
                  {cinemaMessage}
                </p>
              )}
            </div>

            {/* Dots de progresso */}
            {cinemaPhotos.length > 1 && (
              <div className="absolute bottom-20 left-0 right-0 z-10 flex justify-center gap-1.5 pb-2">
                {cinemaPhotos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCinemaIdx(i)}
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: i === cinemaIdx ? "24px" : "6px",
                      background: i === cinemaIdx ? "white" : "rgba(255,255,255,0.3)",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Player de música */}
            {songVideoId && songTitle && (
              <div className="absolute bottom-0 left-0 right-0 z-20">
                <SongPlayerBar
                  videoId={songVideoId}
                  title={songTitle}
                  thumbnail={songThumbnail}
                  startSeconds={songStartSeconds}
                />
              </div>
            )}
          </div>
        )}
      </main>
    );
  }

  // Página padrão (evento, delux)
  const gradientStyle = {
    background: `linear-gradient(135deg, ${theme.swatch[0]}, ${theme.swatch[1] ?? theme.swatch[0]})`,
  };

  return (
    <main className="min-h-screen bg-ink">
      {/* Hero */}
      <section
        className="relative flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center"
        style={gradientStyle}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/60">
            Uma história de amor
          </p>
          <h1
            className="text-5xl leading-tight text-white sm:text-7xl"
            style={{ fontFamily: "var(--font-script)" }}
          >
            {names || "Nós dois"}
          </h1>
          {since && (
            <div className="mt-8">
              <Counter since={since} />
            </div>
          )}
        </div>
      </section>

      {/* Mensagem */}
      {message && (
        <section className="px-6 py-16">
          <p className="mx-auto max-w-xl text-center text-lg leading-relaxed text-white/80 sm:text-xl">
            &ldquo;{message}&rdquo;
          </p>
        </section>
      )}

      {/* Fotos */}
      {photos.length > 0 && (
        <section className="px-6 pb-16">
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
            {photos.map((url, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={url}
                alt=""
                className="aspect-square w-full rounded-xl object-cover"
              />
            ))}
          </div>
        </section>
      )}

      {/* Player de música fixo */}
      {songVideoId && songTitle && (
        <div className="fixed bottom-0 left-0 right-0 z-20">
          <SongPlayerBar
            videoId={songVideoId}
            title={songTitle}
            thumbnail={songThumbnail}
            startSeconds={songStartSeconds}
          />
        </div>
      )}
    </main>
  );
}
