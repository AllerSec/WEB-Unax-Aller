// lib/data/blog-posts.ts
export interface BlogPostFaq {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  titles: Record<"es" | "en" | "eu", string>;
  descriptions: Record<"es" | "en" | "eu", string>;
  content: Record<"es" | "en" | "eu", string>;
  tags: string[];
  keywords: Record<"es" | "en" | "eu", string[]>;
  faq?: Partial<Record<"es" | "en" | "eu", BlogPostFaq[]>>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "google-analytics-no-te-hace-falta",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 4,
    titles: {
      es: "Google Analytics no te hace falta (y quizá te está ralentizando)",
      en: "You don't need Google Analytics (and it might be slowing you down)",
      eu: "Ez duzu Google Analytics behar (eta agian zure weba moteltzen ari da)",
    },
    descriptions: {
      es: "Por qué GA4 es un cañonazo para cazar una mosca en la mayoría de webs pequeñas, qué problemas tiene y qué alternativas gratis usar en 2026.",
      en: "Why GA4 is overkill for most small websites, what problems it brings and which free alternatives to use in 2026.",
      eu: "Zergatik GA4 gehiegizkoa den web txiki gehienetan, zer arazo dituen eta 2026an zein alternatiba doan erabili.",
    },
    content: {
      es: `Iba a ponerle Google Analytics a todos mis clientes por defecto. De hecho, esta misma semana tocaba empezar con ello. Y entonces me senté a revisar si realmente tenía sentido en cada caso, porque había leído cosas raras sobre GA4 y el RGPD. Te cuento a qué conclusión he llegado.

![Panel de analítica con gráficos en una pantalla](https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200)

## El problema no es que GA4 sea malo

Lo es que, para la mayoría de webs de negocio pequeño, es un cañonazo para cazar una mosca. Y encima trae líos propios:

**Dudas legales con el RGPD.** Varias autoridades de protección de datos en Europa (Francia, Austria, Italia) han avisado de que usar GA sin medidas extra viola el reglamento, porque los datos vuelan a servidores de Google en EE.UU. Para dejarlo limpio necesitas banner de cookies bien montado, consentimiento explícito y a veces un proxy. Más trabajo para el cliente.

**Ralentiza la web.** El script pesa y dispara peticiones. En una web bien hecha en Next.js, que debería ir como un cohete, GA4 es de lo más pesado que le añades. Y la velocidad es uno de los factores que Google mira para posicionar. O sea, le metes un script de Google que te penaliza en Google.

**El panel es un caos para alguien normal.** Si tu cliente abre GA4 buscando "cuánta gente ha visto mi web", se pierde entre informes, exploraciones y dimensiones. Muchos entran dos veces y no vuelven nunca más.

## Qué necesita saber de verdad un negocio pequeño

Mira, al final casi ninguno de mis clientes necesita saber más que esto:

- Cuántas visitas ha tenido la web este mes
- De dónde vienen (Google, redes, directo, otra web)
- Qué páginas se ven más
- Cuántos rellenan el formulario de contacto

Para eso no hace falta montar una astronave. De hecho, cuanto más simple, más probable es que el dueño lo abra de vez en cuando.

## Alternativas que sí tienen sentido

**Cloudflare Web Analytics:** gratis, sin cookies, sin banner. Se activa desde el panel de Cloudflare si ya usas su CDN. Datos básicos pero suficientes.

**Umami:** gratis si lo auto-alojas, o plan barato en la nube. Panel minimalista, RGPD-friendly, se entiende a la primera.

**Plausible:** de pago (unos 9€/mes para varias webs). Más bonito, reportes por email, soporte atento. Para quien quiere algo serio sin pagar los precios de GA360.

## Cómo lo veo yo según el tipo de cliente

Depende mucho del negocio. Un restaurante pequeño en Irun sí le interesa saber si la web le está llegando gente. En cambio, una empresa de ingeniería con la que he trabajado tiene la web más como carta de presentación, olvidada: no le hace falta analítica, y se lo digo.

Pregunto siempre antes de entregar. Si el cliente quiere ver los datos él mismo, se lo monto, dejo el panel listo y le enseño a mirarlo en cinco minutos. Supone esfuerzo extra, claro, así que cobro un pequeño suplemento (nada caro, pero algo), porque el tiempo es tiempo.

Para un negocio pequeño, directo a lo gratis y fácil. Si ya hablamos de una empresa más grande que necesite algo más completo y bonito, entonces sí miramos Plausible u otra cosa de pago. Pero la regla por defecto: simple, sin coste para el cliente, sin complicaciones.

## Mi consejo si ya tienes Google Analytics puesto

Quítalo. Ya. Te está restando velocidad a la web y eso se nota en el posicionamiento, que al final es lo importante. Si necesitas saber de tus visitas, pon cualquiera de los otros, que valen perfectamente para lo que haces. Pero Google, ese Google, fuera.`,
      en: `I was about to put Google Analytics on all my clients' websites by default. This week I was going to start. Then I sat down to check if it actually made sense in each case, because I'd been reading weird things about GA4 and GDPR. Here's where I landed.

![Analytics dashboard with charts on a screen](https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200)

## The problem isn't that GA4 is bad

It's that for most small-business websites, it's overkill. And it brings its own mess:

**GDPR concerns.** Several European data protection authorities (France, Austria, Italy) have warned that using GA without extra measures breaks the regulation, because data flies to Google servers in the US. To run it cleanly you need a proper cookie banner, explicit consent and sometimes a proxy. More work for the client.

**It slows the site.** The script is heavy and fires off requests. On a well-built Next.js site, which should fly, GA4 is one of the heaviest things you can add. And speed is one of the factors Google uses to rank. So you add a Google script that penalises you on Google.

**The dashboard is a mess for a normal person.** If your client opens GA4 looking for "how many people saw my site", they get lost in reports, explorations and dimensions. Many open it twice and never come back.

## What a small business actually needs to know

Honestly, almost none of my clients need more than this:

- How many visits this month
- Where they come from (Google, social, direct, other sites)
- Which pages get seen most
- How many fill in the contact form

You don't need a spaceship for that. In fact, the simpler it is, the more likely the owner will actually open it.

## Alternatives that make sense

**Cloudflare Web Analytics:** free, no cookies, no banner. Switch it on from the Cloudflare dashboard if you already use their CDN. Basic but solid data.

**Umami:** free if you self-host, or cheap in the cloud. Minimalist dashboard, GDPR-friendly, understandable at a glance.

**Plausible:** paid (about €9/month for several sites). Nicer looking, email reports, attentive support. For anyone who wants something serious without paying GA360 prices.

## How I see it depending on the client

It depends a lot on the business. A small restaurant in Irun does want to know if the site is bringing in people. On the other hand, an engineering company I've worked with has its site more as a business card, forgotten: no need for analytics, and I tell them straight.

I always ask before delivery. If the client wants to see the data themselves, I set it up, leave the dashboard ready and show them how to read it in five minutes. That's extra effort, so I charge a small fee (nothing pricey, but something), because time is time.

For a small business, straight to free and easy. For a larger company that needs something more complete and polished, then yes, we look at Plausible or another paid option. But the default rule: simple, no cost for the client, no complications.

## My advice if you already have Google Analytics installed

Remove it. Now. It's costing your site speed and that shows up in rankings, which is what ultimately matters. If you need to know about your visits, put any of the others: they work just fine for what you do. But Google, that Google, out.`,
      eu: `Nire bezero guztiei Google Analytics jartzera nindoan, defektuz. Aste honetan bertan hasi behar nuen. Orduan kasu bakoitzean benetan zentzua zuen berrikustera jarri nintzen, GA4 eta DBEOari buruz gauza arraroak irakurri nituelako. Hona hemen iritsi naizen ondorioa.

![Analitika panela grafikoekin pantaila batean](https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200)

## Arazoa ez da GA4 txarra denik

Arazoa da, negozio txikiko web gehienetan, gehiegizkoa dela. Eta bere nahaspilak ekartzen ditu:

**DBEOarekin zalantzak.** Europako hainbat datu-babes agintariek (Frantzia, Austria, Italia) ohartarazi dute GA neurri gehigarrietan gabe erabiltzeak araudia urratzen duela, datuak Googleren EEBBko zerbitzarietara doazelako. Garbi eramateko, cookie-banner ondo muntatua, baimen esplizitua eta batzuetan proxy bat behar dituzu. Lan gehiago bezeroarentzat.

**Weba moteltzen du.** Script-a astuna da eta eskaerak botatzen ditu. Next.js-en ondo egindako web batean, GA4 gehitzen dituzun astunenetakoa da. Eta abiadura Googlek erabiltzen duen faktoreetako bat da ranking-erako. Hau da, Googlek zigortzen zaituen Google script bat gehitzen duzu.

**Panela kaosa da pertsona arruntarentzat.** Zure bezeroak GA4 ireki eta "zenbat jendek ikusi du nire weba" bilatzen badu, galduta geratzen da txostenen, esplorazioen eta dimentsioen artean. Askok bi aldiz irekitzen dute eta ez dira berriro bueltatzen.

## Negozio txiki batek zer jakin behar duen

Egia esan, nire bezero ia batek ere ez du behar hau baino gehiago:

- Zenbat bisita izan dituen hilabete honetan
- Nondik datozen (Google, sare sozialak, zuzenak, beste web batzuk)
- Zein orrialde ikusten diren gehien
- Zenbat jendek betetzen duen kontaktu formularioa

Horretarako ez duzu astronabea behar. Izan ere, zenbat eta sinpleagoa izan, jabeak noizean behin irekitzeko aukera handiagoa dago.

## Zentzua duten alternatibak

**Cloudflare Web Analytics:** doan, cookie-rik gabe, banner-ik gabe. Cloudflare panelatik pizten da jada haien CDN erabiltzen baduzu.

**Umami:** doan zeuk ostatatzen baduzu, edo merkea hodeian. Panel minimalista, DBEOarekin bat, lehen begiradan ulertzen da.

**Plausible:** ordainpekoa (9€/hilean inguru webgune batzuentzat). Politagoa, emailezko txostenak, arreta handiko laguntza.

## Bezero motaren arabera nola ikusten dudan

Negozioaren araberakoa da. Iruneko jatetxe txiki batek jakin nahi du weba jendea ekartzen ari den. Aldiz, ingeniaritza enpresa batek, nirekin lan egin duen bat, weba aurkezpen-txartel gisa du, ahaztuta: ez du analitikarik behar, eta horrela esaten diot.

Entregatu aurretik beti galdetzen dut. Bezeroak berak datuak ikusi nahi baditu, muntatzen diot, panela prest uzten dut eta bost minututan erakusten diot. Hori lan gehigarria da, beraz, gain-kostu txiki bat kobratzen dut (ez garestia, baina zerbait), denbora denbora delako.

Negozio txikiarentzat, zuzenean doakora eta errazera. Zerbait osoagoa eta politagoa behar duen enpresa handiago batez ari bagara, orduan bai, Plausible edo beste ordainpeko aukera bat begiratzen dugu. Baina defektuzko araua: sinplea, bezeroari kosturik gabe, korapilorik gabe.

## Nire aholkua jada Google Analytics jarrita baduzu

Kendu ezazu. Orain. Abiadura kentzen ari zaio zure webari eta hori ranking-ean nabaritzen da, azken finean garrantzitsuena dena. Zure bisitei buruz jakin behar baduzu, jarri besteren bat: primeran funtzionatzen dute egiten duzunerako. Baina Google, Google hori, kanpora.`,
    },
    tags: ["Google Analytics", "analítica web", "privacidad", "rendimiento web"],
    keywords: {
      es: [
        "alternativas Google Analytics",
        "Plausible vs GA4",
        "analítica web sin cookies",
        "Google Analytics RGPD",
        "Cloudflare Web Analytics",
      ],
      en: [
        "Google Analytics alternatives",
        "Plausible vs GA4",
        "cookieless analytics",
        "Google Analytics GDPR",
        "Cloudflare Web Analytics",
      ],
      eu: [
        "Google Analytics alternatibak",
        "analitika webgune cookie gabe",
        "Plausible analitika",
      ],
    },
    faq: {
      es: [
        {
          q: "¿Es ilegal usar Google Analytics en España?",
          a: "Ilegal no es, pero varias autoridades europeas de protección de datos (Francia, Austria, Italia) han dicho que usar GA4 sin medidas extra vulnera el RGPD. Para usarlo limpio necesitas consentimiento explícito en el banner, configuración avanzada y a veces un proxy. Muchas webs pequeñas no llegan a hacerlo bien y quedan expuestas.",
        },
        {
          q: "¿Qué alternativa gratis recomiendas para un autónomo o comercio pequeño?",
          a: "Cloudflare Web Analytics si ya usas Cloudflare como CDN: se activa en un clic, no requiere banner de cookies y da los datos básicos que necesitas. Si no, Umami (gratis auto-alojado) también funciona muy bien. Ambas cumplen RGPD sin complicaciones y no ralentizan la web.",
        },
        {
          q: "¿Plausible de 9€/mes merece la pena?",
          a: "Para negocios pequeños, no, con lo gratis sobra. Plausible merece la pena si tienes varios sitios, quieres reportes por email, un panel más pulido o simplemente prefieres apoyar herramientas independientes frente a Google. Para una empresa mediana que mira analítica cada semana, es una opción muy decente.",
        },
        {
          q: "Si quito Google Analytics, ¿pierdo datos históricos?",
          a: "Sí. Los datos se quedan en GA4 pero dejas de recoger nuevos desde el momento que quitas el script. Si es un histórico importante, puedes exportar un backup antes. Para la mayoría de pymes el histórico no se usa para nada, así que quitarlo no duele.",
        },
      ],
    },
  },
  {
    slug: "comprar-dominio-sin-pillarte-los-dedos",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 4,
    titles: {
      es: "Comprar un dominio sin pillarte los dedos: guía honesta 2026",
      en: "Buying a domain without getting burned: an honest 2026 guide",
      eu: "Domeinu bat erosi behatzak harrapatu gabe: 2026ko gida zintzoa",
    },
    descriptions: {
      es: "Dónde comprar un dominio sin pagar de más, por qué WordPress.com te infla el precio y qué mirar para que el dominio sea tuyo de verdad.",
      en: "Where to buy a domain without overpaying, why WordPress.com inflates the price and what to check so the domain is really yours.",
      eu: "Non erosi domeinua gehiegi ordaindu gabe, zergatik WordPress.com-ek prezioa puzten duen eta zer begiratu domeinua benetan zurea izan dadin.",
    },
    content: {
      es: `Yo estuve bastante tiempo buscando dónde comprar dominios antes de decidirme. Me encontré de todo: sitios que inflaban el precio hasta hacerlo parecer premium, páginas con "ofertas" del primer año que al segundo te cobraban el triple, y plataformas tipo WordPress.com que te cobran una cuota mensual que multiplica por diez lo que deberías pagar.

![Pantalla con terminal y un teclado mecánico, entorno de desarrollo](https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1200)

## Yo compro en Namecheap y me quedo tranquilo

Los .com los saca por lo mínimo que se puede pagar al año, unos 10€. No te meten productos por defecto en el carrito, la renovación no se dispara al segundo año y el panel es sencillo. Obviamente el precio final depende del dominio (los .io, .ai y los de moda cuestan más), pero para un .com o .es de negocio normal, Namecheap sale bien de precio y sin letra pequeña absurda.

No cobran por nada. Ni soy embajador ni me llevan comisión. Simplemente es lo que uso y lo que recomiendo después de comparar bastante.

## WordPress.com y el truco de la cuota mensual

Aquí hay que parar un momento. WordPress.com (ojo, no es lo mismo que el WordPress que instalas tú en un hosting) te vende un pack que incluye "dominio incluido". Suena bien. El problema es que el dominio va atado a la cuota mensual de la plataforma.

O sea, en vez de pagar 10€/año por tu .com, pagas 15, 25 o 40€/mes por el combo entero. Haz la cuenta. Al año son 180-480€ por algo que con Namecheap y un hosting decente sumarías 60-80€ con creces.

El dominio en sí es el mismo. Lo que encarece es la plataforma, que te hace dependiente y te complica irte cuando quieres.

## Lo que hay que mirar antes de comprar

Tres cosas importan de verdad:

- **Precio del año 2, no solo del año 1:** muchos proveedores te regalan el primer año y luego triplican. Mira la letra pequeña, no solo el banner del descuento
- **Qué te meten sin pedirlo:** privacidad WHOIS, "seguridad premium", paquetes de correo que no necesitas. Revisa el carrito antes de pagar
- **Política de transferencia:** que puedas sacar el dominio a otro proveedor sin pelea cuando quieras. Algunos ponen pegas

## El punto más importante: que el dominio esté a TU nombre

Esto es lo que más me preocupa de toda la conversación de dominios. He tenido la suerte de que los clientes que me llegan de otros informáticos venían bien: con sus accesos, su DNS, su host, su titularidad limpia. Gente que había hecho el relevo profesionalmente.

Pero he oído historias de lo contrario. Agencias o "primos informáticos" que compran el dominio a su nombre, no al del cliente. Y el día que el cliente quiere cambiar de proveedor, el dominio no es suyo. Es un drama absoluto y, si la otra parte se pone cabezona, puede tardar semanas en resolverse.

Regla de oro: **el dominio se compra a tu nombre o al de tu empresa, siempre.** Da igual quién te lo gestione. El titular eres tú, con tu correo y tus datos en el registro. Si alguien te dice "ya lo compro yo y luego te lo paso", pregúntale cómo exactamente, y si no hay respuesta clara, compra tú directamente.

## Resumen rápido

Compra en un sitio barato y honesto (Namecheap, Porkbun, Cloudflare Registrar también está bien). Evita la cuota mensual de plataformas tipo WordPress.com si solo quieres un dominio. Y asegúrate de que el titular eres tú. Con eso, ya te has ahorrado el 95% de los dramas que se pueden montar alrededor de un dominio.`,
      en: `I spent a decent chunk of time looking for where to buy my domains. I came across everything: sites that pumped up prices to look premium, "first year deals" that tripled the second year, and platforms like WordPress.com charging a monthly fee that's ten times what you should actually pay.

![Screen with terminal and a mechanical keyboard, developer setup](https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1200)

## I buy at Namecheap and sleep well

They sell .com domains at close to the minimum, around €10/year. No products sneaked into your cart, renewal doesn't explode in year two and the dashboard is simple. The final price obviously depends on the domain (.io, .ai and trendy TLDs cost more), but for a regular business .com or .es, Namecheap is fair-priced and without absurd fine print.

I don't get a commission. I'm not an ambassador. It's just what I use and recommend after comparing a fair bit.

## WordPress.com and the monthly fee trick

Worth pausing here. WordPress.com (not the same as the WordPress you self-install on a hosting) sells you a pack with "domain included". Sounds nice. The catch is the domain is tied to the platform's monthly fee.

So instead of €10/year for your .com, you pay €15, €25 or €40/month for the whole combo. Do the math. That's €180-480/year for something you could get with Namecheap plus decent hosting for €60-80, easy.

The actual domain is the same. What makes it expensive is the platform, which makes you dependent and hard to leave.

## What to check before buying

Three things really matter:

- **Year 2 price, not just year 1:** many providers gift the first year and then triple it. Read the fine print, not the discount banner
- **What gets added silently:** WHOIS privacy, "premium security", mail packages you don't need. Review the cart before paying
- **Transfer policy:** that you can move the domain to another provider without a fight. Some make it hard

## The most important bit: the domain must be in YOUR name

This is what worries me most about the whole domain conversation. I've been lucky that the clients coming to me from other developers arrived with everything clean: access, DNS, hosting, registrant all in order. Professional handovers.

But I've heard the opposite stories. Agencies or a "cousin who does computers" buying the domain in their own name, not the client's. The day the client wants to switch provider, the domain isn't theirs. It's a full-blown drama and if the other side gets stubborn, it can take weeks to fix.

Golden rule: **the domain goes in your name or your company's, always.** Doesn't matter who manages it for you. The registrant is you, with your email and your details. If someone says "I'll just buy it and pass it to you later", ask exactly how, and if there's no clear answer, buy it yourself.

## Quick summary

Buy at a cheap, honest registrar (Namecheap, Porkbun, Cloudflare Registrar works too). Avoid monthly fees from platforms like WordPress.com if you only want a domain. And make sure you're the registrant. That alone saves you from 95% of the mess that can happen around a domain.`,
      eu: `Denbora dezente eman nuen non domeinuak erosi bilatzen. Gauza mota guztiak aurkitu nituen: prezioak premium itxura emateko puzten zituzten guneak, "lehen urteko eskaintzak" bigarrenean hirukoiztu egiten zirenak, eta WordPress.com bezalako plataformak hilabeteko kuota bat kobratzen dutenak, zure benetako prezioa halako hamar.

![Pantaila terminalekin eta teklatu mekanikoa, garapen ingurunea](https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1200)

## Nik Namecheap-en erosten dut eta lasai

.com domeinuak ordaintzen den gutxienaren inguruan saltzen dituzte, 10€ urteko gutxi gorabehera. Ez dizute ezer ezkutuan sartzen saskian, berritzea ez da bigarren urtean lehertzen eta panela erraza da. Azken prezioa domeinuaren araberakoa da, jakina (.io, .ai eta modako TLDak garestiagoak dira), baina negozio arrunteko .com edo .es baterako, Namecheap prezio egokian dago eta letra txiki absurdurik gabe.

Ez didate komisiorik ematen. Ez naiz enbaxadorea. Erabiltzen dudana eta konparatu ondoren gomendatzen dudana besterik ez da.

## WordPress.com eta hilabeteko kuotaren trukoa

Hemen pixka bat gelditzea komeni da. WordPress.com-ek (ez da zuk ostalaritza batean zuk instalatzen duzun WordPress berdina) "domeinua barne" duen pack bat saltzen dizu. Polita dirudi. Kontua da domeinua plataformaren hileko kuotari lotuta dagoela.

Beraz, .com-agatik 10€/urte ordaindu ordez, 15, 25 edo 40€/hilean ordaintzen duzu paketeagatik. Egin kontuak. Urtean 180-480€ dira, Namecheap-en eta ostalaritza duin batean 60-80€-n egin zenezakeen zerbaitentzat.

Domeinua berdina da. Plataformak garestitu egiten du, eta mendekoa egiten zaitu.

## Zer begiratu erosi aurretik

Hiru gauza dira benetan garrantzitsuak:

- **2. urteko prezioa, ez 1. urtekoa bakarrik:** hornitzaile askok lehen urtea oparitzen dute eta gero hirukoiztu egiten dute
- **Ezkutuan sartzen dizutena:** WHOIS pribatutasuna, "premium segurtasuna", behar ez dituzun posta paketeak. Begiratu saskia ordaindu aurretik
- **Transferentzia politika:** beste hornitzaile batera eraman ahal izatea borrokarik gabe. Batzuek zailtasunak jartzen dituzte

## Garrantzitsuena: domeinuak ZURE izenean egon behar du

Hau da domeinuen gaiaren alderdirik arduratzen nauena gehien. Zortea izan dut: beste informatikari batzuen bidetik datozen bezeroek garbi iritsi dira: sarbideak, DNS, ostalaritza, titulartasun garbia. Profesionalak izan diren ordezkapenak.

Baina aurkakoen istorioak entzun ditut. Agentziek edo "ordenagailuekin dabilen lehengusuak" domeinua beren izenean erosten dute, ez bezeroarenean. Bezeroak hornitzailez aldatu nahi duen egunean, domeinua ez da berea. Benetako drama da.

Urrezko araua: **domeinua zure izenean edo zure enpresarenean erosten da, beti.** Berdin dio nork kudeatzen dizun. Titularra zu zara, zure emailarekin eta zure datuekin. Norbaitek "nik erosten dut eta gero pasatuko dizut" esaten badizu, galdetu nola zehazki. Erantzun argirik ez badago, erosi zuk zuzenean.

## Laburpen azkarra

Erosi hornitzaile merke eta zintzo batean (Namecheap, Porkbun, Cloudflare Registrar ere ondo dago). Saihestu WordPress.com bezalako plataformen hileko kuotak domeinu bat nahi baduzu bakarrik. Eta ziurtatu titularra zu zarela. Horrekin bakarrik, domeinu baten inguruan sor daitezkeen %95 dramatatik libratzen zara.`,
    },
    tags: ["dominio", "Namecheap", "hosting", "comprar dominio"],
    keywords: {
      es: [
        "comprar dominio barato",
        "mejor proveedor dominio 2026",
        "Namecheap vs GoDaddy",
        "WordPress.com dominio",
        "titular del dominio",
      ],
      en: [
        "cheap domain registrar",
        "best domain provider 2026",
        "Namecheap review",
        "WordPress.com domain",
        "domain ownership",
      ],
      eu: [
        "domeinua erosi",
        "Namecheap domeinua",
        "WordPress.com domeinua",
      ],
    },
    faq: {
      es: [
        {
          q: "¿Cuánto debería costarme un dominio .com al año?",
          a: "Alrededor de 10-12€ al año es el precio razonable en 2026. Si te cobran 25€ o más por un .com estándar, estás pagando de más. Los dominios de moda (.io, .ai, .dev) cuestan más, pero un .com o un .es no deberían salir caros en un registrador honesto como Namecheap, Porkbun o Cloudflare Registrar.",
        },
        {
          q: "¿Por qué no comprar el dominio con WordPress.com o con el hosting?",
          a: "Muchas plataformas atan el dominio a una cuota mensual de 15-40€. Al año son 180-480€ por algo que, comprado aparte, te costaría 10€ de dominio más el hosting que necesites. Además, si quieres dejar la plataforma, sacar el dominio puede complicarse. Separa siempre: dominio por un lado, hosting por otro.",
        },
        {
          q: "¿El dominio tiene que estar a mi nombre o al del diseñador?",
          a: "Siempre al tuyo (o al de tu empresa). El titular que figura en el registro del dominio es quien manda. Si lo compra un tercero a su nombre, técnicamente el dominio es suyo. El diseñador puede gestionártelo, tener acceso y configurar DNS, pero el titular legal debes ser tú. No es negociable.",
        },
        {
          q: "¿Qué pasa si quiero cambiar de proveedor de dominio?",
          a: "Se llama transferencia de dominio. Pides un código de autorización (auth code) al registrador actual, lo introduces en el nuevo y el dominio se mueve en unos días. Por eso importa tener los accesos y que el titular seas tú: sin eso, la transferencia no se puede iniciar.",
        },
      ],
    },
  },
  {
    slug: "wordpress-no-es-gratis-lo-que-no-te-cuentan",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 4,
    titles: {
      es: "WordPress gratis: el mito que te va a costar caro",
      en: "WordPress is free: the myth that will cost you dear",
      eu: "WordPress doan: garesti aterako zaizun mitoa",
    },
    descriptions: {
      es: "WordPress gratis suena bonito hasta que falta el aviso legal, la cookie policy y el texto se lee fatal. Lo que no te cuentan del DIY.",
      en: "Free WordPress sounds great until there's no legal notice, no cookie policy and the text is unreadable. The DIY truth no one tells you.",
      eu: "WordPress doan polita dirudi lege-oharra eta cookie politika falta direnera arte. DIY-ari buruz esaten ez dizutena.",
    },
    content: {
      es: `Estoy ahora mismo desarrollándole una web a un cliente que venía de un WordPress hecho fatal. Muy, muy mal hecho. Y en el momento que le miré la web por encima, ya tenía la conversación ganada. No por vender humo, sino porque lo que había no se sostenía.

![Pantalla con código y un portátil sobre una mesa de trabajo](https://images.pexels.com/photos/4792287/pexels-photo-4792287.jpeg?auto=compress&cs=tinysrgb&w=1200)

## Lo que me encontré en esa web

Sin aviso legal. Eso, en España, no es una chapuza: es ilegal. La LSSI obliga a tenerlo y las multas pueden ir de 150€ a 600.000€ según el caso. Y no tenía política de cookies, ni política de privacidad. Con el RGPD encima, esto es jugar a la ruleta rusa con tu propio negocio.

Y ya si hablamos de lo visual: una tipografía imposible de leer, contrastes flojos, y una sensación de web anticuada de hace diez años. El cliente llegaba a su propia web y no se reconocía.

## El mito del "WordPress es gratis"

Claro que es gratis. Como es gratis bajarte un coche de segunda mano en piezas. Luego toca montarlo, y ahí se va el verano.

Con WordPress pagas en otro sitio:
- **Hosting decente:** los 2€/mes no valen, se cae cada dos por tres
- **Plugins premium:** formulario serio, SEO, seguridad, caché... suma fácil 200-400€/año
- **Plantilla decente:** 60-80€ si quieres algo que no sea 2015
- **Tu tiempo:** horas peleándote con actualizaciones que te rompen la web
- **El día que algo falle:** pagar a alguien a toque de urgencia, que sale caro

## Lo que no vas a tener con un WordPress tú mismo

Esto es lo que le repito a todo el que me pregunta. Un WordPress montado por ti, por muy bien que sigas un tutorial de YouTube, no te da lo que te da alguien que está detrás de tu proyecto.

Cuando yo te entrego una web, tú me escribes y me dices "oye, cámbiame esta imagen, este texto, esta fuente, este color". Y se hace. Hoy, si puede ser. Sin plugins que se pelean, sin el editor visual que te rompe el diseño, sin buscar qué child theme tocar.

Ese acompañamiento no viene en el zip de WordPress. Nunca.

## A largo plazo sale muchísimo peor

WordPress se actualiza cada pocas semanas. El core, los plugins, el tema. Y cada actualización es una mini-lotería: a veces todo bien, a veces una página se rompe, a veces se te mete un plugin que ralentiza todo y no sabes cuál.

Al año o dos años de abandonarlo, entras al panel y ya no sabes ni qué tocar. He visto clientes llamándome con el WordPress caído y ni siquiera podíamos entrar al wp-admin porque la contraseña estaba en un post-it que nadie guardó.

Una web hecha a medida con código limpio no tiene 40 piezas móviles. Tiene las que necesitas, nada más.

## ¿Cuándo sí tiene sentido WordPress?

Para no ser injusto: si vas a publicar un blog con 3 artículos por semana y necesitas mil autores con permisos, o si montas una tienda muy compleja con variantes infinitas, WordPress o WooCommerce encajan. Tienen su sitio.

Pero para la mayoría (autónomo, pyme, comercio local, profesional con una landing decente y formulario de contacto) es matar moscas a cañonazos. Y al cañonazo se le cae el mantenimiento encima.`,
      en: `Right now I'm building a website for a client who came from a badly done WordPress. Very, very badly done. The moment I took a look, the conversation was won. Not because I was selling smoke, but because what was there didn't hold up.

![Laptop with code on a workbench](https://images.pexels.com/photos/4792287/pexels-photo-4792287.jpeg?auto=compress&cs=tinysrgb&w=1200)

## What I found on that site

No legal notice. In Spain that's not sloppy work: it's illegal. The LSSI requires it and fines can range from €150 to €600,000. No cookie policy, no privacy policy either. With GDPR on top, that's Russian roulette with your own business.

And visually: a typeface you couldn't read, weak contrast, and that ten-year-old website feel. The client would land on their own site and not recognise themselves.

## The "WordPress is free" myth

Sure it's free. Like a second-hand car delivered in pieces is free. Then you assemble it, and there goes your summer.

With WordPress you pay somewhere else:
- **Decent hosting:** the €2/month plans crash constantly
- **Premium plugins:** forms, SEO, security, caching: €200-400/year easily
- **A decent theme:** €60-80 if you want something not stuck in 2015
- **Your time:** hours fighting updates that break the site
- **The day something fails:** paying someone urgently, which costs a lot

## What a DIY WordPress won't give you

This is what I tell anyone who asks. A WordPress you set up yourself, no matter how well you followed a YouTube tutorial, will never give you what a developer behind your project will.

When I deliver a site, you message me saying "swap this image, this text, this font, this colour". And it gets done. Today, if possible. No fighting plugins, no visual editor breaking the layout, no hunting which child theme to edit.

That follow-up doesn't come in the WordPress zip file. Ever.

## Long term it's much worse

WordPress updates every few weeks. The core, the plugins, the theme. Each update is a mini-lottery: sometimes fine, sometimes a page breaks, sometimes a plugin sneaks in and slows everything down.

A year or two after leaving it alone, you open the dashboard and no idea what to touch. I've seen clients call me with their WordPress down, unable even to get into wp-admin because the password was on a Post-it nobody kept.

A custom-built site with clean code doesn't have 40 moving parts. It has the ones you need, nothing more.

## When does WordPress make sense?

To be fair: if you're publishing a blog with three articles a week and need a thousand authors with permissions, or running a very complex shop with endless variants, WordPress or WooCommerce fit. They have their place.

But for most cases (freelancer, SME, local shop, professional with a decent landing and a contact form) it's using a cannon to kill a fly. And the cannon comes with maintenance on top.`,
      eu: `Orain bertan bezero bati weba garatzen ari natzaio, oso gaizki egindako WordPress batetik zetorrena. Oso-oso gaizki eginda. Webari gainbegiratu bat eman nionean, elkarrizketa irabazita nuen. Ez ketarik saltzen nengoelako, baizik eta bertan zegoenak ez zuelako zutik eusten.

![Pantaila kodearekin eta ordenagailu eramangarri bat lan-mahaian](https://images.pexels.com/photos/4792287/pexels-photo-4792287.jpeg?auto=compress&cs=tinysrgb&w=1200)

## Zer aurkitu nuen web horretan

Lege-oharrik ez. Hori, Espainian, ez da zabarkeria: ilegala da. LSSI legeak derrigortzen du eta isunak 150€-tik 600.000€-tara iritsi daitezke. Cookie politikarik ere ez, ezta pribatutasun politikarik ere. DBEOarekin gainean, errusiar erruletan jokatzea da zure negozioarekin.

Eta bisualki: ezin irakurrizko tipografia, kontraste ahula, eta duela hamar urteko webaren sentsazioa. Bezeroa bere webera sartu eta ez zuen bere burua ezagutzen.

## "WordPress doan" mitoa

Doan da, bai. Auto zahar bat piezetan doan jasotzea bezala. Gero muntatu behar duzu, eta han doa uda osoa.

WordPress-ekin beste nonbaitean ordaintzen duzu:
- **Ostalaritza duina:** 2€/hilabeteko planak etengabe erortzen dira
- **Plugin premium-ak:** formularioa, SEOa, segurtasuna, cachea: 200-400€/urteko erraz
- **Gai duina:** 60-80€ 2015ekoa ez den zerbait nahi baduzu
- **Zure denbora:** eguneraketak weba hausten dituztenekin borrokan
- **Zerbait huts egiten duen eguna:** norbaiti premiaz ordaintzea, garestia da

## Zeuk muntatutako WordPress batek ez dizu emango

Galdetzen didan edonori errepikatzen diodana da hau. Zeuk muntatutako WordPress batek, YouTubeko tutorial bati ondo jarraitu arren, ez dizu emango zure proiektuaren atzean dagoen norbaitek ematen dizuna.

Nik weba entregatzen dizudanean, idazten didazu eta diozu "aldatu niri irudi hau, testu hau, letra-tipo hau, kolore hau". Eta egiten da. Gaur, ahal bada. Pluginen arteko borrokarik gabe, diseinua hausten duen editore bisualik gabe.

Laguntza hori ez dator WordPress-eko zip-ean. Inoiz.

## Epe luzera askoz okerragoa

WordPress aste gutxitik behin eguneratzen da. Core-a, plugin-ak, gaia. Eguneraketa bakoitza mini-loteria da: batzuetan ondo, batzuetan orrialde bat hausten da.

Urte bat edo bi utzita, panelera sartzen zara eta ez dakizu zer ukitu. Bezeroak ikusi ditut WordPress eroritakoan deika, wp-admin-era ere ezin sartzen zirela pasahitza inor gorde ez zuen post-it batean zegoelako.

Kode garbiz egindako web batek ez ditu 40 pieza mugikor. Behar dituzunak ditu, besterik ez.

## Noiz du zentzua WordPress-ek?

Bidezkoa izateko: astean hiru artikuluko bloga argitaratzen baduzu eta mila egile behar badituzu baimenekin, edo denda oso konplexua muntatzen baduzu aldaera infinituekin, WordPress edo WooCommerce egokitzen dira.

Baina kasu gehienetan (autonomoa, ETEa, tokiko denda, lege-sarbidea eta kontaktu-formulario duin bat nahi duen profesionala) eulia kanoiekin hiltzea da. Eta kanoiak mantentze-lana dakar gainera.`,
    },
    tags: ["WordPress", "diseño web", "DIY", "mantenimiento web"],
    keywords: {
      es: [
        "WordPress gratis mito",
        "WordPress vs web a medida",
        "problemas WordPress",
        "web sin aviso legal multa",
        "mantenimiento WordPress",
      ],
      en: [
        "WordPress free myth",
        "WordPress vs custom website",
        "WordPress problems",
        "WordPress maintenance cost",
      ],
      eu: [
        "WordPress doan mitoa",
        "WordPress vs neurrira egindako weba",
        "WordPress arazoak",
      ],
    },
    faq: {
      es: [
        {
          q: "¿WordPress es realmente gratis?",
          a: "El software lo es. Todo lo demás no: hosting decente (8-20€/mes), plugins premium para formulario, SEO y seguridad (200-400€/año), una plantilla digna (60-80€) y tu tiempo peleándote con actualizaciones. Al año sales pagando más que por una web a medida bien hecha.",
        },
        {
          q: "¿Es ilegal tener una web sin aviso legal en España?",
          a: "Sí. La LSSI obliga a toda web con actividad económica a tener aviso legal visible. Sumando RGPD, también necesitas política de privacidad y política de cookies si usas cookies no esenciales. Las multas van de 150€ a más de 600.000€ en casos graves. No es un detalle menor.",
        },
        {
          q: "¿Puedo pedirle cambios a mi diseñador después de entregar la web?",
          a: "Conmigo sí. Me escribes por WhatsApp o email y te cambio imagen, texto, color, tipografía en el día si es rápido. Incluyo un mes de soporte post-lanzamiento y después hay plan de mantenimiento opcional. Con un WordPress tuyo, tú eres el soporte.",
        },
        {
          q: "¿Qué pasa a largo plazo con un WordPress sin mantener?",
          a: "Las actualizaciones se acumulan, los plugins quedan obsoletos, aparecen avisos de seguridad. En uno o dos años tocar algo se vuelve arriesgado porque no sabes qué vas a romper. He recibido webs caídas sin acceso al panel porque nadie guardó la contraseña del administrador.",
        },
      ],
    },
  },
  {
    slug: "cuanto-cuesta-una-pagina-web-en-espana",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 6,
    titles: {
      es: "¿Cuánto cuesta una página web en España en 2026?",
      en: "How much does a website cost in Spain in 2026?",
      eu: "Zenbat balio du webgune batek Espainian 2026an?",
    },
    descriptions: {
      es: "Guía completa de precios de páginas web en España en 2026: desde webs básicas hasta proyectos a medida. Sin letra pequeña.",
      en: "Complete guide to website prices in Spain in 2026: from basic sites to custom projects. No small print.",
      eu: "Webguneen prezioei buruzko gida osoa Espainian 2026an: oinarrizko webguneetatik neurrizko proiektuetara.",
    },
    content: {
      es: `Pregunta a diez diseñadores cuánto cuesta una web y te darán diez respuestas distintas. No es casualidad: en 2026, en España, el rango real va desde los 0€ de un Wix hasta los 10.000€ de un desarrollo a medida. Debajo te cuento qué pagas en cada tramo y por qué el precio solo es una parte de la decisión.

## Tipos de web y sus precios

**Plantillas o constructores (Wix, Squarespace):** 0 - 500€/año. Rápidas de montar, pero te quedas con sus limitaciones de diseño, SEO y velocidad.

**Agencia con plantilla WordPress:** 1.500 - 5.000€. El resultado depende muchísimo de la agencia y de quién toca el código dentro de ella.

**Diseño a medida con freelance:** 800 - 3.000€. Es donde mejor encaja la mayoría de negocios pequeños y medianos.

**Desarrollo a medida enterprise:** 10.000€ en adelante. Proyectos con integraciones serias, e-commerce complejo o flujos personalizados.

## ¿Qué incluye una web a medida?

Cuando contratas a un freelance, un presupuesto razonable suele cubrir:
- Diseño UI/UX propio, no una plantilla maquillada
- Desarrollo responsive (móvil, tablet, escritorio)
- SEO técnico básico: velocidad, meta tags, Schema.org
- Formulario de contacto funcional conectado a tu email
- Dominio y hosting el primer año, dependiendo del acuerdo

Lo que no entra ahí suele ser la trampa de muchos presupuestos "completos".

## Mi experiencia real

En mi caso ofrezco dos caminos. El más elegido es el plan Todo Incluido: 0€ al firmar, 149€/mes sin permanencia (cancelas cuando quieras) y todo incluido (diseño, hosting, dominio, Google Maps, reseñas y soporte por WhatsApp). Y si prefieres tenerla en propiedad, también puedes comprarla en un pago único de 1.500€.

¿Por qué cambié el modelo? Porque la mayoría de negocios locales no quieren soltar 2.000€ de golpe por una web, pero sí pagan una cuota mensual fija sin problema, como hacen con el gestor, el seguro o el teléfono. Y porque a la agencia tradicional le interesa que la web se quede vieja para venderte una nueva: a mí, no. Mientras pagues tu cuota, yo trabajo para que tu web siga viva, rápida y arriba en Google.

He tenido clientes que llegaron huyendo de webs por las que pagaron 2.000€ a una agencia y que tardaban ocho segundos en cargar. El precio no garantiza calidad. La transparencia sí.

## ¿Qué no debería incluirse en el precio?

- Contenido: las fotos y los textos los pones tú, o los contratas aparte a un copy o fotógrafo.
- Posicionamiento SEO a largo plazo: es un trabajo continuo, no algo que se entrega con la web.
- Mantenimiento mensual: cambios regulares, copias, actualizaciones. Suele ser un servicio aparte.

Si un presupuesto lo mete todo en el mismo saco por un precio sospechosamente bajo, desconfía: algo se está recortando.`,
      en: `In 2026, the price of a website in Spain varies enormously depending on the type of project and who builds it. This guide tells you exactly what to expect.

## Types of websites and their prices

**Templates or builders (Wix, Squarespace):** €0 - €500/year. Quick to set up but with design, SEO and performance limitations.

**Agency with WordPress template:** €1,500 - €5,000. The result depends heavily on the agency.

**Custom design with freelancer:** €800 - €3,000. Best value for small and medium businesses.

**Custom enterprise development:** €10,000+. For complex projects with integrations, advanced e-commerce, etc.

## What does a custom website include?

When you hire a freelance web designer, a reasonable price includes:
- Custom UI/UX design
- Responsive development (mobile, tablet, desktop)
- Basic technical SEO (speed, meta tags, Schema.org)
- Working contact form
- Domain and hosting for the first year (in some cases)

## My real experience

In my case I offer two routes. The most popular is the All-Inclusive plan: €0 to sign, €149/month with no lock-in (cancel whenever you want) and everything included (design, hosting, domain, Google Maps, reviews and WhatsApp support). And if you'd rather own it, you can also buy it for a one-off €1,500.

Why did I change? Because most local businesses don't want to drop €2,000 in one go on a website but happily pay a fixed monthly fee like they do for the accountant, insurance or phone bill. And because the traditional agency profits from your site getting old so they can sell you a new one. I don't. As long as you pay your fee, I keep your site alive, fast and ranking on Google.

I've seen clients arrive from websites that cost €2,000 from an agency and took 8 seconds to load. Price doesn't guarantee quality. Transparency does.`,
      eu: `2026an, Espainian webgune baten prezioa izugarri aldatzen da proiektu motaren eta nork egiten duen arabera.

## Webgune motak eta haien prezioak

**Txantiloiak edo eraikitzaileak (Wix, Squarespace):** 0 - 500€/urte. Azkar muntatzeko baina diseinu, SEO eta errendimendu mugapenak dituzte.

**Agentzia WordPress txantiloiarekin:** 1.500 - 5.000€. Emaitza asko aldatzen da agentziaren arabera.

**Neurrizko diseinua freelance batekin:** 800 - 3.000€. Enpresa txiki eta ertainentzako prezio-kalitate erlazio onena.

## Nire benetako esperientzia

Bi bide eskaintzen ditut. Ohikoena Dena Barne plana da: 0€ sinatzean, 149€/hil iraupenik gabe (nahi duzunean baja eman) eta dena barne (diseinua, hosting-a, domeinua, Google Maps, iritziak eta WhatsApp bidezko laguntza). Eta jabetzan nahiago baduzu, 1.500€-ko ordainketa bakarrean ere eros dezakezu.

Zergatik aldatu nuen? Tokiko negozio gehienek ez baitute 2.000€ batera ordaindu nahi web batengatik, baina hileko kuota finkoa erraz ordaintzen dute, kontulariarena, aseguruarena edo telefonoarena bezala. Eta agentzia tradizionalari weba zahartzea komeni zaio berri bat saltzeko: niri ez. Zure kuota ordaintzen duzun bitartean, ni arduratzen naiz zure weba bizirik, azkar eta Googlen gora egotea.`,
    },
    tags: ["precios", "diseño web", "España", "freelance"],
    keywords: {
      es: [
        "cuánto cuesta una página web en España",
        "precio web 2026",
        "diseño web freelance precio",
      ],
      en: [
        "how much does a website cost in Spain",
        "website price 2026",
        "freelance web design price",
      ],
      eu: ["webgune baten prezioa Espainian", "web prezioa 2026"],
    },
    faq: {
      es: [
        {
          q: "¿Cuánto cuesta de verdad una página web en España?",
          a: "El rango normal va de 0€ (Wix o Squarespace) a 10.000€ o más en desarrollo a medida. Para un negocio pequeño o mediano, lo razonable con un freelance está entre 800€ y 3.000€. Por debajo de 800€ lo más probable es una plantilla sin trabajo real; por encima de 5.000€ ya estás pagando estructura de agencia.",
        },
        {
          q: "¿Por qué cobras 149€/mes en vez de un pago único?",
          a: "Porque la mayoría de negocios locales no quieren soltar 2.000€ o 3.000€ de golpe por una web. Una cuota fija mensual entra en la contabilidad como un gasto más, igual que el gestor, el seguro o el teléfono. Y la web empieza a trabajar para ti desde el primer día, no cuando tengas dinero ahorrado.",
        },
        {
          q: "¿Qué pasa con el dominio y el hosting?",
          a: "Los registro a tu nombre desde el primer día. El dominio es tuyo siempre y, si en algún momento decides irte, te lo llevas. El hosting va sobre mis servidores y por eso está incluido en los 149€/mes: yo me encargo de que tu web funcione siempre, tú te encargas de tu negocio.",
        },
        {
          q: "¿El SEO está incluido en el precio?",
          a: "El SEO técnico sí: velocidad, meta tags, Schema.org, URLs limpias, hreflang entre idiomas. Y, dentro de la cuota mensual, vigilo tu ficha de Google Maps cada mes para que la competencia no te adelante. El SEO orgánico a largo plazo (contenidos, backlinks) es otro trabajo aparte porque requiere meses de seguimiento.",
        },
        {
          q: "¿Qué diferencia hay entre una web de 500€ y el plan Todo Incluido?",
          a: "A 500€ lo normal es recibir una plantilla adaptada, sin diseño propio, cargando pesada y con SEO de serie. Con el plan Todo Incluido tienes diseño hecho a mano para tu negocio, optimizada para móvil y Google, soporte real por WhatsApp y la tranquilidad de que cada mes hay alguien vigilando que sigas saliendo arriba. Los detalles marcan la diferencia en cómo te perciben tus clientes y en cuánto conviertes.",
        },
        {
          q: "¿Cuánto tarda el proyecto?",
          a: "Entre 7 y 10 días desde que firmamos. Como no hay desembolso inicial, podemos arrancar enseguida. Lo que más alarga el plazo suele ser esperar tus textos o fotos.",
        },
      ],
    },
  },
  {
    slug: "disenador-web-freelance-vs-agencia",
    publishedAt: "2026-03-25",
    readingTime: 5,
    titles: {
      es: "Freelance vs Agencia: ¿A quién contratar para tu web en 2026?",
      en: "Freelancer vs Agency: Who to hire for your website in 2026?",
      eu: "Freelance vs Agentzia: Nori kontratatu zure weba 2026an?",
    },
    descriptions: {
      es: "Comparativa honesta entre contratar un diseñador web freelance o una agencia. Pros, contras y cuándo elegir cada opción.",
      en: "Honest comparison between hiring a freelance web designer or an agency. Pros, cons and when to choose each.",
      eu: "Diseinu web freelance bat edo agentzia bat kontratatu arteko konparaketa zintzoa.",
    },
    content: {
      es: `Cuando necesitas una web, la pregunta habitual es: ¿freelance o agencia? La respuesta depende de tu proyecto, presupuesto y forma de trabajar.

## Ventajas de contratar un freelance

- **Comunicación directa:** hablas con quien hace el trabajo, sin intermediarios
- **Precio más competitivo:** sin estructura de empresa que repercutir en el presupuesto
- **Flexibilidad:** más adaptable a cambios durante el proyecto
- **Especialización:** un buen freelance suele ser mejor en su especialidad que un generalista de agencia

## Ventajas de una agencia

- **Equipo completo:** diseñador, desarrollador, SEO, redactor bajo el mismo techo
- **Proyectos grandes:** más capacidad para proyectos complejos o urgentes
- **Respaldo:** si una persona enferma, el proyecto no se para

## ¿Cuándo elegir freelance?

Para negocios pequeños y medianos (tienda local, profesional autónomo, startup en fase inicial) el freelance suele ser la mejor opción. El proyecto es más personal, el precio más justo y la atención más cuidada.

## Mi enfoque como freelance en Irun

Trabajo directamente contigo desde el primer mensaje hasta la entrega. Conozco el mercado local del País Vasco y puedo hacer tu web en español, inglés y euskera.`,
      en: `When you need a website, the usual question is: freelancer or agency? The answer depends on your project, budget and working style.

## Advantages of hiring a freelancer

- **Direct communication:** you talk to the person doing the work, no intermediaries
- **More competitive price:** no company structure to pass on to the budget
- **Flexibility:** more adaptable to changes during the project
- **Specialisation:** a good freelancer is usually better in their specialty than an agency generalist

## When to choose a freelancer?

For small and medium businesses (local shop, self-employed professional, early-stage startup) a freelancer is usually the best option.`,
      eu: `Web bat behar duzunean, ohiko galdera da: freelance ala agentzia? Erantzuna zure proiektuaren, aurrekontuaren eta lan egiteko moduaren araberakoa da.

## Freelance bat kontratatzeko abantailak

- **Komunikazio zuzena:** lana egiten duenarekin hitz egiten duzu, bitartekorik gabe
- **Prezio lehikorragoa:** aurrekontuan islatzen den enpresa egitura gabe

## Noiz aukeratu freelance bat?

Enpresa txiki eta ertainentzat (denda lokala, autonomo profesionala, hasierako startup) freelancea da normalean aukera onena.`,
    },
    tags: ["freelance", "agencia", "diseño web", "comparativa"],
    keywords: {
      es: [
        "freelance vs agencia diseño web",
        "diseñador web freelance España",
        "contratar diseñador web",
      ],
      en: ["freelancer vs agency web design", "freelance web designer Spain"],
      eu: ["freelance vs agentzia web diseinua"],
    },
  },
  {
    slug: "disenador-web-irun-gipuzkoa",
    publishedAt: "2026-03-18",
    readingTime: 4,
    titles: {
      es: "Diseñador web en Irun y Gipuzkoa: lo que necesitas saber",
      en: "Web designer in Irun and Gipuzkoa: what you need to know",
      eu: "Web diseinatzailea Irunen eta Gipuzkoan: jakin behar duzuna",
    },
    descriptions: {
      es: "Por qué contratar un diseñador web local en Irun o Gipuzkoa. Ventajas, proceso y qué esperar de un proyecto web en el País Vasco.",
      en: "Why hire a local web designer in Irun or Gipuzkoa. Advantages, process and what to expect from a web project in the Basque Country.",
      eu: "Zergatik kontratatu web diseinatzaile lokala Irunen edo Gipuzkoan. Abantailak, prozesua eta zer espero.",
    },
    content: {
      es: `Si tienes un negocio en Irun, Hondarribia, Donostia o cualquier punto de Gipuzkoa, trabajar con un diseñador web local tiene ventajas concretas.

## ¿Por qué un diseñador web local?

**Conoce el mercado:** Un freelance de Irun sabe cómo se mueve el mercado local, qué buscan los clientes de la zona y cómo posicionar tu negocio en búsquedas locales de Google.

**Comunicación en tu idioma:** En Gipuzkoa, muchos negocios necesitan su web en español y euskera. Trabajo con los dos idiomas de forma nativa.

**Disponibilidad real:** Puedo reunirme contigo en persona si lo necesitas. No soy una agencia en Madrid que gestiona tu proyecto por email.

## SEO local en Gipuzkoa

Para aparecer en Google cuando alguien busca "restaurante en Irun" o "fontanero Donostia", necesitas:
- Google Business Profile verificado
- Palabras clave locales en la web
- Contenido relevante para la zona
- Reseñas de clientes reales

## Mi experiencia en el País Vasco

He trabajado con negocios de Irun, Hondarribia y Donostia. Entiendo las particularidades del mercado vasco: la importancia del euskera, los ciclos de temporada y las búsquedas locales.`,
      en: `If you have a business in Irun, Hondarribia, Donostia or anywhere in Gipuzkoa, working with a local web designer has concrete advantages.

## Why a local web designer?

**Knows the market:** A freelancer from Irun knows how the local market works, what clients in the area are looking for and how to position your business in local Google searches.

**Communication in your language:** In Gipuzkoa, many businesses need their website in Spanish and Basque. I work with both languages natively.

## Local SEO in Gipuzkoa

To appear on Google when someone searches for "restaurant in Irun" or "plumber Donostia", you need:
- Verified Google Business Profile
- Local keywords on the website
- Relevant content for the area
- Real customer reviews`,
      eu: `Irunen, Hondarribian, Donostian edo Gipuzkoako edozein puntutan negozioa baduzu, bertako web diseinatzaile batekin lan egiteak abantaila zehatzak ditu.

## Zergatik web diseinatzaile lokala?

**Merkatu lokala ezagutu:** Irungo freelance batek bertako merkatuaren dinamika ezagutzen du.

**Zure hizkuntzan komunikazioa:** Gipuzkoan, negozio askok web bat behar dute gaztelaniaz eta euskaraz. Bi hizkuntzetan lan egiten dut.`,
    },
    tags: ["diseño web Irun", "diseño web Gipuzkoa", "SEO local", "País Vasco"],
    keywords: {
      es: [
        "diseñador web Irun",
        "diseñador web Gipuzkoa",
        "diseño web País Vasco",
        "web Hondarribia",
      ],
      en: [
        "web designer Irun",
        "web designer Gipuzkoa",
        "web design Basque Country",
      ],
      eu: ["web diseinatzailea Irun", "web diseinatzailea Gipuzkoa"],
    },
  },
  {
    slug: "que-es-core-web-vitals-y-por-que-importa",
    publishedAt: "2026-03-11",
    readingTime: 5,
    titles: {
      es: "Core Web Vitals: qué son y por qué afectan al SEO de tu web",
      en: "Core Web Vitals: what they are and why they affect your website's SEO",
      eu: "Core Web Vitals: zer diren eta zergatik eragiten dioten zure webaren SEOari",
    },
    descriptions: {
      es: "Explicación clara de qué son los Core Web Vitals de Google, cómo medirlos y cómo mejorarlos para subir posiciones en los resultados de búsqueda.",
      en: "Clear explanation of what Google's Core Web Vitals are, how to measure them and how to improve them to climb search result positions.",
      eu: "Googleren Core Web Vitals zer diren, nola neurtu eta nola hobetu argibide argia.",
    },
    content: {
      es: `Google usa Core Web Vitals como factor de posicionamiento desde 2021. En 2026 siguen siendo uno de los indicadores más importantes para rankear bien.

## ¿Qué son los Core Web Vitals?

Son tres métricas que miden la experiencia real del usuario en tu web:

**LCP (Largest Contentful Paint):** ¿Cuánto tarda en aparecer el contenido principal? Objetivo: menos de 2.5 segundos.

**CLS (Cumulative Layout Shift):** ¿Se mueven los elementos mientras carga la página? Objetivo: menos de 0.1.

**INP (Interaction to Next Paint):** ¿Cuánto tarda la web en responder a una interacción del usuario? Objetivo: menos de 200ms.

## ¿Cómo medir tus Core Web Vitals?

- **Google PageSpeed Insights:** gratis, datos reales y de laboratorio
- **Google Search Console:** sección Core Web Vitals con datos de usuarios reales
- **Lighthouse:** en Chrome DevTools, análisis detallado

## ¿Cómo los mejoro?

Los problemas más comunes y sus soluciones:
- **LCP lento:** optimizar imágenes (WebP, lazy loading), eliminar render-blocking scripts
- **CLS alto:** definir dimensiones fijas en imágenes y anuncios
- **INP alto:** reducir JavaScript innecesario, usar web workers

## Mi enfoque

Todas las webs que entrego tienen Lighthouse 95+ y Core Web Vitals en verde. No es opcional: es el estándar mínimo.`,
      en: `Google has used Core Web Vitals as a ranking factor since 2021. In 2026 they remain one of the most important indicators for ranking well.

## What are Core Web Vitals?

**LCP (Largest Contentful Paint):** How long does it take for the main content to appear? Target: under 2.5 seconds.

**CLS (Cumulative Layout Shift):** Do elements move while the page loads? Target: under 0.1.

**INP (Interaction to Next Paint):** How long does the website take to respond to a user interaction? Target: under 200ms.

## How do I improve them?

- **Slow LCP:** optimise images (WebP, lazy loading), remove render-blocking scripts
- **High CLS:** define fixed dimensions on images and ads
- **High INP:** reduce unnecessary JavaScript, use web workers`,
      eu: `Googlek Core Web Vitals rankeatze-faktore gisa erabiltzen ditu 2021az geroztik. 2026an, ondo rankeatzearen adierazle garrantzitsuenetako bat izaten jarraitzen dute.

## Zer dira Core Web Vitals?

**LCP:** Eduki nagusia agertzeko zenbat denbora behar du? Helburua: 2.5 segundu baino gutxiago.

**CLS:** Orrialdearen karga bitartean elementuak mugitzen al dira? Helburua: 0.1 baino gutxiago.

**INP:** Webguneak erabiltzaile interakzioari erantzuteko zenbat denbora behar du? Helburua: 200ms baino gutxiago.`,
    },
    tags: ["Core Web Vitals", "SEO técnico", "rendimiento web", "Google"],
    keywords: {
      es: [
        "Core Web Vitals SEO",
        "mejorar velocidad web",
        "Google PageSpeed",
        "diseñador web rendimiento",
      ],
      en: ["Core Web Vitals SEO", "improve website speed", "Google PageSpeed"],
      eu: ["Core Web Vitals SEO", "webgune abiadura hobetu"],
    },
  },
  {
    slug: "seo-local-irun-gipuzkoa",
    publishedAt: "2026-04-15",
    readingTime: 7,
    titles: {
      es: "SEO local en Irun y Gipuzkoa: guía práctica 2026",
      en: "Local SEO in Irun and Gipuzkoa: practical guide 2026",
      eu: "SEO lokala Irunen eta Gipuzkoan: 2026ko gida praktikoa",
    },
    descriptions: {
      es: "Cómo posicionar un negocio en Google Maps y búsquedas locales en Irun y Gipuzkoa. Google Business Profile, reseñas, Schema local y estrategia de contenido.",
      en: "How to rank a business on Google Maps and local searches in Irun and Gipuzkoa. Google Business Profile, reviews, local Schema and content strategy.",
      eu: "Nola posizionatu negozio bat Google Mapsen eta bilaketa lokaletan Irunen eta Gipuzkoan. Google Business Profile, iritziak, Schema lokala eta eduki estrategia.",
    },
    content: {
      es: `El SEO local es la diferencia entre aparecer cuando alguien busca "restaurante en Irun" y ser invisible. Esta guía te explica qué funciona de verdad en 2026.

## Los tres pilares del SEO local

**1. Google Business Profile optimizado:** tu ficha es tu web en Google Maps. Categorías correctas, horario, fotos reales, publicaciones semanales.

**2. Reseñas auténticas:** Google prioriza perfiles con reseñas recientes. Meta: 5 reseñas en 30 días, luego 1-2 al mes.

**3. Señales locales en tu web:** Schema LocalBusiness, NAP (Nombre, Dirección, Teléfono) consistente en toda la web, contenido que mencione Irun, Hondarribia, Gipuzkoa.

## Errores típicos en negocios de Gipuzkoa

- **NAP inconsistente:** diferente dirección en Google Business, en la web y en Páginas Amarillas. Google lo detecta y penaliza.
- **Categoría principal mal elegida:** "Tienda" en vez de "Panadería artesanal". La categoría principal es la más importante.
- **Sin contenido local:** la web no menciona Irun, ni el barrio, ni los barrios vecinos. Si Google no ve señales locales, no te muestra en resultados locales.
- **Cero reseñas o todas de golpe:** 10 reseñas en un día es bandera roja. Google prefiere un goteo constante.

## Estrategia concreta para Irun / Gipuzkoa

1. **Reclamar Google Business Profile** con dirección real en Irun
2. **Categoría primaria:** la más específica que describa tu negocio
3. **Área de servicio:** Irun, Hondarribia, Fuenterrabía, Behobia, Oiartzun
4. **Publicar 1 post/semana** en el perfil (ofertas, novedades, fotos)
5. **Pedir reseñas** a clientes contentos: plantilla por WhatsApp el mismo día de la compra
6. **En la web:** Schema LocalBusiness, página de contacto con dirección y mapa, contenido que mencione barrios concretos

## Señales extra que marcan diferencia

- **Enlaces desde webs locales:** Cámara de Comercio Gipuzkoa, Diario Vasco, blogs de gastronomía de Irun
- **Citas NAP** en directorios vascos: Guía Local Gipuzkoa, Irunpedia, asociaciones de comerciantes
- **Contenido estacional:** "Mejores terrazas en Hondarribia en verano", "Rebajas en comercios de Irun en enero"

Con estos ingredientes bien hechos, pasas del puesto 30 al top 3 en 3-6 meses. No hay magia, hay consistencia.`,
      en: `Local SEO is the difference between showing up when someone searches "restaurant in Irun" and being invisible. This guide explains what actually works in 2026.

## The three pillars of local SEO

**1. Optimized Google Business Profile:** your listing is your website on Google Maps. Correct categories, hours, real photos, weekly posts.

**2. Authentic reviews:** Google prioritises profiles with recent reviews. Goal: 5 reviews in 30 days, then 1-2 a month.

**3. Local signals on your site:** LocalBusiness Schema, consistent NAP (Name, Address, Phone) across your site, content mentioning Irun, Hondarribia, Gipuzkoa.

## Typical mistakes in Gipuzkoa businesses

- **Inconsistent NAP:** different addresses on Google Business, on the site and on Yellow Pages. Google detects and penalises this.
- **Wrong primary category:** "Shop" instead of "Artisan bakery". The primary category is the most important.
- **No local content:** the site doesn't mention Irun, the district, or neighbouring towns. No local signals → no local results.
- **Zero reviews or all at once:** 10 reviews in a day is a red flag. Google prefers a steady trickle.

## Concrete strategy for Irun / Gipuzkoa

1. **Claim Google Business Profile** with real Irun address
2. **Primary category:** the most specific one that describes your business
3. **Service area:** Irun, Hondarribia, Fuenterrabía, Behobia, Oiartzun
4. **Publish 1 post/week** on the profile (offers, news, photos)
5. **Ask for reviews** from happy customers: WhatsApp template same day as purchase
6. **On the site:** LocalBusiness Schema, contact page with address and map, content mentioning specific districts

## Extra signals that make a difference

- **Links from local sites:** Gipuzkoa Chamber of Commerce, Diario Vasco, Irun gastronomy blogs
- **NAP citations** in Basque directories: Guía Local Gipuzkoa, Irunpedia, merchant associations
- **Seasonal content:** "Best terraces in Hondarribia in summer", "January sales in Irun shops"

With these ingredients done well, you move from position 30 to top 3 in 3-6 months. No magic, just consistency.`,
      eu: `SEO lokala da "jatetxea Irunen" bilatzen duenean agertzearen eta ikusezina izatearen arteko aldea. Gida honek 2026an benetan funtzionatzen duena azaltzen dizu.

## SEO lokalaren hiru zutabeak

**1. Google Business Profile optimizatua:** zure fitxa zure weba da Google Mapsen. Kategoria zuzenak, ordutegia, argazki errealak, asteroko posts-ak.

**2. Benetako iritziak:** Googlek iritzi berriak dituzten profilak lehenesten ditu. Helburua: 5 iritzi 30 egunetan, gero 1-2 hilean.

**3. Seinale lokalak zure weban:** LocalBusiness Schema, NAP (Izena, Helbidea, Telefonoa) koherentea web osoan, Irun, Hondarribia eta Gipuzkoa aipatzen dituen edukia.

## Gipuzkoako negozioetan ohiko akatsak

- **NAP ez-koherentea:** helbide desberdina Google Business-en, weban eta Orrialde Horietan. Googlek hori detektatzen du eta zigortu egiten du.
- **Kategoria nagusi oker:** "Denda" "Okindegi artisaua" beharrean. Kategoria nagusia da garrantzitsuena.
- **Eduki lokalik ez:** webak ez du Irun, auzoa, ezta inguruko herriak ere aipatzen.
- **Iritzirik ez edo denak batera:** 10 iritzi egun batean bandera gorria da.

Osagai hauek ondo eginda, 30. postutik top 3-era igarotzen zara 3-6 hilabetetan.`,
    },
    tags: ["SEO local", "Irun", "Gipuzkoa", "Google Business Profile", "negocio local"],
    keywords: {
      es: [
        "SEO local Irun",
        "SEO local Gipuzkoa",
        "Google Business Profile Irun",
        "posicionar negocio Gipuzkoa",
        "reseñas Google negocio local",
      ],
      en: ["local SEO Irun", "local SEO Gipuzkoa", "Google Business Profile Basque Country"],
      eu: ["SEO lokala Irunen", "SEO lokala Gipuzkoan", "Google Business Profile Euskadi"],
    },
  },
  {
    slug: "web-multi-idioma-euskera-castellano-ingles",
    publishedAt: "2026-04-08",
    readingTime: 6,
    titles: {
      es: "Web multi-idioma: castellano, euskera e inglés sin romper el SEO",
      en: "Multi-language website: Spanish, Basque and English without breaking SEO",
      eu: "Hizkuntza anitzeko weba: gaztelania, euskara eta ingelesa SEOa hautsi gabe",
    },
    descriptions: {
      es: "Cómo montar una web trilingüe (castellano, inglés, euskera) con URLs correctas, hreflang y contenido traducido de verdad. Sin plugins frágiles.",
      en: "How to build a trilingual website (Spanish, English, Basque) with proper URLs, hreflang and genuinely translated content. No fragile plugins.",
      eu: "Nola egin hiru hizkuntzatako weba (gaztelania, ingelesa, euskara) URL egokiekin, hreflangekin eta benetan itzulitako edukiarekin.",
    },
    content: {
      es: `En el País Vasco, muchos negocios necesitan web en castellano, euskera e inglés. La mayoría lo hace mal: plugin de traducción automática, URLs rotas, penalización SEO. Así se hace bien.

## Los tres errores típicos

**1. Plugin de traducción automática (Google Translate widget):** Google ignora el contenido traducido. No indexa nada. No posicionas en inglés ni en euskera.

**2. Subdominios sin hreflang:** \`en.tuweb.com\` sin etiquetas \`hreflang\` → Google no sabe cuál mostrar a cada usuario.

**3. Traducir solo menús:** contenido sigue en castellano pero navegación en inglés. El usuario llega y se siente engañado. Alto bounce rate.

## Cómo se hace bien

**Estructura de URLs:** subcarpetas por idioma \`/es/\`, \`/en/\`, \`/eu/\`. Cada página tiene su propia URL por idioma.

**hreflang correcto:** en cada página, \`<link rel="alternate" hreflang="es" href="..." />\` para cada idioma, más \`x-default\`.

**Contenido traducido de verdad:** textos escritos por humano o revisados. Traducción automática → posicionas a 0.

**Metadatos por idioma:** title, description, OG tags cada uno en su idioma. No reutilizar el castellano con un prefijo.

## Euskera: particularidades

- **Declinaciones:** "Bilbo" → "Bilbon", "Donostia" → "Donostiara". Las ciudades se declinan. Si no, suena a traductor.
- **Términos:** "webgunea" (página web), "diseinatzailea" (diseñador). No usar anglicismos cuando hay término vasco.
- **Euskera batua:** usa el estándar, no dialectos, a menos que tu público sea muy local.

## SEO por idioma

Cada idioma compite por sus keywords. "Diseñador web Irun" (es), "web designer Irun" (en), "web diseinatzailea Irunen" (eu). Son búsquedas distintas con competencia distinta.

Una web trilingüe bien hecha te da 3 veces más superficie de ataque en Google. Una mal hecha te penaliza en las 3.`,
      en: `In the Basque Country, many businesses need websites in Spanish, Basque and English. Most do it wrong: auto-translation plugin, broken URLs, SEO penalty. Here's how to do it right.

## The three typical mistakes

**1. Auto-translation plugin (Google Translate widget):** Google ignores translated content. Doesn't index anything. You don't rank in English or Basque.

**2. Subdomains without hreflang:** \`en.yoursite.com\` without \`hreflang\` tags → Google doesn't know which to show each user.

**3. Translating only menus:** content stays in Spanish but navigation is in English. High bounce rate.

## How to do it right

**URL structure:** language subfolders \`/es/\`, \`/en/\`, \`/eu/\`. Each page has its own URL per language.

**Proper hreflang:** on each page, \`<link rel="alternate" hreflang="es" href="..." />\` for each language, plus \`x-default\`.

**Genuinely translated content:** human-written or reviewed. Machine translation → you rank at 0.

**Per-language metadata:** title, description, OG tags each in its language.

## Basque: specifics

- **Declensions:** "Bilbo" → "Bilbon". Cities are declined. Otherwise it sounds like a translator.
- **Terms:** "webgunea" (website), "diseinatzailea" (designer). Don't use anglicisms when there's a Basque term.
- **Euskera batua:** use the standard, not dialects, unless your audience is very local.

A well-done trilingual website gives you 3× more Google attack surface. A badly-done one penalises you in all three.`,
      eu: `Euskal Herrian, negozio askok web gaztelaniaz, euskaraz eta ingelesez behar dute. Gehienek gaizki egiten dute: itzulpen automatikoko plugina, URL hautsiak, SEO zigorra. Honela egiten da ondo.

## Hiru akats tipikoak

**1. Itzulpen automatikoa (Google Translate widget):** Googlek ez du itzulitako edukia indexatzen.

**2. Azpidomeinuak hreflang gabe:** \`en.zureweb.com\` hreflang etiketarik gabe.

**3. Menuak bakarrik itzultzea:** edukia gaztelaniaz jarraitzen du baina nabigazioa ingelesez.

## Nola egiten den ondo

**URL egitura:** hizkuntzako azpikarpetak \`/es/\`, \`/en/\`, \`/eu/\`.

**hreflang zuzena:** orrialde bakoitzean hizkuntza bakoitzerako.

**Benetan itzulitako edukia:** gizakiak idatzita edo berrikusita. Itzulpen automatikoa → 0an rankeatzen duzu.

Ondo egindako hiru hizkuntzatako webak 3 aldiz eraso azalera gehiago ematen dizu Googlen.`,
    },
    tags: ["multi-idioma", "euskera", "hreflang", "internacionalización", "SEO"],
    keywords: {
      es: [
        "web multi-idioma España",
        "web en euskera",
        "hreflang SEO",
        "web trilingüe País Vasco",
        "next-intl",
      ],
      en: ["multi-language website", "Basque language website", "hreflang SEO", "trilingual website"],
      eu: ["hizkuntza anitzeko weba", "webgunea euskaraz", "hreflang SEO"],
    },
  },
  {
    slug: "disenador-web-freelance-vs-agencia",
    publishedAt: "2026-04-01",
    readingTime: 5,
    titles: {
      es: "Diseñador web freelance vs agencia: ¿qué elegir en 2026?",
      en: "Freelance web designer vs agency: what to choose in 2026?",
      eu: "Web diseinatzaile freelance vs agentzia: zer aukeratu 2026an?",
    },
    descriptions: {
      es: "Comparativa honesta entre contratar a un diseñador web freelance o una agencia. Precio, comunicación, calidad, mantenimiento. Sin humo.",
      en: "Honest comparison between hiring a freelance web designer or an agency. Price, communication, quality, maintenance. No fluff.",
      eu: "Konparaketa zintzoa web diseinatzaile freelance bat ala agentzia bat kontratatzearen artean. Prezioa, komunikazioa, kalitatea.",
    },
    content: {
      es: `Esta es la duda que me plantean casi todos los clientes potenciales: ¿freelance o agencia? No hay respuesta universal. Depende. Esta guía te ayuda a decidir.

## Lo que ofrece un freelance (como yo)

- **Sin desembolso inicial:** en mi caso, el plan Todo Incluido son 0€ al firmar y 149€/mes sin permanencia, todo incluido (diseño, hosting, dominio, Google Maps, reseñas y soporte por WhatsApp). Donde una agencia te pide 2.500-5.000€ de golpe, aquí lo metes en la contabilidad como una cuota más.
- **Comunicación directa:** hablas con quien hace el trabajo. Sin intermediarios ni "te pasamos con tu gestor".
- **Flexibilidad:** proyectos adaptados, no paquetes cerrados.
- **Implicación personal:** mi reputación depende de cada proyecto.

## Lo que ofrece una agencia

- **Equipo multidisciplinar:** diseñador, desarrollador, copywriter, SEO, project manager. Todo en uno.
- **Capacidad:** pueden abordar 10 proyectos a la vez. Un freelance, 2-3.
- **Procesos establecidos:** metodologías probadas, contratos robustos.
- **Respaldo:** si cae enfermo el diseñador, otro lo coge.

## Cuándo elegir freelance

- Presupuesto menor a 5.000€
- Negocio pequeño o mediano
- Valoras trato directo y rapidez de decisión
- Proyecto de 1-3 meses

## Cuándo elegir agencia

- Presupuesto mayor a 10.000€
- Proyecto con muchas partes (app + web + marketing + branding)
- Necesitas equipo grande en plazo corto
- Empresa grande con procesos formales de compra

## Lo que NO debes hacer

Elegir por precio de forma aislada. Un freelance barato sin cartera es peor que una agencia cara. Una agencia que promete "10.000€ y web en 7 días" te va a entregar plantilla.

Mira: cartera, casos reales, reseñas, comunicación inicial. Ahí está la señal.`,
      en: `This is the question almost every potential client asks me: freelance or agency? There's no universal answer. It depends. This guide helps you decide.

## What a freelancer offers (like me)

- **No upfront cost:** in my case, the All-Inclusive plan is €0 to sign and €149/month with no lock-in, all-inclusive (design, hosting, domain, Google Maps, reviews and WhatsApp support). Where an agency asks for €2,500-5,000 upfront, here it goes in the books as another monthly subscription.
- **Direct communication:** you talk to the person doing the work.
- **Flexibility:** adapted projects, not closed packages.
- **Personal stake:** my reputation depends on every project.

## What an agency offers

- **Multidisciplinary team:** designer, developer, copywriter, SEO, PM.
- **Capacity:** they can handle 10 projects at once. A freelancer, 2-3.
- **Established processes:** proven methodologies, robust contracts.
- **Backup:** if the designer falls ill, another takes over.

## When to choose a freelancer

- Budget under €5,000
- Small or mid-sized business
- You value direct dealing and quick decisions
- 1-3 month project

## When to choose an agency

- Budget over €10,000
- Project with many parts (app + web + marketing + branding)
- Need a large team in a short timeframe
- Large company with formal procurement

## What NOT to do

Choose on price alone. A cheap freelancer with no portfolio is worse than a pricey agency. An agency promising "€10,000 and website in 7 days" will deliver a template.

Look at: portfolio, real cases, reviews, initial communication. That's the signal.`,
      eu: `Bezero potentzial gehienek egiten didaten galdera: freelance ala agentzia? Ez dago erantzun unibertsalik. Araberakoa da.

## Freelance batek eskaintzen duena

- **Hasierako kosturik gabe:** nire kasuan, Dena Barne plana 0€ sinatzean eta 149€/hil iraupenik gabe, dena barne (diseinua, hosting-a, domeinua, Google Maps, iritziak eta WhatsApp bidezko laguntza). Agentziak 2.500-5.000€ batera eskatzen dituen lekuan, hemen beste hileko kuota bat besterik ez da.
- **Komunikazio zuzena:** lana egiten duenarekin hitz egiten duzu.
- **Malgutasuna:** moldatutako proiektuak.

## Agentzia batek eskaintzen duena

- **Talde diziplina anitzeko taldea:** diseinatzailea, garatzailea, copywriter-a, SEO.
- **Gaitasuna:** aldi berean 10 proiektu. Freelance batek, 2-3.

## Noiz aukeratu freelance

- 5.000€tik beherako aurrekontua
- Negozio txikia edo ertaina
- Tratu zuzena baloratzen duzu

## Noiz aukeratu agentzia

- 10.000€tik gorako aurrekontua
- Zati askotako proiektua
- Talde handia behar duzu epe laburrean`,
    },
    tags: ["freelance", "agencia", "comparativa", "contratación web"],
    keywords: {
      es: [
        "diseñador web freelance vs agencia",
        "cuánto cobra un diseñador web freelance",
        "elegir diseñador web",
        "agencia diseño web España",
      ],
      en: ["freelance web designer vs agency", "choose web designer"],
      eu: ["web diseinatzaile freelance edo agentzia"],
    },
  },
  {
    slug: "wordpress-vs-nextjs-para-tu-negocio",
    publishedAt: "2026-05-13",
    readingTime: 7,
    titles: {
      es: "WordPress vs Next.js: cuál elegir para la web de tu negocio en 2026",
      en: "WordPress vs Next.js: which to choose for your business website in 2026",
      eu: "WordPress vs Next.js: zein aukeratu zure negozioaren webgunean 2026an",
    },
    descriptions: {
      es: "Comparativa honesta entre WordPress y Next.js para webs de negocio. Velocidad, SEO, coste, mantenimiento y cuándo tiene sentido cada uno.",
      en: "Honest comparison between WordPress and Next.js for business websites. Speed, SEO, cost, maintenance and when each one makes sense.",
      eu: "WordPress eta Next.js-en konparaketa zintzoa negozio-webguneentzat. Abiadura, SEO, kostua, mantentzea eta noiz du zentzua bakoitzak.",
    },
    content: {
      es: `Si preguntas a cualquier agencia qué usar para tu web, el 80% te dirá WordPress sin pensarlo dos veces. Si preguntas a un desarrollador moderno, te dirá Next.js. Ninguno te va a explicar el porqué con honestidad. Yo sí.

## Qué es cada uno, en términos reales

**WordPress** es un CMS que nació en 2003 para gestionar blogs. Hoy tiene el 43% de internet. El problema es que ese número incluye webs abandonadas, hackeadas, lentas y mantenidas con plantillas de hace cinco años. No es una medalla.

**Next.js** es un framework de React creado en 2016 por Vercel. Nació para aplicaciones web modernas: rápidas, seguras, con SSR (server-side rendering) y generación estática. No tiene panel de administración por defecto: es código, no clicks.

## Rendimiento: diferencia real

Una web en Next.js bien hecha carga en menos de 1 segundo. En WordPress, depende de cuántos plugins tienes, qué hosting usas, si tienes caché bien configurada, si el theme está optimizado... Con WordPress, Lighthouse 95+ es un proyecto; con Next.js, es el punto de partida.

Los Core Web Vitals (LCP, CLS, INP) que Google usa para posicionar tienen una correlación directa con la tecnología. No es que WordPress no pueda llegar a verde: puede, con trabajo. Pero Next.js llega ahí por diseño.

## SEO: el mito de "WordPress es mejor para SEO"

Esto es falso y se repite mucho. WordPress tiene Yoast o RankMath, que son herramientas SEO muy completas. Pero el SEO técnico de base (URLs limpias, sitemap, hreflang, metadatos correctos) se hace igual de bien en Next.js. Y las métricas de velocidad que afectan al posicionamiento, mejor.

Lo que WordPress tiene a su favor en SEO: es más fácil para alguien sin conocimientos técnicos subir contenido, actualizar el blog y gestionar textos. Si tu estrategia de contenido la lleva alguien del equipo sin perfil técnico, WordPress facilita ese flujo.

## Coste real de cada uno

**WordPress:**
- Hosting decente: 10–30€/mes (el barato de 2€ te da problemas)
- Theme premium: 60–80€ (único, pero hay que renovar)
- Plugins esenciales: formulario, SEO, seguridad, caché, fácil 150–300€/año
- Actualizaciones que rompen cosas: cada 3–6 meses aparece alguna
- Desarrollador de urgencia cuando algo falla: 50–150€/hora

**Next.js:**
- Hosting en Vercel: gratis hasta cierto tráfico, luego 20€/mes
- Dominio: 10–15€/año
- Mantenimiento: mínimo, porque no hay plugins que actualizar
- Coste inicial más alto (desarrollo a medida)

A largo plazo, Next.js sale más barato si sumas todo. A corto plazo, WordPress es más económico si tienes claro que puedes gestionarlo tú.

## Cuándo tiene sentido WordPress

Tiene sentido si necesitas un CMS potente para gestionar contenido sin depender de un desarrollador. Una revista online, un e-commerce con WooCommerce, un directorio de empresas: ahí WordPress brilla. También si ya lo conoces bien, tienes un desarrollador de confianza y no quieres cambiar de herramienta.

No tiene sentido para una web corporativa o de servicios donde el contenido cambia poco. Ahí pagas el precio del CMS sin aprovechar sus ventajas.

## Cuándo tiene sentido Next.js

Para la mayoría de webs de negocio local, clínicas, profesionales, empresas de servicios. Proyectos donde la velocidad, el SEO técnico, el multi-idioma y la seguridad importan. Si la web va a estar bastante estática (home, servicios, precios, contacto) Next.js es la opción que envejece mejor.

También para proyectos con multi-idioma serio. Con next-intl o next-i18next, el hreflang, las URLs por idioma y los metadatos por locale se configuran de forma limpia desde el principio. Con WordPress necesitas plugins que a veces se pelean entre sí.

## Mi postura honesta

Yo uso Next.js para todos mis clientes. No porque sea una moda, sino porque lo que me piden (velocidad, posicionamiento, multi-idioma, diseño a medida) lo resuelve mejor. Las webs que entrego tienen Lighthouse 95+ de salida, sin pelear con plugins ni con el tema que se actualiza solo un martes.

Si alguien me pide un e-commerce con 500 productos y un equipo de marketing que sube contenido cada día, lo hablo. Quizá WordPress o Shopify tiene más sentido ahí. Pero para la web de un médico, un taller, una consultora o una clínica, Next.js gana sin discusión.`,
      en: `Ask any agency what to use for your website and 80% will say WordPress without thinking. Ask a modern developer and they'll say Next.js. Neither will explain the why honestly. I will.

## What each one is, in real terms

**WordPress** is a CMS born in 2003 to manage blogs. Today it powers 43% of the internet. The problem is that number includes abandoned, hacked, slow sites maintained with five-year-old templates. Not a medal.

**Next.js** is a React framework created in 2016 by Vercel. Born for modern web apps: fast, secure, with SSR and static generation. No admin panel by default: it's code, not clicks.

## Performance: the real difference

A well-built Next.js site loads in under 1 second. WordPress depends on how many plugins you have, what hosting, whether cache is set up right, whether the theme is optimised... With WordPress, Lighthouse 95+ is a project; with Next.js, it's the starting point.

The Core Web Vitals Google uses for ranking have a direct correlation with technology. It's not that WordPress can't reach green: it can, with work. But Next.js gets there by design.

## SEO: the myth that "WordPress is better for SEO"

This is false and repeated constantly. WordPress has Yoast or RankMath, which are solid SEO tools. But the underlying technical SEO (clean URLs, sitemap, hreflang, correct metadata) works just as well in Next.js. And the speed metrics that affect ranking, better.

Where WordPress has an advantage in SEO: it's easier for someone without technical knowledge to upload content, update the blog and manage text. If your content strategy is run by a non-technical team member, WordPress makes that flow easier.

## Real cost of each

**WordPress:**
- Decent hosting: €10–30/month (the cheap €2 option causes problems)
- Premium theme: €60–80 (one-off, but needs renewal)
- Essential plugins: contact form, SEO, security, cache, easily €150–300/year
- Updates that break things: every 3–6 months something breaks
- Emergency developer when something fails: €50–150/hour

**Next.js:**
- Hosting on Vercel: free up to a point, then €20/month
- Domain: €10–15/year
- Maintenance: minimal, no plugins to update
- Higher upfront cost (custom development)

Long-term, Next.js works out cheaper when you add everything up. Short-term, WordPress is more economical if you're confident managing it yourself.

## When WordPress makes sense

It makes sense when you need a powerful CMS to manage content without depending on a developer. An online magazine, a WooCommerce e-commerce, a business directory: WordPress shines there. Also if you know it well, have a trusted developer and don't want to switch tools.

It doesn't make sense for a corporate or service website where content rarely changes. There you pay the CMS price without using its advantages.

## When Next.js makes sense

For most local business websites, clinics, professionals, service companies. Projects where speed, technical SEO, multi-language and security matter. If the site will be fairly static (home, services, pricing, contact) Next.js ages better.

Also for projects with serious multi-language needs. With next-intl, hreflang, per-language URLs and per-locale metadata are set up cleanly from the start. With WordPress you need plugins that sometimes fight each other.

## My honest take

I use Next.js for all my clients. Not because it's fashionable, but because what they ask for (speed, ranking, multi-language, custom design) it resolves better. The sites I deliver have Lighthouse 95+ out of the box, without fighting plugins or a theme that auto-updates itself on a Tuesday.

If someone asks me for an e-commerce with 500 products and a marketing team uploading content daily, I'll discuss it. Maybe WordPress or Shopify makes more sense there. But for a doctor's site, a workshop, a consultancy or a clinic, Next.js wins without argument.`,
      eu: `Edozein agentziari galdetu zer erabili zure webgunean eta %80k WordPress esango dizu pentsatu gabe. Garatzaile moderno bati galdetu eta Next.js esango dizu. Inork ez dizu azalpena emango zintzotasunez. Nik bai.

## Zer den bakoitza, termino errealetan

**WordPress** 2003an blog-ak kudeatzeko jaio zen CMS bat da. Gaur egun interneten %43 hartzen du. Arazoa da zenbaki hori utzia, hackeatu, motel eta bost urteko txantiloiekin mantendutako webguneak barne hartzen dituela. Ez da domina bat.

**Next.js** Vercel-ek 2016an sortutako React framework bat da. Web aplikazio modernoentzat jaioa: azkarrak, seguruak, SSR eta sorkuntza estatikoarekin. Ez du administrazio-panelik defektuz: kodea da, ez klikak.

## Errendimendua: benetako aldea

Ondo egindako Next.js webgune bat segundo batean baino gutxiagoan kargatzen da. WordPressen, zenbat plugin daukazun, zer hosting, cache ondo konfiguratua dagoen, theme optimizatua dagoen... WordPressen Lighthouse 95+ proiektu bat da; Next.js-en, abiapuntua da.

Googlek rankeatzerakoan erabiltzen dituen Core Web Vitals-ek (LCP, CLS, INP) zuzeneko korrelazioa dute teknologiarekin.

## SEO: "WordPress SEOrako hobea da" mitoa

Hau faltsua da eta asko errepikatu egiten da. WordPressen Yoast edo RankMath daude, SEO tresna oso osoak. Baina oinarrizko SEO teknikoa (URL garbiak, sitemap, hreflang, metadatu zuzenak) Next.js-en berdin egiten da. Eta rankeatzeari eragiten dioten abiadura metrikak, hobeto.

## Noiz du zentzua WordPressek

Zentzua du garatzaile batean oinarritu gabe edukia kudeatzeko CMS indartsua behar duzunean. Online aldizkari bat, WooCommerce e-commerce bat, enpresa-direktorio bat: WordPress hor distira egiten du.

Ez du zentzua edukia gutxitan aldatzen den web korporatiborako edo zerbitzu-webgunearentzat.

## Noiz du zentzua Next.js-ek

Tokiko negozio-webgune gehienentzat, klinikak, profesionalak, zerbitzu-enpresak. Abiadura, SEO teknikoa, hizkuntza anitza eta segurtasuna garrantzitsuak diren proiektuentzat.

## Nire iritzi zintzoa

Next.js erabiltzen dut nire bezero guztientzat. Ez moda delako, baizik eta eskatzen didatena (abiadura, posizionamendua, hizkuntza anitza, neurrizko diseinua) hobeto ebazten duelako. Entregatzen ditudan webguneak Lighthouse 95+ dituzte hasieratik, pluginekin edo asteartean bere kabuz eguneratzen den theme batekin borrokatu gabe.`,
    },
    tags: ["WordPress", "Next.js", "tecnología web", "rendimiento web", "SEO"],
    keywords: {
      es: [
        "WordPress vs Next.js",
        "WordPress o Next.js para negocio",
        "Next.js vs WordPress velocidad",
        "mejor tecnología web 2026",
        "alternativa WordPress empresas",
      ],
      en: [
        "WordPress vs Next.js",
        "WordPress or Next.js for business",
        "Next.js vs WordPress speed",
        "best web technology 2026",
      ],
      eu: [
        "WordPress vs Next.js",
        "web teknologia 2026",
        "Next.js negozioetarako",
      ],
    },
    faq: {
      es: [
        {
          q: "¿Es WordPress suficiente para una web de negocio pequeño?",
          a: "Depende. Para un negocio que va a gestionar mucho contenido él mismo (blog activo, catálogo de productos, equipo sin perfil técnico), WordPress puede tener sentido. Para una web de servicios donde el contenido cambia poco, WordPress añade complejidad y costes sin ventaja real.",
        },
        {
          q: "¿Se puede hacer SEO igual de bien en Next.js que en WordPress?",
          a: "Sí. El SEO técnico (hreflang, sitemaps, metadatos por página, URLs limpias) se implementa perfectamente en Next.js. La diferencia es que en WordPress necesitas plugins para eso; en Next.js va integrado. Y la velocidad, que Google usa como factor de ranking, es superior en Next.js.",
        },
        {
          q: "¿Puedo gestionar el contenido yo mismo con Next.js?",
          a: "En el modelo que uso yo, los textos e imágenes se cambian pidiéndome a mí: no hay panel de administración. Para muchos negocios eso es suficiente: el contenido cambia poco y prefieren no lidiar con sistemas que no conocen. Si necesitas gestión autónoma de contenido, existen soluciones (Sanity, Contentful, Notion como CMS) pero añaden complejidad y coste.",
        },
        {
          q: "¿Por qué no usas WordPress si tiene más cuota de mercado?",
          a: "Cuota de mercado no es sinónimo de mejor opción técnica. El 43% de internet en WordPress incluye blogs abandonados, tiendas hackeadas y webs que cargan en 8 segundos. Para proyectos nuevos de negocio donde la velocidad y el SEO técnico son prioritarios, Next.js es objetivamente superior.",
        },
      ],
      en: [
        {
          q: "Is WordPress enough for a small business website?",
          a: "Depends. For a business that will manage a lot of content themselves (active blog, product catalogue, non-technical team), WordPress can make sense. For a service website where content rarely changes, WordPress adds complexity and costs with no real advantage.",
        },
        {
          q: "Can SEO be done just as well in Next.js as in WordPress?",
          a: "Yes. Technical SEO (hreflang, sitemaps, per-page metadata, clean URLs) is implemented perfectly in Next.js. The difference is that in WordPress you need plugins for that; in Next.js it's built in. And the speed Google uses as a ranking factor is better in Next.js.",
        },
        {
          q: "Why don't you use WordPress if it has more market share?",
          a: "Market share isn't the same as best technical option. The 43% of the internet on WordPress includes abandoned blogs, hacked shops and sites that load in 8 seconds. For new business projects where speed and technical SEO are priorities, Next.js is objectively superior.",
        },
      ],
    },
  },
  {
    slug: "diseno-web-para-clinicas",
    publishedAt: "2026-05-13",
    readingTime: 6,
    titles: {
      es: "Diseño web para clínicas y consultas: lo que de verdad importa",
      en: "Web design for clinics and practices: what really matters",
      eu: "Web diseinua klinikak eta kontsultetarako: benetan garrantzitsuena",
    },
    descriptions: {
      es: "Qué necesita la web de una clínica dental, fisioterapia o estética para generar confianza, aparecer en Google y convertir visitas en citas.",
      en: "What a dental clinic, physiotherapy or aesthetics website needs to build trust, appear on Google and turn visits into bookings.",
      eu: "Hortz-klinikaren, fisioterapiaren edo estetikaren webguneak zer behar duen konfiantza sortzeko, Googlen agertzeko eta bisitaldiak hitzorduetan bihurtzeko.",
    },
    content: {
      es: `La web de una clínica no es como la de una tienda. Aquí no vendes un producto: convences a alguien de que le vas a poner las manos encima, a veces literalmente. La confianza lo es todo. Y la mayoría de webs de clínicas fallan exactamente en eso.

![Recepción de clínica limpia y bien iluminada](https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=1200)

## El error número uno: parecer una clínica genérica

Entras en la web de una clínica dental cualquiera y ves: logo corporativo, foto de stock de dentista con mascarilla, lista de servicios en dos columnas, formulario de contacto al fondo. Podría ser cualquier clínica del mundo.

Tu paciente potencial llega a tu web después de buscar en Google, comparar tres opciones y llegar a la tuya. Si no ve nada que le diferencie, elige al que tiene más reseñas o al más barato. Tú no quieres competir en precio con una clínica franquicia.

Lo que diferencia una web de clínica que convierte:
- Foto real del equipo, no de stock
- Historia del centro: cuándo se fundó, quién está detrás, por qué lo hacen
- Testimonios reales con nombre y servicio
- Información clara de precios (o al menos rangos)
- Un proceso de cita fácil de entender

## Confianza antes que diseño

El diseño importa, pero está al servicio de la confianza. Un diseño impecable con fotos de stock y sin información real genera menos conversiones que un diseño discreto con foto del equipo y 20 reseñas de Google visibles.

Lo que genera confianza en una web de clínica:

**Equipo visible.** Foto real, nombre completo, especialidad y años de experiencia. Los pacientes quieren saber quién les va a atender.

**Certificaciones y colegiación.** Número de colegiado visible. No porque lo exija la ley, sino porque el paciente que lo busca encuentra lo que busca y queda tranquilo.

**Antes y después (si aplica).** En estética dental o cirugía estética, los casos antes/después son el argumento más potente. Con consentimiento, claro.

**Política de privacidad real.** No el texto genérico del plugin. Una que explique cómo se manejan los datos de salud, porque son datos sensibles bajo el RGPD y la ley española tiene requisitos específicos para centros sanitarios.

## SEO para clínicas: lo que funciona en 2026

Una clínica local compite en búsquedas como "dentista en Irun", "fisioterapeuta Hondarribia" o "clínica estética Donostia". Para ganar esas búsquedas:

**Google Business Profile optimizado.** Categoría correcta (no "clínica" genérico, sino "Clínica dental", "Centro de fisioterapia"). Fotos reales del local. Respuesta a todas las reseñas. Publicaciones semanales con ofertas o noticias.

**Schema LocalBusiness y MedicalOrganization.** Los datos estructurados le dicen a Google qué tipo de centro eres, tu especialidad, tu zona de servicio. Muchas webs de clínicas no lo tienen: es una ventaja directa para quien lo implementa.

**Páginas por servicio.** Una página por tratamiento con contenido real: en qué consiste, cuánto dura, qué resultados esperar, preguntas frecuentes, precio orientativo. No una lista. Una página.

**Reseñas recientes.** Pide reseña justo cuando el paciente sale satisfecho. Con una plantilla de WhatsApp es fácil. 5 reseñas en un mes valen más que 50 de hace tres años.

## Formulario de cita: el punto de conversión

El formulario de una clínica tiene que pedir lo mínimo: nombre, teléfono, servicio que busca. No DNI, no historial médico, no fecha de nacimiento. Eso se pide en la consulta. El objetivo del formulario es que el paciente dé el primer paso.

Mejor aún que el formulario: un enlace de WhatsApp directo. Muchos pacientes prefieren escribir un mensaje a rellenar un formulario. Si tienes WhatsApp Business, úsalo.

## Lo que yo incluyo en webs de clínicas

Cuando hago la web de una clínica, pienso en el paciente que llega con una duda y tiene que decidir en 30 segundos si confía o busca otra opción. El diseño, los textos y la estructura están al servicio de esa decisión.

Lo habitual que configuro: página de inicio con foto real del equipo arriba del pliegue, sección de servicios con página individual por tratamiento, precios orientativos, sección de equipo con datos de cada profesional, reseñas de Google integradas, formulario de cita + link de WhatsApp, Schema MedicalOrganization y LocalBusiness, política de privacidad adaptada a datos de salud.

El resultado: una clínica que aparece en Google para sus búsquedas locales y que convierte esas visitas en citas reales.`,
      en: `A clinic's website isn't like a shop's. You're not selling a product: you're convincing someone to let you put your hands on them, sometimes literally. Trust is everything. And most clinic websites fail at exactly that.

![Clean, well-lit clinic reception](https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=1200)

## Mistake number one: looking like a generic clinic

Open any dental clinic's website and you see: corporate logo, stock photo of a dentist with a mask, list of services in two columns, contact form at the bottom. Could be any clinic in the world.

Your potential patient arrives at your site after searching on Google, comparing three options and landing on yours. If they see nothing that sets you apart, they choose whoever has more reviews or is cheapest. You don't want to compete on price with a franchise clinic.

What differentiates a clinic website that converts:
- Real photos of the team, not stock
- Centre story: when it was founded, who's behind it, why they do it
- Real testimonials with name and service
- Clear pricing information (or at least ranges)
- An easy-to-understand booking process

## Trust before design

Design matters, but it serves trust. Impeccable design with stock photos and no real information converts less than modest design with a team photo and 20 visible Google reviews.

What builds trust on a clinic website:

**Visible team.** Real photo, full name, specialty and years of experience. Patients want to know who will treat them.

**Certifications and registration numbers.** Visible registration number. Not because the law requires it, but because the patient who looks for it finds it and feels reassured.

**Before and after (if applicable).** In dental or cosmetic aesthetics, before/after cases are the most powerful argument. With consent, of course.

**Real privacy policy.** Not the generic plugin text. One that explains how health data is handled, because it's sensitive data under GDPR and Spanish law has specific requirements for healthcare centres.

## SEO for clinics: what works in 2026

A local clinic competes on searches like "dentist in Irun", "physio Hondarribia" or "aesthetic clinic Donostia". To win those searches:

**Optimised Google Business Profile.** Correct category (not generic "clinic", but "Dental clinic", "Physiotherapy centre"). Real photos of the premises. Response to all reviews. Weekly posts with offers or news.

**LocalBusiness and MedicalOrganization schema.** Structured data tells Google what type of centre you are, your specialty, your service area. Many clinic websites don't have this: it's a direct advantage for whoever implements it.

**A page per service.** One page per treatment with real content: what it involves, how long it takes, what results to expect, FAQs, indicative price. Not a list. A page.

**Recent reviews.** Ask for a review right when the patient leaves satisfied. A WhatsApp template makes it easy. 5 reviews in a month are worth more than 50 from three years ago.

## Booking form: the conversion point

A clinic's form should ask for the minimum: name, phone, service they're looking for. Not ID number, medical history, or date of birth. That's for the appointment. The form's goal is to get the patient to take the first step.

Even better than a form: a direct WhatsApp link. Many patients prefer to write a message over filling in a form.

## What I include in clinic websites

When I build a clinic's website, I think about the patient who arrives with a doubt and has 30 seconds to decide whether to trust or search for another option. The design, text and structure serve that decision.

The usual setup: home page with real team photo above the fold, services section with individual pages per treatment, indicative prices, team section with each professional's details, integrated Google reviews, booking form + WhatsApp link, MedicalOrganization and LocalBusiness schema, privacy policy adapted to health data.

The result: a clinic that appears on Google for its local searches and converts those visits into real appointments.`,
      eu: `Klinikaren webgunea ez da denda baten modukoa. Ez duzu produkturik saltzen: norbaiti eskuak gainean jartzea konbentzitzen duzu, batzuetan literalki. Konfiantza dena da. Eta kliniken web gehienek horretan huts egiten dute.

![Harrera garbi eta ondo argiztatua](https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=1200)

## Akats nagusia: klinika generiko baten itxura edukitzea

Edozein hortz-klinikaren webgunea irekitzen duzu eta ikusten duzu: logo korporatiboa, maskara duen dentistaren stock argazkia, zerbitzuen zerrenda bi zutabetan, kontaktu-formularioa behean. Munduko edozein klinika izan liteke.

Zure paziente potentzialak zure webgunera iristen da Googlen bilatu, hiru aukera alderatu eta zurearen ondoren. Bereizten duen ezer ikusten ez badu, iritzi gehien dituena edo merkeena aukeratzen du.

Konbertsio-klinikaren webgunea bereizten duena:
- Taldearen argazki erreala, ez stock-ekoa
- Zentroaren historia: noiz sortu zen, nor dagoen atzean, zergatik egiten duten
- Izen eta zerbitzuarekin benetako testigantzak
- Prezioen informazio argia (gutxienez tarteak)
- Ulertzeko erraza den hitzorduen prozesua

## Konfiantza diseinuaren aurretik

Diseinua garrantzitsua da, baina konfiantzaren zerbitzuan dago. Stock argazkiekin eta informazio errealik gabe diseinu ezin hobeak konbertsio gutxiago sortzen du.

Klinikaren webgunean konfiantza sortzen duena:

**Talde bistaratu.** Argazki erreala, izen osoa, espezialitatea eta esperientzia urteak.

**Ziurtagiriak eta kolegiazio zenbakiak.** Kolegiazio zenbaki bistaratzaile bat. Ez legearen eskakizunagatik, bilatzen duen pazientea aurkitzen duelako eta lasai geratzen delako.

**Lehenago eta ondoren (aplikagarria bada).** Hortz-estetikan edo estetika-kirurgian, lehen/orain kasuak argudio indartsuena dira.

**Pribatutasun-politika erreala.** Osasun-datuak nola kudeatzen diren azaltzen duena.

## Klinikaren SEO: 2026an funtzionatzen duena

Tokiko klinika batek "dentista Irunen", "fisioterapeuta Hondarribian" edo "estetika klinika Donostian" bezalako bilaketetan lehiatzen du.

**Google Business Profile optimizatua.** Kategoria zuzena. Lokalaren argazki errealak. Iritzi guztiei erantzuna. Asteroko posts-ak.

**LocalBusiness eta MedicalOrganization Schema.** Datu egituratuek Googler esaten diote zer mota zentro zaren, zure espezialitatea, zure zerbitzu-area.

**Zerbitzu bakoitzeko orrialdea.** Tratamendu bakoitzeko orrialde bat eduki erreal batekin: zertan datzan, zenbat irauten duen, zer emaitza espero, galdera ohikoak.

**Iritzi berriak.** Eskatu iritzia pazientea pozik irteten denean. WhatsApp txantiloi batekin erraza da.

Emaitza: bere tokiko bilaketetan Googlen agertzen den eta bisita horiek benetako hitzordutan bihurtzen dituen klinika bat.`,
    },
    tags: ["clínicas", "diseño web clínica", "SEO médico", "confianza web", "conversión"],
    keywords: {
      es: [
        "diseño web clínica dental",
        "web para clínica fisioterapia",
        "diseño web centro médico",
        "SEO clínica local",
        "web clínica estética",
        "diseñador web clínica País Vasco",
      ],
      en: [
        "web design dental clinic",
        "clinic website design",
        "medical practice website",
        "local SEO clinic",
        "aesthetic clinic website",
      ],
      eu: [
        "web diseinua hortz-klinikak",
        "klinikaren webgunea",
        "SEO medikua lokala",
      ],
    },
    faq: {
      es: [
        {
          q: "¿Qué información legal necesita la web de una clínica en España?",
          a: "Obligatorio: aviso legal, política de privacidad y política de cookies. En centros sanitarios, la política de privacidad debe especificar el tratamiento de datos de salud (categoría especial bajo RGPD), el responsable del tratamiento y el DPO si aplica. También es necesario el consentimiento informado para formularios que recojan datos de salud.",
        },
        {
          q: "¿Puedo poner precios en la web de mi clínica?",
          a: "Sí, y es muy recomendable. Los precios (aunque sean orientativos) eliminan una barrera de entrada importante: el miedo a pedir presupuesto. Una clínica que pone sus precios visibles transmite transparencia. Si hay mucha variabilidad (cada caso es diferente), pon rangos o precios de consulta inicial.",
        },
        {
          q: "¿Qué diferencia un formulario de cita que convierte del que no convierte?",
          a: "El que convierte pide el mínimo: nombre, teléfono y servicio que busca. El que no convierte pide DNI, fecha de nacimiento, historial o demasiados campos. El objetivo es que el paciente dé el primer paso, no recopilar expediente completo. El resto se pide en la consulta.",
        },
        {
          q: "¿Cuánto tiempo tarda Google en posicionar una clínica nueva?",
          a: "Con Google Business Profile optimizado, reseñas constantes y Schema correcto, una clínica nueva puede aparecer en los primeros resultados locales en 2-4 meses. El SEO orgánico (posición en resultados de búsqueda sin Maps) tarda más: 4-8 meses para términos competitivos en ciudades como Donostia o Bilbao.",
        },
      ],
      en: [
        {
          q: "What legal information does a clinic website need in Spain?",
          a: "Required: legal notice, privacy policy and cookie policy. In healthcare centres, the privacy policy must specify the processing of health data (special category under GDPR), the data controller and DPO if applicable.",
        },
        {
          q: "Can I put prices on my clinic's website?",
          a: "Yes, and it's highly recommended. Prices (even indicative ones) remove an important barrier: the fear of asking for a quote. A clinic that shows its prices visibly communicates transparency.",
        },
        {
          q: "What differentiates a booking form that converts from one that doesn't?",
          a: "The one that converts asks for the minimum: name, phone and service they're looking for. The one that doesn't asks for ID, date of birth, history or too many fields. The goal is for the patient to take the first step, not to collect a full record.",
        },
      ],
    },
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function getRelatedBlogPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogPostBySlug(slug);
  if (!current) return [];
  const scored = blogPosts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || b.post.publishedAt.localeCompare(a.post.publishedAt));
  return scored.slice(0, limit).map((s) => s.post);
}
