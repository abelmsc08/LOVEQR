"use client";

import { useRef } from "react";
import { Camera, X } from "lucide-react";

export type Photo = { id: string; url: string };

export function PhotoUploader({
  photos,
  onChange,
}: {
  photos: Photo[];
  onChange: (photos: Photo[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = 10 - photos.length;
    if (remaining <= 0) return;

    const next = Array.from(files)
      .slice(0, remaining)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({ id: `${Date.now()}-${Math.random()}`, url: URL.createObjectURL(file) }));

    onChange([...photos, ...next]);
  };

  const removePhoto = (id: string) => {
    const photo = photos.find((p) => p.id === id);
    if (photo) URL.revokeObjectURL(photo.url);
    onChange(photos.filter((p) => p.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={photos.length >= 10}
        className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/5 px-5 py-8 text-center transition-colors hover:border-brand/50 hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Camera className="h-6 w-6 text-white/40" />
        <p className="text-sm font-medium text-white/70">
          Toque para escolher fotos do seu celular ou computador
        </p>
        <p className="text-xs text-white/40">{photos.length} de 10 fotos adicionadas</p>
      </button>

      {photos.length > 0 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(photo.id)}
                aria-label="Remover foto"
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
