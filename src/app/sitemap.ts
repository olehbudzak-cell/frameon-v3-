import type { MetadataRoute } from "next";
import { locales, serviceLocales } from "@/i18n/routing";
import { services } from "@/content/services";
import { urlFor } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, available: readonly string[], priority: number) =>
    available.map((l) => ({
      url: urlFor(l, path),
      lastModified: now,
      priority,
      alternates: { languages: Object.fromEntries(available.map((a) => [a === "uk" ? "uk-UA" : a === "en" ? "en-GB" : a, urlFor(a, path)])) },
    }));
  return [
    ...entry("/", locales, 1),
    ...entry("/services", locales, 0.9),
    ...services.flatMap((s) => entry(`/services/${s.slug}`, serviceLocales, 0.8)),
    ...entry("/contractors", serviceLocales, 0.7),
    ...entry("/faq", locales, 0.6),
    ...entry("/quote", locales, 0.7),
    ...entry("/privacy", locales, 0.2),
  ];
}
