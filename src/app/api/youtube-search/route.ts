import { NextResponse } from "next/server";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

type YoutubeApiItem = {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: {
      default?: { url: string };
      medium?: { url: string };
      high?: { url: string };
    };
  };
};

function decodeHtml(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export async function GET(request: Request) {
  // Rate limit: 30 buscas por minuto por IP
  const ip = getClientIp(request);
  if (isRateLimited(`youtube:${ip}`, 30, 60 * 1000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query || query.length > 200) {
    return NextResponse.json({ items: [] });
  }

  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "service_unavailable" }, { status: 503 });
  }

  const url =
    "https://www.googleapis.com/youtube/v3/search?" +
    new URLSearchParams({
      part: "snippet",
      type: "video",
      videoCategoryId: "10",
      maxResults: "8",
      q: query,
      key,
    }).toString();

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      // Não retorna detalhes do erro da API do Google ao cliente
      return NextResponse.json({ error: "youtube_error" }, { status: 502 });
    }
    const data = (await res.json()) as { items?: YoutubeApiItem[] };
    const items = (data.items ?? [])
      .filter((item) => item.id?.videoId)
      .map((item) => ({
        videoId: item.id.videoId,
        title: decodeHtml(item.snippet.title),
        artist: decodeHtml(item.snippet.channelTitle),
        thumbnail:
          item.snippet.thumbnails.medium?.url ??
          item.snippet.thumbnails.default?.url ??
          item.snippet.thumbnails.high?.url ??
          "",
      }));

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }
}
