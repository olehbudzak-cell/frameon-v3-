import { setRequestLocale } from "next-intl/server";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { services, CONTACT } from "@/content/services";
import QuoteForm from "@/components/QuoteForm";
import Calculator from "@/components/Calculator";

type P = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: P) {
  const { locale } = await params;
  const q = getContent(locale).quote;
  return pageMeta({ locale, path: "/quote", title: q.metaTitle, description: q.metaDescription });
}

export default async function Quote({ params }: P) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = getContent(locale);
  const list = services.map((s) => ({ slug: s.slug, title: t.servicesText[s.slug].title }));
  return (
    <section className="wrap section" style={{ paddingTop: 160 }}>
      <div className="two-col" style={{ alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span className="eyebrow">{t.nav.getPrice}</span>
          <h1 className="display" style={{ margin: 0, fontSize: "clamp(36px, 4.4vw, 60px)" }}>{t.quote.h1}</h1>
          <p className="lead muted" style={{ margin: 0 }}>{t.quote.lead}</p>
          <p style={{ margin: 0 }}><span className="muted">{t.quote.or} </span><a href={CONTACT.phoneHref} className="lead">{CONTACT.phoneDisplay}</a></p>
          <a href={`mailto:${CONTACT.email}`} className="muted">{CONTACT.email}</a>
        </div>
        <QuoteForm t={t.quote} services={list} />
      </div>
      <div style={{ marginTop: 96 }}>
        <h2 className="h3" style={{ marginBottom: 28 }}>{t.calc.title}</h2>
        <Calculator t={t.calc} />
      </div>
    </section>
  );
}
