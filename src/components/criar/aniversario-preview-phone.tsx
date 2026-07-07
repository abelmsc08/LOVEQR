"use client";

import { useEffect, useState } from "react";
import { SongPlayerBar } from "@/components/criar/song-player-bar";
import type { Photo } from "@/components/criar/photo-uploader";

export function AniversarioPreviewPhone({
  title,
  message,
  photos = [],
  songTitle,
  songThumbnail,
  songVideoId,
  songStartSeconds,
}: {
  title: string;
  message?: string;
  photos?: Photo[];
  songTitle: string;
  songArtist: string;
  songThumbnail?: string;
  songVideoId?: string;
  songStartSeconds?: number;
}) {
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const id = setInterval(() => {
      setPhotoIdx((i) => (i + 1) % photos.length);
    }, 3000);
    return () => clearInterval(id);
  }, [photos.length]);

  // Resetar índice quando as fotos mudarem
  useEffect(() => {
    setPhotoIdx(0);
  }, [photos.length]);

  return (
    <div className="relative w-[280px] shrink-0 rounded-[2.75rem] border-[6px] border-ink bg-ink p-2 shadow-2xl sm:w-[320px]">
      <div className="absolute left-1/2 top-2 z-10 h-5 w-28 -translate-x-1/2 rounded-full bg-ink" />
      <div
        className="relative flex h-[560px] w-full flex-col items-center overflow-hidden rounded-[2.25rem] pt-12"
        style={{ background: "linear-gradient(to bottom, #dc2626, #7f1d1d)" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.18),transparent_55%)]" />

        {/* Slideshow de fotos — no topo */}
        {photos.length > 0 && (
          <div className="relative mt-2 h-44 w-44 overflow-hidden rounded-2xl shadow-xl">
            {photos.map((photo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={photo.id}
                src={photo.url}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                style={{ opacity: i === photoIdx ? 1 : 0 }}
              />
            ))}
            {photos.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {photos.map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full transition-colors duration-300"
                    style={{ background: i === photoIdx ? "white" : "rgba(255,255,255,0.4)" }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <h3
          className="relative mt-5 px-8 text-center text-4xl leading-tight text-white"
          style={{ fontFamily: "var(--font-script)" }}
        >
          {title || "Feliz Aniversário!"}
        </h3>

        {message && (
          <p className="relative mt-3 px-7 text-center text-[13px] leading-relaxed text-white/85">
            {message}
          </p>
        )}

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
