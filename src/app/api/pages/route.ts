import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { getPlan } from "@/lib/plans";
import { addMonths, addYears } from "@/lib/date-utils";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

// Limites de campos
const MAX_TEXT_LEN = 2000;   // mensagem, sinopse
const MAX_SHORT_LEN = 120;   // nomes, título, tagline
const MAX_PHOTOS = 12;
// Tamanho máximo de uma foto base64 (~5 MB em base64 ≈ 6.8 MB texto)
const MAX_PHOTO_B64_LEN = 7_000_000;

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
  photos: string[];
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
  return addMonths(now, 1);
}

function str(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.slice(0, max);
}

function validateBody(body: unknown): { ok: true; data: CreatePageBody } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "invalid_body" };
  const b = body as Record<string, unknown>;

  const validPlans = ["evento", "delux", "aniversario", "poster"];
  if (!validPlans.includes(str(b.planId, 20))) return { ok: false, error: "invalid_plan" };

  const photos = Array.isArray(b.photos) ? (b.photos as unknown[]) : [];
  const cinemaPhotos = Array.isArray(b.cinemaPhotos) ? (b.cinemaPhotos as unknown[]) : [];

  if (photos.length > MAX_PHOTOS) return { ok: false, error: "too_many_photos" };
  if (cinemaPhotos.length > MAX_PHOTOS) return { ok: false, error: "too_many_cinema_photos" };

  // Validate each photo is a string and not too large
  for (const p of [...photos, ...cinemaPhotos]) {
    if (typeof p !== "string") return { ok: false, error: "invalid_photo" };
    if (p.length > MAX_PHOTO_B64_LEN) return { ok: false, error: "photo_too_large" };
  }

  // Validate songStartSeconds
  const startSec = Number(b.songStartSeconds);
  if (!Number.isFinite(startSec) || startSec < 0 || startSec > 3600) {
    return { ok: false, error: "invalid_start_seconds" };
  }

  return {
    ok: true,
    data: {
      planId: str(b.planId, 20),
      names: str(b.names, MAX_SHORT_LEN),
      message: str(b.message, MAX_TEXT_LEN),
      since: str(b.since, 20),
      themeId: str(b.themeId, 40),
      title: str(b.title, MAX_SHORT_LEN),
      openDate: str(b.openDate, 20),
      openImmediately: Boolean(b.openImmediately),
      confettiEffect: Boolean(b.confettiEffect),
      songTitle: str(b.songTitle, MAX_SHORT_LEN),
      songArtist: str(b.songArtist, MAX_SHORT_LEN),
      songThumbnail: str(b.songThumbnail, 512),
      songVideoId: str(b.songVideoId, 20),
      songStartSeconds: Math.floor(startSec),
      musicAddOn: Boolean(b.musicAddOn),
      photos: photos as string[],
      movieTitle: str(b.movieTitle, MAX_SHORT_LEN),
      tagline: str(b.tagline, MAX_SHORT_LEN),
      synopsis: str(b.synopsis, MAX_TEXT_LEN),
      showDateOnPoster: b.showDateOnPoster !== false,
      cinemaMessage: str(b.cinemaMessage, MAX_TEXT_LEN),
      cinemaPhotos: cinemaPhotos as string[],
    },
  };
}

export async function POST(request: Request) {
  // Rate limit: 10 páginas por hora por IP
  const ip = getClientIp(request);
  if (isRateLimited(`pages:${ip}`, 10, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  try {
    const raw = await request.json();
    const validation = validateBody(raw);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const body = validation.data;
    const plan = getPlan(body.planId);

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
  } catch {
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
