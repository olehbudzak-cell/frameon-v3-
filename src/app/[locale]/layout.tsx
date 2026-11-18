import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, rtlLocales, type Locale } from "@/i18n/routing";
import { getContent, serviceLocaleFor } from "@/lib/content";
import { CONTACT } from "@/content/services";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActionBar from "@/components/ActionBar";
import SmoothScroll from "@/components/SmoothScroll";
import "../globals.css";

const call: Record<string, string> = { en: "Call", ro: "Sună", es: "Llamar", pl: "Zadzwoń", bn: "কল", pt: "Ligar", gu: "કૉલ", it: "Chiama", pa: "ਕਾਲ", ar: "اتصل", uk: "Дзвінок", ru: "Звонок" };

export const metadata: Metadata = {
  metadataBase: new URL(CONTACT.site),
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#0D0C0B", width: "device-width", initialScale: 1 };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = getContent(locale);
  const svcLocale = serviceLocaleFor(locale);
  return (
    <html lang={locale} dir={rtlLocales.includes(locale) ? "rtl" : "ltr"} id="top">
      <body>
        <NextIntlClientProvider>
          <a className="skip-link" href="#main">Skip to content</a>
          <Header t={t.nav} contractorsLocale={svcLocale} />
          <main id="main">{children}</main>
          <Footer t={t} svcLocale={svcLocale} locale={locale as Locale} />
          <ActionBar price={t.nav.getPrice} call={call[locale]} />
          <SmoothScroll />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
