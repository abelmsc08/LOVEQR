import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { getPlan } from "@/lib/plans";
import { addMonths, addYears } from "@/lib/date-utils";

function nameToSlug(raw: string): string {
  return raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 40) || nanoid(8);
}

async function uniqueSlug(base: string): Promise<string> {
  const existing = await db.page.findUnique({ where: { slug: base } });
  if (!existing) return base;
  // append random suffix if taken
  return `${base}-${nanoid(4)}`;
}

export type CreatePageBody = {
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
  musicAddOn: boolean;
  photos: string[]; // base64 data URLs
  // Poster de Filme
  movieTitle?: string;
  tagline?: string;
  synopsis?: string;
  showDateOnPoster?: boolean;
  cinemaMessage?: string;
  cinemaPhotos?: string[];
};

function calcExpiry(planId: string): Date {
  const now = new Date();
  if (planId === "delux") return addYears(now, 1);
  if (planId === "poster") return addYears(now, 2);
  return addMonths(now, 1); // evento, aniversario
}

export async function POST(request: Request) {
  try {
    const body: CreatePageBody = await request.json();
    const plan = getPlan(body.planId);

    // Build slug from customer name
    const rawName = body.planId === "aniversario"
      ? (body.title || body.names)
      : body.planId === "poster"
      ? (body.movieTitle || body.names)
      : body.names;
    const slug = await uniqueSlug(nameToSlug(rawName));
    const expiresAt = calcExpiry(plan.id);

    const page = await db.page.create({
      data: {
        slug,
        planId: plan.id,
        names: body.names,
        message: body.message,
        since: body.since,
        themeId: body.themeId,
        title: body.title,
        openDate: body.openDate,
        openImmediately: body.openImmediately,
        confettiEffect: body.confettiEffect,
        songTitle: body.songTitle,
        songArtist: body.songArtist,
        songThumbnail: body.songThumbnail,
        songVideoId: body.songVideoId,
        songStartSeconds: body.songStartSeconds,
        musicAddOn: body.musicAddOn,
        photos: body.photos,
        movieTitle: body.movieTitle ?? "",
        tagline: body.tagline ?? "",
        synopsis: body.synopsis ?? "",
        showDateOnPoster: body.showDateOnPoster ?? true,
        cinemaMessage: body.cinemaMessage ?? "",
        cinemaPhotos: body.cinemaPhotos ?? [],
        expiresAt,
      },
    });

    return NextResponse.json({ slug: page.slug });
  } catch (err) {
    console.error("[api/pages] error:", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
