import { setRequestLocale } from "next-intl/server";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import Faq, { faqJsonLd } from "@/components/Faq";
import JsonLd from "@/components/JsonLd";

type P = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: P) {
  const { locale } = await params;
  const t = getContent(locale).faq;
  return pageMeta({ locale, path: "/faq", title: t.pageTitle, description: t.pageDescription });
}

export default async function FaqPage({ params }: P) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = getContent(locale).faq;
  return (
    <section className="light" style={{ minHeight: "100svh" }}>
      <JsonLd data={faqJsonLd(t.items)} />
      <div className="wrap section two-col" style={{ paddingTop: 170 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span className="eyebrow">{t.eyebrow}</span>
          <h1 className="h2">{t.title}</h1>
        </div>
        <Faq items={t.items} />
      </div>
    </section>
  );
}
