/**
 * Contact form webhook — Unax Aller
 * =================================
 *
 * Receives JSON from app/api/contact/route.ts and delivers an email to the
 * configured inbox. The Apps Script runs under the Google account that
 * deployed it, so MailApp uses that account's daily quota and identity.
 *
 * DEPLOYMENT (one-time):
 *   1. script.google.com → New project, paste this file as Code.gs.
 *   2. Project Settings → Script Properties, add:
 *        TOKEN        = a random string shared with the host (GOOGLE_SCRIPT_TOKEN env var)
 *        TO_EMAIL     = contacto@unaxaller.com  (where the lead arrives)
 *        FROM_NAME    = Web Unax Aller          (sender's display name)
 *        SHEET_ID     = (optional) Spreadsheet ID to log every submission
 *   3. Deploy → New deployment → Web app
 *        Execute as: Me (unaxprgr@gmail.com)
 *        Who has access: Anyone
 *      Copy the resulting /exec URL into your host's environment variables
 *      as GOOGLE_SCRIPT_URL (Netlify → Site configuration → Environment
 *      variables, or whatever your hosting provider calls them).
 *   4. (Optional) Visit /exec?ping=1 in a browser. You should see
 *      {"ok":true,"service":"contact-webhook","version":"2"} — that
 *      confirms the deployment is live without sending any email.
 *
 * INCOMING PAYLOAD (from app/api/contact/route.ts):
 *   { token, name, email, phone, countryCode?, locale?, hp? }
 *
 * SECURITY:
 *   - Shared-secret token in Script Properties; rotated by editing the
 *     property + the matching host env var (no code change needed).
 *   - Honeypot field `hp`: if filled, we 200-OK silently without sending.
 *   - Per-IP throttling lives in the Next.js route, not here.
 *   - Server-side email validation as a second line of defence.
 */

var VERSION = '2';

// ──────────────────────────────────────────────────────────────────────────
// Entry points
// ──────────────────────────────────────────────────────────────────────────

function doGet(e) {
  // Lightweight healthcheck. Hit /exec?ping=1 from a browser to verify the
  // deployment is reachable without consuming MailApp quota.
  if (e && e.parameter && e.parameter.ping) {
    return json_({ ok: true, service: 'contact-webhook', version: VERSION });
  }
  return json_({ ok: false, error: 'Method not allowed' });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ ok: false, error: 'Empty body' });
    }

    var payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return json_({ ok: false, error: 'Invalid JSON' });
    }

    var props = PropertiesService.getScriptProperties();
    var token = props.getProperty('TOKEN');
    if (!token || payload.token !== token) {
      return json_({ ok: false, error: 'Unauthorized' });
    }

    // Honeypot: real users never see/fill `hp`. Bots that scrape forms
    // will. Return 200 OK so the bot thinks it succeeded and stops
    // retrying, but skip the email entirely.
    if (payload.hp) {
      return json_({ ok: true });
    }

    var name = sanitize_(payload.name);
    var email = sanitize_(payload.email);
    var phone = sanitize_(payload.phone);
    var countryCode = sanitize_(payload.countryCode);
    var locale = sanitize_(payload.locale);

    if (!name || !email || !phone) {
      return json_({ ok: false, error: 'Missing required fields' });
    }
    if (!isEmail_(email)) {
      return json_({ ok: false, error: 'Invalid email' });
    }

    var to = props.getProperty('TO_EMAIL') || Session.getEffectiveUser().getEmail();
    var fromName = props.getProperty('FROM_NAME') || 'Web Unax Aller';
    var sheetId = props.getProperty('SHEET_ID');

    var subject = 'Nuevo lead web — ' + name;
    var plain = buildPlainBody_({
      name: name, email: email, phone: phone,
      countryCode: countryCode, locale: locale
    });
    var html = buildHtmlBody_({
      name: name, email: email, phone: phone,
      countryCode: countryCode, locale: locale
    });

    MailApp.sendEmail({
      to: to,
      subject: subject,
      body: plain,
      htmlBody: html,
      replyTo: email,
      name: fromName
    });

    // Optional audit log so we keep a record even if Gmail filters one as
    // spam. The sheet must already exist with these headers in row 1:
    // Timestamp | Name | Email | Phone | Country | Locale | IP
    if (sheetId) {
      try {
        var sheet = SpreadsheetApp.openById(sheetId).getSheets()[0];
        sheet.appendRow([
          new Date(),
          name, email, phone,
          countryCode || '',
          locale || '',
          (e.parameter && e.parameter.ip) || ''
        ]);
      } catch (sheetErr) {
        // Don't fail the request if logging breaks — email already sent.
        console.warn('Sheet log failed: ' + sheetErr.message);
      }
    }

    return json_({ ok: true });

  } catch (err) {
    console.error('contact-webhook error: ' + err.message + '\n' + err.stack);
    return json_({ ok: false, error: 'Internal error' });
  }
}

// ──────────────────────────────────────────────────────────────────────────
// Body builders
// ──────────────────────────────────────────────────────────────────────────

function buildPlainBody_(d) {
  var lines = [
    'Nuevo lead recibido desde unaxaller.com',
    '',
    'Nombre:    ' + d.name,
    'Email:     ' + d.email,
    'WhatsApp:  ' + d.phone
  ];
  if (d.countryCode) lines.push('País:      ' + d.countryCode);
  if (d.locale)      lines.push('Idioma:    ' + d.locale);
  lines.push('');
  lines.push('Responde a este correo y le llegará directamente a ' + d.email + '.');
  return lines.join('\n');
}

function buildHtmlBody_(d) {
  // Self-contained HTML — Gmail strips <style> in <head> but keeps inline
  // styles, so everything is inlined. Looks good on Gmail desktop, mobile,
  // and dark mode (uses neutral colors that survive theme inversion).
  var rows = [
    row_('Nombre', escape_(d.name)),
    row_('Email', '<a href="mailto:' + escape_(d.email) + '" style="color:#0369a1;text-decoration:none;">' + escape_(d.email) + '</a>'),
    row_('WhatsApp', '<a href="https://wa.me/' + d.phone.replace(/\D/g, '') + '" style="color:#16a34a;text-decoration:none;">' + escape_(d.phone) + '</a>')
  ];
  if (d.countryCode) rows.push(row_('País', escape_(d.countryCode)));
  if (d.locale)      rows.push(row_('Idioma', escape_(d.locale)));

  return [
    '<!doctype html><html><body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:24px 16px;">',
      '<tr><td align="center">',
        '<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">',
          '<tr><td style="padding:20px 24px;border-bottom:1px solid #e2e8f0;background:#0f172a;color:#fff;">',
            '<div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.7;">unaxaller.com</div>',
            '<div style="font-size:20px;font-weight:700;margin-top:4px;">Nuevo lead recibido</div>',
          '</td></tr>',
          '<tr><td style="padding:24px;">',
            '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5;">',
              rows.join(''),
            '</table>',
            '<div style="margin-top:24px;padding:14px 16px;background:#f1f5f9;border-radius:8px;font-size:13px;color:#475569;">',
              'Responde a este correo y le llegará directamente a <strong>' + escape_(d.email) + '</strong>.',
            '</div>',
          '</td></tr>',
        '</table>',
      '</td></tr>',
    '</table>',
    '</body></html>'
  ].join('');
}

function row_(label, value) {
  return [
    '<tr>',
      '<td style="padding:8px 0;width:120px;color:#64748b;font-size:13px;vertical-align:top;">' + label + '</td>',
      '<td style="padding:8px 0;color:#0f172a;font-weight:500;">' + value + '</td>',
    '</tr>'
  ].join('');
}

// ──────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function sanitize_(v) {
  if (v === undefined || v === null) return '';
  return String(v).trim().slice(0, 500);
}

function isEmail_(v) {
  // Pragmatic regex — same shape as the Next.js side. Full RFC 5322 is
  // overkill; we just want to reject obvious garbage.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function escape_(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ──────────────────────────────────────────────────────────────────────────
// Manual test — run from the Apps Script editor to verify setup
// ──────────────────────────────────────────────────────────────────────────

function testSendEmail() {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('TOKEN');
  if (!token) {
    throw new Error('Set TOKEN in Project Settings → Script Properties first.');
  }
  var fake = {
    postData: {
      contents: JSON.stringify({
        token: token,
        name: 'Test (testSendEmail)',
        email: Session.getEffectiveUser().getEmail(),
        phone: '+34 600 000 000',
        countryCode: 'ES',
        locale: 'es'
      })
    }
  };
  var res = doPost(fake);
  console.log(res.getContent());
}
