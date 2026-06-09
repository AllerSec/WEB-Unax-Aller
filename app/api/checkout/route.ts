import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessName, address, sector, email, phone } = body;

    if (!businessName || !email || !phone) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://unaxaller.com";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 30,
        metadata: {
          businessName,
          address: address ?? "",
          sector: sector ?? "",
          phone,
        },
      },
      customer_email: email,
      metadata: {
        businessName,
        address: address ?? "",
        sector: sector ?? "",
        phone,
      },
      success_url: `${siteUrl}/es/bienvenido`,
      cancel_url: `${siteUrl}/es/precios`,
      locale: "es",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Error al crear la sesión de pago" },
      { status: 500 }
    );
  }
}
