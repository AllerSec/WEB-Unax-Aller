import Link from "next/link";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol
        className="flex flex-wrap items-center gap-2 text-xs"
        style={{ color: "var(--color-ink-subtle)", fontFamily: "Manrope, sans-serif" }}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:underline"
                  style={{ color: "var(--color-accent)" }}
                >
                  {item.name}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} style={{ color: "var(--color-ink-muted)" }}>
                  {item.name}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" style={{ color: "var(--color-line-strong)" }}>
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
