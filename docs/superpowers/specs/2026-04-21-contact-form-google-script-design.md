# Contact Form → Google Apps Script Integration

**Date:** 2026-04-21  
**Status:** Approved

## Goal

When a user submits the contact form, an email arrives at `unaxprgr@gmail.com`. The delivery path is: Next.js API route → Google Apps Script webhook → Gmail. No paid email services required.

## Architecture

```
ContactForm (client)
    │ POST /api/contact  (JSON body)
    ▼
app/api/contact/route.ts
    │ POST { token, name, email, company, budget, message }
    ▼
Google Apps Script webapp (doPost)
    │ MailApp.sendEmail()
    ▼
unaxprgr@gmail.com
```

## Components

### 1. Google Apps Script

A new Apps Script project deployed as a public webapp (execute as owner, access: anyone).

- `doPost(e)` parses `e.postData.contents` as JSON
- Checks `payload.token === scriptToken` where `scriptToken` is stored in Script Properties (not hardcoded)
- If token mismatch → returns JSON `{ ok: false, error: "Unauthorized" }` with no email sent
- If valid → calls `MailApp.sendEmail({ to, subject, body, replyTo })` and returns `{ ok: true }`
- Subject format: `Nuevo contacto de {name} ({company})` — company omitted if empty
- Body: plain text with all fields, one per line

### 2. `app/api/contact/route.ts` (modification)

Minimal change — add one new branch after validation, before the existing Resend block:

```
if (process.env.GOOGLE_SCRIPT_URL) {
  // POST to Apps Script with token + form data
  // On non-ok response → return 502
  // On ok → return 200
}
// existing Resend block unchanged below
```

Priority: Google Script runs if `GOOGLE_SCRIPT_URL` is set. Resend runs if `RESEND_API_KEY` is set and `GOOGLE_SCRIPT_URL` is not. Dev fallback (console.log) if neither is set.

### 3. Environment Variables (Netlify)

| Variable | Value |
|---|---|
| `GOOGLE_SCRIPT_URL` | Full deployment URL of the Apps Script webapp |
| `GOOGLE_SCRIPT_TOKEN` | A random secret string, e.g. 32-char hex |

The same token must be set in Apps Script Properties under the key `TOKEN`.

## Security

- Token travels in the POST body (not in the URL, not in headers)
- Apps Script returns 200 regardless of auth failure (to avoid leaking info), but the JSON body contains `ok: false` — the API route treats any non-`ok` response as an error
- Existing rate limit (3 req/min per IP) on the API route remains unchanged
- No changes to the frontend — error handling already in place via `status === "error"` state

## Error Handling

| Scenario | Behavior |
|---|---|
| Script returns non-ok JSON | API route returns 502, form shows error message |
| fetch to script throws (network) | API route catches, returns 502 |
| Token mismatch | Script returns `{ ok: false }`, treated as 502 |
| Missing env vars (dev) | Falls through to console.log, returns 200 |

## Out of Scope

- HTML email formatting (plain text is sufficient)
- Saving submissions to a Google Sheet (not requested)
- Email confirmation to the sender (not requested)
