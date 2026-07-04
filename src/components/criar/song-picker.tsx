"use client";

import { useState } from "react";
import { Check, Link2, Loader2 } from "lucide-react";

export type YoutubeSong = {
  title: string;
  artist: string;
  thumbnail: string;
  videoId: string;
};

const suggestions = [
  { label: "Perfect — Ed Sheeran", url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g" },
  { label: "All of Me — John Legend", url: "https://www.youtube.com/watch?v=450p7goxZqg" },
  {
    label: "Can't Help Falling in Love — Elvis Presley",
    url: "https://www.youtube.com/watch?v=myeQxfXhCyE",
  },
  { label: "Thinking Out Loud — Ed Sheeran", url: "https://www.youtube.com/watch?v=lp-EO5I60KA" },
];

function extractVideoId(url: string) {
  const match = url.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export function SongPicker({
  song,
  onSelect,
}: {
  song: YoutubeSong | null;
  onSelect: (song: YoutubeSong) => void;
}) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSong = async (link: string) => {
    const videoId = extractVideoId(link);
    if (!videoId) {
      setError("Cole um link válido do YouTube.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(link)}&format=json`
      );
      if (!res.ok) throw new Error("not found");
      const json = await res.json();
      onSelect({
        title: json.title,
        artist: json.author_name,
        thumbnail: json.thumbnail_url,
        videoId,
      });
      setUrl("");
    } catch {
      setError("Não encontramos esse vídeo. Verifique o link e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Link2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && url && fetchSong(url)}
            placeholder="Cole o link do YouTube da música"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand"
          />
        </div>
        <button
          type="button"
          disabled={!url || loading}
          onClick={() => fetchSong(url)}
          className="flex h-[46px] shrink-0 items-center gap-2 rounded-xl bg-gradient-brand px-5 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buscar"}
        </button>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s.url}
            type="button"
            onClick={() => {
              setUrl(s.url);
              fetchSong(s.url);
            }}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition-colors hover:border-brand hover:text-white"
          >
            {s.label}
          </button>
        ))}
      </div>

      {song && (
        <div className="flex items-center gap-3 rounded-xl border border-brand bg-brand-soft/10 p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={song.thumbnail}
            alt={song.title}
            className="h-14 w-14 shrink-0 rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{song.title}</p>
            <p className="truncate text-xs text-white/50">{song.artist}</p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white">
            <Check className="h-3.5 w-3.5" />
            Selecionada
          </span>
        </div>
      )}
    </div>
  );
}
