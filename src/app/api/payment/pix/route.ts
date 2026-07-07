import { NextResponse } from "next/server";
import MercadoPago, { Payment } from "mercadopago";

const client = new MercadoPago({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, description, email } = body as {
      amount: number;
      description: string;
      email?: string;
    };

    const payment = new Payment(client);
    const result = await payment.create({
      body: {
        transaction_amount: amount,
        description,
        payment_method_id: "pix",
        payer: {
          email: email || "comprador@qrlove.com.br",
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
  } catch (err) {
    console.error("[api/payment/pix]", err);
    return NextResponse.json({ error: "pix_error" }, { status: 500 });
  }
}
