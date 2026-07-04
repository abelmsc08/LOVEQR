import { NextResponse } from "next/server";

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
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json({ items: [] });
  }

  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "missing_api_key", message: "YOUTUBE_API_KEY não configurada no servidor." },
      { status: 500 }
    );
  }

  const url =
    "https://www.googleapis.com/youtube/v3/search?" +
    new URLSearchParams({
      part: "snippet",
      type: "video",
      videoCategoryId: "10", // Music
      maxResults: "8",
      q: query,
      key,
    }).toString();

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json(
        { error: "youtube_error", status: res.status, detail },
        { status: 502 }
      );
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
    return NextResponse.json(
      { error: "fetch_failed", message: "Falha ao consultar o YouTube." },
      { status: 502 }
    );
  }
}
