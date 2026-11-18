import type { MetadataRoute } from "next";
import { CONTACT } from "@/content/services";

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${CONTACT.site}/sitemap.xml`, host: CONTACT.site };
}
