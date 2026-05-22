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
    const { name, email, phone, countryCode, locale, hp } = body;

    // Honeypot: real form fields hp stays empty. Spambots that scrape the
    // DOM will fill every field they find. Accept silently so the bot
    // thinks it worked and stops retrying.
    if (typeof hp === "string" && hp.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

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
    const subject = `Nuevo lead web — ${name}`;
    const text = buildPlainBody({ name, email, phone, countryCode, locale });
    const html = buildHtmlBody({ name, email, phone, countryCode, locale });

    const mailtoBody = encodeURIComponent(text);
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

    // Primary path: Google Apps Script webhook. The script owns its own
    // HTML email template (scripts/contact-webhook.gs), so we just forward
    // the raw fields and the token; it does the rendering and the actual
    // MailApp.sendEmail() call.
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
        ip,
      });

      // Apps Script Web Apps respond to a doPost with a 302 redirect to
      // script.googleusercontent.com — and that second hop MUST be a GET.
      // Undici (Node fetch) honors that on `redirect: "follow"` for 303 but
      // can mis-handle 302+POST inside serverless runtimes, surfacing as a
      // Google 411 "Length Required" error. So we drive the two hops by
      // hand: POST without following, read the Location header, then GET.
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      let scriptData: { ok?: boolean; error?: string } = {};
      let finalStatus = 0;
      try {
        const postRes = await fetch(scriptUrl, {
          signal: controller.signal,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: scriptBody,
          redirect: "manual",
        });

        // 302 with a Location header → follow as GET. Anything else
        // (200, error, no redirect at all) is treated as the final response.
        if (postRes.status === 302 || postRes.status === 301) {
          const location = postRes.headers.get("location");
          if (!location) {
            throw new Error("Apps Script redirect missing Location header");
          }
          const getRes = await fetch(location, {
            signal: controller.signal,
            method: "GET",
            redirect: "follow",
          });
          finalStatus = getRes.status;
          try {
            scriptData = await getRes.json();
          } catch {
            // Apps Script always returns JSON on success; if we can't parse
            // it the call failed somewhere.
          }
        } else {
          finalStatus = postRes.status;
          try {
            scriptData = await postRes.json();
          } catch {
            // non-JSON response
          }
        }
      } finally {
        clearTimeout(timeoutId);
      }

      if (finalStatus < 200 || finalStatus >= 300 || !scriptData.ok) {
        console.error("Google Script error:", {
          status: finalStatus,
          response: scriptData,
        });
        return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }

    // Optional fallback: Resend. Only used if no GOOGLE_SCRIPT_URL is
    // configured. Renders the same HTML body locally because Resend
    // doesn't have access to the Apps Script template.
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Web Unax Aller <contacto@unaxaller.com>",
          to,
          subject,
          text,
          html,
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

// ── Email body builders ───────────────────────────────────────────────────

type Lead = {
  name: string;
  email: string;
  phone: string;
  countryCode?: string;
  locale?: string;
};

function buildPlainBody(d: Lead): string {
  const lines = [
    "Nuevo lead recibido desde unaxaller.com",
    "",
    `Nombre:    ${d.name}`,
    `Email:     ${d.email}`,
    `WhatsApp:  ${d.phone}`,
  ];
  if (d.countryCode) lines.push(`País:      ${d.countryCode}`);
  if (d.locale) lines.push(`Idioma:    ${d.locale}`);
  lines.push("", `Responde a este correo y le llegará directamente a ${d.email}.`);
  return lines.join("\n");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtmlBody(d: Lead): string {
  // Self-contained HTML email. Inline styles only — Gmail strips <style>
  // tags in <head>. Dark-mode safe via neutral colors that survive
  // theme inversion.
  const row = (label: string, value: string) =>
    `<tr>
       <td style="padding:8px 0;width:120px;color:#64748b;font-size:13px;vertical-align:top;">${label}</td>
       <td style="padding:8px 0;color:#0f172a;font-weight:500;">${value}</td>
     </tr>`;

  const phoneDigits = d.phone.replace(/\D/g, "");
  const rows = [
    row("Nombre", escapeHtml(d.name)),
    row(
      "Email",
      `<a href="mailto:${escapeHtml(d.email)}" style="color:#0369a1;text-decoration:none;">${escapeHtml(d.email)}</a>`
    ),
    row(
      "WhatsApp",
      `<a href="https://wa.me/${phoneDigits}" style="color:#16a34a;text-decoration:none;">${escapeHtml(d.phone)}</a>`
    ),
  ];
  if (d.countryCode) rows.push(row("País", escapeHtml(d.countryCode)));
  if (d.locale) rows.push(row("Idioma", escapeHtml(d.locale)));

  return `<!doctype html><html><body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:24px 16px;">
  <tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
      <tr><td style="padding:20px 24px;border-bottom:1px solid #e2e8f0;background:#0f172a;color:#fff;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.7;">unaxaller.com</div>
        <div style="font-size:20px;font-weight:700;margin-top:4px;">Nuevo lead recibido</div>
      </td></tr>
      <tr><td style="padding:24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5;">
          ${rows.join("")}
        </table>
        <div style="margin-top:24px;padding:14px 16px;background:#f1f5f9;border-radius:8px;font-size:13px;color:#475569;">
          Responde a este correo y le llegará directamente a <strong>${escapeHtml(d.email)}</strong>.
        </div>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}
