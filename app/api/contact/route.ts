import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const limit = 3;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { name, email, phone, countryCode, locale } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const phoneDigits = String(phone).replace(/\D/g, "");
    if (phoneDigits.length < 6 || phoneDigits.length > 15) {
      return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
    }

    const to = "contacto@unaxaller.com";
    const subject = `Nueva solicitud de información — ${name}`;
    const text = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      `WhatsApp: ${phone}`,
      countryCode ? `País: ${countryCode}` : null,
      locale ? `Idioma: ${locale}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const mailtoBody = encodeURIComponent(text);
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

    // Send via Google Apps Script if configured
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    const scriptToken = process.env.GOOGLE_SCRIPT_TOKEN;
    if (scriptUrl) {
      if (!scriptToken) {
        console.error("GOOGLE_SCRIPT_TOKEN not configured");
        return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
      }
      const scriptBody = JSON.stringify({
        token: scriptToken,
        name,
        email,
        phone,
        countryCode,
        locale,
      });
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      let scriptRes!: Response;
      try {
        scriptRes = await fetch(scriptUrl, {
          signal: controller.signal,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(scriptBody).toString(),
          },
          body: scriptBody,
          redirect: "follow",
        });
      } finally {
        clearTimeout(timeoutId);
      }
      let scriptData: { ok?: boolean } = {};
      try {
        scriptData = await scriptRes.json();
      } catch {
        // non-JSON response
      }
      if (!scriptRes.ok || !scriptData.ok) {
        console.error("Google Script error:", scriptRes.status);
        return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }

    // Send via Resend if RESEND_API_KEY is configured
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "contacto@unaxaller.com",
          to,
          subject,
          text,
          reply_to: email,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Resend error:", err);
        return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
      }

      return NextResponse.json({ ok: true });
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[contact form]", { name, email, phone, countryCode, locale });
    }

    return NextResponse.json({ ok: true, mailtoLink });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
