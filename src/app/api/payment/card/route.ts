import { NextResponse } from "next/server";
import MercadoPago, { Payment } from "mercadopago";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

const client = new MercadoPago({ accessToken: process.env.MP_ACCESS_TOKEN! });

// Preços válidos dos planos (em reais)
const VALID_AMOUNTS = new Set([4.9, 7.9, 11.9, 13.9, 19.9, 26.9, 27.9, 34.9]);

export async function POST(request: Request) {
  // Rate limit: 5 tentativas de cartão por hora por IP
  const ip = getClientIp(request);
  if (isRateLimited(`card:${ip}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const {
      token,
      amount,
      description,
      email,
      installments,
      identificationType,
      identificationNumber,
    } = body as {
      token: string;
      amount: number;
      description: string;
      email?: string;
      installments?: number;
      identificationType?: string;
      identificationNumber?: string;
    };

    if (!token || typeof token !== "string" || token.length > 100) {
      return NextResponse.json({ error: "invalid_token" }, { status: 400 });
    }

    if (typeof amount !== "number" || !VALID_AMOUNTS.has(amount)) {
      return NextResponse.json({ error: "invalid_amount" }, { status: 400 });
    }

    const payment = new Payment(client);
    const result = await payment.create({
      body: {
        transaction_amount: amount,
        token,
        description: typeof description === "string" ? description.slice(0, 200) : "QR Love",
        installments: typeof installments === "number" && installments >= 1 && installments <= 12 ? installments : 1,
        payer: {
          email: typeof email === "string" && email.includes("@") ? email.slice(0, 200) : "comprador@qrlove.com.br",
          identification: identificationType && identificationNumber
            ? {
                type: String(identificationType).slice(0, 10),
                number: String(identificationNumber).slice(0, 20),
              }
            : undefined,
        },
      },
    });

    return NextResponse.json({
      id: result.id,
      status: result.status,
      status_detail: result.status_detail,
    });
  } catch {
    // Não expõe mensagens de erro do MercadoPago ao cliente
    return NextResponse.json({ error: "card_error" }, { status: 500 });
  }
}
