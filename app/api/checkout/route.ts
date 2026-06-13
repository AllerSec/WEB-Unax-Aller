import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const oneOffPriceId = process.env.STRIPE_PRICE_ONEOFF;
    const maintenancePriceId = process.env.STRIPE_PRICE_MAINTENANCE;

    if (!secretKey || !oneOffPriceId || !maintenancePriceId) {
      console.error(
        "Stripe checkout is missing STRIPE_SECRET_KEY, STRIPE_PRICE_ONEOFF or STRIPE_PRICE_MAINTENANCE"
      );
      return NextResponse.json(
        { error: "Stripe no esta configurado" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: "2026-05-27.dahlia",
    });

    const body = await req.json();
    const { businessName, address, sector, email, phone, locale } = body;

    if (!businessName || !email || !phone) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://unaxaller.com";
    const lang = locale === "en" ? "en" : locale === "eu" ? "es" : "es";
    const stripeLocale = locale === "en" ? "en" : "es";

    const metadata = {
      businessName,
      address: address ?? "",
      sector: sector ?? "",
      phone,
      locale: lang,
    };

    // First maintenance charge starts in ~12 months (first year included).
    const oneYearFromNow = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;

    // Single-plan model:
    //   · 1.573€ (IVA incluido) charged NOW — a one-time price in line_items. It
    //     bills on the subscription's first invoice, created at checkout.
    //   · 726€/year maintenance (IVA incl.) subscription whose first charge is
    //     deferred to +12 months via billing_cycle_anchor. proration_behavior:
    //     "none" means the subscription adds nothing to today's invoice, so the
    //     first year of maintenance is effectively free.
    //   · We do NOT use a trial: a trial would defer the one-time fee too, and
    //     we want the development fee collected today.
    //   · The IVA (21%) is already inside the price (tax_behavior:"inclusive").
    //     No Stripe Tax: the accountant breaks out the VAT on the invoice.
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        // The development fee (one-time, IVA included), billed today.
        {
          price: oneOffPriceId,
          quantity: 1,
        },
        // The maintenance subscription (first charge in 12 months).
        {
          price: maintenancePriceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        billing_cycle_anchor: oneYearFromNow,
        proration_behavior: "none",
        metadata,
      },
      customer_email: email,
      metadata,
      success_url: `${siteUrl}/${lang}/bienvenido`,
      cancel_url: `${siteUrl}/${lang}/precios`,
      locale: stripeLocale,
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
