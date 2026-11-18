import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent, serviceLocaleFor, gbp } from "@/lib/content";
import { pageMeta, businessJsonLd } from "@/lib/seo";
import { services, CONTACT } from "@/content/services";
import type { Locale } from "@/i18n/routing";
import BuildScene from "@/components/BuildScene";
import XRay from "@/components/XRay";
import Calculator from "@/components/Calculator";
import LaserSteps from "@/components/LaserSteps";
import ServiceCard from "@/components/ServiceCard";
import Faq, { faqJsonLd } from "@/components/Faq";
import JsonLd from "@/components/JsonLd";

type P = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: P) {
  const { locale } = await params;
  const t = getContent(locale);
  return pageMeta({ locale, path: "/", title: t.meta.homeTitle, description: t.meta.homeDescription });
}

export default async function Home({ params }: P) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = getContent(locale);
  const svcLocale = serviceLocaleFor(locale) as Locale;
  const priceLabel = (rate: number | null, unit: "m2" | "m" | null) =>
    rate ? `${t.calc.from} ${gbp(rate)}/${unit === "m" ? t.calc.metres : t.calc.area}` : t.calc.noRate;

  return (
    <>
      <JsonLd data={businessJsonLd(locale)} />
      <JsonLd data={faqJsonLd(t.faq.items)} />

      {/* HERO — static first frame for a fast LCP; the scene below continues from it */}
      <section className="hero">
        <div className="hero-media">
          <picture>
            <source media="(max-width: 760px)" srcSet="/images/loft-empty-mobile.jpg" />
            <Image src="/images/loft-empty-london.jpg" alt="" fill priority sizes="100vw" />
          </picture>
        </div>
        <div className="hero-shade" />
        <div className="badge" aria-hidden="true">{t.hero.badge}</div>
        <div className="wrap hero-inner">
          <div>
            <p className="eyebrow" style={{ margin: "0 0 18px" }}>{t.hero.eyebrow}</p>
            <h1>{t.hero.h1}</h1>
            <p className="slogan" aria-label={t.hero.slogan.join(" ")}>
              {t.hero.slogan.map((w) => <span className="line" key={w} aria-hidden="true"><span>{w}</span></span>)}
            </p>
          </div>
          <div className="hero-side">
            <p className="lead" style={{ margin: 0 }}>{t.hero.lead}</p>
            <div className="hero-ctas">
              <a className="btn btn-primary" href={CONTACT.whatsapp} target="_blank" rel="noopener">{t.hero.ctaWhatsapp}</a>
              <a className="btn btn-ghost" href="#price">{t.hero.ctaPrice} →</a>
            </div>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span className="mono" style={{ fontSize: 11 }}>{t.hero.scroll}</span><i /></div>
      </section>

      {/* BUILD SCENE — Higgsfield video as a scroll-scrubbed image sequence */}
      <BuildScene
        stages={t.build.stages}
        label={t.build.label}
        skip={t.build.skip}
        extra={<Link href="/services/stud-partitions" locale={svcLocale} className="link-arrow" style={{ fontSize: 15 }}>{t.build.serviceLink} →</Link>}
      />

      {/* DONE + STATS */}
      <section className="done" aria-labelledby="done-title">
        <Image src="/images/finished-loft-conversion.jpg" alt={t.done.title} fill sizes="100vw" />
        <div className="shade" />
        <div className="wrap" style={{ position: "relative", width: "100%", paddingBottom: 80, display: "flex", flexDirection: "column", gap: 56 }}>
          <h2 id="done-title" className="display" data-reveal style={{ margin: 0, maxWidth: 980, fontSize: "clamp(40px, 5.4vw, 76px)" }}>{t.done.title}</h2>
          <div className="stats">
            {t.done.stats.map((s) => <div className="stat" key={s.label} data-reveal><b>{s.value}</b><span className="muted">{s.label}</span></div>)}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k}>{services.slice(0, 7).map((s) => <span key={s.slug}>{t.servicesText[s.slug].title}<i className="screw" /></span>)}</span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="section wrap">
        <div className="section-head">
          <div><span className="eyebrow">{t.services.eyebrow}</span><h2 className="h2" data-reveal>{t.services.title}</h2></div>
          <Link href="/services" className="btn btn-ghost">{t.services.all} →</Link>
        </div>
        <div className="svc-grid">
          {services.map((s) => (
            <ServiceCard key={s.slug} s={s} text={t.servicesText[s.slug]} locale={svcLocale} priceLabel={priceLabel(s.rate, s.unit)} />
          ))}
        </div>
      </section>

      {/* X-RAY */}
      <XRay before={t.xray.before} after={t.xray.after} hint={t.xray.hint}>
        <span className="eyebrow">{t.xray.eyebrow}</span>
        <h2 className="h2">{t.xray.title}</h2>
        <p className="lead muted" style={{ margin: 0 }}>{t.xray.text}</p>
        <a className="btn btn-ghost" style={{ alignSelf: "flex-start" }} href={CONTACT.whatsapp} target="_blank" rel="noopener">{t.xray.cta} →</a>
        <span className="mono muted" style={{ fontSize: 11 }}>{t.xray.hint}</span>
      </XRay>

      {/* CONTRACTORS */}
      <section className="b2b" aria-labelledby="b2b-title">
        <div className="wrap section b2b-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <span className="eyebrow">{t.contractors.eyebrow}</span>
            <h2 id="b2b-title" className="h2" data-reveal>{t.contractors.title}</h2>
            <p className="lead muted" style={{ margin: 0 }}>{t.contractors.text}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="btn btn-primary" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Drawings for pricing")}`}>{t.contractors.cta}</a>
              <Link className="btn btn-ghost" href="/contractors" locale={svcLocale}>{t.contractors.ctaSecondary} →</Link>
            </div>
          </div>
          <div className="b2b-points">
            {t.contractors.points.map((p, i) => (
              <div key={p.title} data-reveal><span>0{i + 1}</span><h3 className="h3" style={{ fontSize: 20 }}>{p.title}</h3><p className="muted" style={{ margin: 0 }}>{p.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="section wrap">
        <span className="eyebrow">{t.how.eyebrow}</span>
        <h2 className="h2" style={{ margin: "20px 0 72px" }} data-reveal>{t.how.title}</h2>
        <LaserSteps>
          {t.how.steps.map((s, i) => (
            <div className="step" key={s.title}>
              <span className="n">0{i + 1}</span>
              <h3 className="h3">{s.title}</h3>
              <p className="muted" style={{ margin: 0, fontSize: 17 }}>{s.text}</p>
            </div>
          ))}
        </LaserSteps>
      </section>

      {/* CALCULATOR */}
      <section id="price" className="section wrap" style={{ paddingTop: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40, maxWidth: 820 }}>
          <span className="eyebrow">{t.calc.eyebrow}</span>
          <h2 className="h2" data-reveal>{t.calc.title}</h2>
        </div>
        <Calculator t={t.calc} />
      </section>

      {/* AREAS */}
      <section id="areas" style={{ borderTop: "1px solid var(--color-smoke)" }}>
        <div className="wrap section two-col">
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <span className="eyebrow">{t.areas.eyebrow}</span>
            <h2 className="h2" data-reveal>{t.areas.title}</h2>
            <p className="lead muted" style={{ margin: 0 }}>{t.areas.text}</p>
          </div>
          <ul className="boroughs" aria-label={t.areas.title}>{t.areas.boroughs.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="light">
        <div className="wrap section two-col">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <span className="eyebrow">{t.faq.eyebrow}</span>
            <h2 className="h2">{t.faq.title}</h2>
          </div>
          <Faq items={t.faq.items} />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final">
        <Image src="/images/loft-empty-london.jpg" alt="" fill sizes="100vw" />
        <div className="inner wrap">
          <h2>{t.final.title}</h2>
          <a className="btn btn-primary" style={{ minHeight: 60, padding: "0 34px", fontSize: 17 }} href={CONTACT.whatsapp} target="_blank" rel="noopener">{t.final.cta}</a>
          <p style={{ margin: 0 }}><a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a> · <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> · <a href={CONTACT.facebook} target="_blank" rel="noopener">Facebook</a></p>
        </div>
      </section>
    </>
  );
}
