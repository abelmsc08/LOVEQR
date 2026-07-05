"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Photo } from "@/components/criar/photo-uploader";

export function PhotoSlideshow({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [photos.length]);

  if (photos.length === 0) return null;

  const safeIndex = index % photos.length;
  const current = photos[safeIndex];

  return (
    <div className="mt-3 flex w-full flex-col items-center gap-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl ring-1 ring-white/20">
        <AnimatePresence mode="wait">
          <motion.img
            key={current.id}
            src={current.url}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>

      {photos.length > 1 && (
        <div className="flex gap-1.5">
          {photos.map((photo, i) => (
            <span
              key={photo.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === safeIndex ? "w-4 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
