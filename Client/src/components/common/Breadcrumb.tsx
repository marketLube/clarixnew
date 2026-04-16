import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clarix.in";

export default function Breadcrumb({ items }: BreadcrumbProps) {
  // Always prepend Home
  const allItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    ...items,
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="font-poppins text-[13px] md:text-[14px] text-[#767e92]">
        <ol className="flex flex-wrap items-center justify-center md:justify-start gap-1">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;

            return (
              <li key={index} className="flex items-center gap-1">
                {index > 0 && (
                  <span aria-hidden="true" className="text-[#b0b7c9] select-none mx-0.5">/</span>
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-[#513392] transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[#162447] font-medium truncate max-w-[300px]">{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
