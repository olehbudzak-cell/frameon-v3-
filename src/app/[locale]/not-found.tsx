import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent } from "@/lib/content";

export default async function NotFound() {
  const t = getContent(await getLocale()).notFound;
  return (
    <section className="final">
      <img src="/images/stud-frame-loft.jpg" alt="" />
      <div className="inner wrap">
        <span className="eyebrow">404</span>
        <h1 className="display" style={{ fontSize: "clamp(36px, 6vw, 80px)", margin: 0 }}>{t.title}</h1>
        <p className="lead">{t.text}</p>
        <Link href="/" className="btn btn-primary">{t.cta}</Link>
      </div>
    </section>
  );
}
