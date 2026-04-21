import { extractHeadings } from "@/lib/utils";

type Locale = "es" | "en" | "eu";

const labels: Record<Locale, string> = {
  es: "Índice",
  en: "Contents",
  eu: "Aurkibidea",
};

export default function PostTOC({
  content,
  locale,
}: {
  content: string;
  locale: Locale;
}) {
  const headings = extractHeadings(content);
  if (headings.length < 3) return null;

  return (
    <nav className="post-toc" aria-label={labels[locale]}>
      <p className="post-toc-label">{labels[locale]}</p>
      <ol className="post-toc-list">
        {headings.map((h) => (
          <li key={h.id} className="post-toc-item">
            <a href={`#${h.id}`} className="post-toc-link focusable">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
