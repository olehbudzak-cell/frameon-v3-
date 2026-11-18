import { setRequestLocale } from "next-intl/server";
import { getContent, serviceLocaleFor, gbp } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { serviceBySlug } from "@/content/services";
import type { Locale } from "@/i18n/routing";
import ServiceCard from "@/components/ServiceCard";

type P = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: P) {
  const { locale } = await params;
  const t = getContent(locale).servicesHub;
  return pageMeta({ locale, path: "/services", title: t.metaTitle, description: t.metaDescription });
}

export default async function ServicesHub({ params }: P) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = getContent(locale);
  const svcLocale = serviceLocaleFor(locale) as Locale;
  return (
    <section className="wrap page-top section" style={{ paddingTop: 150 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900, marginBottom: 64 }}>
        <span className="eyebrow">{t.services.eyebrow}</span>
        <h1 className="display" style={{ margin: 0, fontSize: "clamp(36px, 5vw, 72px)" }}>{t.servicesHub.h1}</h1>
        <p className="lead muted" style={{ margin: 0 }}>{t.servicesHub.lead}</p>
      </div>
      {t.servicesHub.groups.map((g) => (
        <div key={g.title} style={{ marginBottom: 64 }}>
          <h2 className="h3" style={{ marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid var(--color-smoke)" }}>{g.title}</h2>
          <div className="svc-grid">
            {g.slugs.map((slug) => {
              const s = serviceBySlug(slug)!;
              return <ServiceCard key={slug} s={s} text={t.servicesText[slug]} locale={svcLocale} priceLabel={s.rate ? `${t.calc.from} ${gbp(s.rate)}/${s.unit === "m" ? t.calc.metres : t.calc.area}` : t.calc.noRate} />;
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
