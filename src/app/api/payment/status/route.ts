import { NextResponse } from "next/server";
import MercadoPago, { Payment } from "mercadopago";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

const client = new MercadoPago({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function GET(request: Request) {
  // Rate limit: 60 consultas por minuto por IP (permite polling razoável)
  const ip = getClientIp(request);
  if (isRateLimited(`payment-status:${ip}`, 60, 60 * 1000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "missing_id" }, { status: 400 });

    // Valida que o ID é numérico e positivo
    const numId = Number(id);
    if (!Number.isInteger(numId) || numId <= 0) {
      return NextResponse.json({ error: "invalid_id" }, { status: 400 });
    }

    const payment = new Payment(client);
    const result = await payment.get({ id: numId });

    return NextResponse.json({
      id: result.id,
      status: result.status,
      status_detail: result.status_detail,
    });
  } catch {
    return NextResponse.json({ error: "status_error" }, { status: 500 });
  }
}
