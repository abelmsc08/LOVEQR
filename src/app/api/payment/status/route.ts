import { NextResponse } from "next/server";
import MercadoPago, { Payment } from "mercadopago";

const client = new MercadoPago({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "missing_id" }, { status: 400 });

    const payment = new Payment(client);
    const result = await payment.get({ id: Number(id) });

    return NextResponse.json({
      id: result.id,
      status: result.status,
      status_detail: result.status_detail,
    });
  } catch (err) {
    console.error("[api/payment/status]", err);
    return NextResponse.json({ error: "status_error" }, { status: 500 });
  }
}
