import type { BlogPostFaq } from "@/lib/data/blog-posts";

type Locale = "es" | "en" | "eu" | "fr";

const headings: Record<Locale, string> = {
  es: "Preguntas frecuentes",
  en: "Frequently asked questions",
  eu: "Maiz egiten diren galderak",
  fr: "Questions fréquentes",
};

export default function PostFAQ({
  faqs,
  locale,
}: {
  faqs: BlogPostFaq[];
  locale: Locale;
}) {
  if (!faqs.length) return null;

  return (
    <section className="faq-wrap" aria-label={headings[locale]}>
      <h2 className="related-heading">{headings[locale]}</h2>
      <div className="faq-list">
        {faqs.map((f, i) => (
          <details key={i} className="faq-item">
            <summary className="faq-summary focusable">
              <span>{f.q}</span>
              <svg
                className="faq-caret"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <p className="faq-answer">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
