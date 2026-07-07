import { NextResponse } from "next/server";
import MercadoPago, { Payment } from "mercadopago";

const client = new MercadoPago({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(request: Request) {
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

    const payment = new Payment(client);
    const result = await payment.create({
      body: {
        transaction_amount: amount,
        token,
        description,
        installments: installments ?? 1,
        payer: {
          email: email || "comprador@qrlove.com.br",
          identification: identificationType && identificationNumber
            ? { type: identificationType, number: identificationNumber }
            : undefined,
        },
      },
    });

    return NextResponse.json({
      id: result.id,
      status: result.status,
      status_detail: result.status_detail,
    });
  } catch (err: unknown) {
    console.error("[api/payment/card]", err);
    const detail = (err as { message?: string })?.message ?? "card_error";
    return NextResponse.json({ error: "card_error", detail }, { status: 500 });
  }
}
