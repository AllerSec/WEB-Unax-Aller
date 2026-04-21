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
