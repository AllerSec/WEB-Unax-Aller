# Contact Form → Google Apps Script Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Conectar el formulario de contacto con Google Apps Script para recibir emails en unaxprgr@gmail.com sin servicios de pago.

**Architecture:** El API route Next.js `/api/contact` reenvía los datos del formulario a un webhook de Google Apps Script usando un token secreto. El script verifica el token y usa `MailApp.sendEmail()` para enviar el correo. Si `GOOGLE_SCRIPT_URL` no está configurado, el comportamiento actual (log en consola / Resend) se mantiene sin cambios.

**Tech Stack:** Google Apps Script (JavaScript), Next.js API Route (TypeScript), variables de entorno en Netlify.

---

### Task 1: Crear el Google Apps Script

**Files:**
- Create: `scripts/contact-webhook.gs` (copia de referencia local del código del script)

Este task es mayormente manual — el script vive en Google, no en el repo. El archivo `.gs` se guarda como referencia.

- [ ] **Step 1: Ir a script.google.com y crear un nuevo proyecto**

  Ve a https://script.google.com → "Nuevo proyecto" → renómbralo a `contacto-unaxaller`.

- [ ] **Step 2: Pegar el código del script**

  Borra el contenido por defecto y pega exactamente esto:

  ```javascript
  function doPost(e) {
    try {
      var payload = JSON.parse(e.postData.contents);
      var props = PropertiesService.getScriptProperties();
      var token = props.getProperty('TOKEN');

      if (!token || payload.token !== token) {
        return ContentService
          .createTextOutput(JSON.stringify({ ok: false, error: 'Unauthorized' }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      var name = payload.name || '';
      var email = payload.email || '';
      var company = payload.company || '';
      var budget = payload.budget || '';
      var message = payload.message || '';

      var subject = 'Nuevo contacto de ' + name + (company ? ' (' + company + ')' : '');
      var body = [
        'Nombre: ' + name,
        'Email: ' + email,
        company ? 'Empresa: ' + company : null,
        budget ? 'Presupuesto: ' + budget : null,
        '',
        'Mensaje:',
        message
      ].filter(Boolean).join('\n');

      MailApp.sendEmail({
        to: 'unaxprgr@gmail.com',
        subject: subject,
        body: body,
        replyTo: email
      });

      return ContentService
        .createTextOutput(JSON.stringify({ ok: true }))
        .setMimeType(ContentService.MimeType.JSON);

    } catch (err) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  ```

- [ ] **Step 3: Configurar el token en Script Properties**

  En el editor de Apps Script: menú "Proyecto" (icono engranaje) → "Propiedades del script" → pestaña "Propiedades de script" → "Añadir propiedad":
  - Clave: `TOKEN`
  - Valor: un string aleatorio seguro, por ejemplo genera uno con este comando en terminal: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
  
  Guarda el valor generado — lo necesitarás en el Step 4 y en Netlify.

- [ ] **Step 4: Desplegar como webapp**

  En el editor: "Implementar" → "Nueva implementación" → tipo "Aplicación web":
  - Ejecutar como: **Yo** (tu cuenta de Google)
  - Quién tiene acceso: **Cualquier usuario**
  - Haz clic en "Implementar" → autoriza los permisos que pide (Gmail, etc.)
  - Copia la **URL de implementación** — empieza por `https://script.google.com/macros/s/...`

- [ ] **Step 5: Guardar el código de referencia en el repo**

  Crea el archivo `scripts/contact-webhook.gs` con el mismo código del Step 2 (es solo referencia, no se ejecuta desde aquí):

  ```bash
  mkdir -p scripts
  ```

  El contenido del archivo es exactamente el código del Step 2.

- [ ] **Step 6: Commit**

  ```bash
  git add scripts/contact-webhook.gs
  git commit -m "docs: añadir código de referencia del Google Apps Script"
  ```

---

### Task 2: Modificar el API route para usar Google Apps Script

**Files:**
- Modify: `app/api/contact/route.ts`

- [ ] **Step 1: Localizar el punto de inserción**

  Abre `app/api/contact/route.ts`. El bloque a modificar empieza en la línea ~63, justo donde dice:
  ```typescript
  // Send via Resend if RESEND_API_KEY is configured
  const resendKey = process.env.RESEND_API_KEY;
  ```

  Vamos a añadir el bloque de Google Script **antes** de ese comentario.

- [ ] **Step 2: Insertar el bloque de Google Apps Script**

  Reemplaza este fragmento:

  ```typescript
    // Send via Resend if RESEND_API_KEY is configured
    const resendKey = process.env.RESEND_API_KEY;
  ```

  Por este:

  ```typescript
    // Send via Google Apps Script if configured
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    const scriptToken = process.env.GOOGLE_SCRIPT_TOKEN;
    if (scriptUrl) {
      const scriptRes = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: scriptToken ?? "", name, email, company, budget, message }),
      });
      let scriptData: { ok?: boolean } = {};
      try {
        scriptData = await scriptRes.json();
      } catch {
        // non-JSON response
      }
      if (!scriptRes.ok || !scriptData.ok) {
        console.error("Google Script error:", scriptRes.status, scriptData);
        return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }

    // Send via Resend if RESEND_API_KEY is configured
    const resendKey = process.env.RESEND_API_KEY;
  ```

- [ ] **Step 3: Verificar que el archivo compila sin errores**

  ```bash
  npx tsc --noEmit
  ```

  Expected: sin errores (o solo los mismos que había antes de este cambio).

- [ ] **Step 4: Commit**

  ```bash
  git add app/api/contact/route.ts
  git commit -m "feat: conectar formulario de contacto con Google Apps Script"
  ```

---

### Task 3: Configurar variables de entorno en Netlify

Este task es manual — no hay código que escribir.

- [ ] **Step 1: Abrir Netlify**

  Ve a tu site en Netlify → "Site configuration" → "Environment variables".

- [ ] **Step 2: Añadir las variables**

  Añade estas dos variables:

  | Key | Value |
  |---|---|
  | `GOOGLE_SCRIPT_URL` | La URL de implementación copiada en Task 1 Step 4 |
  | `GOOGLE_SCRIPT_TOKEN` | El token generado en Task 1 Step 3 |

- [ ] **Step 3: Hacer redeploy**

  Netlify → "Deploys" → "Trigger deploy" → "Deploy site".
  
  Espera a que el deploy termine (estado "Published").

---

### Task 4: Verificar end-to-end

- [ ] **Step 1: Enviar un mensaje de prueba desde el formulario**

  Ve a la página de contacto en producción (`https://unaxaller.com/es/contacto` o similar), rellena el formulario con datos reales y envíalo.

- [ ] **Step 2: Verificar que llega el email**

  Comprueba `unaxprgr@gmail.com` — debe llegar un email con:
  - Asunto: `Nuevo contacto de [nombre]`
  - Cuerpo con todos los campos rellenados
  - Reply-to: el email introducido en el formulario

- [ ] **Step 3: Verificar que el formulario muestra "¡Mensaje enviado!"**

  El frontend debe transicionar al estado de éxito (pantalla verde con check).

- [ ] **Step 4: (Opcional) Verificar rechazo de token inválido**

  En las Apps Script Properties, cambia temporalmente el TOKEN a algo distinto, haz redeploy de Netlify, envía el formulario → debe aparecer el mensaje de error rojo. Restaura el token correcto después.
