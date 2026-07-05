"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Photo } from "@/components/criar/photo-uploader";

export function DeluxPhotoCoverflow({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [photos.length]);

  if (photos.length === 0) return null;

  const safeIndex = index % photos.length;

  return (
    <div className="relative mt-2 flex h-40 w-full items-center justify-center" style={{ perspective: "800px" }}>
      {photos.map((photo, i) => {
        let offset = i - safeIndex;
        const half = Math.floor(photos.length / 2);
        if (offset > half) offset -= photos.length;
        if (offset < -half) offset += photos.length;
        if (Math.abs(offset) > 1) return null;

        const isCenter = offset === 0;

        return (
          <motion.div
            key={photo.id}
            animate={{
              x: offset * 70,
              scale: isCenter ? 1 : 0.8,
              rotate: offset * -8,
              zIndex: isCenter ? 10 : 5,
              opacity: Math.abs(offset) > 1 ? 0 : 1,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute h-32 w-28 overflow-hidden rounded-lg bg-white p-1.5 shadow-md"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.url} alt="" className="h-full w-full rounded-sm object-cover" />
          </motion.div>
        );
      })}
    </div>
  );
}
