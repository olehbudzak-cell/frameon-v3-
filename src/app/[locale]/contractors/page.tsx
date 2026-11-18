import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { serviceLocales } from "@/i18n/routing";
import { getContent, hasFullPages } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { CONTACT } from "@/content/services";

type P = { params: Promise<{ locale: string }> };

export function generateStaticParams() { return serviceLocales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: P) {
  const { locale } = await params;
  if (!hasFullPages(locale)) return {};
  const p = getContent(locale).contractors.page;
  return pageMeta({ locale, path: "/contractors", title: p.metaTitle, description: p.metaDescription, available: serviceLocales, image: "/images/sfs-framing-osb.jpg" });
}

export default async function Contractors({ params }: P) {
  const { locale } = await params;
  if (!hasFullPages(locale)) notFound();
  setRequestLocale(locale);
  const t = getContent(locale).contractors;
  const p = t.page;
  return (
    <>
      <section className="hero" style={{ minHeight: "86svh" }}>
        <div className="hero-media"><Image src="/images/stud-frame-loft.jpg" alt="" fill priority sizes="100vw" /></div>
        <div className="hero-shade" />
        <div className="wrap" style={{ position: "relative", paddingBottom: 72, display: "flex", flexDirection: "column", gap: 24, maxWidth: 1440 }}>
          <span className="eyebrow">{t.eyebrow}</span>
          <h1 className="display" style={{ margin: 0, maxWidth: 1000, fontSize: "clamp(36px, 5.4vw, 80px)" }}>{p.h1}</h1>
          <p className="lead" style={{ margin: 0, maxWidth: 680 }}>{p.lead}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="btn btn-primary" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Drawings for pricing")}`}>{t.cta}</a>
            <a className="btn btn-ghost" href={CONTACT.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
      </section>
      <section className="wrap section" style={{ display: "grid", gap: 0 }}>
        {p.sections.map((s, i) => (
          <div key={s.title} className="two-col" style={{ paddingBlock: 40, borderTop: "1px solid var(--color-smoke)" }} data-reveal>
            <div style={{ display: "flex", gap: 20, alignItems: "baseline" }}><span className="eyebrow">0{i + 1}</span><h2 className="h3">{s.title}</h2></div>
            <p className="lead muted" style={{ margin: 0 }}>{s.text}</p>
          </div>
        ))}
      </section>
      <section style={{ background: "var(--color-graphite)", borderBlock: "1px solid var(--color-smoke)" }}>
        <div className="wrap section">
          <div className="proc">
            {p.steps.map((s, i) => <div key={s.title}><span className="eyebrow">0{i + 1}</span><h3 className="h3" style={{ fontSize: 20 }}>{s.title}</h3><p className="muted" style={{ margin: 0 }}>{s.text}</p></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
