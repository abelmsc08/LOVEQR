import { NextResponse } from "next/server";
import MercadoPago, { Payment } from "mercadopago";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

const client = new MercadoPago({ accessToken: process.env.MP_ACCESS_TOKEN! });

// Preços válidos dos planos (em reais)
const VALID_AMOUNTS = new Set([4.9, 7.9, 11.9, 13.9, 19.9, 26.9, 27.9, 34.9]);

export async function POST(request: Request) {
  // Rate limit: 5 pagamentos PIX por hora por IP
  const ip = getClientIp(request);
  if (isRateLimited(`pix:${ip}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { amount, description, email } = body as {
      amount: number;
      description: string;
      email?: string;
    };

    // Valida amount contra valores permitidos (previne pagamentos de R$0,01)
    if (typeof amount !== "number" || !VALID_AMOUNTS.has(amount)) {
      return NextResponse.json({ error: "invalid_amount" }, { status: 400 });
    }

    const payment = new Payment(client);
    const result = await payment.create({
      body: {
        transaction_amount: amount,
        description: typeof description === "string" ? description.slice(0, 200) : "QR Love",
        payment_method_id: "pix",
        payer: {
          email: typeof email === "string" && email.includes("@") ? email.slice(0, 200) : "comprador@qrlove.com.br",
        },
      },
    });

    return NextResponse.json({
      id: result.id,
      status: result.status,
      qr_code: result.point_of_interaction?.transaction_data?.qr_code ?? null,
      qr_code_base64: result.point_of_interaction?.transaction_data?.qr_code_base64 ?? null,
      date_of_expiration: result.date_of_expiration ?? null,
    });
  } catch {
    // Não expõe detalhes do erro do MercadoPago ao cliente
    return NextResponse.json({ error: "pix_error" }, { status: 500 });
  }
}
