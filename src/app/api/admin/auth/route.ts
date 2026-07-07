import { NextResponse } from "next/server";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

// 5 tentativas por 15 minutos por IP
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(`admin-auth:${ip}`, MAX_ATTEMPTS, WINDOW_MS)) {
    return NextResponse.json(
      { error: "too_many_attempts" },
      { status: 429 }
    );
  }

  try {
    const { password } = (await request.json()) as { password?: string };
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      // Variável não configurada — bloqueia acesso
      return NextResponse.json({ error: "unavailable" }, { status: 503 });
    }

    if (!password || password !== adminPassword) {
      return NextResponse.json({ error: "invalid_password" }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
}
