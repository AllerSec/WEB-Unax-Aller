import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_PRICE_ID;

    if (!secretKey || !priceId) {
      console.error("Stripe checkout is missing STRIPE_SECRET_KEY or STRIPE_PRICE_ID");
      return NextResponse.json(
        { error: "Stripe no esta configurado" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: "2026-05-27.dahlia",
    });

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
          price: priceId,
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
