import { setRequestLocale } from "next-intl/server";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

type P = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: P) {
  const { locale } = await params;
  const t = getContent(locale).privacy;
  return pageMeta({ locale, path: "/privacy", title: t.metaTitle, description: t.body[0] });
}

export default async function Privacy({ params }: P) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = getContent(locale).privacy;
  return (
    <section className="wrap section prose" style={{ paddingTop: 170, minHeight: "70svh" }}>
      <h1 className="h2" style={{ marginBottom: 32 }}>{t.h1}</h1>
      {t.body.map((p) => <p key={p}>{p}</p>)}
    </section>
  );
}
