"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type YoutubeSong = {
  title: string;
  artist: string;
  thumbnail: string;
  videoId: string;
};

export function SongPicker({
  song,
  onSelect,
}: {
  song: YoutubeSong | null;
  onSelect: (song: YoutubeSong) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<YoutubeSong[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const q = query.trim();

    const timeout = setTimeout(async () => {
      if (q.length < 2) {
        setResults([]);
        setError("");
        setLoading(false);
        return;
      }

      setLoading(true);
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch(`/api/youtube-search?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (!res.ok) {
          setError(
            data?.error === "missing_api_key"
              ? "A busca de músicas ainda não está configurada."
              : "Não foi possível buscar agora. Tente novamente."
          );
          setResults([]);
        } else {
          setResults(data.items ?? []);
          setError("");
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Não foi possível buscar agora. Tente novamente.");
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        {loading ? (
          <Loader2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-white/40" />
        ) : (
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
        )}
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar música ou artista (ex: Gusttavo Lima)"
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand"
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="flex max-h-[360px] flex-col gap-2 overflow-y-auto pr-1">
        {!loading && query.trim().length >= 2 && results.length === 0 && !error && (
          <p className="py-6 text-center text-sm text-white/30">
            Nenhuma música encontrada.
          </p>
        )}

        {results.map((item) => {
          const isSelected = item.videoId === song?.videoId;
          return (
            <div
              key={item.videoId}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-2.5 transition-colors",
                isSelected
                  ? "border-brand bg-brand-soft/10"
                  : "border-white/10 bg-white/[0.03]"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-12 w-16 shrink-0 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-medium leading-snug text-white">
                  {item.title}
                </p>
                <p className="truncate text-xs text-white/50">{item.artist}</p>
              </div>
              <button
                type="button"
                onClick={() => onSelect(item)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300",
                  isSelected
                    ? "bg-white/10 text-white"
                    : "bg-gradient-brand text-white hover:-translate-y-0.5"
                )}
              >
                {isSelected ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Selecionada
                  </>
                ) : (
                  "Selecionar"
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
